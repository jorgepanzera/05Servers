//import Post, { find, findById, findByIdAndUpdate, findByIdAndRemove } from '../models/post.model';
const Post = require("../models/post.model");

// Get all posts
const getPosts = async (req, res) => {
  console.log(Post);
  const posts = await Post.find().lean();
  return res.json(posts);
};

// Create a new post
const createPost = async (req, res, next) => {
  try {
    // Extraer datos del body
    const postData = req.body;
    console.log(postData);

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
async function getPostById(postId) {
  const post = await findById(postId).lean();
  return post;
}

// Update a post by ID
async function updatePost(postId, updateData) {
  const updatedPost = await findByIdAndUpdate(postId, updateData, {
    new: true,
  });
  return updatedPost;
}

// Delete a post by ID
async function deletePost(postId) {
  await findByIdAndRemove(postId);
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
