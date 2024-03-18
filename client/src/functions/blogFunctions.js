import axios from "axios";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/allposts`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
