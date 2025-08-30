import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import Footer from "@/components/footer";
import PageIntro from "@/components/page-intro";
import ProductsFeatured from "@/components/products-featured";
import Subscribe from "@/components/subscribe";
import LuxuryDiffuser from "@/components/luxury-diffuser";

import Layout from "../layouts/Main";
import type { ProductType } from "../types";
interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  sortOrder?: number;
}

type IndexPageType = {
  products?: ProductType[];
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
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

const IndexPage = ({ products }: IndexPageType) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          console.log('Categories fetched:', data);
          // Sort by sortOrder and take max 5
          const sortedCategories = data
            .sort((a: Category, b: Category) => (a.sortOrder || 0) - (b.sortOrder || 0))
            .slice(0, 5);
          console.log('Sorted categories:', sortedCategories);
          setCategories(sortedCategories);
        } else {
          console.error('Failed to fetch categories:', response.status);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="circular-categories-wrapper">
          <div className="categories-header">
            <h4 className="categories-subtitle">SHOP BY CATEGORIES</h4>
            <h2 className="categories-title">Luxury Scent Diffusers For Your Home And Office</h2>
          </div>

          {loading ? (
            <div className="categories-loading">
              <div className="categories-loading__spinner"></div>
              <p>Loading categories...</p>
            </div>
          ) : (
            <div className="circular-categories">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug || category.id}`}
                  className="circular-category"
                >
                  <div className="circular-category__image">
                    <img
                      src={category.image || "/images/featured-1.jpg"}
                      alt={category.name}
                    />
                  </div>
                  <div className="circular-category__text">
                    <h3>{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductsFeatured products={products} />
      <LuxuryDiffuser />
      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
