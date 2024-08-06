import axios from 'axios';
import { getDefaultToken } from './service';
const API_URL = import.meta.env.VITE_API_URL;

export const deleteData = async (id) => {
  try {
    const resp = await axios.delete(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting data ${error.message}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.delete(`${API_URL}/api/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting data ${error.message}`);
  }
};

export const deleteBook = async (id) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.delete(`${API_URL}/api/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting data ${error.message}`);
  }
};

export const deleteFavorite = async (userId, bookId) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.delete(`${API_URL}/api/users/${userId}/books/${bookId}/favorites`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting data ${error.message}`);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.delete(`${API_URL}/api/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting data ${error.message}`);
  }
};
