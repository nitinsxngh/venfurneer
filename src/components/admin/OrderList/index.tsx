import { useState } from "react";

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

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onStatusUpdate: (orderId: string, status: Order["status"]) => void;
  onPaymentStatusUpdate: (
    orderId: string,
    paymentStatus: Order["paymentStatus"],
  ) => void;
}

const OrderList = ({
  orders,
  loading,
  onStatusUpdate,
  onPaymentStatusUpdate,
}: OrderListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "orderNumber":
          return a.orderNumber.localeCompare(b.orderNumber);
        case "customer":
          return a.customer.name.localeCompare(b.customer.name);
        case "total":
          return b.total - a.total;
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "shipped":
        return "purple";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "pending":
        return "orange";
      case "paid":
        return "green";
      case "failed":
        return "red";
      case "refunded":
        return "blue";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-order-list">
      <div className="admin-order-list__controls">
        <div className="admin-order-list__search">
          <input
            type="text"
            placeholder="Search by order number, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-form__input"
          />
        </div>
        <div className="admin-order-list__filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-form__select"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="admin-form__select"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="orderNumber">Sort by Order Number</option>
            <option value="customer">Sort by Customer</option>
            <option value="total">Sort by Total</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="admin-empty-state">
          <p>No orders found.</p>
          {searchTerm && <p>Try adjusting your search terms.</p>}
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong className="admin-table__order-number">
                      {order.orderNumber}
                    </strong>
                  </td>
                  <td>
                    <div className="admin-table__customer-info">
                      <div className="admin-table__customer-name">
                        {order.customer.name}
                      </div>
                      <div className="admin-table__customer-email">
                        {order.customer.email}
                      </div>
                      {order.customer.phone && (
                        <div className="admin-table__customer-phone">
                          {order.customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table__order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="admin-table__order-item">
                          <span className="admin-table__item-name">
                            {item.name}
                          </span>
                          <span className="admin-table__item-quantity">
                            x{item.quantity}
                          </span>
                          <span className="admin-table__item-price">
                            ₹{item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table__order-total">
                      <div className="admin-table__total-amount">
                        ₹{order.total.toLocaleString()}
                      </div>
                      <div className="admin-table__total-breakdown">
                        <small>Subtotal: ₹{order.subtotal}</small>
                        <small>Shipping: ₹{order.shipping}</small>
                        <small>Tax: ₹{order.tax}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusUpdate(
                          order.id,
                          e.target.value as Order["status"],
                        )
                      }
                      className={`admin-form__select admin-form__select--${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        onPaymentStatusUpdate(
                          order.id,
                          e.target.value as Order["paymentStatus"],
                        )
                      }
                      className={`admin-form__select admin-form__select--${getPaymentStatusColor(order.paymentStatus)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td>
                    <div className="admin-table__order-date">
                      <div>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <small>
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
