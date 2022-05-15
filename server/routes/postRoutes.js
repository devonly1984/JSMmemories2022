import {
	createPost,
	deletePost,
	getPost,
	getPostBySearch,
	getPosts,
	likePost,
	updatePost
} from "../controllers/postController.js";

import auth from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.get('/search', getPostBySearch);
router.get('/:id',getPost)
export default router;
