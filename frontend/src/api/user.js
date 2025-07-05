import axios from 'axios';
import { getToken } from '../utils/auth';

export const fetchUsers = async () => {
  const res = await axios.get('http://localhost:3000/users', {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
