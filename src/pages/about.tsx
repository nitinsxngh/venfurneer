import Head from "next/head";
import Link from "next/link";

import Footer from "@/components/footer";
import Layout from "../layouts/Main";

const AboutPage = () => {
    return (
        <Layout title="About Us - venfurneer">
            <Head>
                <meta name="description" content="Learn about venfurneer - Premium luxury scent diffusers for your home and office. Discover our story, mission, and commitment to quality." />
            </Head>

            <section className="page-intro page-intro--about">
                <div className="container">
                    <div className="page-intro__content">
                        <h1 className="page-intro__title">About venfurneer</h1>
                        <p className="page-intro__subtitle">Crafting Luxury Scent Experiences Since 2020</p>
                    </div>
                </div>
            </section>

            <section className="about-content">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-section">
                            <h2>Our Story</h2>
                            <p>
                                venfurneer was born from a passion for creating exceptional sensory experiences
                                that transform ordinary spaces into extraordinary sanctuaries. We believe that
                                the right fragrance has the power to elevate moods, create memories, and
                                enhance the ambiance of any environment.
                            </p>
                            <p>
                                Founded in 2020, we&apos;ve dedicated ourselves to sourcing the finest materials
                                and collaborating with master perfumers to develop signature scents that
                                embody luxury, sophistication, and timeless elegance.
                            </p>
                        </div>

                        <div className="about-section">
                            <h2>Our Mission</h2>
                            <p>
                                To provide discerning customers with premium scent diffusers that combine
                                cutting-edge technology with artisanal craftsmanship. We&apos;re committed to
                                creating products that not only look beautiful but also deliver consistent,
                                long-lasting fragrance experiences.
                            </p>
                            <p>
                                Every venfurneer product is designed with attention to detail, ensuring
                                that form meets function in perfect harmony.
                            </p>
                        </div>

                        <div className="about-section">
                            <h2>Quality & Craftsmanship</h2>
                            <p>
                                We source only the highest quality essential oils and fragrance compounds
                                from trusted suppliers around the world. Our diffusers are crafted using
                                premium materials and undergo rigorous testing to ensure reliability and
                                performance.
                            </p>
                            <p>
                                Each product is carefully assembled by skilled artisans who share our
                                commitment to excellence and attention to detail.
                            </p>
                        </div>

                        <div className="about-section">
                            <h2>Our Commitment</h2>
                            <p>
                                At venfurneer, we&apos;re committed to sustainability and responsible business
                                practices. We continuously work to reduce our environmental impact while
                                maintaining the highest standards of quality and luxury.
                            </p>
                            <p>
                                We believe in building lasting relationships with our customers, providing
                                exceptional service and support throughout their journey with us.
                            </p>
                        </div>
                    </div>

                    <div className="about-cta">
                        <h3>Experience the venfurneer Difference</h3>
                        <p>Discover our collection of luxury scent diffusers and transform your space today.</p>
                        <Link href="/products" className="btn-shop">
                            <i className="icon-right" />
                            Shop Our Collection
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default AboutPage;
