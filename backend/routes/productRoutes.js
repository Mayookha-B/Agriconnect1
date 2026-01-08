const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products/near?lng=...&lat=...&dist=50000
router.get('/near', async (req, res) => {
  const { lng, lat, dist } = req.query; // dist in meters, e.g., 50000 for 50km

  try {
    const nearbyProducts = await Product.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(dist) || 50000 
        }
      }
    });

    res.json(nearbyProducts);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

module.exports = router;