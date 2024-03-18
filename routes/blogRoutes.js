import express from "express";
import { authCheck } from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPostsByUser,
  getAllPost,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/posts", authCheck, createPost);
router.get("/allposts", getAllPost);
router.get("/posts/user/:userId", authCheck, getPostsByUser);

export default router;
