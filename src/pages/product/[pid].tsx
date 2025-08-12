import type { GetServerSideProps } from "next";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
// types
import type { ProductType } from "@/types";

import Layout from "../../layouts/Main";
import { server } from "../../utils/server";

type ProductPageType = {
  product: ProductType;
  products?: any[];
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { pid } = query;

  try {
    const [productRes, productsRes] = await Promise.all([
      fetch(`${server}/api/product/${pid}`),
      fetch(`${server}/api/products`),
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
                The product you're looking for doesn't exist or has been
                removed.
              </p>
              <a href="/products" className="btn btn--primary">
                Back to Products
              </a>
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
