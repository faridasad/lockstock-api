import { config } from "dotenv";
config();
import express from "express";
import { connectDB } from "./utils/connectDB";

import postRouter from "./routes/post.route";


const app = express();
app.use(express.json());
app.use("/api/post", postRouter);

connectDB(process.env.MONGO_URI!).then(() => {
  console.log("Connected to DB");
});




app.get("/", (req, res) => {
  res.send("Hi mom");
});

app.post("/", async (req, res) => {
  

});

app.listen({ port: parseInt(process.env.PORT!) }, () => {
  console.log(`Server is running`);
});
