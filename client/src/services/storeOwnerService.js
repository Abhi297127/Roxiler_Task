import api from './api';

export const getStoresByOwner = (ownerId) => {
  return api.get(`/stores/owner/${ownerId}`);
};

export const getStoreRatings = (storeId) => {
  return api.get(`/stores/${storeId}`);
};