import mongoose from "mongoose";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return false
    if (!process.env.MONGODB_URI) return false

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};