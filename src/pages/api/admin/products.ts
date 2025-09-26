import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../models/Product";
import connectDB from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB();

  if (req.method === "GET") {
    try {
      let products;
      try {
        products = await Product.find({})
          .populate("category", "name slug")
          .sort({ createdAt: -1 });
      } catch (populateError) {
        console.warn(
          "Populate failed, fetching products without category details:",
          populateError,
        );
        // Fallback: fetch products without populate
        products = await Product.find({}).sort({ createdAt: -1 });
      }

      // Transform MongoDB _id to id for frontend compatibility and filter out invalid products
      const transformedProducts = products
        .filter((product) => product && product.name) // Filter out products with null/undefined names
        .map((product) => {
          const productObj = product.toObject();

          // Handle cases where category might not be populated
          let category = productObj.category;
          if (category && typeof category === "object" && category._id) {
            category = {
              id: category._id.toString(),
              name: category.name || "Unknown Category",
              slug: category.slug || "unknown-category",
            };
          }

          return {
            ...productObj,
            id: productObj._id.toString(),
            _id: undefined,
            category: category,
          };
        });

      res.status(200).json(transformedProducts);
    } catch {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    try {
      const productData = req.body;

      // Convert category id back to ObjectId for MongoDB
      if (productData.category && typeof productData.category === "string") {
        try {
          productData.category = new mongoose.Types.ObjectId(
            productData.category,
          );
        } catch {
          return res.status(400).json({ error: "Invalid category ID format" });
        }
      }

      // Set default punctuation and reviews for new products
      const newProduct = new Product({
        ...productData,
        punctuation: {
          countOpinions: 0,
          punctuation: 0,
          votes: [
            { value: 1, count: 0 },
            { value: 2, count: 0 },
            { value: 3, count: 0 },
            { value: 4, count: 0 },
            { value: 5, count: 0 },
          ],
        },
        reviews: [],
      });

      const savedProduct = await newProduct.save();

      // Transform the saved product for frontend compatibility
      const productObj = savedProduct.toObject();
      const transformedProduct = {
        ...productObj,
        id: productObj._id.toString(),
        _id: undefined,
      };

      res.status(201).json(transformedProduct);
    } catch {
      res.status(500).json({ error: "Failed to create product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
