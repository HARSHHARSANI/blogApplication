import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../functions/blogFunctions";
import { useNavigate } from "react-router";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs().then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const handleCardClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleCardClick(blog._id)}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <p className="text-sm text-gray-500">
                  Posted by: {blog?.postedBy?.name}
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
