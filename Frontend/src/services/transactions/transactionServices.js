import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";

//! Get the token
const token = getUserFromLocalStorage();
//! Add
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      category,
      date,
      description,
      amount,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};
//! update
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
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
  //Return a promise
  return response.data;
};
//! delete
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `jeeva ${token}`,
    },
  });
  //Return a promise
  return response.data;
};
//! lists
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(`${BASE_URL}/transaction/filter`, {
    params: { category, endDate, startDate, type },
    headers: {
      Authorization: `jeeva ${token}`,
    },
  });
  //Return a promise
  return response.data;
};
