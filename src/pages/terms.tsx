import Head from "next/head";

import Footer from "@/components/footer";
import Layout from "../layouts/Main";

const TermsPage = () => {
    return (
        <Layout title="Terms & Conditions - VENFURNER">
            <Head>
                <meta name="description" content="Read VENFURNER's terms and conditions for using our website and purchasing our luxury scent diffusers." />
            </Head>

            <section className="page-intro page-intro--terms">
                <div className="container">
                    <div className="page-intro__content">
                        <h1 className="page-intro__title">Terms & Conditions</h1>
                        <p className="page-intro__subtitle">Please read these terms carefully before using our services</p>
                    </div>
                </div>
            </section>

            <section className="terms-content">
                <div className="container">
                    <div className="terms-sections">
                        <div className="terms-section">
                            <h2>Disclaimer</h2>
                            <div className="terms-content-block">
                                <p>
                                    <strong>VENFURNER reserves the right to withhold or decline the sale transaction. We strictly follow a no-return policy.</strong>
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Welcome to VENFURNER!</h2>
                            <div className="terms-content-block">
                                <p>
                                    All disputes shall be resolved in accordance with Indian laws. These terms and conditions govern your use of our website and services. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions:
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Acceptance of Terms</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>By accessing or using our website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.</li>
                                    <li>If you do not agree with any part of these terms, please refrain from using our website.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Website Content</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>All content provided on our website, including text, images, graphics, logos, and videos, is the property of VENFURNER and protected by applicable copyright laws.</li>
                                    <li>You may not reproduce, distribute, modify, or use any content from our website without obtaining prior written consent from VENFURNER.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Product Information</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>We strive to provide accurate and up-to-date information about our products, including descriptions, pricing, and availability.</li>
                                    <li>However, we do not guarantee the accuracy or completeness of the information displayed on our website. Prices, promotions, and product availability are subject to change without notice.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Online Purchases</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>When making a purchase through our website, you agree to provide accurate and complete information about yourself, including billing and shipping details.</li>
                                    <li>All purchases made through our website are subject to our return and exchange policy.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>User Conduct</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>You agree to use our website for lawful purposes and in a manner that does not violate any applicable laws or regulations.</li>
                                    <li>You are prohibited from engaging in any activity that may disrupt or interfere with the proper functioning of our website or the experience of other users.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Communication Consent</h2>
                            <div className="terms-content-block">
                                <p>
                                    By providing your contact details and using our services, you consent to receive communications from <strong>9630083631</strong> via SMS, email, WhatsApp, RCS, or other channels, including promotional and service-related messages.
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Disclaimer of Warranties</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties or representations, expressed or implied.</li>
                                    <li>We do not warrant that our website will be uninterrupted, error-free, or free from viruses or other harmful components.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Limitation of Liability</h2>
                            <div className="terms-content-block">
                                <p>
                                    VENFURNER shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of our website or services.
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Modification of Terms</h2>
                            <div className="terms-content-block">
                                <p>
                                    VENFURNER reserves the right to modify, update, or change these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting on our website.
                                </p>
                                <p>
                                    By using our website, you acknowledge and agree to review these terms and conditions periodically to stay informed of any updates or changes. If you continue to use our website after any modifications, it will constitute your acceptance of the revised terms and conditions.
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Contact Information</h2>
                            <div className="terms-content-block">
                                <p>
                                    If you have any questions or concerns regarding these terms and conditions, please contact us at <strong>venfurneer@gmail.com</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="terms-cta">
                        <h3>Last Updated</h3>
                        <p>These Terms & Conditions were last updated on January 15, 2025.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default TermsPage;
