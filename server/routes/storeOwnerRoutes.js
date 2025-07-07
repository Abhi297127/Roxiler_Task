const express = require('express');
const { 
  getMyStores,
  getStoreRatings
} = require('../controllers/storeOwnerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// All routes protected and only accessible by store owners
router.use(protect);
router.use(authorize('store_owner'));

router.get('/stores', getMyStores);
router.get('/stores/:id/ratings', getStoreRatings);

module.exports = router;