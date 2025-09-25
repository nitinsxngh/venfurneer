import type { NextApiRequest, NextApiResponse } from "next";
import { createRazorpayOrder } from "../../../utils/razorpay";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { amount, currency = "INR", receipt, notes } = req.body;

        // Validate required fields
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Amount is required and must be greater than 0"
            });
        }

        if (!receipt) {
            return res.status(400).json({
                message: "Receipt is required"
            });
        }

        // Convert amount to paise (Razorpay expects amount in smallest currency unit)
        const amountInPaise = Math.round(amount * 100);

        // Create Razorpay order
        const order = await createRazorpayOrder({
            amount: amountInPaise,
            currency,
            receipt,
            notes: notes || {}
        });

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
                status: order.status,
                created_at: order.created_at
            }
        });

    } catch (error) {
        console.error("Razorpay order creation error:", error);
        res.status(500).json({
            message: "Failed to create Razorpay order. Please try again.",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
