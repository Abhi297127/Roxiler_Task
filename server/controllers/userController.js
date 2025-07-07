const { pool } = require('../config/db');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

// @desc    Get all stores
// @route   GET /api/user/stores
// @access  Private/User
const getStores = async (req, res, next) => {
  try {
    const { query, values } = Store.getAll();
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Submit or update a rating for a store
// @route   POST /api/user/stores/:id/rate
// @access  Private/User
const rateStore = async (req, res, next) => {
  try {
    const store_id = req.params.id;
    const user_id = req.user.id;
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const { query, values } = Rating.createOrUpdate({ user_id, store_id, rating });
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's rating for a store
// @route   GET /api/user/stores/:id/rating
// @access  Private/User
const getMyRatingForStore = async (req, res, next) => {
  try {
    const store_id = req.params.id;
    const user_id = req.user.id;
    
    const { query, values } = Rating.getByUserAndStore(user_id, store_id);
    const { rows } = await pool.query(query, values);
    
    if (rows.length === 0) {
      return res.json({ rating: null });
    }
    
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStores,
  rateStore,
  getMyRatingForStore
};