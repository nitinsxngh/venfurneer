import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import ProtectedRoute from "../../components/admin/ProtectedRoute";
import ProductForm from "../../components/admin/ProductForm";
import ProductList from "../../components/admin/ProductList";

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

const AdminProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Expected array of products, got:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchProducts();
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      }
    }
  };

  const handleFormSubmit = async (productData: Partial<Product>) => {
    try {
      console.log("handleFormSubmit called with:", productData); // Debug log

      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      console.log("Making API call to:", url, "with method:", method); // Debug log

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      console.log("API response status:", response.status); // Debug log

      if (response.ok) {
        const responseData = await response.json();
        console.log("API response data:", responseData); // Debug log
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        const errorData = await response.json();
        console.error("API error:", errorData); // Debug log
        alert(`Failed to save product: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleUpdateStock = async (productId: string, newQuantity: number) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantityAvailable: newQuantity }),
      });

      if (response.ok) {
        // Update the local state immediately for better UX
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? { ...product, quantityAvailable: newQuantity }
              : product,
          ),
        );
      } else {
        alert("Failed to update stock");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Error updating stock");
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout title="Product Management">
        <div className="admin-page">
          {/* Page Header */}
          <div className="admin-page__header">
            <div className="admin-page__header-content">
              <div className="admin-page__header-left">
                <h1>Product Management</h1>
                <p>Manage your perfume products, inventory, and pricing</p>
              </div>
              <div className="admin-page__header-right">
                <button
                  className="btn btn--primary btn--large"
                  onClick={() => setShowForm(true)}
                >
                  <span className="btn__icon">
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
                  </span>
                  Add New Product
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="admin-page__content">
            {showForm ? (
              <div className="admin-page__form-container">
                <ProductForm
                  product={editingProduct}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCancel}
                />
              </div>
            ) : (
              <div className="admin-page__list-container">
                <ProductList
                  products={products}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onUpdateStock={handleUpdateStock}
                />
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminProducts;
