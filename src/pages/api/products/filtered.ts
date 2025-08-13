import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

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

        const {
            minPrice,
            maxPrice,
            category,
            sizes,
            colors,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build filter object
        const filter: any = {};

        // Price filter
        if (minPrice || maxPrice) {
            filter.currentPrice = {};
            if (minPrice) filter.currentPrice.$gte = Number(minPrice);
            if (maxPrice) filter.currentPrice.$lte = Number(maxPrice);
        }

        // Category filter
        if (category) {
            if (Array.isArray(category)) {
                // Handle multiple categories - check if they're ObjectIds or strings
                const categoryFilters = category.map(cat => {
                    const catStr = cat.toString();
                    if (catStr.startsWith('temp-')) {
                        // This is a temporary category ID, we'll filter by name later
                        return catStr;
                    } else if (mongoose.Types.ObjectId.isValid(catStr)) {
                        return new mongoose.Types.ObjectId(catStr);
                    }
                    return catStr;
                });

                // Check if we have any temporary category IDs
                const tempCategories = categoryFilters.filter(cat => {
                    const catStr = cat.toString();
                    return catStr.startsWith('temp-');
                });
                const validObjectIds = categoryFilters.filter(cat => {
                    const catStr = cat.toString();
                    return !catStr.startsWith('temp-');
                });

                if (tempCategories.length > 0 && validObjectIds.length > 0) {
                    // Mixed case - need to handle both
                    filter.$or = [
                        { category: { $in: validObjectIds } },
                        { category: { $in: tempCategories.map(cat => String(cat).replace('temp-', '')) } }
                    ];
                } else if (tempCategories.length > 0) {
                    // Only temporary categories - filter by name
                    filter.category = { $in: tempCategories.map(cat => String(cat).replace('temp-', '')) };
                } else {
                    // Only valid ObjectIds
                    filter.category = { $in: validObjectIds };
                }
            } else {
                // Handle single category
                const categoryStr = category.toString();
                if (categoryStr.startsWith('temp-')) {
                    // This is a temporary category ID, filter by name
                    filter.category = categoryStr.replace('temp-', '');
                } else if (mongoose.Types.ObjectId.isValid(categoryStr)) {
                    filter.category = new mongoose.Types.ObjectId(categoryStr);
                } else {
                    filter.category = categoryStr;
                }
            }
        }

        // Size filter
        if (sizes) {
            if (Array.isArray(sizes) && sizes.length > 0) {
                filter.sizes = { $in: sizes };
            } else if (typeof sizes === 'string') {
                filter.sizes = { $in: [sizes] };
            }
        }

        // Color filter
        if (colors) {
            if (Array.isArray(colors) && colors.length > 0) {
                filter.colors = { $in: colors };
            } else if (typeof colors === 'string') {
                filter.colors = { $in: [colors] };
            }
        }

        // Build sort object
        const sort: any = {};
        sort[sortBy as string] = sortOrder === "desc" ? -1 : 1;

        console.log('Filter object:', filter);
        console.log('Sort object:', sort);

        const products = await Product.find(filter).sort(sort);

        console.log('Found products:', products.length);

        // Transform MongoDB _id to id for frontend compatibility
        const transformedProducts = products.map((product) => {
            const productObj = product.toObject();
            return {
                ...productObj,
                id: productObj._id.toString(),
                _id: undefined,
            };
        });

        res.status(200).json(transformedProducts);
    } catch (error) {
        console.error("Error fetching filtered products:", error);
        res.status(500).json({ error: "Failed to fetch filtered products" });
    }
}
