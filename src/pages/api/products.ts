import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../models/Product";
import connectDB from "../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    // Transform MongoDB _id to id for frontend compatibility
    const transformedProducts = products.map((product) => {
      const productObj = product.toObject();
      return {
        ...productObj,
        id: productObj._id.toString(),
        _id: undefined,
      };
    });

    res.status(200).json(transformedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
