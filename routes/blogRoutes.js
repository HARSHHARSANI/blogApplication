import express from "express";
import { authCheck } from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPostsByUser,
  getAllPost,
  deleteBlog,
  postComment,
  getCommentsByBlog,
  getBlogById, // Import the controller function for getting a blog by ID
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/posts", authCheck, createPost);
router.get("/allposts", getAllPost);
router.get("/posts/user/:userId", authCheck, getPostsByUser);
router.delete("/blogs/:blogId", authCheck, deleteBlog);
router.post("/blogs/:blogId/comments", authCheck, postComment);
router.get("/blogs/:blogId/comments", authCheck, getCommentsByBlog);

router.get("/blogs/:blogId", getBlogById);

export default router;
