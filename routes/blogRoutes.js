import express from "express";
import { authCheck } from "./authMiddleware";
import { createPost, getPostsByUser } from "../controllers/blogController";

const router = express.Router();

router.post("/posts", authCheck, createPost);

router.get("/posts/user/:userId", authCheck, getPostsByUser);

export default router;
