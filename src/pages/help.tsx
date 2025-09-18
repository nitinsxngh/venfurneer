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
                            <h2>No Return Policy</h2>
                            <div className="help-content-block">
                                <div className="policy-notice">
                                    <h3>⚠️ IMPORTANT: NO RETURN POLICY</h3>
                                    <p>
                                        <strong>VENFURNER operates a strict NO RETURN POLICY for all products.</strong> Due to the nature of fragrance products and hygiene considerations, we do not accept returns, exchanges, or refunds for any reason once an order has been placed and processed.
                                    </p>
                                </div>

                                <h4>Why No Returns?</h4>
                                <ul>
                                    <li><strong>Hygiene & Safety:</strong> Fragrance products are personal care items that cannot be resold once opened or used</li>
                                    <li><strong>Product Integrity:</strong> To maintain the quality and authenticity of our luxury fragrances</li>
                                    <li><strong>Health Regulations:</strong> Compliance with health and safety standards for personal care products</li>
                                    <li><strong>Customer Protection:</strong> Ensuring all customers receive only fresh, unopened products</li>
                                </ul>

                                <h4>Before You Order:</h4>
                                <ul>
                                    <li>Please read product descriptions carefully</li>
                                    <li>Check size, color, and fragrance details</li>
                                    <li>Review our product images and specifications</li>
                                    <li>Contact our customer service if you have any questions before ordering</li>
                                </ul>

                                <h4>Damaged or Defective Items:</h4>
                                <p>
                                    <strong>Exception:</strong> If you receive a damaged or defective item, please contact us within 24 hours of delivery with photos of the damage. We will investigate and provide appropriate resolution, which may include replacement or refund at our discretion.
                                </p>

                                <h4>Order Cancellation:</h4>
                                <p>
                                    Orders can only be cancelled within 24 hours of placement, provided the order has not been shipped. Once shipped, the no return policy applies.
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
                                    <li>RuPay</li>
                                    <li>Maestro</li>
                                </ul>

                                <h4>Digital Wallets & UPI:</h4>
                                <ul>
                                    <li>PhonePe</li>
                                    <li>Google Pay</li>
                                    <li>Paytm</li>
                                    <li>Amazon Pay</li>
                                    <li>BHIM UPI</li>
                                    <li>UPI ID</li>
                                </ul>

                                <h4>Net Banking:</h4>
                                <ul>
                                    <li>All major Indian banks supported</li>
                                    <li>Secure bank-to-bank transfers</li>
                                    <li>Real-time payment processing</li>
                                </ul>

                                <h4>Security & Payment Processing:</h4>
                                <p>
                                    All payments are processed securely through <strong>Razorpay</strong>, a PCI DSS compliant payment gateway. We never store your complete payment information on our servers. Your financial data is encrypted and protected using industry-standard security measures.
                                </p>

                                <h4>Payment Security Features:</h4>
                                <ul>
                                    <li>SSL encryption for all transactions</li>
                                    <li>PCI DSS compliance</li>
                                    <li>3D Secure authentication for cards</li>
                                    <li>Fraud detection and prevention</li>
                                    <li>Secure tokenization</li>
                                </ul>

                                <h4>EMI & Installment Options:</h4>
                                <p>
                                    Available through Razorpay&apos;s EMI partners for orders over ₹3,000, allowing you to split your purchase into 3-12 months with competitive interest rates. EMI options are subject to bank approval and credit assessment.
                                </p>

                                <h4>Refund Processing:</h4>
                                <p>
                                    Refunds are processed through the same payment method used for the original transaction. Credit card refunds typically take 5-7 business days, while UPI and wallet refunds are processed within 1-2 business days.
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
                                    Naya Raipur, Chhattisgarh, India 492001
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

                    <div className="help-cta">
                        <h3>Last Updated</h3>
                        <p>This Help & Support page was last updated on August 16, 2025.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default HelpPage;
