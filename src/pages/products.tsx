import type { GetServerSideProps } from "next";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import { getItemListSchema, getBreadcrumbSchema, getCollectionPageSchema } from "@/utils/seo";
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

  // Generate SEO metadata based on category filter
  const categoryName = initialCategory 
    ? initialCategory.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'All Products';

  const pageTitle = initialCategory 
    ? `${categoryName} - Premium Luxury Diffusers & Home Fragrances`
    : 'Premium Luxury Scent Diffusers & Essential Oils - Shop Now';

  const pageDescription = initialCategory
    ? `Browse our exclusive collection of ${categoryName.toLowerCase()} diffusers and home fragrances. Premium quality, luxury scents for your home and office. Free shipping across India.`
    : 'Discover our complete collection of premium luxury scent diffusers, essential oils, and aromatherapy products. Transform your space with exclusive fragrances from venfurneer. Shop now with free delivery.';

  // Generate structured data
  const itemListSchema = useMemo(() => {
    if (products.length === 0) return undefined;
    
    return getItemListSchema(
      products.slice(0, 20).map((product) => ({
        name: product.name,
        url: `/product/${product.id}`,
        image: product.images?.[0],
        description: `Premium ${product.name} - Luxury scent diffuser`,
      })),
      categoryName
    );
  }, [products, categoryName]);

  const breadcrumbSchema = useMemo(() => {
    const items = [
      { name: 'Home', url: '/' },
      { name: categoryName, url: initialCategory ? `/products?category=${initialCategory}` : '/products' },
    ];
    return getBreadcrumbSchema(items);
  }, [categoryName, initialCategory]);

  const collectionSchema = useMemo(() => {
    if (!initialCategory || products.length === 0) return undefined;
    return getCollectionPageSchema(categoryName, products);
  }, [initialCategory, categoryName, products]);

  const structuredData = useMemo(() => {
    const schemas: any[] = [breadcrumbSchema];
    if (itemListSchema) schemas.push(itemListSchema);
    if (collectionSchema) schemas.push(collectionSchema);
    return schemas.length > 1 ? schemas : schemas[0];
  }, [breadcrumbSchema, itemListSchema, collectionSchema]);

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      canonical={initialCategory ? `/products?category=${initialCategory}` : '/products'}
      keywords={[
        categoryName.toLowerCase(),
        'luxury diffusers',
        'premium home fragrances',
        'aromatherapy products',
        'essential oils',
        'scent diffusers India',
      ]}
      structuredData={structuredData}
    >
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
