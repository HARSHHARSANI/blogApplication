import blogModel from "../models/blogModel.js";

export const createPost = async (req, res) => {
  const { title, description } = req.body.blog;

  const newPost = new blogModel({
    title,
    description,
    postedBy: req.user._id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const posts = await blogModel.find({ postedBy: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPosts = await blogModel.find({}).populate("postedBy");
    return res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
