import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = mongoose.connect("mongodb://127.0.0.1:27017/proshop-v2");
    console.log(`Mongodb Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
