import Head from "next/head";

import Footer from "@/components/footer";
import Layout from "../layouts/Main";

const PrivacyPage = () => {
    return (
        <Layout title="Privacy Policy - venfurneer">
            <Head>
                <meta name="description" content="Learn how venfurneer collects, uses, and protects your personal information in our privacy policy." />
            </Head>

            <section className="page-intro page-intro--privacy">
                <div className="container">
                    <div className="page-intro__content">
                        <h1 className="page-intro__title">Privacy Policy</h1>
                        <p className="page-intro__subtitle">How we protect and handle your personal information</p>
                    </div>
                </div>
            </section>

            <section className="privacy-content">
                <div className="container">
                    <div className="privacy-sections">
                        <div className="privacy-section">
                            <h2>1. Information We Collect</h2>
                            <div className="privacy-content-block">
                                <h3>Personal Information</h3>
                                <p>
                                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our customer service team.
                                </p>
                                <ul>
                                    <li>Name and contact information (email, phone, address)</li>
                                    <li>Payment information (processed securely through Razorpay)</li>
                                    <li>Order history and preferences</li>
                                    <li>Communication preferences</li>
                                    <li>Account credentials</li>
                                    <li>Shipping and billing addresses</li>
                                    <li>Date of birth (for age verification)</li>
                                    <li>Government-issued ID (for KYC compliance, if required)</li>
                                </ul>

                                <h3>Automatically Collected Information</h3>
                                <p>
                                    When you visit our website, we automatically collect certain information about your device and how you interact with our site.
                                </p>
                                <ul>
                                    <li>Device information (IP address, browser type, operating system)</li>
                                    <li>Usage data (pages visited, time spent, links clicked)</li>
                                    <li>Cookies and similar tracking technologies</li>
                                    <li>Location information (if you grant permission)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>2. How We Use Your Information</h2>
                            <div className="privacy-content-block">
                                <p>We use the information we collect for various purposes, including:</p>
                                <ul>
                                    <li><strong>Order Processing:</strong> To process and fulfill your orders, send order confirmations, and provide customer support</li>
                                    <li><strong>Account Management:</strong> To create and manage your account, process payments, and maintain your profile</li>
                                    <li><strong>Communication:</strong> To send you important updates about your orders, respond to inquiries, and provide customer service</li>
                                    <li><strong>Marketing:</strong> To send you promotional offers, newsletters, and product recommendations (with your consent)</li>
                                    <li><strong>Website Improvement:</strong> To analyze usage patterns, improve our website functionality, and enhance user experience</li>
                                    <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                                </ul>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>3. Information Sharing and Disclosure</h2>
                            <div className="privacy-content-block">
                                <p>
                                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                                </p>
                                <ul>
                                    <li><strong>Payment Processors:</strong> We share payment information with Razorpay (our payment gateway) to process transactions securely. Razorpay is PCI DSS compliant and follows strict security standards.</li>
                                    <li><strong>Shipping Partners:</strong> We share delivery information with our logistics partners to fulfill and track your orders</li>
                                    <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, customer support, and marketing</li>
                                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or in response to valid legal requests from government authorities</li>
                                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction</li>
                                    <li><strong>Protection of Rights:</strong> We may share information to protect our rights, property, or safety, or that of our users or the public</li>
                                    <li><strong>Fraud Prevention:</strong> We may share information with fraud prevention services to protect against unauthorized transactions</li>
                                </ul>
                                <p>
                                    All third-party service providers are contractually obligated to protect your information and use it only for the specified purposes. We ensure that all data sharing complies with applicable data protection laws.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>4. Data Security</h2>
                            <div className="privacy-content-block">
                                <p>
                                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                                <ul>
                                    <li>SSL encryption for all data transmission</li>
                                    <li>Secure payment processing through Razorpay (PCI DSS compliant)</li>
                                    <li>Regular security assessments and updates</li>
                                    <li>Limited access to personal information on a need-to-know basis</li>
                                    <li>Secure data storage and backup procedures</li>
                                    <li>Multi-factor authentication for administrative access</li>
                                    <li>Regular security audits and penetration testing</li>
                                    <li>Data encryption at rest and in transit</li>
                                    <li>Secure API endpoints with proper authentication</li>
                                </ul>
                                <p>
                                    While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>5. Payment Data and Financial Information</h2>
                            <div className="privacy-content-block">
                                <p>
                                    We take special care in handling your payment and financial information to ensure maximum security and compliance with industry standards.
                                </p>
                                <h3>Payment Processing:</h3>
                                <ul>
                                    <li>All payment transactions are processed through Razorpay, a PCI DSS Level 1 compliant payment gateway</li>
                                    <li>We do not store complete credit card numbers, CVV codes, or other sensitive payment information on our servers</li>
                                    <li>Payment data is encrypted using industry-standard encryption protocols</li>
                                    <li>All payment information is transmitted securely using SSL/TLS encryption</li>
                                </ul>
                                <h3>Data Retention for Payments:</h3>
                                <ul>
                                    <li>Transaction records are retained for 7 years as required by Indian financial regulations</li>
                                    <li>Payment method tokens (for recurring payments) are stored securely by Razorpay</li>
                                    <li>Refund and chargeback information is maintained for dispute resolution</li>
                                </ul>
                                <h3>Third-Party Payment Services:</h3>
                                <p>
                                    When you make a payment, your payment information is shared with Razorpay and their banking partners. Please review Razorpay&apos;s privacy policy to understand how they handle your payment data.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>6. Cookies and Tracking Technologies</h2>
                            <div className="privacy-content-block">
                                <p>
                                    We use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage.
                                </p>
                                <h3>Types of Cookies We Use:</h3>
                                <ul>
                                    <li><strong>Essential Cookies:</strong> Required for basic website functionality and security</li>
                                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign performance</li>
                                </ul>
                                <p>
                                    You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>7. Your Rights and Choices</h2>
                            <div className="privacy-content-block">
                                <p>You have certain rights regarding your personal information:</p>
                                <ul>
                                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                                    <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                                    <li><strong>Objection:</strong> Object to certain types of processing</li>
                                    <li><strong>Withdrawal:</strong> Withdraw consent for marketing communications at any time</li>
                                </ul>
                                <p>
                                    To exercise these rights, please contact us using the information provided below.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>8. Data Retention</h2>
                            <div className="privacy-content-block">
                                <p>
                                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
                                </p>
                                <ul>
                                    <li><strong>Account Information:</strong> Retained while your account is active and for a reasonable period after deactivation</li>
                                    <li><strong>Order Information:</strong> Retained for legal and accounting purposes (typically 7 years)</li>
                                    <li><strong>Marketing Communications:</strong> Retained until you unsubscribe or withdraw consent</li>
                                    <li><strong>Website Analytics:</strong> Aggregated and anonymized data may be retained indefinitely</li>
                                </ul>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>9. International Data Transfers</h2>
                            <div className="privacy-content-block">
                                <p>
                                    Your personal information is primarily processed and stored in India. However, some of our service providers may be located in other countries.
                                </p>
                                <p>
                                    When we transfer your information internationally, we ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>10. Children&apos;s Privacy</h2>
                            <div className="privacy-content-block">
                                <p>
                                    Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18.
                                </p>
                                <p>
                                    If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>11. Changes to This Privacy Policy</h2>
                            <div className="privacy-content-block">
                                <p>
                                    We may update this privacy policy from time to time to reflect changes in our practices or applicable laws.
                                </p>
                                <p>
                                    We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date.
                                </p>
                                <p>
                                    Your continued use of our website after any changes constitutes acceptance of the updated privacy policy.
                                </p>
                            </div>
                        </div>

                        <div className="privacy-section">
                            <h2>12. Contact Us</h2>
                            <div className="privacy-content-block">
                                <p>
                                    If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
                                </p>
                                <p>
                                    <strong>Email:</strong> privacy@venfurneer.com<br />
                                    <strong>Phone:</strong> +91 96300 83631<br />
                                    <strong>Address:</strong> venfurneer Inc., 123 Luxury Lane, Naya Raipur, Chhattisgarh, India 492001
                                </p>
                                <p>
                                    We will respond to your inquiry within 30 days.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="privacy-cta">
                        <h3>Last Updated</h3>
                        <p>This Privacy Policy was last updated on August 16, 2025.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default PrivacyPage;
