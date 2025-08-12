import type { NextApiRequest, NextApiResponse } from "next";

import Order from "../../../models/Order";
import connectDB from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("items.product", "name images");

    // Transform MongoDB _id to id for frontend compatibility
    const transformedOrders = orders.map((order) => {
      const orderObj = order.toObject();
      return {
        ...orderObj,
        id: orderObj._id.toString(),
        _id: undefined,
      };
    });

    res.status(200).json(transformedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}
