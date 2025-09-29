import Head from "next/head";

import Footer from "@/components/footer";
import Layout from "../layouts/Main";

const TermsPage = () => {
    return (
        <Layout title="Terms & Conditions - venfurneer">
            <Head>
                <meta name="description" content="Read venfurneer's terms and conditions for using our website and purchasing our luxury scent diffusers." />
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
                            <h2>Important Notice</h2>
                            <div className="terms-content-block">
                                <div className="policy-notice">
                                    <p>
                                        <strong>⚠️ NO RETURN POLICY: venfurneer operates a strict NO RETURN POLICY for all products.</strong> Due to the nature of fragrance products and hygiene considerations, we do not accept returns, exchanges, or refunds for any reason once an order has been placed and processed.
                                    </p>
                                </div>
                                <p>
                                    <strong>venfurneer reserves the right to withhold or decline any sale transaction at our sole discretion. All sales are final.</strong>
                                </p>
                                <p>
                                    <strong>Payment Processing:</strong> All payments are processed through Razorpay, a PCI DSS compliant payment gateway. By making a purchase, you agree to Razorpay&apos;s terms of service and privacy policy.
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Welcome to venfurneer!</h2>
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
                                    <li>All content provided on our website, including text, images, graphics, logos, and videos, is the property of venfurneer and protected by applicable copyright laws.</li>
                                    <li>You may not reproduce, distribute, modify, or use any content from our website without obtaining prior written consent from venfurneer.</li>
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
                            <h2>Online Purchases & Payment Terms</h2>
                            <div className="terms-content-block">
                                <ul>
                                    <li>When making a purchase through our website, you agree to provide accurate and complete information about yourself, including billing and shipping details.</li>
                                    <li>All purchases made through our website are subject to our return and exchange policy.</li>
                                    <li>Payment must be made in full at the time of purchase unless using approved EMI options.</li>
                                    <li>We accept payments through Razorpay payment gateway, including credit/debit cards, UPI, net banking, and digital wallets.</li>
                                    <li>All prices are in Indian Rupees (INR) and include applicable taxes unless otherwise stated.</li>
                                    <li>We reserve the right to refuse or cancel any order at our sole discretion, including orders that appear to be fraudulent or suspicious.</li>
                                    <li>In case of payment failure, your order will be automatically cancelled and any amount charged will be refunded within 5-7 business days.</li>
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
                            <h2>Refund and Cancellation Policy</h2>
                            <div className="terms-content-block">
                                <div className="policy-notice">
                                    <h3>⚠️ NO RETURN POLICY - ALL SALES FINAL</h3>
                                    <p>
                                        <strong>venfurneer does not accept returns, exchanges, or refunds for any products under any circumstances.</strong> This policy applies to all purchases made through our website.
                                    </p>
                                </div>

                                <h4>Order Cancellation:</h4>
                                <ul>
                                    <li><strong>Pre-Shipment:</strong> Orders can only be cancelled within 24 hours of placement, provided the order has not been shipped</li>
                                    <li><strong>Post-Shipment:</strong> Once an order has been shipped, cancellation is not possible</li>
                                    <li><strong>Refund for Cancelled Orders:</strong> Refunds for cancelled orders are processed within 5-7 business days for cards and 1-2 business days for UPI/wallets</li>
                                </ul>

                                <h4>No Return Policy Details:</h4>
                                <ul>
                                    <li><strong>Hygiene Reasons:</strong> Fragrance products are personal care items that cannot be resold once opened</li>
                                    <li><strong>Product Integrity:</strong> To maintain quality and authenticity of our luxury fragrances</li>
                                    <li><strong>Health Regulations:</strong> Compliance with health and safety standards</li>
                                    <li><strong>All Sales Final:</strong> No exceptions for change of mind, wrong size, or dissatisfaction</li>
                                </ul>

                                <h4>Limited Exceptions:</h4>
                                <ul>
                                    <li><strong>Damaged Items:</strong> Must be reported within 24 hours of delivery with photographic evidence</li>
                                    <li><strong>Defective Products:</strong> Manufacturing defects reported within 24 hours of delivery</li>
                                    <li><strong>Wrong Item Shipped:</strong> If we ship the wrong product, we will arrange for correct item delivery</li>
                                </ul>

                                <h4>Refund Processing:</h4>
                                <p>
                                    Refunds are only processed for cancelled orders, payment failures, or the limited exceptions mentioned above. Processing time varies by payment method and bank processing times.
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Communication Consent</h2>
                            <div className="terms-content-block">
                                <p>
                                    By providing your contact details and using our services, you consent to receive communications from <strong>+91 96300 83631</strong> via SMS, email, WhatsApp, RCS, or other channels, including promotional and service-related messages.
                                </p>
                                <p>
                                    You can opt-out of promotional communications at any time by clicking the unsubscribe link in our emails or contacting our customer service team.
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
                                    venfurneer shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of our website or services.
                                </p>
                            </div>
                        </div>

                        <div className="terms-section">
                            <h2>Modification of Terms</h2>
                            <div className="terms-content-block">
                                <p>
                                    venfurneer reserves the right to modify, update, or change these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting on our website.
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
                                    If you have any questions or concerns regarding these terms and conditions, please contact us:
                                </p>
                                <p>
                                    <strong>Email:</strong> info@venfurneer.com<br />
                                    <strong>Phone:</strong> +91 96300 83631<br />
                                    <strong>Address:</strong> venfurneer Inc., 123 Luxury Lane, Naya Raipur, Chhattisgarh, India 492001
                                </p>
                                <p>
                                    <strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM IST
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="terms-cta">
                        <h3>Last Updated</h3>
                        <p>These Terms & Conditions were last updated on August 16, 2025.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default TermsPage;
