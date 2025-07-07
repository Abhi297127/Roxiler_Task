const express = require('express');
const {
  getStores,
  rateStore,
  getMyRatingForStore
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { pool } = require('../config/db');

const router = express.Router();

// ✅ First, require authentication for all routes
router.use(protect);

// ✅ Profile route accessible to ANY authenticated user
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ All routes BELOW here require role = 'user'
router.use(authorize('user'));

// Store-related routes
router.get('/stores', getStores);
router.post('/stores/:id/rate', rateStore);
router.get('/stores/:id/rrating', getMyRatingForStore);

module.exports = router;
