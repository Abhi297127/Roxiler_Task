const { pool } = require('../config/db');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

// @desc    Get all stores owned by the current user
// @route   GET /api/store-owner/stores
// @access  Private/StoreOwner
const getMyStores = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const { query, values } = Store.getByOwner(owner_id);
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Get ratings for a specific store
// @route   GET /api/store-owner/stores/:id/ratings
// @access  Private/StoreOwner
const getStoreRatings = async (req, res, next) => {
  try {
    const store_id = req.params.id;
    const owner_id = req.user.id;
    
    // Verify the store belongs to the owner
    const { query: storeQuery, values: storeValues } = Store.getById(store_id);
    const { rows: storeRows } = await pool.query(storeQuery, storeValues);
    
    if (storeRows.length === 0 || storeRows[0].owner_id !== owner_id) {
      return res.status(403).json({ message: 'Not authorized to access this store' });
    }
    
    // Get ratings
    const { query, values } = Rating.getByStore(store_id);
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyStores,
  getStoreRatings
};