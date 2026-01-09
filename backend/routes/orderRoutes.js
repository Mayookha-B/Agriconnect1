const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// @route    GET /api/orders/my-orders
// @desc     Get all orders for the logged-in farmer
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ farmerId: req.user.id })
      .populate('productId', 'cropName category')
      .populate('consumerId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching orders" });
  }
});

module.exports = router;