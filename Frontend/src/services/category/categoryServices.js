import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";

//create
export const createAPI = async ({ name, type }) => {
  const token = getUserFromLocalStorage();
  try {
    const response = await axios.post(
      `${BASE_URL}/category/add`,
      {
        name,
        type,
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

// list of Category
export const listsCategoryAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category/lists`);
    // return response data
    return response.data;
  } catch (error) {
    // Handle error if request fails
    throw error;
  }
};
