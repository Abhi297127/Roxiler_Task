import axios from 'axios';
import { getToken } from '../utils/auth';

export const fetchStores = async () => {
  const res = await axios.get('http://localhost:3000/stores', {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const addStore = async (store, isOwner = false) => {
  const endpoint = isOwner ? 'owner-create' : 'admin-create';
  const res = await axios.post(`http://localhost:3000/stores/${endpoint}`, store, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
