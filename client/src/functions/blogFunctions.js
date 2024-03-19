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
