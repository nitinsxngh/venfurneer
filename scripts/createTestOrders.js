const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://gomaterial:gomaterial%40123@admin-gomaterial.r3p4ezm.mongodb.net/venfurner?retryWrites=true&w=majority&appName=Admin-Gomaterial';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Order Schema (simplified for testing)
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        image: {
            type: String,
        },
    }],
    subtotal: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Number,
        default: 0,
    },
    tax: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
    },
    shippingMethod: {
        type: String,
    },
    trackingNumber: {
        type: String,
    },
    notes: {
        type: String,
    },
}, {
    timestamps: true,
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// Create test orders
const createTestOrders = async () => {
    try {
        // First, let's get a product ID to reference
        const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}));
        const products = await Product.find({}).limit(1);

        if (products.length === 0) {
            console.log('No products found. Please run seedDatabase.js first.');
            return;
        }

        const productId = products[0]._id;

        // Create test orders
        const testOrders = [
            {
                orderNumber: `VEN-${Date.now()}-1`,
                customer: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+91 98765 43210",
                    address: {
                        street: "123 Main Street",
                        city: "Mumbai",
                        state: "Maharashtra",
                        zipCode: "400001",
                        country: "India"
                    }
                },
                items: [{
                    product: productId,
                    name: "Test Perfume",
                    price: 999,
                    quantity: 2,
                    size: "100ml",
                    color: "Gold"
                }],
                subtotal: 1998,
                shipping: 0,
                tax: 0,
                total: 1998,
                status: "pending",
                paymentStatus: "pending"
            },
            {
                orderNumber: `VEN-${Date.now()}-2`,
                customer: {
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    phone: "+91 98765 43211",
                    address: {
                        street: "456 Oak Avenue",
                        city: "Delhi",
                        state: "Delhi",
                        zipCode: "110001",
                        country: "India"
                    }
                },
                items: [{
                    product: productId,
                    name: "Test Perfume",
                    price: 1499,
                    quantity: 1,
                    size: "50ml",
                    color: "Silver"
                }],
                subtotal: 1499,
                shipping: 0,
                tax: 0,
                total: 1499,
                status: "processing",
                paymentStatus: "paid"
            },
            {
                orderNumber: `VEN-${Date.now()}-3`,
                customer: {
                    name: "Bob Johnson",
                    email: "bob.johnson@example.com",
                    phone: "+91 98765 43212",
                    address: {
                        street: "789 Pine Road",
                        city: "Bangalore",
                        state: "Karnataka",
                        zipCode: "560001",
                        country: "India"
                    }
                },
                items: [{
                    product: productId,
                    name: "Test Perfume",
                    price: 2499,
                    quantity: 3,
                    size: "200ml",
                    color: "Black"
                }],
                subtotal: 7497,
                shipping: 0,
                tax: 0,
                total: 7497,
                status: "shipped",
                paymentStatus: "paid"
            }
        ];

        // Insert test orders
        for (const orderData of testOrders) {
            const order = new Order(orderData);
            await order.save();
            console.log(`Created order: ${order.orderNumber}`);
        }

        console.log('Test orders created successfully!');

        // Verify orders were created
        const totalOrders = await Order.countDocuments();
        console.log(`Total orders in database: ${totalOrders}`);

    } catch (error) {
        console.error('Error creating test orders:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the script
createTestOrders();
