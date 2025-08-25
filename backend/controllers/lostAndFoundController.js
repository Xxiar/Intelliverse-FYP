const LostAndFoundItem = require('../models/LostAndFoundItem');

// @desc    Get all lost/found items
// @route   GET /api/lost
const getAllItems = async (req, res) => {
  try {
    const items = await LostAndFoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a new lost/found item
// @route   POST /api/lost
const reportItem = async (req, res) => {
  try {
    const newItem = new LostAndFoundItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
};


// @desc    Claim a lost/found item
// @route   PUT /api/lost/:id/claim
const claimItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // later from auth

    const item = await LostAndFoundItem.findByIdAndUpdate(
      id,
      {
        status: 'claimed',
        claimedBy: userId,
        claimedAt: new Date()
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item successfully claimed',
      item
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// @desc    Delete a lost/found item (Admins only)
// @route   DELETE /api/lost/:id
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await LostAndFoundItem.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


module.exports = {
  getAllItems,
  reportItem,
  claimItem,
  deleteItem,
};
