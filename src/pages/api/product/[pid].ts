import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../models/Product";
import connectDB from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { pid } = req.query;

  // Validate pid parameter
  if (!pid || typeof pid !== "string" || pid === "undefined") {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    await connectDB();

    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Transform MongoDB _id to id for frontend compatibility
    const productObj = product.toObject();
    const transformedProduct = {
      ...productObj,
      id: productObj._id.toString(),
      _id: undefined,
    };

    res.status(200).json(transformedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
