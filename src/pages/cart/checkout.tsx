import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

import CheckoutItems from "@/components/checkout/items";
import CheckoutStatus from "@/components/checkout-status";
import RazorpayPayment from "@/components/razorpay-payment";
import type { RootState } from "@/store";
import type { ProductStoreType } from "@/types";
import { clearCart } from "@/store/reducers/cart";

import Layout from "../../layouts/Main";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    country: "India"
  });

  const priceTotal = useSelector((state: RootState) => {
    const { cartItems } = state.cart;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map(
        (item: ProductStoreType) => (totalPrice += item.price * item.count),
      );
    }

    return totalPrice;
  });

  const subtotal = priceTotal;
  const discount = promoApplied ? 10 : 0;
  const discountAmount = discount > 0 ? (subtotal * discount) / 100 : 0;
  const finalTotal = subtotal - discountAmount;

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value.toUpperCase());
    setPromoError("");
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    if (promoCode.toUpperCase() === "VEN10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.country || formData.country === "Country") newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);
    setPaymentError("");

    try {
      const orderData = {
        customerInfo: formData,
        items: cartItems,
        subtotal: subtotal,
        discount: discountAmount,
        promoCode: promoApplied ? promoCode : null,
        total: finalTotal,
        status: "pending",
        orderDate: new Date().toISOString()
      };

      const response = await fetch(`${window.location.origin}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        setOrderNumber(order.id);
        setOrderCreated(true);
      } else {
        const errorData = await response.json();
        setPaymentError(errorData.message || "Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setPaymentError("An error occurred while creating your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    // Clear cart after successful payment
    dispatch(clearCart());
    // Redirect to order confirmation
    router.push(`/order-confirmation?orderId=${orderNumber}`);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setLoading(false);
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Shipping Information</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              {!orderCreated ? (
                <div className="block">
                  <h3 className="block__title">Shipping information</h3>
                  <form className="form">
                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.email ? 'form__input--error' : ''}`}
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.email && <span className="form__error">{errors.email}</span>}
                      </div>

                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.address ? 'form__input--error' : ''}`}
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.address && <span className="form__error">{errors.address}</span>}
                      </div>
                    </div>

                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.firstName ? 'form__input--error' : ''}`}
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.firstName && <span className="form__error">{errors.firstName}</span>}
                      </div>

                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.city ? 'form__input--error' : ''}`}
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.city && <span className="form__error">{errors.city}</span>}
                      </div>
                    </div>

                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.lastName ? 'form__input--error' : ''}`}
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.lastName && <span className="form__error">{errors.lastName}</span>}
                      </div>

                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.postalCode ? 'form__input--error' : ''}`}
                          type="text"
                          name="postalCode"
                          placeholder="Postal code / ZIP"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.postalCode && <span className="form__error">{errors.postalCode}</span>}
                      </div>
                    </div>

                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className={`form__input form__input--sm ${errors.phoneNumber ? 'form__input--error' : ''}`}
                          type="tel"
                          name="phoneNumber"
                          placeholder="Phone number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.phoneNumber && <span className="form__error">{errors.phoneNumber}</span>}
                      </div>

                      <div className="form__col">
                        <div className="select-wrapper select-form">
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className={errors.country ? 'form__input--error' : ''}
                            required
                          >
                            <option value="">Country</option>
                            <option value="India">India</option>
                          </select>
                          {errors.country && <span className="form__error">{errors.country}</span>}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="block">
                  <h3 className="block__title">Payment Information</h3>
                  <div className="order-summary">
                    <p><strong>Order Number:</strong> {orderNumber}</p>
                    <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
                    {discountAmount > 0 && (
                      <p><strong>Discount (10%):</strong> -₹{discountAmount.toFixed(2)}</p>
                    )}
                    <p><strong>Total Amount:</strong> ₹{finalTotal.toFixed(2)}</p>
                  </div>

                  {paymentError && (
                    <div className="payment-error">
                      <p>{paymentError}</p>
                    </div>
                  )}

                  <RazorpayPayment
                    orderData={{
                      customerInfo: formData,
                      items: cartItems,
                      subtotal: subtotal,
                      discount: discountAmount,
                      promoCode: promoApplied ? promoCode : null,
                      total: finalTotal,
                      orderNumber: orderNumber
                    }}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    loading={loading}
                    setLoading={setLoading}
                  />

                  <div className="payment-options">
                    <button
                      type="button"
                      className="btn btn--rounded btn--border"
                      onClick={() => {
                        setOrderCreated(false);
                        setOrderNumber("");
                        setPaymentError("");
                      }}
                    >
                      Back to Shipping
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                {/* Promo Code Section */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="form__input form__input--sm"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      disabled={promoApplied}
                      style={{ flex: 1, fontSize: "14px", padding: "8px 12px" }}
                    />
                    {promoApplied ? (
                      <button
                        type="button"
                        className="btn btn--rounded btn--border"
                        onClick={() => {
                          setPromoApplied(false);
                          setPromoCode("");
                          setPromoError("");
                        }}
                        style={{ whiteSpace: "nowrap", fontSize: "14px", padding: "8px 16px" }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn--rounded btn--border"
                        onClick={handleApplyPromo}
                        style={{ whiteSpace: "nowrap", fontSize: "14px", padding: "8px 16px" }}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {promoError && (
                    <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {promoError}
                    </div>
                  )}
                  {promoApplied && (
                    <div style={{
                      color: "#28a745",
                      fontSize: "13px",
                      marginTop: "8px",
                      padding: "6px 8px",
                      backgroundColor: "#f0f9f4",
                      borderRadius: "4px"
                    }}>
                      ✓ Promo code {promoCode} applied - 10% discount
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", color: "#666" }}>Subtotal</span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontSize: "14px", color: "#28a745" }}>Discount (10%)</span>
                      <span style={{ fontSize: "14px", color: "#28a745", fontWeight: "500" }}>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "2px solid #e0e0e0",
                    marginTop: "8px"
                  }}>
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>Total</span>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <Link href="/cart" className="cart__btn-back">
              <i className="icon-left" /> Back
            </Link>
            {!orderCreated && (
              <div className="cart-actions__items-wrapper">
                <button type="button" className="btn btn--rounded btn--border">
                  Continue shopping
                </button>
                <button
                  type="button"
                  className="btn btn--rounded btn--yellow"
                  onClick={handleCreateOrder}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? "Creating Order..." : "Proceed to Payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
