import { useState } from "react";

import type { ProductType } from "@/types";

import List from "./list";

type ProductsContentType = {
  products?: ProductType[];
  loading?: boolean;
};

const ProductsContent = ({ products = [], loading = false }: ProductsContentType) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>
          Premium Products <span>({products.length})</span>
        </h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters" />
        </button>
        <form
          className={`products-content__filter ${orderProductsOpen ? "products-order-open" : ""}`}
        >
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select>
                <option>All</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select>
                <option>Latest</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <List products={products} />
      )}
    </section>
  );
};

export default ProductsContent;
