import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = express.Router();

postRouter
  .route("/create-post")
  .post(verifyJWT, upload.single("postImage"), createPost);

export default postRouter;
