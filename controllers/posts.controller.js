//import Post, { find, findById, findByIdAndUpdate, findByIdAndRemove } from '../models/post.model';
const { CommentsController } = require("moongose/controller");
const Post = require("../models/post.model");

// Get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find().lean();
  return res.json(posts);
};

// Create a new post
const createPost = async (req, res, next) => {
  try {
    // Extraer datos del body
    const postData = req.body;

    // Guardar en BD
    const post = new Post(postData);
    await post.save();

    // Devolver post creado
    return res.status(201).json(post);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

// Get a single post by ID
const getPostById = async (req, res, next) => {

  try {
  const postId = req.params.id || ""

  const post = await Post.findById(postId).lean();

  return res.json(post);
 } catch (error) {
  // Pass the error to the next middleware
  next(error);
}
  
}

// Update a post by ID
const updatePost = async (req, res, next) => {

  try {
  const postId = req.params.id || ""
  const updateData = { ...req.body, updatedAt: new Date() };

  const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
    new: true,
    });

  return res.json(updatedPost);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }

}

// Delete a post by ID
const deletePost = async (req, res, next) => {

  try {
    const postId = req.params.id || ""

    await Post.findByIdAndRemove(postId);

    return res.status(204).send("Post deleted");

    } catch (error) {
      // Pass the error to the next middleware
      next(error);
    }

  
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
