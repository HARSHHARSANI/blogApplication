import blogModel from "../models/blogModel";

export const createPost = async (req, res) => {
  const { title, description } = req.body;

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

  try {
    const posts = await blogModel.find({ author: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
