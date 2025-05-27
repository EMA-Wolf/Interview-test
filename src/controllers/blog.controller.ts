import { Request, Response } from 'express';
import Blog from '../models/blog.model';

// Create a new blog post
export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            console.error('Missing required fields: title, content, or author');
            res.status(400).json({ message: 'Missing required fields: title, content, or author' });
            return; 
        }
        const newBlogPost = new Blog({ title, content, author });
        await newBlogPost.save();

        // edit the new blog post to include only the necessary fields
        let finalBlogPost = { id: newBlogPost._id, title: newBlogPost.title, content: newBlogPost.content, author: newBlogPost.author, createdAt: newBlogPost.createdAt };

        // Log the newly created blog post
        console.log('New blog post created:', finalBlogPost);
        // Return a 201 Created response with the new blog post
        res.status(201).json(finalBlogPost);
        return
    } catch (error) {
        console.error('Error creating blog post:', error);
        // Return a 500 Internal Server Error response
        res.status(500).json({ message: 'Error creating blog post', error });
        return;
    }
};

// Get all blog posts
export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogPosts = await Blog.find();

        // Transform the response to include only the required fields
        const transformedBlogPosts = blogPosts.map((post) => ({
            id: post._id, // Map _id to id
            title: post.title,
            content: post.content,
            author: post.author,
            createdAt: post.createdAt,
        }));

        console.log('Retrieved all blog posts successfully');
        // Return a 200 OK response with the transformed list of blog posts
        res.status(200).json(transformedBlogPosts);
    } catch (error) {
        console.error('Error retrieving blog posts:', error);
        // Return a 500 Internal Server Error response
        res.status(500).json({ message: 'Error retrieving blog posts', error });
    }
};

// Get a single blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        // Validate the ID
        if (!id) {
            console.error('Blog post ID is required');
            // Return a 400 Bad Request response
            res.status(400).json({ message: 'Blog post ID is required' });
            return;
        }

        // Find the blog post by ID
        const blogPost = await Blog.findById(id);
        if (!blogPost) {
            console.error(`Blog post with ID ${id} not found`);
            // Return a 404 Not Found response
            res.status(404).json({ message: 'Blog post not found' });
            return;
        }

        let finalBlogPost = {
            id: blogPost._id, // Map _id to id
            title: blogPost.title,
            content: blogPost.content,
            author: blogPost.author,
            createdAt: blogPost.createdAt,
        };

        // Return a 200 OK response with the blog post
        res.status(200).json(finalBlogPost);
    } catch (error) {
        console.error('Error retrieving blog post:', error);
        // Return a 500 Internal Server Error response
       res.status(500).json({ message: 'Error retrieving blog post', error });
    }
};

// Update a blog post by ID
export const updateBlogPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        // Validate the ID
        if (!id) {
            console.error('Blog post ID is required');
            // Return a 400 Bad Request response
            res.status(400).json({ message: 'Blog post ID is required' });
            return;
        }

        const { title, content, author } = req.body;

        // Validate the required fields
        if (!title || !content || !author) {
            console.error('Missing required fields: title, content, or author');
            // Return a 400 Bad Request response
            res.status(400).json({ message: 'Missing required fields: title, content, or author' });
            return;
        }

        // Find the blog post by ID and update it
        const updatedBlogPost = await Blog.findByIdAndUpdate(id, { title, content, author, updatedAt: Date.now() }, { new: true });

        // Check if the blog post was found and updated
        if (!updatedBlogPost) {
            console.error(`Blog post with ID ${id} not found`);
            // Return a 404 Not Found response
            res.status(404).json({ message: 'Blog post not found' });
            return 
        }

        // Transform the updated blog post to include only the necessary fields
        console.log(`Blog post with ID ${id} updated successfully:`);
        let finalUpdatedBlogPost = {
            id: updatedBlogPost._id, // Map _id to id
            title: updatedBlogPost.title,
            content: updatedBlogPost.content,
            author: updatedBlogPost.author,
            updatedAt: updatedBlogPost.updatedAt,
        };
        // Return a 200 OK response with the updated blog post
        res.status(200).json(finalUpdatedBlogPost);
        return;
    } catch (error) {
        console.error('Error updating blog post:', error);
        // Return a 500 Internal Server Error response
        res.status(500).json({ message: 'Error updating blog post', error });
        return;
    }
};

// Delete a blog post by ID
export const deleteBlogPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        // Validate the ID
        if (!id) {
            console.error('Blog post ID is required');
            // Return a 400 Bad Request response
            res.status(400).json({ message: 'Blog post ID is required' });
            return;
        }

        // Find the blog post by ID and delete it
        const deletedBlogPost = await Blog.findByIdAndDelete(id);

        // Check if the blog post was found and deleted
        if (!deletedBlogPost) {
            console.error(`Blog post with ID ${id} not found`);
            // Return a 404 Not Found response
            res.status(404).json({ message: 'Blog post not found' });
            return;
        }
        // Log the successful deletion of the blog post
        console.log(`Blog post with ID ${id} deleted successfully`);
        // Return a 200 OK response with a success message
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        // Return a 500 Internal Server Error response
        res.status(500).json({ message: 'Error deleting blog post', error });
    }
}