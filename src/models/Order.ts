import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
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
});

const orderSchema = new mongoose.Schema(
  {
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
    items: [orderItemSchema],
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
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
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
    payment: {
      method: {
        type: String,
        enum: ["razorpay", "cod", "other"],
      },
      transactionId: String,
      razorpayOrderId: String,
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
      amount: Number,
      currency: {
        type: String,
        default: "INR",
      },
      paidAt: Date,
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
  },
  {
    timestamps: true,
  },
);

// Create indexes
orderSchema.index({ "customer.email": 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

// Generate order number before saving only if not provided
orderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    try {
      if (mongoose.connection.db) {
        const count = await mongoose.connection.db.collection("orders").countDocuments();
        this.orderNumber = `VEN-${Date.now()}-${count + 1}`;
      } else {
        this.orderNumber = `VEN-${Date.now()}-1`;
      }
    } catch (error) {
      // Fallback if collection doesn't exist yet
      this.orderNumber = `VEN-${Date.now()}-1`;
    }
  }
  next();
});

// Ensure the model is registered
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
