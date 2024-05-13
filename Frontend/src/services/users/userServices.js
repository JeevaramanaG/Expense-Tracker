import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";

//! Get the token
const token = getUserFromLocalStorage();

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

export const changePasswordAPI = async ({ newpassword }) => {
  const response = await axios.put(
    `${BASE_URL}/users/change-password`,
    {
      newpassword,
    },
    {
      headers: {
        Authorization: `jeeva ${token}`,
      },
    }
  );
  // return response data
  return response.data;
};

export const updateProfileAPI = async ({ email, username }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/update-profile`,
      {
        email,
        username,
      },
      {
        headers: {
          Authorization: `jeeva ${token}`,
        },
      }
    );
    // return response data
    return response.data;
  } catch (error) {
    // Handle error if request fails
    throw error;
  }
};
