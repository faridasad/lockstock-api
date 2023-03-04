import Post from "../models/post.modell";
import cloudinary from "cloudinary";
import { Request, Response } from "express";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({ success: true, data: post });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { name, prompt, image } = req.body;
    const imageUrl = await cloudinary.v2.uploader.upload(image);

    const newPost = await Post.create({
      name,
      prompt,
      image: imageUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
