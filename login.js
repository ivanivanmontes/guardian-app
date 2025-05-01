import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your actual backend URL

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};