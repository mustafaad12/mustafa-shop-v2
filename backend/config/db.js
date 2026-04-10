import dns from 'node:dns';
// Force Node to use Google DNS and ignore the broken system DNS
dns.setServers(['8.8.8.8', '8.8.4.4'])

import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://mustafaaaldaffaie:qweqweqwe123123@cluster0.hrxfgtd.mongodb.net/?appName=Cluster0"
    );
    console.log(`Mongodb Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
