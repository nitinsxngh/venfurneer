import type { NextApiRequest, NextApiResponse } from "next";
import { verifyRazorpayPayment } from "../../../utils/razorpay";
import connectDB from "../../../utils/mongodb";
import Order from "../../../models/Order";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { orderId, paymentId, signature, orderNumber } = req.body;

        // Validate required fields
        if (!orderId || !paymentId || !signature || !orderNumber) {
            return res.status(400).json({
                message: "Missing required fields: orderId, paymentId, signature, and orderNumber are required"
            });
        }

        // Verify payment signature
        const isPaymentVerified = await verifyRazorpayPayment(orderId, paymentId, signature);

        if (!isPaymentVerified) {
            return res.status(400).json({
                message: "Payment verification failed"
            });
        }

        // Connect to database
        await connectDB();

        // Update order status to confirmed
        const updatedOrder = await Order.findOneAndUpdate(
            { orderNumber: orderNumber },
            {
                status: 'confirmed',
                payment: {
                    method: 'razorpay',
                    transactionId: paymentId,
                    razorpayOrderId: orderId,
                    status: 'completed',
                    amount: req.body.amount || 0,
                    currency: 'INR',
                    paidAt: new Date()
                }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order: {
                id: updatedOrder.orderNumber,
                status: updatedOrder.status,
                payment: updatedOrder.payment
            }
        });

    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({
            message: "Failed to verify payment. Please try again.",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
