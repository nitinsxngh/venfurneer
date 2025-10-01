import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    sizePrices: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        currentPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    punctuation: {
      countOpinions: {
        type: Number,
        default: 0,
      },
      punctuation: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      votes: [
        {
          value: {
            type: Number,
            min: 1,
            max: 5,
          },
          count: {
            type: Number,
            min: 0,
          },
        },
      ],
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        punctuation: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Create indexes for better performance
productSchema.index({ name: "text", category: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
