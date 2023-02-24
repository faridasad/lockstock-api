import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectDB = async (uri : string) => {
  mongoose.set("strictQuery", true);
  try {
    mongoose.connect(uri, {
        dbName: process.env.DB_NAME,
    })
  } catch (err) {
    console.log(err);
  }
};
