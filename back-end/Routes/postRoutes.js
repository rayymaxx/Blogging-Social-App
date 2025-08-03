import express from 'express';
import {
createPost,
getAllPosts,
getSinglePost,
updatePost,
deletePost,
likePost,
addComment,
deleteComment
} from '../controllers/postController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getSinglePost);

// Protected Routes
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

// Like and Comment
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);
router.delete('/:id/comment/:commentId', protect, adminOnly, deleteComment);

export default router;
