import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { getDefaultToken } from './service';

export const postData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const postRegister = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const loginPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const categoriesPost = async (data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/categories`, data,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const booksPost = async (categoryId, data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/categories/${categoryId}/books`, data,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const favoritePost = async (userId, bookId) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/user/${userId}/book/${bookId}/favorites`, null,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const commentPost = async (userId, bookId, data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/users/${userId}/books/${bookId}/comments`, data,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};
