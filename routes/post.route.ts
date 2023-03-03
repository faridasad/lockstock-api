import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
} from "../controllers/post.controller";
import { uploadImage } from "../controllers/upload.controller";

const router = Router();

router.route("/dalle").post(uploadImage);

router.route("/create").post(createPost);

router.route("/").get(getAllPosts);

router.route("/:id").get(getSinglePost);
export default router;
