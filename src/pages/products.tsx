import type { GetServerSideProps } from "next";

import type { ProductType } from "@/types";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";

import Layout from "../layouts/Main";
import { server } from "../utils/server";

type ProductsPageType = {
  products: ProductType[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${server}/api/products`);
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

const Products = ({ products }: ProductsPageType) => (
  <Layout>
    <Breadcrumb />
    <section className="products-page">
      <div className="container">
        <ProductsFilter />
        <ProductsContent products={products} />
      </div>
    </section>
    <Footer />
  </Layout>
);

export default Products;
