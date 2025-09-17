import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "../layouts/Main";

interface OrderData {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    };
    items: Array<{
        product: string;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
        image: string;
    }>;
}

const OrderConfirmation = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`${window.location.origin}/api/orders/${orderId}`);
            if (response.ok) {
                const data = await response.json();
                setOrderData(data.order);
            } else {
                setError("Order not found");
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            setError("Failed to load order details");
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('en-IN');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Layout>
                <section className="order-confirmation">
                    <div className="container">
                        <div className="loading-message">
                            <h2>Loading order details...</h2>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error || !orderData) {
        return (
            <Layout>
                <section className="order-confirmation">
                    <div className="container">
                        <div className="error-message">
                            <h2>Order Not Found</h2>
                            <p>{error || "The order you&apos;re looking for doesn&apos;t exist."}</p>
                            <Link href="/" className="btn btn--rounded btn--yellow">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="order-confirmation">
                <div className="container">
                    <div className="order-confirmation__header">
                        <div className="success-icon">
                            <i className="icon-check" />
                        </div>
                        <h1>Order Confirmed!</h1>
                        <p className="order-confirmation__subtitle">
                            Thank you for your order. We&apos;ve received your order and will process it shortly.
                        </p>
                    </div>

                    <div className="order-confirmation__content">
                        <div className="order-details">
                            <div className="order-summary">
                                <h3>Order Summary</h3>
                                <div className="order-info">
                                    <div className="order-info__row">
                                        <span>Order ID:</span>
                                        <strong>{orderData.id}</strong>
                                    </div>
                                    <div className="order-info__row">
                                        <span>Order Date:</span>
                                        <span>{formatDate(orderData.createdAt)}</span>
                                    </div>
                                    <div className="order-info__row">
                                        <span>Status:</span>
                                        <span className={`order-status order-status--${orderData.status}`}>
                                            {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="order-info__row">
                                        <span>Total Amount:</span>
                                        <strong>₹{formatPrice(orderData.total)}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="shipping-details">
                                <h3>Shipping Details</h3>
                                <div className="shipping-info">
                                    <p><strong>{orderData.customer.name}</strong></p>
                                    <p>{orderData.customer.address.street}</p>
                                    <p>{orderData.customer.address.city}, {orderData.customer.address.zipCode}</p>
                                    <p>{orderData.customer.address.country}</p>
                                    <p>Phone: {orderData.customer.phone}</p>
                                    <p>Email: {orderData.customer.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-items">
                            <h3>Order Items</h3>
                            <div className="order-items__list">
                                {orderData.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="order-item__image">
                                            {item.image && <img src={item.image} alt={item.name} />}
                                        </div>
                                        <div className="order-item__details">
                                            <h4>{item.name}</h4>
                                            {item.size && <p>Size: {item.size}</p>}
                                            {item.color && <p>Color: {item.color}</p>}
                                            <p>Quantity: {item.quantity}</p>
                                            <p className="order-item__price">₹{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="order-confirmation__actions">
                        <p className="confirmation-note">
                            You will receive an email confirmation shortly with your order details and tracking information.
                        </p>
                        <div className="action-buttons">
                            <Link href="/" className="btn btn--rounded btn--border">
                                Continue Shopping
                            </Link>
                            <Link href="/products" className="btn btn--rounded btn--yellow">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default OrderConfirmation;
