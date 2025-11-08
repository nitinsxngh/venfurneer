import { some } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { addProduct } from "@/store/reducers/cart";
import { toggleFavProduct } from "@/store/reducers/user";
import type { ProductStoreType, ProductType } from "@/types";

type ProductContent = {
  product: ProductType & { _id?: string };
};

type CategoryType = {
  id: string;
  name: string;
  slug: string;
};

const SIZE_PRIORITY = [
  "xxs",
  "xx-small",
  "xs",
  "x-small",
  "s",
  "small",
  "m",
  "medium",
  "l",
  "large",
  "xl",
  "x-large",
  "xxl",
  "xx-large",
  "xxxl",
  "xxx-large",
  "4xl",
  "5xl",
  "onesize",
  "one size",
  "free size",
];

const getSizeWeight = (value: string): number => {
  const normalized = value.trim().toLowerCase();
  const numericMatch = normalized.match(/[\d.]+/);

  if (numericMatch) {
    const numericValue = Number(numericMatch[0]);
    if (!Number.isNaN(numericValue)) {
      return 1000 + numericValue;
    }
  }

  const priorityIndex = SIZE_PRIORITY.findIndex((priority) => {
    if (priority.includes(" ")) {
      return priority === normalized;
    }

    return (
      priority === normalized ||
      priority.replace(/-/g, "") === normalized ||
      normalized.replace(/[-\s]/g, "") === priority
    );
  });

  if (priorityIndex !== -1) {
    return priorityIndex;
    }

  return 5000 + normalized.charCodeAt(0);
};

const sortSizeList = (sizes: string[]) =>
  [...new Set(sizes)].sort((a, b) => getSizeWeight(a) - getSizeWeight(b));

const formatSizeLabel = (size: string) => {
  if (!size) return "";

  const normalized = size.trim().toLowerCase();
  const numericMatch = normalized.match(/^(\d+(?:\.\d+)?)([a-z%]*)$/i);

  if (numericMatch) {
    const valueRaw = parseFloat(numericMatch[1]);
    const valueFormatted =
      Number.isNaN(valueRaw) || Number.isInteger(valueRaw)
        ? parseInt(numericMatch[1], 10).toString()
        : valueRaw.toString();

    let unit = numericMatch[2].toLowerCase();
    if (!unit || unit === "m") {
      unit = "ml";
    } else if (unit === "ml") {
      unit = "ml";
    }

    if (unit === "ml") {
      return `${valueFormatted} ml`;
    }

    return `${valueFormatted} ${unit.toUpperCase()}`;
  }

  if (/^[a-zA-Z]+$/.test(normalized)) {
    return normalized.toUpperCase();
  }

  return size.trim().replace(/(^\w|\s\w)/g, (char) => char.toUpperCase());
};

