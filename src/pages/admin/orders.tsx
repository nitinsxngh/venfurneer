import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import ProtectedRoute from "../../components/admin/ProtectedRoute";
import OrderList from "../../components/admin/OrderList";

interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface Customer {
  name: string;
  email: string;
  phone?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    orderId: string,
    status: Order["status"],
  ) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchOrders();
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };

  const handlePaymentStatusUpdate = async (
    orderId: string,
    paymentStatus: Order["paymentStatus"],
  ) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus }),
      });

      if (response.ok) {
        fetchOrders();
      } else {
        alert("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Error updating payment status");
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout title="Order Management">
        <div className="admin-page">
          {/* Page Header */}
          <div className="admin-page__header">
            <div className="admin-page__header-content">
              <div className="admin-page__header-left">
                <h1>Order Management</h1>
                <p>Track and manage customer orders, shipping, and payments</p>
              </div>
              <div className="admin-page__header-right">
                <div className="admin-page__stats">
                  <div className="admin-page__stat">
                    <span className="admin-page__stat-label">Total Orders</span>
                    <span className="admin-page__stat-value">
                      {orders.length}
                    </span>
                  </div>
                  <div className="admin-page__stat">
                    <span className="admin-page__stat-label">Pending</span>
                    <span className="admin-page__stat-value admin-page__stat-value--warning">
                      {orders.filter((o) => o.status === "pending").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="admin-page__content">
            <OrderList
              orders={orders}
              loading={loading}
              onStatusUpdate={handleStatusUpdate}
              onPaymentStatusUpdate={handlePaymentStatusUpdate}
            />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminOrders;
