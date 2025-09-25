import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ||
  "mongodb+srv://gomaterial:gomaterial%40123@admin-gomaterial.r3p4ezm.mongodb.net/venfurner?retryWrites=true&w=majority&appName=Admin-Gomaterial";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default connectDB;
