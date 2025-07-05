import axios from 'axios';

export const loginUser = async (data) => {
  const res = await axios.post('http://localhost:3000/auth/login', data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post('http://localhost:3000/auth/register', data);
  return res.data;
};
