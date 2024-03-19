import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserBlogs, deleteBlog } from "../../functions/userFunction.js";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const BlogPostList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const loadUserBlogs = async () => {
      if (auth && auth?.user && auth?.user?.user?._id) {
        setLoading(true);
        
        const userId = auth.user.user._id;
        const userBlogs = await fetchUserBlogs(auth?.user?.token, userId);
        setBlogs(userBlogs);
        setLoading(false);
      }
    };

    loadUserBlogs();
  }, [auth]);

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(auth?.user?.token, blogId);

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      loadUserBlogs();
      toast.error("Blogs Deleted Successffully", { position: "top-center" });
    } catch (error) {
      console.error("Delete blog error:", error);
      toast.error("Blogs Deleted Successffully", { position: "top-center" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      {auth?.user?.token ? (
        <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
      ) : (
        <h2 className="text-2xl font-bold mb-4">Login To See Your Blogs</h2>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <ul className="space-y-4">
          {blogs?.map((blog) => (
            <li key={blog._id} className="bg-gray-200 shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPostList;
