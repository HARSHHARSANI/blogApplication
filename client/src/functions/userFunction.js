import axios from "axios";

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/users/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};

export const handleRegister = async (name, email, password) => {
  try {
    console.log("inside handleRegister");
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/users/register`,
      { name, email, password }
    );
    console.log("handleRegister REsponse");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed");
  }
};

export const fetchUserBlogs = async (authtoken, userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/posts/user/${userId}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return [];
  }
};

export const deleteBlog = async (authtoken, blogId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/blogs/${blogId}`,
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
    throw error;
  }
};
