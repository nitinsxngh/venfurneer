import type { NextApiRequest, NextApiResponse } from "next";

import Order from "../../../models/Order";
import Product from "../../../models/Product";
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
      .populate({
        path: "items.product",
        select: "name images",
        model: Product
      });

    console.log('Admin Orders API: Found orders:', orders.length);
    console.log('Admin Orders API: Orders data:', JSON.stringify(orders, null, 2));

    // Transform MongoDB _id to id for frontend compatibility
    const transformedOrders = orders.map((order) => {
      const orderObj = order.toObject();
      return {
        ...orderObj,
        id: orderObj._id.toString(),
        _id: undefined,
      };
    });

    console.log('Admin Orders API: Transformed orders:', transformedOrders.length);
    res.status(200).json(transformedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}
