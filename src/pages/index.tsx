import Link from "next/link";

import Footer from "@/components/footer";
import PageIntro from "@/components/page-intro";
import ProductsFeatured from "@/components/products-featured";
import Subscribe from "@/components/subscribe";

import Layout from "../layouts/Main";
import { server } from "../utils/server";

type IndexPageType = {
  products?: any[];
};

export const getServerSideProps = async () => {
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

const IndexPage = ({ products }: IndexPageType) => {
  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="container">
          <article
            style={{ backgroundImage: "url(/images/featured-1.jpg)" }}
            className="featured-item featured-item-large"
          >
            <div className="featured-item__content">
              <h3>New Fragrances Arrived!</h3>
              <Link href="/products" className="btn btn--rounded">
                Explore Collection
              </Link>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-2.png)" }}
            className="featured-item featured-item-small-first"
          >
            <div className="featured-item__content">
              <h3>Royal Oud Perfume ₹6,299</h3>
              <Link href="/products" className="btn btn--rounded">
                Shop Now
              </Link>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-3.png)" }}
            className="featured-item featured-item-small"
          >
            <div className="featured-item__content">
              <h3>Summer Sale - Up to 30% Off</h3>
              <Link href="/products" className="btn btn--rounded">
                VIEW ALL
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Why choose VENFURNER perfumes?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>
                  All purchases over ₹5,000 are eligible for free shipping
                  across India.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-payment" />
              <div className="data-item__content">
                <h4>Secure Payments</h4>
                <p>
                  All payments are processed securely with multiple payment
                  options available.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-cash" />
              <div className="data-item__content">
                <h4>30-Day Return</h4>
                <p>
                  If you're not satisfied with your fragrance, return it within
                  30 days for a full refund.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-materials" />
              <div className="data-item__content">
                <h4>Premium Fragrances</h4>
                <p>
                  Each perfume is crafted with the finest natural ingredients
                  and authentic fragrances.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <ProductsFeatured products={products} />
      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
