import type { NextApiRequest, NextApiResponse } from "next";

import Category from "../../models/Category";
import connectDB from "../../utils/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        await connectDB();

        const categories = await Category.find({}).sort({
            sortOrder: 1,
            name: 1,
        });

        // Transform MongoDB _id to id for frontend compatibility
        const transformedCategories = categories.map((category) => {
            const categoryObj = category.toObject();
            return {
                ...categoryObj,
                id: categoryObj._id.toString(),
                _id: undefined,
            };
        });

        return res.status(200).json(transformedCategories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ error: "Failed to fetch categories" });
    }
}
