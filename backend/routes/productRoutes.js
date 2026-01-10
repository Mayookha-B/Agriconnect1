const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer = require('multer');

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// @route    POST /api/products/add
router.post('/add', auth, upload.single('image'), async (req, res) => {
  try {
    const { cropName, category, harvestDate, expiryDate, quantity, price, manualAddress, lat, lon } = req.body;

    if (!lat || !lon) return res.status(400).json({ success: false, message: "Coordinates required" });

    const newProduct = new Product({
      farmerId: req.user.id,
      cropName,
      category,
      harvestDate,
      expiryDate,
      quantity,
      price,
      manualAddress,
      image: req.file ? req.file.path : 'uploads/placeholder.jpg',
      location: {
        type: 'Point',
        coordinates: [parseFloat(lon), parseFloat(lat)]
      }
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Crop listing created!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route    GET /api/products/my-inventory
// @desc     Fetch only the products belonging to the logged-in farmer
router.get('/my-inventory', auth, async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory" });
  }
});

// @route    DELETE /api/products/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});


// GET /api/products/near?lng=...&lat=...&dist=...
router.get('/near', async (req, res) => {
  const { lng, lat, dist = 50 } = req.query; // dist in km

  try {
    const products = await Product.find({
      location: {
        $near: {
          $geometry: { 
            type: "Point", 
            coordinates: [parseFloat(lng), parseFloat(lat)] 
          },
          $maxDistance: dist * 1000 // Convert km to meters
        }
      }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

module.exports = router;