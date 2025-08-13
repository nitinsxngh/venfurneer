import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../models/Product";
import Category from "../../../models/Category";
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

        // Get all categories
        const categories = await Category.find({ isActive: true }).sort({
            sortOrder: 1,
            name: 1,
        });

        // Get all products to extract unique sizes, colors, and price range
        const products = await Product.find({});

        // Extract unique categories from products (handle both ObjectId and string references)
        const allCategories = new Set<string>();
        products.forEach(product => {
            if (product.category) {
                if (typeof product.category === 'string') {
                    allCategories.add(product.category);
                } else if (product.category.name) {
                    allCategories.add(product.category.name);
                }
            }
        });

        // Extract unique sizes
        const allSizes = new Set<string>();
        products.forEach(product => {
            if (product.sizes) {
                product.sizes.forEach((size: string) => allSizes.add(size));
            }
        });

        // Extract unique colors
        const allColors = new Set<string>();
        products.forEach(product => {
            if (product.colors) {
                product.colors.forEach((color: string) => allColors.add(color));
            }
        });

        // Get price range
        const prices = products.map(p => p.currentPrice).filter(p => p !== undefined);
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

        // Transform categories for frontend compatibility
        // Use categories from database if available, otherwise use extracted ones
        let transformedCategories;
        if (categories.length > 0) {
            transformedCategories = categories.map((category) => {
                const categoryObj = category.toObject();
                return {
                    ...categoryObj,
                    id: categoryObj._id.toString(),
                    _id: undefined,
                };
            });
        } else {
            // Fallback to extracted category names
            transformedCategories = Array.from(allCategories).map((categoryName, index) => ({
                id: `temp-${index}`,
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                isActive: true,
                sortOrder: index,
            }));
        }

        const filterOptions = {
            categories: transformedCategories,
            sizes: Array.from(allSizes).sort(),
            colors: Array.from(allColors).sort(),
            priceRange: {
                min: minPrice,
                max: maxPrice,
            },
        };

        console.log('Filter options being returned:', filterOptions);

        res.status(200).json(filterOptions);
    } catch (error) {
        console.error("Error fetching filter options:", error);
        res.status(500).json({ error: "Failed to fetch filter options" });
    }
}
