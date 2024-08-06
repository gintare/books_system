import axios from 'axios';
import { getDefaultToken } from './service';
const API_URL = import.meta.env.VITE_API_URL;

export const getAllData = async () => {
  try {
    const resp = await axios.get(API_URL);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOne = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getAllCategories = async () => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/categories`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllBooks = async () => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/books`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOneBook = async (id) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getBooksByCategories = async (category_id) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/categories/${category_id}/books`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getIsFavorite = async (userId, bookId) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/users/${userId}/books/${bookId}/favorites`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error getIsFavorite : ${error.message}`);
  }
};

export const getFavoritesByUser = async (userId) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/users/${userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error getIsFavorite : ${error.message}`);
  }
};

export const getCommentsByBook = async (bookId) => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/books/${bookId}/comments`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error getIsFavorite : ${error.message}`);
  }
};
