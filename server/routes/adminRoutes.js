const express = require('express');
const { 
  getDashboardStats,
  createUser,
  getUsers,
  createStore,
  getStores
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes, only admin can access
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/stores', createStore);
router.get('/stores', getStores);

module.exports = router;
