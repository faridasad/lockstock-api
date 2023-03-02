import { Router } from "express";
import { createPost } from "../controllers/post.controller";
import { uploadImage } from "../controllers/upload.controller";

const router = Router();

router.route("/dalle").post(uploadImage)

router.route("/create").post(createPost);

router.route("/:id").get((req, res) => {
  res.send("Single Post");
});

export default router;
