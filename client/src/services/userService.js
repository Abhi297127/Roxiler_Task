import api from './api';

export const getStores = () => {
  return api.get('/stores');
};

export const getStoreById = (storeId) => {
  return api.get(`/stores/${storeId}`);
};

export const submitRating = (storeId, rating, comment) => {
  return api.post('/ratings', { storeId, rating, comment });
};

export const getUserRatingForStore = (storeId) => {
  return api.get(`/ratings/user/${storeId}`);
};