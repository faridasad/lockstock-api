import mongoose from "mongoose";

export interface PostProps extends mongoose.Document {
  name: string;
  image: string;
  prompt: string;
  blurhash: string;
}

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    blurhash: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model<PostProps>("Post", PostSchema, "posts");
