import { some } from "lodash";
import { useState, useEffect } from "react";
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

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [itemSize, setItemSize] = useState<string>("");
  const [itemColor, setItemColor] = useState<string>("");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(product.currentPrice);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

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
    if (product.sizePrices && product.sizePrices.length > 0) {
      const sizePrice = product.sizePrices.find(sp => sp.size === size);
      if (sizePrice) {
        setSelectedPrice(sizePrice.currentPrice);
      }
    } else {
      // Fallback to default price if no size-specific pricing
      setSelectedPrice(product.currentPrice);
    }
  };

  const addToCart = () => {
    // Check if size is required but not selected
    if (product.sizes && product.sizes.length > 0 && !itemSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    // Check if color is required but not selected
    if (product.colors && product.colors.length > 0 && !itemColor) {
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
          <span className="product__category">Category: {category.name}</span>
        </div>
      )}

      <div className="product-content__pricing">
        <h3 className="product__price">
          ₹{selectedPrice.toLocaleString()}
        </h3>
        <p className="product__tax">Tax included</p>
        {product.sizePrices && product.sizePrices.length > 0 && itemSize && (
          <div className="product__size-price-info">
            <span className="product__size-selected">Price for {itemSize}</span>
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
        {product.sizes && product.sizes.length > 0 && (
          <div className="product-option">
            <h5>Size:</h5>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSizeSelection(size)}
                  className={`size-option ${itemSize === size ? "size-option--active" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-option">
            <h5>Color:</h5>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setItemColor(color)}
                  className={`color-option ${itemColor === color ? "color-option--active" : ""}`}
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {itemColor === color && <i className="icon-check" />}
                </button>
              ))}
            </div>
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
          className={`btn btn--add-to-cart ${((product.sizes && product.sizes.length > 0 && !itemSize) ||
            (product.colors && product.colors.length > 0 && !itemColor))
            ? "btn--disabled"
            : ""
            }`}
          disabled={
            (product.sizes && product.sizes.length > 0 && !itemSize) ||
            (product.colors && product.colors.length > 0 && !itemColor)
          }
        >
          {((product.sizes && product.sizes.length > 0 && !itemSize) ||
            (product.colors && product.colors.length > 0 && !itemColor))
            ? "Select Options First"
            : "Add to cart"}
        </button>
      </div>
    </section>
  );
};

export default Content;
