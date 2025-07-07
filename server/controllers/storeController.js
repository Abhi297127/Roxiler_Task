// controllers/storeController.js

const { pool } = require('../config/db');
const Store = require('../models/Store');

// @desc    Get all stores (public)
// @route   GET /api/stores
// @access  Public
const getAllStores = async (req, res) => {
  try {
    const { query, values } = Store.getAll();
    const { rows } = await pool.query(query, values);

    // If no stores found, return empty array
    res.json(rows);
  } catch (err) {
    console.error('Error fetching stores:', err);
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};

// @desc    Get a single store (public)
// @route   GET /api/stores/:id
// @access  Public
const getStore = async (req, res) => {
  try {
    const { query, values } = Store.getById(req.params.id);
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching store:', err);
    res.status(500).json({ message: 'Failed to fetch store' });
  }
};

module.exports = {
  getAllStores,
  getStore,
};
