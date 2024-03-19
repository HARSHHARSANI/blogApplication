import express from "express";
import { authCheck } from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPostsByUser,
  getAllPost,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/posts", authCheck, createPost);
router.get("/allposts", getAllPost);
router.get("/posts/user/:userId", authCheck, getPostsByUser);
router.delete("/blogs/:blogId", authCheck, deleteBlog);

export default router;
