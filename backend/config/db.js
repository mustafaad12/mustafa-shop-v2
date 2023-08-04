import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://mustafaAldaffaie:qweqweqwe123123@cluster0.badzx.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`Mongodb Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
