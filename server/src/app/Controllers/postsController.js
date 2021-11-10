const Post = require("../Models/posts");
const post = async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status,
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Successfully!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//////GET METHOD/// Post
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/////Update METHOD
const updatePost = async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: " Title is required" });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }
    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {}
};

//////DELETE METHOD
const deletePost = async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(deleteCondition);
    if (!deletePost) {
      return res
        .status(401)
        .json({ success: false, message: "Post not found" });
    }
    res.json({ success: true,message:"deleted successfully", post: deletePost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  post: post,
  getPosts: getPosts,
  updatePost: updatePost,
  deletePost: deletePost,
};
