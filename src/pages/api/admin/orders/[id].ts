import type { NextApiRequest, NextApiResponse } from "next";

import Order from "../../../../models/Order";
import connectDB from "../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB();

  const { id } = req.query;

  // Validate id parameter
  if (!id || typeof id !== "string" || id === "undefined") {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  if (req.method === "GET") {
    try {
      const order = await Order.findById(id).populate(
        "items.product",
        "name images",
      );

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  } else if (req.method === "PUT") {
    try {
      const updateData = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).populate("items.product", "name images");

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Failed to update order" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
