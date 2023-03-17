import Post from "../models/post.model";
import cloudinary from "cloudinary";
import { Request, Response } from "express";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const skip = (page - 1) * perPage;

    const posts = await Post.find().skip(skip).limit(perPage);
    const totalPosts = await Post.countDocuments();

    const totalPages = Math.ceil(totalPosts / perPage);

    const nextPage = page + 1 > totalPages ? null : page + 1;

    res.status(200).json({
      success: true,
      data: posts,
      currentPage: page,
      totalPages,
      totalPosts,
      nextPage,
    });
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
    const { name, prompt, image, blurhash } = req.body;
    const imageUrl = await cloudinary.v2.uploader.upload(image);

    const newPost = await Post.create({
      name,
      prompt,
      image: imageUrl.url,
      blurhash,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
    console.log(err);
  }
};
