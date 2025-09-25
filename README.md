# VENFURNER - Luxury Furniture E-commerce

A modern, responsive e-commerce platform built with Next.js, featuring luxury furniture products with integrated payment processing, admin dashboard, and comprehensive order management.

## 🚀 Features

- **Modern UI/UX**: Responsive design with SCSS and BEM methodology
- **Payment Integration**: Razorpay payment gateway with secure transaction processing
- **Admin Dashboard**: Complete order and product management system
- **User Authentication**: Secure login/register system with JWT tokens
- **Shopping Cart**: Redux-powered cart with persistent storage
- **Order Management**: Real-time order tracking and status updates
- **Product Catalog**: Dynamic product filtering and search
- **Database Integration**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **State Management**: Redux Toolkit, Redux Persist
- **Styling**: SCSS, BEM methodology
- **Database**: MongoDB with Mongoose
- **Payment**: Razorpay integration
- **Authentication**: JWT tokens
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd venfurneer-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment file
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database Configuration
   MONGODB_URI=your_mongodb_connection_string
   
   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   
   # Admin Authentication
   ADMIN_EMAIL=admin@venfurner.com
   ADMIN_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret_key
   
   # Analytics (Optional)
   NEXT_PUBLIC_ANALYTICS_ID=your_ga_tracking_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The project uses MongoDB for data storage. The database connection is configured in `src/utils/mongodb.ts`.

### Seed Database (Optional)
```bash
npm run seed
```

## 🔧 Backend API

The backend uses Next.js API routes located in `src/pages/api/`:

- **Products**: `/api/products` - Product CRUD operations
- **Orders**: `/api/orders` - Order management
- **Categories**: `/api/categories` - Category management
- **Razorpay**: `/api/razorpay/` - Payment processing
- **Admin**: `/api/admin/` - Admin authentication and management

## 📱 Available Pages

### Customer Pages
- **Home**: `/` - Featured products and hero section
- **Products**: `/products` - Product catalog with filtering
- **Product Detail**: `/product/[id]` - Individual product pages
- **Cart**: `/cart` - Shopping cart management
- **Checkout**: `/cart/checkout` - Secure checkout process
- **Order Confirmation**: `/order-confirmation` - Post-purchase confirmation
- **Login**: `/login` - User authentication
- **Register**: `/register` - User registration
- **Help**: `/help` - Customer support
- **Privacy**: `/privacy` - Privacy policy
- **Terms**: `/terms` - Terms and conditions

### Admin Pages
- **Admin Login**: `/admin/login` - Admin authentication
- **Admin Dashboard**: `/admin` - Overview and statistics
- **Products Management**: `/admin/products` - Add/edit/delete products
- **Orders Management**: `/admin/orders` - Order tracking and updates
- **Categories Management**: `/admin/categories` - Category management

## 🔐 Admin Access

Default admin credentials:
- **Email**: admin@venfurner.com
- **Password**: admin123

*Change these credentials in your `.env.local` file for security.*

## 💳 Payment Integration

The platform integrates with **Razorpay** for secure payment processing:
- Credit/Debit Cards
- UPI payments
- Net Banking
- Digital Wallets
- EMI options (for orders over ₹3,000)

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── checkout/       # Checkout flow components
│   ├── product-*/      # Product-related components
│   └── ...
├── pages/              # Next.js pages and API routes
│   ├── api/           # Backend API endpoints
│   │   ├── admin/     # Admin API routes
│   │   ├── razorpay/  # Payment processing
│   │   └── ...
│   └── ...
├── store/              # Redux store configuration
├── utils/              # Utility functions
├── models/             # Database models
└── types/              # TypeScript type definitions
```

## 🚀 Deployment

The project is configured for easy deployment on Vercel:

1. **Environment Variables**: Set all required environment variables in Vercel dashboard
2. **Database**: Ensure MongoDB connection is accessible
3. **Razorpay**: Configure webhook URLs for payment verification
4. **Build**: The project will automatically build and deploy

## 📊 Features Added (2024)

- ✅ **Razorpay Payment Integration** - Secure payment processing
- ✅ **Admin Dashboard** - Complete order and product management
- ✅ **Order Management System** - Real-time order tracking
- ✅ **Environment Variables** - Secure configuration management
- ✅ **TypeScript Support** - Enhanced type safety
- ✅ **MongoDB Integration** - Persistent data storage
- ✅ **JWT Authentication** - Secure admin access
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **ESLint Configuration** - Code quality standards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [XD Guru E-commerce UI Kit](https://www.xdguru.com/free-xd-ecommerce-ui-kit-by-iceo/)
- Built with Next.js and modern web technologies
- Payment processing by Razorpay

