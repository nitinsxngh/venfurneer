import Slider from "rc-slider";
import { useState, useEffect } from "react";

import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

type FilterOptions = {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  sizes: string[];
  colors: string[];
  priceRange: {
    min: number;
    max: number;
  };
};

type FilterState = {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
};

interface ProductsFilterProps {
  onFiltersChange: (filters: FilterState) => void;
  initialCategory?: string | null;
}

const ProductsFilter = ({ onFiltersChange, initialCategory }: ProductsFilterProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 10000],
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await fetch('/api/products/filter-options');
        const options = await res.json();
        setFilterOptions(options);
        setFilters(prev => ({
          ...prev,
          priceRange: [options.priceRange.min, options.priceRange.max]
        }));
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handle initial category from URL
  useEffect(() => {
    if (initialCategory && filterOptions) {
      // Find the category by slug
      const category = filterOptions.categories.find(cat => cat.slug === initialCategory);
      if (category) {
        const newFilters = {
          ...filters,
          categories: [category.id]
        };
        setFilters(newFilters);
        onFiltersChange(newFilters);
      }
    }
  }, [initialCategory, filterOptions]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    handleFilterChange('categories', newCategories);
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter(s => s !== size);
    handleFilterChange('sizes', newSizes);
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter(c => c !== color);
    handleFilterChange('colors', newColors);
  };

  const handlePriceChange = (priceRange: number[]) => {
    handleFilterChange('priceRange', priceRange as [number, number]);
  };

  const clearFilters = () => {
    if (!filterOptions) return;
    const clearedFilters: FilterState = {
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [filterOptions.priceRange.min, filterOptions.priceRange.max] as [number, number],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (!filterOptions) {
    return <div>Loading filters...</div>;
  }

  return (
    <form className="products-filter">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${filtersOpen ? "products-filter__menu-btn--active" : ""}`}
      >
        Add Filter <i className="icon-down-open" />
      </button>

      <div
        className={`products-filter__wrapper ${filtersOpen ? "products-filter__wrapper--open" : ""}`}
      >
        <div className="products-filter__block">
          <button type="button">Category</button>
          <div className="products-filter__block__content">
            {filterOptions.categories.map((category) => (
              <Checkbox
                key={category.id}
                name="product-category"
                label={category.name}
                checked={filters.categories.includes(category.id)}
                onChange={(checked) => handleCategoryChange(category.id, checked)}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
              value={filters.priceRange}
              onChange={handlePriceChange}
              tipFormatter={(value) => `₹${value.toFixed(0)}`}
            />
            <div className="price-range-display">
              ₹{filters.priceRange[0].toFixed(0)} - ₹{filters.priceRange[1].toFixed(0)}
            </div>
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {filterOptions.sizes.map((size) => (
              <Checkbox
                type="square"
                key={size}
                name="product-size"
                label={size}
                checked={filters.sizes.includes(size)}
                onChange={(checked) => handleSizeChange(size, checked)}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Color</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              {filterOptions.colors.map((color) => (
                <CheckboxColor
                  key={color}
                  valueName={color}
                  name="product-color"
                  color={color}
                  checked={filters.colors.includes(color)}
                  onChange={(checked) => handleColorChange(color, checked)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            onClick={clearFilters}
            className="btn btn--rounded btn--secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductsFilter;
