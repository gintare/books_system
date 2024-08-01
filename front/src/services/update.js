import axios from 'axios';
import { getDefaultToken } from './service';
const API_URL = import.meta.env.VITE_API_URL;

export const updateData = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/${id}`, data);
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateCategory = async (id, data) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.put(`${API_URL}/api/categories/${id}`, data,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateBook = async (category_id, id, data) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.put(`${API_URL}/api/categories/${category_id}/books/${id}`, data,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};
