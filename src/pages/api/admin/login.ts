import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Use consistent JWT_SECRET (in production, this should be an environment variable)
const JWT_SECRET = "sdfkjhsfjkbfjfbrejfbrejbe";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@venfurner.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check credentials (in production, use proper password hashing)
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    email,
                    role: "admin",
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
                },
                JWT_SECRET
            );

            // Return success with token
            res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    email,
                    role: "admin"
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
