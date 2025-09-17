import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

import CheckoutItems from "@/components/checkout/items";
import CheckoutStatus from "@/components/checkout-status";
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

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerInfo: formData,
        items: cartItems,
        total: priceTotal,
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
        // Clear cart after successful order
        dispatch(clearCart());
        // Redirect to order confirmation
        router.push(`/order-confirmation?orderId=${order.id}`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
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
              {/* <div className="checkout__btns">
                <button className="btn btn--rounded btn--yellow">Log in</button>
                <button className="btn btn--rounded btn--border">
                  Sign up
                </button>
              </div> */}

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
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="checkout-total">
                  <p>Total cost</p>
                  <h3>₹{priceTotal}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <Link href="/cart" className="cart__btn-back">
              <i className="icon-left" /> Back
            </Link>
            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border">
                Continue shopping
              </button>
              <button
                type="button"
                className="btn btn--rounded btn--yellow"
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
