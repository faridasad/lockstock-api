import mongoose from "mongoose";

export interface Post extends mongoose.Document {
  title: string;
  image: string;
  description: string;
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Post>("Post", PostSchema, "posts");
