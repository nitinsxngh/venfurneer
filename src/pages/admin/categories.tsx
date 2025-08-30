import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import ProtectedRoute from "../../components/admin/ProtectedRoute";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryList from "../../components/admin/CategoryList";

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  isActive?: boolean;
  image?: string;
  sortOrder?: number;
}

const AdminCategories = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This will also affect products in this category.",
      )
    ) {
      try {
        const response = await fetch(`/api/admin/categories/${categoryId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchCategories();
        } else {
          alert("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting category");
      }
    }
  };

  const handleFormSubmit = async (categoryData: Partial<Category>) => {
    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";

      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingCategory(null);
        fetchCategories();
      } else {
        alert("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <ProtectedRoute>
      <AdminLayout title="Category Management">
        <div className="admin-page">
          {/* Page Header */}
          <div className="admin-page__header">
            <div className="admin-page__header-content">
              <div className="admin-page__header-left">
                <h1>Category Management</h1>
                <p>
                  Organize your products with categories to improve customer
                  experience
                </p>
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
                  Add New Category
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="admin-page__content">
            {showForm ? (
              <div className="admin-page__form-container">
                <CategoryForm
                  category={editingCategory}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCancel}
                />
              </div>
            ) : (
              <div className="admin-page__list-container">
                <CategoryList
                  categories={categories}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminCategories;
