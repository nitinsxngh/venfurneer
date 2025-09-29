import Link from "next/link";

import type { ProductType } from "@/types";

import ProductsCarousel from "./carousel";

type ProductsFeaturedType = {
  products?: ProductType[];
};

const ProductsFeatured = ({ products }: ProductsFeaturedType) => {
  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <Link href="/products" className="btn btn--rounded btn--border">
            Show All
          </Link>
        </header>

        <ProductsCarousel products={safeProducts} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
