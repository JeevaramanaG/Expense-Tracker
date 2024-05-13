import axios from "axios";
import { BASE_URL } from "../../utils/url";

//login
export const loginAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    // return response data
    return response.data;
  } catch (error) {
    // Handle error if request fails
    throw error;
  }
};

// Register
export const regiterAPI = async ({ email, password, username }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email,
      password,
      username,
    });
    // return response data
    return response.data;
  } catch (error) {
    // Handle error if request fails
    throw error;
  }
};
