import Post from "../models/post.model";
import { Configuration, OpenAIApi } from "openai";

export const createPost = async (req: any, res: any) => {
  res.send("Post created");
};
