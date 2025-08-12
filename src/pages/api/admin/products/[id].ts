import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../../models/Product";
import connectDB from "../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB();

  const { id } = req.query;

  // Validate id parameter
  if (!id || typeof id !== "string" || id === "undefined") {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  if (req.method === "PUT") {
    try {
      const productData = req.body;

      // Convert category id back to ObjectId for MongoDB if it's being updated
      if (productData.category && typeof productData.category === "string") {
        try {
          productData.category = new mongoose.Types.ObjectId(
            productData.category,
          );
        } catch {
          return res.status(400).json({ error: "Invalid category ID format" });
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Transform the updated product for frontend compatibility
      const productObj = updatedProduct.toObject();
      const transformedProduct = {
        ...productObj,
        id: productObj._id.toString(),
        _id: undefined,
      };

      res.status(200).json(transformedProduct);
    } catch {
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "PATCH") {
    try {
      const updateData = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Transform the updated product for frontend compatibility
      const productObj = updatedProduct.toObject();
      const transformedProduct = {
        ...productObj,
        id: productObj._id.toString(),
        _id: undefined,
      };

      res.status(200).json(transformedProduct);
    } catch {
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
