import axios from 'axios';


export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`http://127.0.0.1:5000/register`, {
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
    const response = await axios.post(`http://127.0.0.1:5000/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};