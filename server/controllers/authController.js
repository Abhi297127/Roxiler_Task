const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const User = require('../models/User');

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { query, values } = User.findByEmail(email);
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const isMatch = await User.comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, address } = req.body;

    console.log('➡️ Register request:', req.body);

    const { query: checkQuery, values: checkValues } = User.findByEmail(email);
    const { rows } = await pool.query(checkQuery, checkValues);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userQuery = User.create({ name, email, password, address });

    if (!userQuery) {
      return res.status(400).json({ message: 'Invalid registration input' });
    }

    const result = await pool.query(userQuery.query, userQuery.values);
    const newUser = result.rows[0];

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const { query: userQuery, values: userValues } = User.findById(userId);
    const { rows } = await pool.query(userQuery, userValues);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await User.comparePasswords(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { query, values } = User.updatePassword(userId, hashedPassword);
    await pool.query(query, values);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginUser,
  registerUser,
  changePassword
};
