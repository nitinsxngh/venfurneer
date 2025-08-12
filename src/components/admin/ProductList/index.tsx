import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number | string;
  currentPrice: number | string;
  discount?: number | string;
  category: string | { id: string; name: string; slug: string };
  images: string[];
  sizes: string[];
  colors: string[];
  quantityAvailable: number;
}

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onUpdateStock: (productId: string, newQuantity: number) => void;
}

const ProductList = ({
  products,
  loading,
  onEdit,
  onDelete,
  onUpdateStock,
}: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = safeProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof product.category === "string"
        ? product.category
        : product.category.name
      )
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return Number(a.currentPrice) - Number(b.currentPrice);
      case "category": {
        const categoryA =
          typeof a.category === "string" ? a.category : a.category.name;
        const categoryB =
          typeof b.category === "string" ? b.category : b.category.name;
        return categoryA.localeCompare(categoryB);
      }
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="admin-product-list">
      <div className="admin-product-list__controls">
        <div className="admin-product-list__search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="admin-product-list__sort">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="admin-select"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      <div className="admin-product-list__table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Pricing</th>
              <th>Stock Status</th>
              <th>Stock Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product.id || `product-${index}`}>
                <td>
                  <div className="admin-product-image">
                    <img
                      src={product.images[0] || "/product.png"}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = "/product.png";
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="admin-product-info">
                    <h4 className="admin-product-name">{product.name}</h4>
                    {product.discount && Number(product.discount) > 0 && (
                      <span className="admin-product-discount">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span className="admin-product-category">
                    {typeof product.category === "string"
                      ? product.category
                      : product.category.name}
                  </span>
                </td>
                <td>
                  <div className="admin-product-price">
                    <span className="admin-product-price__current">
                      ₹{product.currentPrice}
                    </span>
                    {product.discount && Number(product.discount) > 0 && (
                      <span className="admin-product-price__original">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-product-stock">
                    <span
                      className={`admin-product-stock__badge ${product.quantityAvailable > 0 ? "in-stock" : "out-of-stock"}`}
                    >
                      {product.quantityAvailable > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                    <span className="admin-product-stock__quantity">
                      {product.quantityAvailable} units
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-product-stock-actions">
                    <button
                      type="button"
                      className="admin-stock-btn admin-stock-btn--decrease"
                      onClick={() =>
                        onUpdateStock(
                          product.id,
                          Math.max(0, product.quantityAvailable - 1),
                        )
                      }
                      title="Decrease stock"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <span className="admin-stock-quantity">
                      {product.quantityAvailable}
                    </span>
                    <button
                      type="button"
                      className="admin-stock-btn admin-stock-btn--increase"
                      onClick={() =>
                        onUpdateStock(product.id, product.quantityAvailable + 1)
                      }
                      title="Increase stock"
                    >
                      <svg
                        width="14"
                        height="14"
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
                </td>
                <td>
                  <div className="admin-product-actions">
                    <button
                      className="btn btn--sm btn--border"
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn--sm btn--danger"
                      onClick={() => onDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedProducts.length === 0 && (
        <div className="admin-empty-state">
          <p>No products found. {searchTerm && "Try adjusting your search."}</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
