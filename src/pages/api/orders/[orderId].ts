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

    const { orderId } = req.query;

    if (!orderId || typeof orderId !== "string") {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        await connectDB();

        console.log('Looking for order with orderNumber:', orderId);
        const order = await Order.findOne({ orderNumber: orderId });
        console.log('Order found:', order ? 'Yes' : 'No');

        if (!order) {
            // Let's also check all orders to see what's in the database
            const allOrders = await Order.find({}).select('orderNumber').limit(5);
            console.log('Available orders:', allOrders.map(o => o.orderNumber));
            return res.status(404).json({ message: "Order not found" });
        }

        // Transform the order data for frontend
        const orderData = {
            id: order.orderNumber,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
            customer: order.customer,
            items: order.items
        };

        res.status(200).json({
            success: true,
            order: orderData
        });

    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({
            message: "Failed to fetch order details",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
