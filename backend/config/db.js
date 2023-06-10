import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
