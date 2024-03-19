import axios from "axios";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/allposts`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postBlog = async (authtoken, blog) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/posts`,
      { blog },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (authtoken, blogId, comment) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/blogs/${blogId}/comments`,
      { comment },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

export const getCommentsByBlog = async (blogId) => {
  try {
    const response = await axios.get(`/api/blogs/${blogId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch comments");
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/blogs/${blogId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blog");
  }
};
