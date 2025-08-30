import Head from "next/head";
import Link from "next/link";

import Footer from "@/components/footer";
import Layout from "../layouts/Main";

const HelpPage = () => {
    return (
        <Layout title="Help & Support - VENFURNER">
            <Head>
                <meta name="description" content="Get help with your VENFURNER orders, shipping, returns, payments, and contact information. Find answers to frequently asked questions." />
            </Head>

            <section className="page-intro page-intro--help">
                <div className="container">
                    <div className="page-intro__content">
                        <h1 className="page-intro__title">Help & Support</h1>
                        <p className="page-intro__subtitle">We&apos;re here to help with any questions you may have</p>
                    </div>
                </div>
            </section>

            <section className="help-content">
                <div className="container">
                    <div className="help-navigation">
                        <h2>Quick Navigation</h2>
                        <div className="help-nav-links">
                            <a href="#order-status" className="help-nav-link">Order Status</a>
                            <a href="#shipping-delivery" className="help-nav-link">Shipping & Delivery</a>
                            <a href="#returns" className="help-nav-link">Returns</a>
                            <a href="#payment-options" className="help-nav-link">Payment Options</a>
                            <a href="#contact-us" className="help-nav-link">Contact Us</a>
                        </div>
                    </div>

                    <div className="help-sections">
                        <div id="order-status" className="help-section">
                            <h2>Order Status</h2>
                            <div className="help-content-block">
                                <h3>How to Check Your Order Status</h3>
                                <p>
                                    You can check the status of your order by logging into your account or using the order confirmation email we sent you.
                                </p>

                                <h4>Order Status Types:</h4>
                                <ul>
                                    <li><strong>Processing:</strong> Your order has been received and is being prepared for shipment</li>
                                    <li><strong>Shipped:</strong> Your order has been shipped and is on its way to you</li>
                                    <li><strong>Delivered:</strong> Your order has been successfully delivered</li>
                                    <li><strong>Cancelled:</strong> Your order has been cancelled (if applicable)</li>
                                </ul>

                                <h4>Need Help?</h4>
                                <p>
                                    If you have questions about your order status, please contact our customer service team with your order number.
                                </p>
                            </div>
                        </div>

                        <div id="shipping-delivery" className="help-section">
                            <h2>Shipping & Delivery</h2>
                            <div className="help-content-block">
                                <h3>Shipping Information</h3>
                                <p>
                                    We offer fast and reliable shipping to ensure your VENFURNER products arrive safely and on time.
                                </p>

                                <h4>Shipping Options:</h4>
                                <ul>
                                    <li><strong>Standard Shipping:</strong> 3-5 business days - ₹299</li>
                                    <li><strong>Express Shipping:</strong> 2-3 business days - ₹599</li>
                                    <li><strong>Overnight Shipping:</strong> Next business day - ₹999</li>
                                    <li><strong>Free Shipping:</strong> Available on orders over ₹5,000</li>
                                </ul>

                                <h4>Delivery Areas:</h4>
                                <p>
                                    We currently ship to all states across India, with priority service to major cities. International shipping to select countries is also available. International shipping rates and delivery times may vary.
                                </p>

                                <h4>Tracking Your Package:</h4>
                                <p>
                                    Once your order ships, you&apos;ll receive a tracking number via email to monitor your package&apos;s journey to you.
                                </p>
                            </div>
                        </div>

                        <div id="returns" className="help-section">
                            <h2>Returns</h2>
                            <div className="help-content-block">
                                <h3>Return Policy</h3>
                                <p>
                                    We want you to be completely satisfied with your VENFURNER purchase. If you&apos;re not happy with your order, we&apos;re here to help.
                                </p>

                                <h4>Return Window:</h4>
                                <ul>
                                    <li><strong>7-Day Return Policy:</strong> Return unused items within 7 days of delivery</li>
                                    <li><strong>Original Packaging:</strong> Items must be returned in original, unopened packaging</li>
                                    <li><strong>Return Authorization:</strong> Contact customer service for return authorization</li>
                                </ul>

                                <h4>Return Process:</h4>
                                <ol>
                                    <li>Contact our customer service team within 7 days</li>
                                    <li>Receive return authorization and shipping label</li>
                                    <li>Package item securely with return label</li>
                                    <li>Drop off at any authorized shipping location</li>
                                    <li>Refund processed within 3-5 business days</li>
                                </ol>

                                <h4>Non-Returnable Items:</h4>
                                <p>
                                    For hygiene reasons, opened fragrance products cannot be returned. Damaged items received should be reported within 24 hours of delivery.
                                </p>
                            </div>
                        </div>

                        <div id="payment-options" className="help-section">
                            <h2>Payment Options</h2>
                            <div className="help-content-block">
                                <h3>Accepted Payment Methods</h3>
                                <p>
                                    We accept various payment methods to make your shopping experience convenient and secure.
                                </p>

                                <h4>Credit & Debit Cards:</h4>
                                <ul>
                                    <li>Visa</li>
                                    <li>Mastercard</li>
                                    <li>American Express</li>
                                    <li>Discover</li>
                                </ul>

                                <h4>Digital Wallets:</h4>
                                <ul>
                                    <li>PayPal</li>
                                    <li>PhonePe</li>
                                    <li>Google Pay</li>
                                    <li>Paytm</li>
                                    <li>Amazon Pay</li>
                                </ul>

                                <h4>Security:</h4>
                                <p>
                                    All transactions are secured with SSL encryption. We never store your complete credit card information on our servers.
                                </p>

                                <h4>Installment Plans:</h4>
                                <p>
                                    Available through various payment partners for orders over ₹2,000, allowing you to split your purchase into 3-6 interest-free payments.
                                </p>
                            </div>
                        </div>

                        <div id="contact-us" className="help-section">
                            <h2>Contact Us</h2>
                            <div className="help-content-block">
                                <h3>Get in Touch</h3>
                                <p>
                                    Our customer service team is here to help you with any questions, concerns, or support you may need.
                                </p>

                                <div className="contact-methods">
                                    <div className="contact-method">
                                        <h4>Customer Service</h4>
                                        <p><strong>Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                                        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM IST</p>
                                        <p><strong>Time Zone:</strong> Indian Standard Time (IST)</p>
                                    </div>

                                    <div className="contact-method">
                                        <h4>Email Support</h4>
                                        <p><strong>General Inquiries:</strong> info@venfurneer.com</p>
                                        <p><strong>Customer Support:</strong> support@venfurneer.com</p>
                                        <p><strong>Response Time:</strong> Within 24 hours</p>
                                    </div>

                                    <div className="contact-method">
                                        <h4>Phone Support</h4>
                                        <p><strong>Contact:</strong> +91 96300 83631</p>
                                        <p><strong>Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                                        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM IST</p>
                                    </div>


                                </div>

                                <h4>Business Address:</h4>
                                <p>
                                    VENFURNER Inc.<br />
                                    123 Luxury Lane<br />
                                    Raipur, Chhattisgarh 492001<br />
                                    India
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="help-cta">
                        <h3>Still Need Help?</h3>
                        <p>Can&apos;t find what you&apos;re looking for? Our team is ready to assist you.</p>
                        <div className="help-cta-buttons">
                            <Link href="mailto:support@venfurneer.com" className="btn-contact">
                                <i className="icon-mail" />
                                Email Support
                            </Link>
                            <Link href="tel:+919630083631" className="btn-contact">
                                <i className="icon-phone" />
                                Call Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default HelpPage;
