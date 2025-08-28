const LostAndFoundItem = require('../models/LostAndFoundItem');

// @desc    Get all lost/found items with optional search, filters, pagination & sorting
// @route   GET /api/lost?search=phone&status=lost&page=1&limit=10&sort=oldest
const getAllItems = async (req, res) => {
  try {
    const { search, status, reportedBy, claimedBy, page = 1, limit = 10, sort = 'newest' } = req.query;

    let filter = {};

    if (status) filter.status = status; // "lost", "found", "claimed"
    if (reportedBy) filter.reportedBy = reportedBy;
    if (claimedBy) filter.claimedBy = claimedBy;

    if (search) {
      filter.$or = [
        { itemName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Convert page & limit
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    // Sorting logic
    let sortOption = { createdAt: -1 }; // default newest first
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    // Count total items for pagination metadata
    const totalItems = await LostAndFoundItem.countDocuments(filter);

    // Fetch items with skip + limit + sort
    const items = await LostAndFoundItem.find(filter)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      success: true,
      page: pageNum,
      limit: limitNum,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      sort,
      items
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
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

    const item = await LostAndFoundItem.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // If item has an image, delete it from uploads folder
    if (item.imageUrl) {
      const imagePath = path.join(__dirname, '..', item.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imagePath}`, err);
        } else {
          console.log(`Image deleted: ${imagePath}`);
        }
      });
    }

    // Now delete item from DB
    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Item and associated image deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// @desc    Create a new lost/found item WITH image
// @route   POST /api/lost/with-image
const reportItemWithImage = async (req, res) => {
  try {
    const newItemData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    const newItem = new LostAndFoundItem(newItemData);
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
};



module.exports = {
  getAllItems,
  reportItem,
  claimItem,
  deleteItem,
  reportItemWithImage
};
