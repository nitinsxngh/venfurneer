import type { NextApiRequest, NextApiResponse } from "next";

import Category from "../../../models/Category";
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

    // Get counts
    const [totalProducts, totalCategories, totalOrders, pendingOrders] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Order.countDocuments(),
        Order.countDocuments({ status: "pending" }),
      ]);

    // Calculate total revenue from completed orders
    const completedOrders = await Order.find({
      status: { $in: ["delivered", "shipped"] },
      paymentStatus: "paid",
    });

    const totalRevenue = completedOrders.reduce(
      (sum, order) => sum + order.total,
      0,
    );

    // Calculate monthly revenue (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyOrders = await Order.find({
      createdAt: { $gte: thirtyDaysAgo },
      status: { $in: ["delivered", "shipped"] },
      paymentStatus: "paid",
    });

    const monthlyRevenue = monthlyOrders.reduce(
      (sum, order) => sum + order.total,
      0,
    );

    // Calculate average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Mock conversion rate (in a real app, this would be calculated from analytics)
    const conversionRate = 3.2;

    res.status(200).json({
      totalProducts,
      totalCategories,
      totalOrders,
      pendingOrders,
      totalRevenue,
      monthlyRevenue,
      avgOrderValue,
      conversionRate,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
}
