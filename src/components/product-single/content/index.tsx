import { some } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { addProduct } from "@/store/reducers/cart";
import { toggleFavProduct } from "@/store/reducers/user";
import type { ProductStoreType, ProductType } from "@/types";

import productsSizes from "../../../utils/data/products-sizes";

type ProductContent = {
  product: ProductType & { _id?: string };
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [itemSize, setItemSize] = useState<string>("");

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      }),
    );
  };

  const addToCart = () => {
    // Check if size is required but not selected
    if (productsSizes.length > 0 && !itemSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    const productToSave: ProductStoreType = {
      id: product._id || product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: product.currentPrice,
      count,
      color: "",
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

      <div className="product-content__pricing">
        <h3 className="product__price">
          ₹{product.currentPrice.toLocaleString()}
        </h3>
        <p className="product__tax">Tax included</p>
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
        <div className="product-option">
          <h5>Size:</h5>
          <div className="size-options">
            {productsSizes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setItemSize(type.label)}
                className={`size-option ${itemSize === type.label ? "size-option--active" : ""}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

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
          className={`btn btn--add-to-cart ${productsSizes.length > 0 && !itemSize ? "btn--disabled" : ""}`}
          disabled={productsSizes.length > 0 && !itemSize}
        >
          {productsSizes.length > 0 && !itemSize
            ? "Select Size First"
            : "Add to cart"}
        </button>
      </div>
    </section>
  );
};

export default Content;
