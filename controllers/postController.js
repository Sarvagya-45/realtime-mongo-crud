const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    // Real-time broadcast
    req.io.emit("postCreated", post);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Real-time broadcast
    req.io.emit("postDeleted", req.params.id);

    res.json({
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
