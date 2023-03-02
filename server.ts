import { config } from "dotenv";
config();
import express from "express";
import { connectDB } from "./utils/connectDB";

import postRouter from "./routes/post.route";


const app = express();
app.use(express.json());
app.use("/api/v1", postRouter);

connectDB(process.env.MONGO_URI!).then(() => {
  console.log("Connected to DB");
});


app.listen({ port: parseInt(process.env.PORT!) }, () => {
  console.log(`Server is running`);
});
