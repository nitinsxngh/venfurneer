import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        }
    },
    items: [orderItemSchema],
    subtotal: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String
    },
    shippingMethod: {
        type: String
    },
    trackingNumber: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Create indexes
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

// Generate order number before saving
orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `VEN-${Date.now()}-${count + 1}`;
    }
    next();
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema); 