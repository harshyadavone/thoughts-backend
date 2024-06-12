// postRoutes.ts

import express from "express";
import multer from "multer";
import postController from "../controllers/postController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// Route to create a new post
router.post("/", upload.single("imageFile"), postController.createPost);

// Route to get all posts
router.get("/get-posts", express.json(), postController.getPosts);

// Route to get posts by author ID
router.get("/posts/author/:authorId", express.json(), postController.getPostsByAuthor);

// Route to get a specific post by ID
router.get("/:postId", express.json(), postController.getPostById);

export default router;
