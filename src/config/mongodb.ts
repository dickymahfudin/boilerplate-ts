import mongoose from "mongoose";
import { env } from "./config";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectMongoDB;
