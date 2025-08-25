const express = require('express');
const router = express.Router();
const {
  getAllItems,
  reportItem,
  claimItem,
  deleteItem
} = require('../controllers/lostAndFoundController');

const { authenticate, authorize } = require('../middleware/auth');

// Routes
router.get('/', getAllItems);
router.post('/', reportItem);
router.put('/:id/claim', claimItem);

// ✅ Delete restricted to admins
router.delete('/:id', authenticate, authorize('admin'), deleteItem);

module.exports = router;
