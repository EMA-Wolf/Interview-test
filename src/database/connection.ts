import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process with failure
    }
}