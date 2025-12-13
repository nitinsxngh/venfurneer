import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../../models/Product";
import connectDB from "../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { pid } = req.query;

  // Validate pid parameter
  if (!pid || typeof pid !== "string" || pid === "undefined") {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    await connectDB();

    const { name, rating, comment, avatar } = req.body;

    // Validate required fields
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: "Name, rating, and comment are required" });
    }

    // Validate rating range
    if (rating < 1 || rating > 5 || !Number.isInteger(Number(rating))) {
      return res.status(400).json({ error: "Rating must be an integer between 1 and 5" });
    }

    // Find the product
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Generate dummy avatar with name
    const dummyAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=random&color=fff&size=128`;

    // Create review object
    const newReview = {
      name: name.trim(),
      avatar: avatar || dummyAvatar,
      description: comment.trim(),
      punctuation: Number(rating),
      createdAt: new Date(),
    };

    // Add review to product
    product.reviews.push(newReview);

    // Update punctuation statistics
    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce((sum: number, review: any) => sum + review.punctuation, 0);
    const averageRating = totalRating / totalReviews;

    // Update votes array (count how many reviews for each rating)
    const votes = [1, 2, 3, 4, 5].map((value) => ({
      value,
      count: product.reviews.filter((r: any) => r.punctuation === value).length,
    }));

    product.punctuation = {
      countOpinions: totalReviews,
      punctuation: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      votes,
    };

    // Save updated product
    await product.save();

    // Transform and return updated product
    const productObj = product.toObject();
    const transformedProduct = {
      ...productObj,
      id: productObj._id.toString(),
      _id: undefined,
    };

    res.status(200).json({
      message: "Review added successfully",
      product: transformedProduct,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
}

