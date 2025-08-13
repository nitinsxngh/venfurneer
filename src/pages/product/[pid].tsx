import type { GetServerSideProps } from "next";
import Link from "next/link";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Gallery from "@/components/product-single/gallery";
import Content from "@/components/product-single/content";
import ProductsFeatured from "@/components/products-featured";
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

    const [product, products] = await Promise.all([
      productRes.json(),
      productsRes.json(),
    ]);

    return {
      props: {
        product,
        products,
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
  // Handle case when product is not found or undefined
  if (!product) {
    return (
      <Layout>
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
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
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
