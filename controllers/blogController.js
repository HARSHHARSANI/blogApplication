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

export const postComment = async (req, res) => {
  const { comment } = req.body;
  const { blogId } = req.params;
  const userId = req.user._id;

  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({ user: userId, text: comment });
    const updatedBlog = await blog.save();

    res.status(201).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Failed to post comment" });
  }
};

export const getCommentsByBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comments = blog.comments;
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

export const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  try {
    console.log("inside getBlogById");
    const blog = await blogModel
      .findById(blogId)
      .populate("postedBy")
      .populate("comments.user", "name");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    console.log(blog);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};
