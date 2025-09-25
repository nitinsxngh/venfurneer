import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';

import Order from "../../models/Order";
import connectDB from "../../utils/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        const { customerInfo, items, total, status } = req.body;

        // Validate required fields
        if (!customerInfo || !items || !total) {
            return res.status(400).json({
                message: "Missing required fields: customerInfo, items, and total are required"
            });
        }

        // Validate customer info
        const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'phoneNumber', 'country'];
        for (const field of requiredFields) {
            if (!customerInfo[field]) {
                return res.status(400).json({
                    message: `Missing required customer information: ${field}`
                });
            }
        }

        // Validate items
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item"
            });
        }

        // Generate order number
        const count = await Order.countDocuments();
        const orderNumber = `VEN-${Date.now()}-${count + 1}`;

        // Create order object
        const order = new Order({
            orderNumber,
            customer: {
                name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                email: customerInfo.email,
                phone: customerInfo.phoneNumber,
                address: {
                    street: customerInfo.address,
                    city: customerInfo.city,
                    state: '',
                    zipCode: customerInfo.postalCode,
                    country: customerInfo.country
                }
            },
            items: items.map(item => ({
                product: new mongoose.Types.ObjectId(), // Generate a new ObjectId for now
                name: item.name,
                price: item.price,
                quantity: item.count,
                size: item.size || '',
                color: item.color || '',
                image: item.thumb || ''
            })),
            subtotal: total, // Use total as subtotal
            total: total,
            status: status || 'pending'
        });

        console.log('Creating order with data:', JSON.stringify({
            orderNumber: orderNumber,
            customer: order.customer,
            itemsCount: order.items.length,
            total: total
        }, null, 2));

        // Save order to database
        const savedOrder = await order.save();
        console.log('Order saved successfully with ID:', savedOrder.orderNumber);

        // Return success response
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            id: orderNumber,
            order: {
                id: orderNumber,
                total,
                status: savedOrder.status,
                createdAt: savedOrder.createdAt
            }
        });

    } catch (error) {
        console.error("Order creation error:", error);

        // Check if it's a MongoDB connection error
        if (error instanceof Error && error.message.includes('MongoNetworkError')) {
            return res.status(500).json({
                message: "Database connection failed. Please try again later.",
                error: "Database connection error"
            });
        }

        res.status(500).json({
            message: "Failed to create order. Please try again.",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
