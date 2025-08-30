import { useDispatch } from "react-redux";

import { removeProduct, setCount } from "@/store/reducers/cart";
import type { ProductStoreType } from "@/types";

const ShoppingCart = ({
  thumb,
  name,
  id,
  color,
  size,
  count,
  price,
}: ProductStoreType) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(
      removeProduct({
        thumb,
        name,
        id,
        color,
        size,
        count,
        price,
      }),
    );
  };

  const setProductCount = (count: number) => {
    if (count <= 0) {
      return;
    }

    const payload = {
      product: {
        thumb,
        name,
        id,
        color,
        size,
        count,
        price,
      },
      count,
    };

    dispatch(setCount(payload));
  };

  // Format color display
  const formatColor = (colorValue: string) => {
    if (!colorValue) return "Not selected";
    if (colorValue.startsWith('#')) {
      // Convert hex to color name or description
      const colorName = getColorName(colorValue);
      return (
        <span className="color-display">
          <span
            className="color-swatch"
            style={{ backgroundColor: colorValue }}
            title={colorValue}
          />
          {colorName}
        </span>
      );
    }
    return colorValue;
  };

  // Get user-friendly color name from hex code
  const getColorName = (hexColor: string): string => {
    const colorMap: { [key: string]: string } = {
      '#212121': 'Black',
      '#d1d1d1': 'Light Gray',
      '#8B4513': 'Saddle Brown',
      '#D2691E': 'Chocolate',
      '#F4A460': 'Sandy Brown',
      '#DEB887': 'Burlywood',
      '#FF69B4': 'Hot Pink',
      '#DC143C': 'Crimson',
      '#FF1493': 'Deep Pink',
      '#FFB6C1': 'Light Pink',
      '#FFD700': 'Gold',
      '#F0E68C': 'Khaki',
      '#FFFFE0': 'Light Yellow',
      '#FFFACD': 'Lemon Chiffon',
      '#9370DB': 'Medium Purple',
      '#8A2BE2': 'Blue Violet',
      '#9932CC': 'Dark Orchid',
      '#BA55D3': 'Medium Orchid',
      '#000000': 'Black',
      '#FFFFFF': 'White',
      '#FF0000': 'Red',
      '#00FF00': 'Green',
      '#0000FF': 'Blue',
      '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta',
      '#00FFFF': 'Cyan'
    };

    return colorMap[hexColor.toLowerCase()] || hexColor;
  };

  // Format size display
  const formatSize = (sizeValue: string) => {
    if (!sizeValue) return "Not selected";
    return sizeValue;
  };

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt={name} />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p className="product-id">#{id}</p>
            <div className="product-options">
              {size && (
                <span className="option-tag option-tag--size">
                  Size: {formatSize(size)}
                </span>
              )}
              {color && (
                <span className="option-tag option-tag--color">
                  Color: {formatColor(color)}
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">
        {color ? formatColor(color) : "Not selected"}
      </td>
      <td className="cart-item-before" data-label="Size">
        {size ? formatSize(size) : "Not selected"}
      </td>
      <td>
        <div className="quantity-button">
          <button
            type="button"
            onClick={() => setProductCount(count - 1)}
            className="quantity-button__btn"
            disabled={count <= 1}
          >
            -
          </button>
          <span className="quantity-display">{count}</span>
          <button
            type="button"
            onClick={() => setProductCount(count + 1)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td className="price-cell">
        <div className="price-info">
          <span className="unit-price">₹{price.toLocaleString()}</span>
          <span className="total-price">₹{(price * count).toLocaleString()}</span>
        </div>
      </td>
      <td className="cart-item-cancel">
        <button
          type="button"
          className="remove-btn"
          onClick={() => removeFromCart()}
          title="Remove item"
        >
          <i className="icon-cancel" />
        </button>
      </td>
    </tr>
  );
};

export default ShoppingCart;
