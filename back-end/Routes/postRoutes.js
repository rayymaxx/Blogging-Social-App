/*import express from 'express';
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

*/

//const express = require('express');
import mongoose from 'mongoose';
import express from 'express';
//const mongoose = require('mongoose');
const router = express.Router();

import { protect as verifyJWT } from '../middleware/authMiddleware.js';


// Mongoose models (simplified)
//const Post = require('./models/Post');
//import Post from './models/Post'; // Post model is defined in models/Post.js
import User from '../models/User.js'; // User model is defined in models/User.js
import Post from '../models/Post.js'; // Post model is defined in models/Post.js
//const User = require('./models/User');
import Comment from '../models/Comment.js'; // Comment model is defined in models/Comment.js
//const Comment = require('./models/Comment');

// --- 1. GET /api/posts?page=1&limit=10: Pagination + author details ---
router.get('/posts', async (req, res) => {
try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1 || limit < 1) {
    return res.status(400).json({ error: 'Page and limit must be positive integers' });
    }

    // Aggregation to lookup author info
    const posts = await Post.aggregate([
    { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      { $unwind: '$authorDetails' },
      {
        $project: {
          title: 1,
          summary: 1,
          views: 1,
          createdAt: 1,
          'authorDetails._id': 1,
          'authorDetails.username': 1,
          'authorDetails.email': 1,
        },
      },
    ]);

    res.json({ page, limit, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 2. GET /api/posts/:id: Single post + author + comments, increment views ---
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    // Find post with author details
    const post = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      { $unwind: '$authorDetails' },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post',
          as: 'comments',
        },
      },
    ]);

    if (!post || post.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });

    res.json(post[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 3. POST /api/posts/:id/comments: Add comment (JWT required) ---
router.post('/posts/:id/comments', verifyJWT, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id; // From JWT middleware
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = new Comment({
      author: userId,
      post: postId,
      content,
      createdAt: new Date(),
    });

    await comment.save();

    res.status(201).json({ message: 'Comment added', comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 4. POST /api/posts: Create post (JWT required) ---
router.post('/posts', verifyJWT, async (req, res) => {
  const userId = req.user.id;
  const { title, content, summary } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }

  try {
    const newPost = new Post({
      author: userId,
      title,
      content,
      summary,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 5. PUT /api/posts/:id: Edit post (owner only) ---
router.put('/posts/:id', verifyJWT, async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const { title, content, summary } = req.body;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized: Not the post owner' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.summary = summary || post.summary;
    post.updatedAt = new Date();

    await post.save();
    res.json({ message: 'Post updated', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 6. DELETE /api/posts/:id: Delete post (owner only) ---
router.delete('/posts/:id', verifyJWT, async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized: Not the post owner' });
    }

    await post.remove();
    // Optionally delete related comments
    await Comment.deleteMany({ post: postId });

    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 7. POST /api/posts/:id/like: Like/unlike a post (JWT required) ---
router.post('/posts/:id/like', verifyJWT, async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const likesSet = new Set(post.likes.map(id => id.toString()));

    if (likesSet.has(userId)) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      return res.json({ message: 'Post unliked' });
    } else {
      // Like
      post.likes.push(userId);
      await post.save();
      return res.json({ message: 'Post liked' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//module.exports = router;
export default router;