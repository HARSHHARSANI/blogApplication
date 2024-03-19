import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../functions/blogFunctions";
import { useNavigate } from "react-router";
import { postComment } from "../functions/blogFunctions";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true); // Start loading
    getAllBlogs()
      .then((response) => {
        setBlogs(response.data);
        const initialComments = {};
        response.data.forEach((blog) => {
          initialComments[blog._id] = "";
        });
        setComments(initialComments);
      })
      .finally(() => setLoading(false)); // Stop loading
  }, []);

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog._id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCommentChange = (blogId, e) => {
    setComments({
      ...comments,
      [blogId]: e.target.value,
    });
  };

  const handleSubmitComment = async (blogId, e) => {
    e.preventDefault();
    const comment = comments[blogId];
    if (blogId && comment.trim() !== "") {
      try {
        await postComment(auth?.user?.token, blogId, comment);
        setComments({
          ...comments,
          [blogId]: "",
        });
        getAllBlogs().then((response) => {
          setBlogs(response.data);
        });
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
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
            className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {loading ? ( // Render spinner if loading
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-slate-300 rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-4">
                  <h2
                    className="text-lg font-semibold mb-2 cursor-pointer"
                    onClick={() => handleCardClick(blog)}
                  >
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{blog.description}</p>
                  <p className="text-sm text-gray-500">
                    Posted by: {blog?.postedBy?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <form onSubmit={(e) => handleSubmitComment(blog._id, e)}>
                    <textarea
                      value={comments[blog._id]}
                      onChange={(e) => handleCommentChange(blog._id, e)}
                      placeholder="Write your comment here..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mt-4"
                    ></textarea>
                    {auth?.user?.token ? (
                      <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Post Comment
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => navigate("/login")}
                      >
                        Login To Comment
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
