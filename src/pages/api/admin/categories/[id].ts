import type { NextApiRequest, NextApiResponse } from "next";

import Category from "../../../../models/Category";
import connectDB from "../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB();

  const { id } = req.query;

  // Validate id parameter
  if (!id || typeof id !== "string" || id === "undefined") {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  if (req.method === "PUT") {
    try {
      const categoryData = req.body;

      // Generate slug if not provided
      if (!categoryData.slug) {
        categoryData.slug = categoryData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        categoryData,
        { new: true, runValidators: true },
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Failed to update category" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
