import express from 'express';
const router = express.Router();
import { createBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPostById, deleteBlogPostById } from '../controllers/blog.controller';

// Create a new blog post
router.post('/blogs', createBlogPost);

// Get all blog posts
router.get('/blogs', getAllBlogPosts);

// Get a single blog post by ID
router.get('/blogs/:id', getBlogPostById);

// Update a blog post by ID
router.put('/blogs/:id', updateBlogPostById);

// Delete a blog post by ID
router.delete('/blogs/:id', deleteBlogPostById);

export default router;