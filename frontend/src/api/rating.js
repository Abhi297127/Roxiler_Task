import axios from 'axios';
import { getToken } from '../utils/auth';

export const fetchRatings = async () => {
  const res = await axios.get('http://localhost:3000/ratings', {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const submitRating = async (rating) => {
  const res = await axios.post('http://localhost:3000/ratings', rating, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const updateRating = async (id, value) => {
  const res = await axios.put(`http://localhost:3000/ratings/${id}`, { value }, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
