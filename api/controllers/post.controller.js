import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Post from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw new ApiError(404, "All fields are required");
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const postImagePath = req.file?.path;

    if (!postImagePath) {
      throw new ApiError(404, "Post image path not found");
    }

    const postImage = await uploadOnCloudinary(postImagePath);

    if (!postImage) {
      throw new ApiError(404, "PostImage from cloudinary not found");
    }

    const post = await Post.create({
      title,
      content,
      postImage: postImage.url,
      userId: req.user._id,
      slug,
    });

    if (!post) {
      throw new ApiError(400, "post creation process failed");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, post, "post created successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

export { createPost };
