import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../functions/blogFunctions";
import { useNavigate } from "react-router";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs().then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const handleCardClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      {JSON.stringify(blogs)}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleCardClick(blog._id)}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <p className="text-sm text-gray-500">
                  Posted by: {blog.postedBy.name}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