const formatColorLabel = (color: string) => {
  if (!color) {
    return "";
  }

  const trimmed = color.trim();
  if (trimmed.startsWith("#")) {
    return trimmed.toUpperCase();
  }

  return trimmed
    .split(/[\s-_]+/)
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
    )
    .join(" ");
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const {
    sizePrices = [],
    sizes = [],
    colors = [],
    currentPrice,
  } = product;
  const [count, setCount] = useState<number>(1);
  const [itemSize, setItemSize] = useState<string>("");
  const [itemColor, setItemColor] = useState<string>("");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(currentPrice);
  const [showAllSizes, setShowAllSizes] = useState(false);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  const sortedSizePrices = useMemo(() => {
    if (!sizePrices.length) {
      return [];
    }

    const unique = new Map<string, (typeof sizePrices)[number]>();
    sizePrices.forEach((entry) => {
      if (entry.size) {
        unique.set(entry.size, entry);
      }
    });

    return Array.from(unique.values()).sort(
      (a, b) => getSizeWeight(a.size) - getSizeWeight(b.size),
    );
  }, [sizePrices]);

  const sizeOptions = useMemo(() => {
    if (sortedSizePrices.length > 0) {
      return sortedSizePrices.map((entry) => entry.size);
    }

    if (sizes.length > 0) {
      return sortSizeList(sizes);
    }

    return [];
  }, [sizes, sortedSizePrices]);

  const hasSizeOptions = sizeOptions.length > 0;

  useEffect(() => {
    if (!hasSizeOptions && showAllSizes) {
      setShowAllSizes(false);
    }
  }, [hasSizeOptions, showAllSizes]);

  useEffect(() => {
    if (!hasSizeOptions) {
      if (itemSize !== "") {
        setItemSize("");
      }
      if (selectedPrice !== Number(currentPrice)) {
        setSelectedPrice(Number(currentPrice));
      }
      return;
    }

    const nextSize = sizeOptions.includes(itemSize) ? itemSize : sizeOptions[0];
    if (nextSize !== itemSize) {
      setItemSize(nextSize);
    }

    let nextPrice = Number(currentPrice);
    if (sortedSizePrices.length > 0) {
      const sizePrice = sortedSizePrices.find((entry) => entry.size === nextSize);
      if (sizePrice) {
        nextPrice = Number(sizePrice.currentPrice);
      }
    }

    if (selectedPrice !== nextPrice) {
      setSelectedPrice(nextPrice);
    }
  }, [
    hasSizeOptions,
    sizeOptions,
    sortedSizePrices,
    itemSize,
    selectedPrice,
    currentPrice,
  ]);

  useEffect(() => {
    if (!colors.length) {
      return;
    }
    if (!itemColor || !colors.includes(itemColor)) {
      setItemColor(colors[0]);
    }
  }, [colors, itemColor]);

  // Fetch category information if product has a category
  useEffect(() => {
    const fetchCategory = async () => {
      if (product.category && typeof product.category === 'string') {
        try {
          const res = await fetch('/api/admin/categories');
          const categories = await res.json();
          const foundCategory = categories.find((cat: CategoryType) => cat.id === product.category);
          if (foundCategory) {
            setCategory(foundCategory);
          }
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      } else if (product.category && typeof product.category === 'object') {
        setCategory(product.category as CategoryType);
      }
    };

    fetchCategory();
  }, [product.category]);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      }),
    );
  };

  const handleSizeSelection = (size: string) => {
    setItemSize(size);

    // Update price based on selected size
    if (sortedSizePrices.length > 0) {
      const sizePrice = sortedSizePrices.find((sp) => sp.size === size);
      if (sizePrice) {
        setSelectedPrice(Number(sizePrice.currentPrice));
        return;
      }
    }

    // Fallback to default price if no size-specific pricing
    setSelectedPrice(Number(currentPrice));
  };

  const addToCart = () => {
    // Check if size is required but not selected
    if (hasSizeOptions && !itemSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    // Check if color is required but not selected
    if (colors.length > 0 && !itemColor) {
      alert("Please select a color before adding to cart");
      return;
    }

    const productToSave: ProductStoreType = {
      id: product._id || product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: selectedPrice,
      count,
      color: itemColor,
      size: itemSize,
    };

    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(addProduct(productStore));

    // Show success feedback
    const button = document.querySelector(
      ".btn--add-to-cart",
    ) as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Added to Cart!";
      button.style.background = "#28a745";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
        button.disabled = false;
      }, 2000);
    }
  };

  return (
    <section className="product-content">
      <div className="product-content__header">
        <h2 className="product__name">{product.name}</h2>
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart" />
        </button>
      </div>

      {/* Category Information */}
      {category && (
        <div className="product-content__category">
          <span className="product__category">Category: {category.name.split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ')}</span>
        </div>
      )}

      <div className="product-content__pricing">
        <h3 className="product__price">
          ₹{selectedPrice.toLocaleString()}
        </h3>
        <p className="product__tax">Tax included</p>
        {hasSizeOptions && itemSize && (
          <div className="product__size-price-info">
            <span className="product__size-selected">
              Price for {formatSizeLabel(itemSize)}
            </span>
          </div>
        )}
        {product.discount && Number(product.discount) > 0 && (
          <div className="product__discount-info">
            <span className="product__original-price">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="product__discount-badge">
              {product.discount}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="product-content__options">
        {/* Size Selection */}
        {hasSizeOptions && (
          <div className="product-option">
            <h5>Size ({sizeOptions.length}):</h5>
            <div className="size-options-container">
              <div
                className={`size-options-flex ${
                  showAllSizes ? "expanded" : ""
                }`}
              >
                {sizeOptions.map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSizeSelection(size)}
                    className={`size-option ${itemSize === size ? "size-option--active" : ""}`}
                    aria-pressed={itemSize === size}
                    aria-label={`Select size ${formatSizeLabel(size)}${itemSize === size ? " (selected)" : ""}`}
                  >
                    {formatSizeLabel(size)}
                  </button>
                ))}
              </div>
              {sizeOptions.length > 8 && (
                <div className="size-show-more">
                  <button
                    type="button"
                    className="btn-show-more-sizes"
                    onClick={() => setShowAllSizes((prev) => !prev)}
                    aria-expanded={showAllSizes}
                  >
                    Show {showAllSizes ? "Less" : "More"} Sizes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {colors.length > 0 && (
          <div className="product-option">
            <h5>Color:</h5>
            <div className="color-options">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setItemColor(color)}
                  className={`color-option ${itemColor === color ? "color-option--active" : ""}`}
                  style={{ backgroundColor: color }}
                  title={formatColorLabel(color)}
                  aria-pressed={itemColor === color}
                  aria-label={`Select color ${formatColorLabel(color)}${itemColor === color ? " (selected)" : ""}`}
                >
                  {itemColor === color && <i className="icon-check" />}
                </button>
              ))}
            </div>
            {itemColor && (
              <p className="color-selection__label">
                Selected color: {formatColorLabel(itemColor)}
              </p>
            )}
          </div>
        )}

        {/* Quantity Selection */}
        <div className="product-option">
          <h5>Quantity:</h5>
          <div className="quantity-controls">
            <button
              type="button"
              onClick={() => setCount(Math.max(1, count - 1))}
              className="quantity-btn quantity-btn--minus"
            >
              -
            </button>
            <span className="quantity-display">{count}</span>
            <button
              type="button"
              onClick={() => setCount(count + 1)}
              className="quantity-btn quantity-btn--plus"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="product-content__actions">
        <button
          type="button"
          onClick={() => addToCart()}
          className={`btn btn--add-to-cart ${((hasSizeOptions && !itemSize) ||
            (colors.length > 0 && !itemColor))
            ? "btn--disabled"
            : ""
            }`}
          disabled={
            (hasSizeOptions && !itemSize) ||
            (colors.length > 0 && !itemColor)
          }
        >
          {((hasSizeOptions && !itemSize) ||
            (colors.length > 0 && !itemColor))
            ? "Select Options First"
            : "Add to cart"}
        </button>
      </div>
    </section>
  );
};

export default Content;
