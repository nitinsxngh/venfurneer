import { useEffect, useState } from 'react';

interface RazorpayPaymentProps {
    orderData: {
        customerInfo: any;
        items: any[];
        total: number;
        orderNumber: string;
    };
    onPaymentSuccess: (paymentData: any) => void;
    onPaymentError: (error: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
    orderData,
    onPaymentSuccess,
    onPaymentError,
    loading,
    setLoading
}) => {
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    useEffect(() => {
        // Load Razorpay script
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript().then((success) => {
            if (success) {
                setRazorpayLoaded(true);
            } else {
                onPaymentError('Failed to load Razorpay payment gateway');
            }
        });
    }, [onPaymentError]);

    const handlePayment = async () => {
        if (!razorpayLoaded || !window.Razorpay) {
            onPaymentError('Razorpay is not loaded. Please refresh the page and try again.');
            return;
        }

        setLoading(true);

        try {
            // Create Razorpay order
            const response = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: orderData.total,
                    currency: 'INR',
                    receipt: orderData.orderNumber,
                    notes: {
                        customer_email: orderData.customerInfo.email,
                        customer_name: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
                        order_number: orderData.orderNumber
                    }
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create payment order');
            }

            const { order } = await response.json();

            // Razorpay options
            const options = {
                key: 'rzp_live_RLQCo5zT8hGnCO',
                amount: order.amount,
                currency: order.currency,
                name: 'venfurneer',
                description: `Order #${orderData.orderNumber}`,
                image: '/logo-venfurneer.png',
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                orderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                                orderNumber: orderData.orderNumber,
                                amount: orderData.total
                            }),
                        });

                        if (verifyResponse.ok) {
                            const verifyData = await verifyResponse.json();
                            onPaymentSuccess(verifyData);
                        } else {
                            const errorData = await verifyResponse.json();
                            onPaymentError(errorData.message || 'Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        onPaymentError('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
                    email: orderData.customerInfo.email,
                    contact: orderData.customerInfo.phoneNumber,
                },
                notes: {
                    order_number: orderData.orderNumber,
                    customer_email: orderData.customerInfo.email,
                },
                theme: {
                    color: '#F59E0B', // Yellow theme to match your brand
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            // Open Razorpay checkout
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();

        } catch (error) {
            console.error('Payment initiation error:', error);
            onPaymentError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="razorpay-payment">
            <button
                type="button"
                className="btn btn--rounded btn--yellow razorpay-btn"
                onClick={handlePayment}
                disabled={loading || !razorpayLoaded}
            >
                {loading ? (
                    <>
                        <span className="btn-spinner"></span>
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <i className="icon-credit-card"></i>
                        Pay with Razorpay - ₹{orderData.total}
                    </>
                )}
            </button>

            {!razorpayLoaded && (
                <p className="payment-loading-text">
                    Loading secure payment gateway...
                </p>
            )}

            <div className="payment-security-info">
                <p>
                    <i className="icon-shield"></i>
                    Your payment is secured by Razorpay (PCI DSS compliant)
                </p>
                <div className="payment-methods">
                    <span>We accept:</span>
                    <div className="payment-icons">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>UPI</span>
                        <span>Net Banking</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RazorpayPayment;
