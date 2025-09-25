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

interface PaymentDetails {
  method?: string;
  transactionId?: string;
  razorpayOrderId?: string;
  status?: string;
  amount?: number;
  currency?: string;
  paidAt?: string;
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
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  payment?: PaymentDetails;
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

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

  const handleOrderClick = (order: Order) => {
    console.log('Selected order data:', order);
    console.log('Customer address:', order.customer.address);
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setShowOrderModal(false);
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
                <th>Actions</th>
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
                    <div className="admin-table__payment-info">
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
                      {order.payment && (
                        <div className="admin-table__payment-details">
                          {order.payment.method && (
                            <small>Method: {order.payment.method}</small>
                          )}
                          {order.payment.transactionId && (
                            <small>Txn ID: {order.payment.transactionId}</small>
                          )}
                          {order.payment.paidAt && (
                            <small>Paid: {new Date(order.payment.paidAt).toLocaleDateString()}</small>
                          )}
                        </div>
                      )}
                    </div>
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
                  <td>
                    <button
                      className="btn btn--sm btn--yellow"
                      onClick={() => handleOrderClick(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="admin-modal-overlay" onClick={closeOrderModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>Order Details - {selectedOrder.orderNumber}</h2>
              <button className="admin-modal__close" onClick={closeOrderModal}>
                ×
              </button>
            </div>

            <div className="admin-modal__content">
              {/* Customer Information */}
              <div className="admin-modal__section">
                <h3>Customer Information</h3>
                <div className="admin-modal__info-grid">
                  <div>
                    <strong>Name:</strong> {selectedOrder.customer.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedOrder.customer.email}
                  </div>
                  {selectedOrder.customer.phone && (
                    <div>
                      <strong>Phone:</strong> {selectedOrder.customer.phone}
                    </div>
                  )}
                  <div>
                    <strong>Address:</strong>
                    <div className="admin-modal__address">
                      {selectedOrder.customer.address && (
                        selectedOrder.customer.address.street ||
                          selectedOrder.customer.address.city ||
                          selectedOrder.customer.address.state ||
                          selectedOrder.customer.address.zipCode ||
                          selectedOrder.customer.address.country ? (
                          <>
                            {selectedOrder.customer.address.street && (
                              <div><strong>Street:</strong> {selectedOrder.customer.address.street}</div>
                            )}
                            {selectedOrder.customer.address.city && (
                              <div><strong>City:</strong> {selectedOrder.customer.address.city}</div>
                            )}
                            {selectedOrder.customer.address.state && (
                              <div><strong>State:</strong> {selectedOrder.customer.address.state}</div>
                            )}
                            {selectedOrder.customer.address.zipCode && (
                              <div><strong>ZIP Code:</strong> {selectedOrder.customer.address.zipCode}</div>
                            )}
                            {selectedOrder.customer.address.country && (
                              <div><strong>Country:</strong> {selectedOrder.customer.address.country}</div>
                            )}
                          </>
                        ) : (
                          <div className="admin-modal__no-data">No address provided</div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Complete Address Summary */}
                  {selectedOrder.customer.address && (
                    selectedOrder.customer.address.street ||
                    selectedOrder.customer.address.city ||
                    selectedOrder.customer.address.state ||
                    selectedOrder.customer.address.zipCode ||
                    selectedOrder.customer.address.country
                  ) && (
                      <div>
                        <strong>Complete Address:</strong>
                        <div className="admin-modal__complete-address">
                          {[
                            selectedOrder.customer.address.street,
                            selectedOrder.customer.address.city,
                            selectedOrder.customer.address.state,
                            selectedOrder.customer.address.zipCode,
                            selectedOrder.customer.address.country
                          ].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Order Items */}
              <div className="admin-modal__section">
                <h3>Order Items</h3>
                <div className="admin-modal__items">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="admin-modal__item">
                      <div className="admin-modal__item-image">
                        {item.image && (
                          <img src={item.image} alt={item.name} />
                        )}
                      </div>
                      <div className="admin-modal__item-details">
                        <div className="admin-modal__item-name">{item.name}</div>
                        <div className="admin-modal__item-specs">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                        <div className="admin-modal__item-price">
                          ₹{item.price.toLocaleString()} × {item.quantity} = ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="admin-modal__section">
                <h3>Payment Information</h3>
                <div className="admin-modal__info-grid">
                  <div>
                    <strong>Payment Status:</strong>
                    <span className={`admin-status admin-status--${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                  {selectedOrder.payment && (
                    <>
                      {selectedOrder.payment.method && (
                        <div>
                          <strong>Payment Method:</strong> {selectedOrder.payment.method}
                        </div>
                      )}
                      {selectedOrder.payment.transactionId && (
                        <div>
                          <strong>Transaction ID:</strong> {selectedOrder.payment.transactionId}
                        </div>
                      )}
                      {selectedOrder.payment.razorpayOrderId && (
                        <div>
                          <strong>Razorpay Order ID:</strong> {selectedOrder.payment.razorpayOrderId}
                        </div>
                      )}
                      {selectedOrder.payment.paidAt && (
                        <div>
                          <strong>Payment Date:</strong> {new Date(selectedOrder.payment.paidAt).toLocaleString()}
                        </div>
                      )}
                      {selectedOrder.payment.amount && (
                        <div>
                          <strong>Amount Paid:</strong> ₹{selectedOrder.payment.amount.toLocaleString()} {selectedOrder.payment.currency}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="admin-modal__section">
                <h3>Order Summary</h3>
                <div className="admin-modal__summary">
                  <div className="admin-modal__summary-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="admin-modal__summary-row">
                    <span>Shipping:</span>
                    <span>₹{selectedOrder.shipping.toLocaleString()}</span>
                  </div>
                  <div className="admin-modal__summary-row">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="admin-modal__summary-row admin-modal__summary-row--total">
                    <span>Total:</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Order Status Controls */}
              <div className="admin-modal__section">
                <h3>Order Management</h3>
                <div className="admin-modal__controls">
                  <div className="admin-modal__control-group">
                    <label>Order Status:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        onStatusUpdate(selectedOrder.id, e.target.value as Order["status"]);
                        setSelectedOrder({ ...selectedOrder, status: e.target.value as Order["status"] });
                      }}
                      className={`admin-form__select admin-form__select--${getStatusColor(selectedOrder.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="admin-modal__control-group">
                    <label>Payment Status:</label>
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(e) => {
                        onPaymentStatusUpdate(selectedOrder.id, e.target.value as Order["paymentStatus"]);
                        setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value as Order["paymentStatus"] });
                      }}
                      className={`admin-form__select admin-form__select--${getPaymentStatusColor(selectedOrder.paymentStatus)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
