import api from './api';

export const getDashboardStats = () => {
  return api.get('/admin/dashboard');
};

export const getUsers = () => {
  return api.get('/admin/users');
};

export const createUser = (userData) => {
  return api.post('/admin/users', userData);
};

export const getStores = () => {
  return api.get('/admin/stores');
};

export const createStore = (storeData) => {
  return api.post('/admin/stores', storeData);
};