import { useSelector } from "react-redux";

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // Format color display
  const formatColor = (colorValue) => {
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
  const getColorName = (hexColor) => {
    const colorMap = {
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

  return (
    <ul className="checkout-items">
      {cartItems.map((item) => (
        <li key={item.id} className="checkout-item">
          <div className="checkout-item__content">
            <div className="checkout-item__img">
              <img src={item.thumb} alt={item.name} />
            </div>

            <div className="checkout-item__data">
              <h3>{item.name}</h3>
              <span className="product-id">#{item.id}</span>
              <div className="product-options">
                {item.size && (
                  <span className="option-tag option-tag--size">
                    Size: {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
                  </span>
                )}
                {item.color && (
                  <span className="option-tag option-tag--color">
                    Color: {formatColor(item.color)}
                  </span>
                )}
              </div>
              <div className="quantity-info">
                Quantity: {item.count}
              </div>
            </div>
          </div>
          <div className="checkout-item__price">
            <span className="unit-price">₹{item.price.toLocaleString()}</span>
            <span className="total-price">₹{(item.price * item.count).toLocaleString()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheckoutItems;
