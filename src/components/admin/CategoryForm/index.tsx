import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  isActive?: boolean;
  image?: string;
  sortOrder?: number;
}

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (categoryData: Partial<Category>) => void;
  onCancel: () => void;
}

const CategoryForm = ({ category, onSubmit, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    isActive: true,
    image: "",
    sortOrder: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        slug: category.slug,
        isActive: category.isActive ?? true,
        image: category.image || "",
        sortOrder: category.sortOrder || 0,
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  };

  return (
    <div className="category-form">
      <div className="category-form__header">
        <h2>{category ? "Edit Category" : "Add New Category"}</h2>
        <p>
          {category
            ? "Update the category information below"
            : "Create a new category for your products"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="category-form__form">
        <div className="category-form__section">
          <h3>Basic Information</h3>

          <div className="category-form__row">
            <div className="category-form__field">
              <label htmlFor="name" className="category-form__label">
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`category-form__input ${errors.name ? "category-form__input--error" : ""}`}
                placeholder="Enter category name"
              />
              {errors.name && (
                <span className="category-form__error">{errors.name}</span>
              )}
            </div>

            <div className="category-form__field">
              <label htmlFor="sortOrder" className="category-form__label">
                Sort Order
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleInputChange}
                className="category-form__input"
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="category-form__field">
            <label htmlFor="description" className="category-form__label">
              Description
            </label>
            <div className="category-form__textarea-wrapper">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="category-form__textarea"
                placeholder="Enter category description"
                rows={3}
              />
              <div className="category-form__textarea-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="category-form__section">
          <h3>URL & Display</h3>

          <div className="category-form__field">
            <label htmlFor="slug" className="category-form__label">
              URL Slug *
            </label>
            <div className="category-form__input-group">
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`category-form__input ${errors.slug ? "category-form__input--error" : ""}`}
                placeholder="category-slug"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="btn btn--secondary"
              >
                Generate
              </button>
            </div>
            {errors.slug && (
              <span className="category-form__error">{errors.slug}</span>
            )}
            <small className="category-form__help">
              This will be used in the URL: yourstore.com/categories/[slug]
            </small>
          </div>

          <div className="category-form__field">
            <label htmlFor="image" className="category-form__label">
              Category Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="category-form__input"
              placeholder="https://example.com/image.jpg"
            />
            <small className="category-form__help">
              Optional: Add an image to represent this category
            </small>
          </div>
        </div>

        <div className="category-form__section">
          <h3>Settings</h3>

          <div className="category-form__field">
            <label className="category-form__checkbox">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <span className="category-form__checkbox-text">
                Active Category
              </span>
            </label>
            <small className="category-form__help">
              Inactive categories won&apos;t be visible to customers
            </small>
          </div>
        </div>

        <div className="category-form__actions">
          <button type="submit" className="btn btn--primary btn--large">
            <span className="btn__icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17,21 17,13 7,13 7,21"></polyline>
                <polyline points="7,3 7,8 15,8"></polyline>
              </svg>
            </span>
            {category ? "Update Category" : "Create Category"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn--secondary btn--large"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
