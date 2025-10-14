import { useState } from "react";

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  isActive?: boolean;
  image?: string;
  sortOrder?: number;
}

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

const CategoryList = ({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  const filteredCategories = safeCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "sortOrder":
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      case "status":
        return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="admin-category-list">
      <div className="admin-category-list__controls">
        <div className="admin-category-list__search">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="admin-category-list__sort">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="admin-select"
          >
            <option value="name">Sort by Name</option>
            <option value="sortOrder">Sort by Order</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      <div className="admin-category-list__table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Category Details</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Sort Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category, index) => (
              <tr key={category.id || `category-${index}`}>
                <td>
                  <div className="admin-category-image">
                    <img
                      src={category.image || "/images/products/product-1.jpg"}
                      alt={category.name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/products/product-1.jpg";
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="admin-category-info">
                    <h4 className="admin-category-name">{category.name.split(' ').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}</h4>
                    {category.description && (
                      <p className="admin-category-description">
                        {category.description}
                      </p>
                    )}
                  </div>
                </td>
                <td>
                  <span className="admin-category-slug">{category.slug}</span>
                </td>
                <td>
                  <div className="admin-category-status">
                    <span
                      className={`admin-category-status__badge ${category.isActive ? "active" : "inactive"}`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="admin-category-order">
                    {category.sortOrder || 0}
                  </span>
                </td>
                <td>
                  <div className="admin-category-actions">
                    <button
                      className="btn btn--sm btn--border"
                      onClick={() => onEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn--sm btn--danger"
                      onClick={() => onDelete(category.id)}
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

      {sortedCategories.length === 0 && (
        <div className="admin-empty-state">
          <p>
            No categories found. {searchTerm && "Try adjusting your search."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
