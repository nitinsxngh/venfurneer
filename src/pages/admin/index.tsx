import Link from "next/link";
import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import ProtectedRoute from "../../components/admin/ProtectedRoute";

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  avgOrderValue: number;
  conversionRate: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    avgOrderValue: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon,
    color,
    trend,
    trendValue,
  }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
  }) => {
    // Safely format the value
    const formatValue = (val: number | string) => {
      if (typeof val === "number") {
        // Check if this is a revenue field (contains "Revenue" in title)
        if (title.toLowerCase().includes("revenue")) {
          return `₹${val.toLocaleString()}`;
        }
        return val.toLocaleString();
      }
      return val;
    };

    return (
      <div className={`dashboard-stat-card dashboard-stat-card--${color}`}>
        <div className="dashboard-stat-card__header">
          <div className="dashboard-stat-card__icon">{icon}</div>
          {trend && (
            <div
              className={`dashboard-stat-card__trend dashboard-stat-card__trend--${trend}`}
            >
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}{" "}
              {trendValue}
            </div>
          )}
        </div>
        <div className="dashboard-stat-card__content">
          <h3 className="dashboard-stat-card__title">{title}</h3>
          <p className="dashboard-stat-card__value">{formatValue(value)}</p>
        </div>
      </div>
    );
  };

  const QuickActionCard = ({
    title,
    description,
    icon,
    href,
    variant,
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    variant: "add" | "manage" | "view";
  }) => (
    <Link href={href} className={`quick-action quick-action--${variant}`}>
      <div className="quick-action__icon">{icon}</div>
      <div className="quick-action__title">{title}</div>
      <div className="quick-action__description">{description}</div>
    </Link>
  );

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Dashboard">
          <div className="admin-page">
            <div className="admin-page__content">
              <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "4px solid #f1f5f9",
                    borderTop: "4px solid var(--color-primary)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 1rem",
                  }}
                ></div>
                <p style={{ color: "var(--color-text-light)", margin: 0 }}>
                  Loading dashboard...
                </p>
              </div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout title="Dashboard">
        <div className="admin-page">
          {/* Page Header */}
          <div className="admin-page__header">
            <div className="admin-page__header-content">
              <div className="admin-page__header-left">
                <h1>Dashboard</h1>
                <p>
                  Welcome to your venfurneer admin panel. Here&apos;s an overview of
                  your store performance.
                </p>
              </div>
              <div className="admin-page__header-right">
                <div className="admin-page__stats">
                  <div className="admin-page__stat">
                    <span className="admin-page__stat-label">Total Products</span>
                    <span className="admin-page__stat-value">
                      {stats.totalProducts}
                    </span>
                  </div>
                  <div className="admin-page__stat">
                    <span className="admin-page__stat-label">Pending Orders</span>
                    <span className="admin-page__stat-value admin-page__stat-value--warning">
                      {stats.pendingOrders}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="admin-page__content">
            {/* Stats Cards */}
            <div className="dashboard-stats">
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                }
                color="purple"
                trend="up"
                trendValue="+12%"
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                }
                color="green"
                trend="up"
                trendValue="+8%"
              />
              <StatCard
                title="Total Revenue"
                value={stats.totalRevenue}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 6v2m0 8v2"></path>
                  </svg>
                }
                color="gold"
                trend="up"
                trendValue="+15%"
              />
              <StatCard
                title="Monthly Revenue"
                value={stats.monthlyRevenue}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                  </svg>
                }
                color="teal"
                trend="up"
                trendValue="+22%"
              />
            </div>

            {/* Performance Metrics */}
            <div className="dashboard-metrics">
              <h2>Performance Metrics</h2>
              <div className="dashboard-metrics-grid">
                <div className="dashboard-metric">
                  <div className="dashboard-metric__label">
                    Average Order Value
                  </div>
                  <div className="dashboard-metric__value">
                    ₹{(stats.avgOrderValue || 0).toLocaleString()}
                  </div>
                  <div className="dashboard-metric__change dashboard-metric__change--positive">
                    +12.5%
                  </div>
                </div>
                <div className="dashboard-metric">
                  <div className="dashboard-metric__label">Conversion Rate</div>
                  <div className="dashboard-metric__value">
                    {(stats.conversionRate || 0).toFixed(1)}%
                  </div>
                  <div className="dashboard-metric__change dashboard-metric__change--positive">
                    +3.2%
                  </div>
                </div>
                <div className="dashboard-metric">
                  <div className="dashboard-metric__label">Categories</div>
                  <div className="dashboard-metric__value">
                    {stats.totalCategories}
                  </div>
                  <div className="dashboard-metric__change dashboard-metric__change--positive">
                    +5.1%
                  </div>
                </div>
                <div className="dashboard-metric">
                  <div className="dashboard-metric__label">Pending Orders</div>
                  <div className="dashboard-metric__value">
                    {stats.pendingOrders}
                  </div>
                  <div className="dashboard-metric__change dashboard-metric__change--negative">
                    -2.3%
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-actions">
              <div className="dashboard-action-card">
                <h3>Quick Actions</h3>
                <p>
                  Manage your store efficiently with these quick access features.
                </p>
                <div className="quick-actions">
                  <QuickActionCard
                    title="Add Product"
                    description="Create a new perfume product with all details and images"
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    }
                    href="/admin/products"
                    variant="add"
                  />
                  <QuickActionCard
                    title="Manage Categories"
                    description="Organize your products with categories and subcategories"
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    }
                    href="/admin/categories"
                    variant="manage"
                  />
                  <QuickActionCard
                    title="View Orders"
                    description="Track and manage customer orders and shipping status"
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                    }
                    href="/admin/orders"
                    variant="view"
                  />
                </div>
              </div>

              <div className="dashboard-action-card">
                <h3>Recent Activity</h3>
                <p>Stay updated with the latest activities in your store.</p>
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "var(--color-success)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0 0 0.25rem 0",
                          fontWeight: "500",
                          color: "var(--color-text)",
                        }}
                      >
                        New order received
                      </p>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-light)",
                        }}
                      >
                        2 minutes ago
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "var(--color-info)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0 0 0.25rem 0",
                          fontWeight: "500",
                          color: "var(--color-text)",
                        }}
                      >
                        Product inventory updated
                      </p>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-light)",
                        }}
                      >
                        15 minutes ago
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "var(--color-warning)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: "0 0 0.25rem 0",
                          fontWeight: "500",
                          color: "var(--color-text)",
                        }}
                      >
                        Low stock alert
                      </p>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-light)",
                        }}
                      >
                        1 hour ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
