import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBlog } from "../../functions/blogFunctions";
import { toast } from "react-toastify";

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));
  if (window != undefined) {
    const auth = window.localStorage.getItem("token");
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your axios post request here
      const blogData = {
        title,
        description,
      };

      const response = await postBlog(auth?.user?.token, blogData);
      if (response) {
        console.log("blog saved successfully ", response);
        setMessage("Blog saved successfully!");
        setTitle("");
        setDescription("");
        navigate("/");
        toast.success("Blogs Created Successffully", {
          position: "top-center",
        });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Blog save error:", error);
      toast.error("Error Occured", {
        position: "top-center",
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 pt-4 bg-gray-300 rounded-2xl px-6 pb-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
      <form
        onSubmit={auth.user ? handleSubmit : handleLoginRedirect}
        className="space-y-4"
      >
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        {auth.user ? (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save Blog
          </button>
        ) : (
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleLoginRedirect}
          >
            Login To Create Post
          </button>
        )}
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default BlogPostForm;
