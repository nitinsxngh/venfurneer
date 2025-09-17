import { useEffect, useState } from "react";

import type { ProductType } from "@/types";

import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

type ProductsContentType = {
  products?: ProductType[];
};

const ProductsContent = ({ products }: ProductsContentType) => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (products) {
      setData(products);
      setLoading(false);
    } else {
      const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products");
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const fetchedProducts = await response.json();
          console.log("Products fetched:", fetchedProducts);
          setData(fetchedProducts);
        } catch (err) {
          console.error("Error fetching products:", err);
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [products]);

  if (error) return <div>Failed to load products: {error}</div>;

  return (
    <>
      {loading && <ProductsLoading />}

      {!loading && data.length > 0 && (
        <section className="products-list">
          {data.map((item: ProductType) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              currentPrice={item.currentPrice}
              discount={item.discount}
              key={item.id}
              images={item.images || []}
            />
          ))}
        </section>
      )}

      {!loading && data.length === 0 && (
        <div className="no-products-found">
          <h3>No products found</h3>
          <p>Try adjusting your filters or browse all products.</p>
        </div>
      )}
    </>
  );
};

export default ProductsContent;
