const express = require('express');
const { 
  getAllStores,
  getStore
} = require('../controllers/storeController');

const router = express.Router();

router.get('/', getAllStores);
router.get('/:id', getStore);

module.exports = router;