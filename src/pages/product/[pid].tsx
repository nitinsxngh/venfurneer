import type { GetServerSideProps } from "next";
import Link from "next/link";

import { useMemo } from "react";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Gallery from "@/components/product-single/gallery";
import Content from "@/components/product-single/content";
import Reviews from "@/components/product-single/reviews";
import ProductsFeatured from "@/components/products-featured";
import { getProductSchema, getBreadcrumbSchema } from "@/utils/seo";
// types
import type { ProductType } from "@/types";

import Layout from "../../layouts/Main";

type ProductPageType = {
  product: ProductType;
  products?: ProductType[];
};

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { pid } = query;

  try {
    // Use relative URL instead of absolute URL to avoid CORS and domain issues
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const [productRes, productsRes] = await Promise.all([
      fetch(`${baseUrl}/api/product/${pid}`),
      fetch(`${baseUrl}/api/products`),
    ]);

    if (!productRes.ok) {
      return {
        props: {
          product: null,
          products: [],
        },
      };
    }

    if (!productsRes.ok) {
      return {
        props: {
          product: null,
          products: [],
        },
      };
    }

    const [product, products] = await Promise.all([
      productRes.json(),
      productsRes.json(),
    ]);

    // Ensure products is always an array
    const safeProducts = Array.isArray(products) ? products : [];

    return {
      props: {
        product,
        products: safeProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        product: null,
        products: [],
      },
    };
  }
};

const Product = ({ product, products }: ProductPageType) => {
  // Generate SEO-optimized product description
  const productDescription = useMemo(() => {
    if (!product) return '';
    
    const categoryName = (product.category && typeof product.category === 'object' && 'name' in product.category)
      ? (product.category as any).name || 'Premium Diffuser'
      : (typeof product.category === 'string' ? product.category : 'Premium Diffuser');
    
    return `${product.name} - Premium ${categoryName} from venfurneer. Transform your space with luxury fragrances and essential oils. Available in multiple sizes. Free shipping across India. Perfect for home and office aromatherapy.`;
  }, [product]);

  // Generate keywords for the product
  const keywords = useMemo(() => {
    if (!product) return [];
    
    const baseKeywords = [
      product.name.toLowerCase(),
      'luxury diffuser',
      'premium scent diffuser',
      'home fragrance',
      'essential oils',
      'aromatherapy',
    ];
    
    if (product.category && typeof product.category === 'object' && 'name' in product.category) {
      baseKeywords.push((product.category as any).name.toLowerCase());
    } else if (typeof product.category === 'string') {
      baseKeywords.push(product.category.toLowerCase());
    }
    
    return baseKeywords;
  }, [product]);

  // Generate product schema
  const productSchema = useMemo(() => {
    if (!product) return null;
    
    const categoryName = (product.category && typeof product.category === 'object' && 'name' in product.category)
      ? (product.category as any).name || 'Home Fragrance'
      : (typeof product.category === 'string' ? product.category : 'Home Fragrance');

    return getProductSchema(
      {
        name: product.name,
        description: productDescription,
        image: product.images || [],
        price: product.currentPrice,
        currency: 'INR',
        availability: product.quantityAvailable > 0 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
        brand: 'venfurneer',
        sku: product.id || product._id,
        category: categoryName,
            aggregateRating: product.punctuation?.countOpinions 
              ? {
                  ratingValue: product.punctuation?.punctuation || 0,
                  reviewCount: product.punctuation?.countOpinions || 0,
                }
              : undefined,
        offers: {
          price: product.currentPrice,
          priceCurrency: 'INR',
          availability: product.quantityAvailable > 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
          url: `/product/${product.id || product._id}`,
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      },
      `/product/${product.id || product._id}`
    );
  }, [product, productDescription]);

  // Generate breadcrumb schema
  const breadcrumbSchema = useMemo(() => {
    if (!product) return null;
    
    const categoryName = (product.category && typeof product.category === 'object' && 'name' in product.category)
      ? (product.category as any).name || 'Products'
      : (typeof product.category === 'string' ? product.category : 'Products');
    
    const categorySlug = (product.category && typeof product.category === 'object' && 'slug' in product.category)
      ? (product.category as any).slug || 'products'
      : 'products';

    return getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: categoryName, url: `/products?category=${categorySlug}` },
      { name: product.name, url: `/product/${product.id || product._id}` },
    ]);
  }, [product]);

  // Handle case when product is not found or undefined
  if (!product) {
    return (
      <Layout
        title="Product Not Found"
        description="The product you're looking for doesn't exist or has been removed."
        noindex={true}
      >
        <Breadcrumb />
        <section className="product-single">
          <div className="container">
            <div className="product-not-found">
              <h1>Product Not Found</h1>
              <p>
                The product you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <Link href="/products" className="btn btn--primary">
                Back to Products
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout
      title={`${product.name} - Premium Luxury Scent Diffuser`}
      description={productDescription}
      canonical={`/product/${product.id || product._id}`}
      ogImage={product.images?.[0]}
      ogType="product"
      keywords={keywords}
      structuredData={[productSchema, breadcrumbSchema].filter(Boolean)}
    >
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>
          
          {/* Horizontal separator */}
          <hr className="product-single__separator" />
          
          {/* Product Description below image */}
          <div className="product-single__description-section">
            <div className="container">
              <div className="product-description">
                <h3>Product Description</h3>
                {product?.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p>No description available for this product.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Horizontal separator above reviews */}
          <hr className="product-single__separator" />
          
          {/* Product Reviews Section */}
          <div className="product-single__reviews-section">
            <div className="container">
              <Reviews show={true} product={product} />
            </div>
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured products={products} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
