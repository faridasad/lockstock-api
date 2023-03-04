import { config } from "dotenv";
import cors from "cors";
config();
import express from "express";
import { connectDB } from "./utils/connectDB";

import postRouter from "./routes/post.route";

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use("/api/v1", postRouter);

connectDB(process.env.MONGO_URI!).then(() => {
  console.log("Connected to DB");
});

app.listen({ port: parseInt(process.env.PORT!) }, () => {
  console.log(`Server is running`);
});
