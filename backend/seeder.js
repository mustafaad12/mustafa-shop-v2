import { connectDB } from "./config/db.js";
// models
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import dotenv from "dotenv";
//sample data
import users from "./sample data/users.js";
import products from "./sample data/products.js";
//color to style the command
import colors from "colors";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const sampleUsers = await User.insertMany(users);

    const admin = sampleUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: admin };
    });

    await Product.insertMany(sampleProducts);

    console.log("successfully added sample data".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("successfully destroyed the database".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
