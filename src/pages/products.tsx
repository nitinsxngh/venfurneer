import type { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import type { ProductType } from "@/types";

import Layout from "../layouts/Main";

type ProductsPageType = {
  initialProducts: ProductType[];
};

type FilterState = {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
};

const Products = ({ initialProducts }: ProductsPageType) => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  // Handle initial category from URL
  useEffect(() => {
    if (router.query.category && typeof router.query.category === 'string') {
      setInitialCategory(router.query.category);
    }
  }, [router.query.category]);

  const handleFiltersChange = async (newFilters: FilterState) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      if (newFilters.categories.length > 0) {
        newFilters.categories.forEach(cat => queryParams.append('category', cat));
      }

      if (newFilters.sizes.length > 0) {
        newFilters.sizes.forEach(size => queryParams.append('sizes', size));
      }

      if (newFilters.colors.length > 0) {
        newFilters.colors.forEach(color => queryParams.append('colors', color));
      }

      if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 10000) {
        queryParams.append('minPrice', newFilters.priceRange[0].toString());
        queryParams.append('maxPrice', newFilters.priceRange[1].toString());
      }

      console.log('Filter parameters:', newFilters);
      console.log('Query string:', queryParams.toString());

      const res = await fetch(`/api/products/filtered?${queryParams.toString()}`);
      const filteredProducts = await res.json();
      console.log('Filtered products response:', filteredProducts);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter onFiltersChange={handleFiltersChange} initialCategory={initialCategory} />
          <ProductsContent products={products} loading={loading} />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // Use relative URL instead of absolute URL to avoid CORS and domain issues
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/products`);
    const products = await res.json();

    return {
      props: {
        initialProducts: products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
};

export default Products;
