import Link from "next/link";

const LuxuryDiffuser = () => {
    return (
        <>
            <section className="section section-luxury-diffuser">
                <div className="container">
                    <div className="luxury-diffuser__content">
                        <div className="luxury-diffuser__image">
                            <img
                                src="https://aromasphere.co/cdn/shop/files/1500x1500px_image_1.jpg?v=1715017270&width=1500"
                                alt="Luxury Essential Oil Diffuser Collection"
                                className="diffuser-image"
                            />
                        </div>
                        <div className="luxury-diffuser__text">
                            <h2 className="luxury-diffuser__title">
                                Luxury Essential Oil Diffuser Collection
                            </h2>
                            <div className="luxury-diffuser__description">
                                <p>
                                    Our app-based, intelligent scenting solutions are smart and designed to help you discover the art of fragrance, creating a truly sensory experience in your home or office. The innovative and cutting-edge technology of our smart diffusers enables you to experience a pervasive environment ranging from a small meeting room to large areas like trade fairs, galleries, malls, airports, and whatever comes in between with one single machine.
                                </p>
                                <p>
                                    Whether you&apos;re looking to create a relaxing environment, boost concentration, promote a positive vibe, increase productivity, or provide a welcoming atmosphere, our collection of the exclusive world of intelligent scent diffusers will be the perfect start to your day. With elegant designs, customizable settings, and a range of scents to choose from, our diffusers provide a luxurious touch to any space.
                                </p>
                            </div>
                            <Link href="/products" className="luxury-diffuser__cta">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-scenting-categories">
                <div className="container">
                    <div className="scenting-categories__header">
                        <h2 className="scenting-categories__title">
                            Experience Intelligent Scenting Like Never Before
                        </h2>
                        <p className="scenting-categories__subtitle">
                            Discover our innovative scenting solutions for every environment
                        </p>
                    </div>

                    <div className="scenting-categories__grid">
                        <div className="scenting-category">
                            <div className="scenting-category__image">
                                <img
                                    src="https://aromasphere.co/cdn/shop/files/Snapinsta.app_419934190_17898697781937431_5249582330785875774_n_1080.jpg?v=1706943291&width=1066"
                                    alt="Home Scenting"
                                    className="category-image"
                                />
                                <div className="category-overlay">
                                    <h3>Home Scenting</h3>
                                </div>
                            </div>
                            <div className="scenting-category__content">
                                <h3 className="category-title">Home Scenting</h3>
                                <p className="category-description">
                                    Transform your living space with our intelligent home scenting solutions. Create the perfect atmosphere for relaxation, focus, or entertainment with customizable fragrances that adapt to your lifestyle and preferences.
                                </p>

                                <Link href="/products?category=home" className="category-cta">
                                    <span>Explore Home Solutions</span>
                                </Link>
                            </div>
                        </div>

                        <div className="scenting-category">
                            <div className="scenting-category__image">
                                <img
                                    src="https://aromasphere.co/cdn/shop/files/Snapinsta.app_381380726_344702704575742_935696019850237877_n_1080.jpg?v=1703674600&width=1066"
                                    alt="Business Scenting"
                                    className="category-image"
                                />
                                <div className="category-overlay">
                                    <h3>Business Scenting</h3>
                                </div>
                            </div>
                            <div className="scenting-category__content">
                                <h3 className="category-title">Business Scenting</h3>
                                <p className="category-description">
                                    Elevate your business environment with professional scenting solutions. From retail spaces to corporate offices, our interactive kiosks and commercial diffusers create memorable brand experiences and enhance customer satisfaction.
                                </p>

                                <Link href="/products?category=business" className="category-cta">
                                    <span>Explore Business Solutions</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LuxuryDiffuser;
