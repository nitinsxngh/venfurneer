import type { NextApiRequest, NextApiResponse } from "next";

import Category from "../../../models/Category";
import connectDB from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const categories = await Category.find({}).sort({
        sortOrder: 1,
        name: 1,
      });

      // Transform MongoDB _id to id for frontend compatibility
      const transformedCategories = categories.map((category) => {
        const categoryObj = category.toObject();
        return {
          ...categoryObj,
          id: categoryObj._id.toString(),
          _id: undefined,
        };
      });

      res.status(200).json(transformedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  } else if (req.method === "POST") {
    try {
      const categoryData = req.body;

      // Generate slug if not provided
      if (!categoryData.slug) {
        categoryData.slug = categoryData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      const newCategory = new Category(categoryData);
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
