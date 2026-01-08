const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Search products near a user
router.get('/near', async (req, res) => {
  const { lng, lat, maxDist = 50000 } = req.query; // maxDist in meters

  try {
    const nearby = await Product.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDist)
        }
      }
    });
    res.json(nearby);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;