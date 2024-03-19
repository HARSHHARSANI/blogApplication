import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBlogById } from "../../functions/blogFunctions";
import { useSelector } from "react-redux";

const IndividualPost = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        setBlog(response);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
          <p className="text-lg mb-6">{blog.description}</p>
          <div className="flex items-center text-sm text-gray-600">
            <p className="mr-2">Posted by: {blog?.postedBy?.name}</p>
            <p>•</p>
            <p className="ml-2">
              Date: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="p-6 bg-gray-200">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {blog.comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <p className="text-gray-600 mb-2">{comment.text}</p>
              <p className="text-sm text-gray-500">By: {comment.user.name}</p>
            </div>
          ))}
          {auth?.user && (
            <div className="mt-4">
              {/* Add your comment input and post button here */}
              {/* For example: */}
              {/* <CommentInput blogId={blogId} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualPost;
