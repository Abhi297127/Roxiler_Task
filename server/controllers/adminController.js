const { pool } = require('../config/db');
const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const { query, values } = Rating.getStats();
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new user (admin, store owner, or normal user)
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;
    
    // Check if user already exists
    const { query: checkQuery, values: checkValues } = User.findByEmail(email);
    const { rows } = await pool.query(checkQuery, checkValues);
    
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const { query, values } = User.create({ name, email, password, address, role });
    const result = await pool.query(query, values);
    const newUser = result.rows[0];
    
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      role: newUser.role
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const { query, values } = User.getAll(role);
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new store
// @route   POST /api/admin/stores
// @access  Private/Admin
const createStore = async (req, res, next) => {
  try {
    const { name, email, address, owner_id } = req.body;
    
    // Check if owner exists and is a store owner
    const { query: ownerQuery, values: ownerValues } = User.findById(owner_id);
    const { rows: ownerRows } = await pool.query(ownerQuery, ownerValues);
    
    if (ownerRows.length === 0 || ownerRows[0].role !== 'store_owner') {
      return res.status(400).json({ message: 'Invalid store owner' });
    }
    
    // Create store
    const { query, values } = Store.create({ name, email, address, owner_id });
    const result = await pool.query(query, values);
    const newStore = result.rows[0];
    
    res.status(201).json(newStore);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all stores
// @route   GET /api/admin/stores
// @access  Private/Admin
const getStores = async (req, res, next) => {
  try {
    const { query, values } = Store.getAll();
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardStats,
  createUser,
  getUsers,
  createStore,
  getStores
};