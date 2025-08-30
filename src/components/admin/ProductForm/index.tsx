import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  price: number | string;
  currentPrice?: number | string;
  discount?: number | string;
  category: string | { id: string; name: string; slug: string };
  images: string[];
  sizes: string[];
  colors: string[];
  quantityAvailable: number;
  punctuation?: {
    countOpinions: number;
    punctuation: number;
    votes: Array<{ value: number; count: number }>;
  };
  reviews?: Array<{
    name: string;
    avatar: string;
    description: string;
    punctuation: number;
  }>;
}

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (productData: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    images: ["https://example.com/placeholder.jpg"],
    sizes: ["50ml"],
    colors: ["#8B4513"],
    quantityAvailable: 10,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        discount: product.discount?.toString() || "",
        category:
          typeof product.category === "string"
            ? product.category
            : product.category.id,
        images: product.images.length > 0 ? product.images : [""],
        sizes: product.sizes.length > 0 ? product.sizes : ["50ml"],
        colors: product.colors.length > 0 ? product.colors : ["#8B4513"],
        quantityAvailable: product.quantityAvailable,
      });
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories..."); // Debug log
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      console.log("Categories fetched:", data); // Debug log
      setCategories(data);
      if (data.length > 0 && !product) {
        console.log("Setting default category to:", data[0].id); // Debug log
        setFormData((prev) => ({ ...prev, category: data[0].id }));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (
      !formData.price ||
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be greater than 0";
    }

    if (
      formData.discount !== "" &&
      (Number(formData.discount) < 0 || Number(formData.discount) > 100)
    ) {
      newErrors.discount = "Discount must be between 0 and 100";
    }

    if (formData.quantityAvailable < 0) {
      newErrors.quantityAvailable = "Stock quantity cannot be negative";
    }

    // Check if at least one image URL is provided and not empty
    const validImages = formData.images.filter((img) => img.trim() !== "");
    if (validImages.length === 0) {
      newErrors.images = "At least one image URL is required";
    }

    // Check if category is selected
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, current formData:", formData); // Debug log

    if (validateForm()) {
      const productData = {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount === "" ? 0 : Number(formData.discount),
        currentPrice: 0, // Will be calculated below
        images: formData.images.filter((img) => img.trim() !== ""),
        sizes: formData.sizes.filter((size) => size.trim() !== ""),
        colors: formData.colors.filter((color) => color.trim() !== ""),
      };

      // Calculate current price if discount is applied
      if (productData.discount > 0) {
        productData.currentPrice = Math.round(
          productData.price * (1 - productData.discount / 100),
        );
      } else {
        productData.currentPrice = productData.price;
      }

      console.log("Submitting product data:", productData); // Debug log
      onSubmit(productData);
    } else {
      console.log("Form validation failed:", errors); // Debug log
      console.log("Current form data:", formData); // Debug log
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    console.log(`Updating ${field} to:`, value); // Debug log
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addArrayItem = (field: "images" | "sizes" | "colors") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "images" | "sizes" | "colors",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (
    field: "images" | "sizes" | "colors",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <div className="admin-product-form">
      <div className="admin-product-form__header">
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form__section">
          <h3>Basic Information</h3>

          <div className="admin-form__row">
            <div className="admin-form__field">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`admin-input ${errors.name ? "admin-input--error" : ""}`}
                placeholder="e.g., Royal Oud Perfume"
              />
              {errors.name && (
                <span className="admin-error">{errors.name}</span>
              )}
            </div>

            <div className="admin-form__field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={`admin-select ${errors.category ? "admin-input--error" : ""}`}
                disabled={loading}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="admin-error">{errors.category}</span>
              )}
            </div>
          </div>

          <div className="admin-form__row">
            <div className="admin-form__field">
              <label htmlFor="price">Original Price (₹) *</label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className={`admin-input ${errors.price ? "admin-input--error" : ""}`}
                placeholder="8999"
              />
              {errors.price && (
                <span className="admin-error">{errors.price}</span>
              )}
            </div>

            <div className="admin-form__field">
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                id="discount"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
                className={`admin-input ${errors.discount ? "admin-input--error" : ""}`}
                placeholder="30"
                min="0"
                max="100"
              />
              {errors.discount && (
                <span className="admin-error">{errors.discount}</span>
              )}
            </div>

            <div className="admin-form__field">
              <label>Calculated Final Price</label>
              <div className="admin-form__calculated-price">
                {formData.price && formData.discount ? (
                  <span className="admin-form__price-display">
                    ₹
                    {Math.round(
                      Number(formData.price) *
                        (1 - Number(formData.discount) / 100),
                    )}
                  </span>
                ) : formData.price ? (
                  <span className="admin-form__price-display">
                    ₹{Number(formData.price)}
                  </span>
                ) : (
                  <span className="admin-form__price-placeholder">
                    Enter price to see final price
                  </span>
                )}
              </div>
            </div>

            <div className="admin-form__field">
              <label htmlFor="quantity">Stock Quantity *</label>
              <div className="admin-form__quantity-controls">
                <button
                  type="button"
                  className="admin-form__quantity-btn admin-form__quantity-btn--decrease"
                  onClick={() =>
                    handleInputChange(
                      "quantityAvailable",
                      Math.max(0, formData.quantityAvailable - 1),
                    )
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantityAvailable}
                  onChange={(e) =>
                    handleInputChange(
                      "quantityAvailable",
                      Number(e.target.value),
                    )
                  }
                  className={`admin-input admin-input--quantity ${errors.quantityAvailable ? "admin-input--error" : ""}`}
                  placeholder="10"
                  min="0"
                />
                <button
                  type="button"
                  className="admin-form__quantity-btn admin-form__quantity-btn--increase"
                  onClick={() =>
                    handleInputChange(
                      "quantityAvailable",
                      formData.quantityAvailable + 1,
                    )
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              {errors.quantityAvailable && (
                <span className="admin-error">{errors.quantityAvailable}</span>
              )}
            </div>
          </div>
        </div>

        <div className="admin-form__section">
          <h3>Images</h3>
          {formData.images.map((image, index) => (
            <div key={index} className="admin-form__field">
              <label>Image URL {index + 1}</label>
              <div className="admin-form__input-group">
                <input
                  type="url"
                  value={image}
                  onChange={(e) =>
                    updateArrayItem("images", index, e.target.value)
                  }
                  className="admin-input"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("images", index)}
                    className="btn btn--sm btn--danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("images")}
            className="btn btn--sm btn--border"
          >
            Add Image
          </button>
        </div>

        <div className="admin-form__section">
          <h3>Available Sizes</h3>
          {formData.sizes.map((size, index) => (
            <div key={index} className="admin-form__field">
              <label>Size {index + 1}</label>
              <div className="admin-form__input-group">
                <input
                  type="text"
                  value={size}
                  onChange={(e) =>
                    updateArrayItem("sizes", index, e.target.value)
                  }
                  className="admin-input"
                  placeholder="50ml"
                />
                {formData.sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("sizes", index)}
                    className="btn btn--sm btn--danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("sizes")}
            className="btn btn--sm btn--border"
          >
            Add Size
          </button>
        </div>

        <div className="admin-form__section">
          <h3>Available Colors</h3>
          {formData.colors.map((color, index) => (
            <div key={index} className="admin-form__field">
              <label>Color {index + 1}</label>
              <div className="admin-form__input-group">
                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    updateArrayItem("colors", index, e.target.value)
                  }
                  className="admin-input admin-input--color"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) =>
                    updateArrayItem("colors", index, e.target.value)
                  }
                  className="admin-input"
                  placeholder="#8B4513"
                />
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("colors", index)}
                    className="btn btn--sm btn--danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("colors")}
            className="btn btn--sm btn--border"
          >
            Add Color
          </button>
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="btn btn--rounded btn--yellow">
            {product ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn--rounded btn--border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
