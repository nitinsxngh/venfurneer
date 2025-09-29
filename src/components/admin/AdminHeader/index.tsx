import Link from "next/link";

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div className="container">
        <div className="admin-header__content">
          <Link href="/admin" className="admin-header__logo">
            <h2>venfurneer Admin</h2>
          </Link>

          <nav className="admin-header__nav">
            <Link href="/admin" className="admin-header__nav-link">
              Dashboard
            </Link>
            <Link href="/admin/categories" className="admin-header__nav-link">
              Categories
            </Link>
            <Link href="/admin/products" className="admin-header__nav-link">
              Products
            </Link>
            <Link href="/admin/orders" className="admin-header__nav-link">
              Orders
            </Link>
            <Link href="/" className="admin-header__nav-link">
              View Store
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
