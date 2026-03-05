import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return false
    if (!process.env.MONGODB_URI) return false

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error);
        NextResponse.json(
            { error: error?.message ?? "Error connecting to MongoDB" },
            { status: 500 }
        );
    }
};