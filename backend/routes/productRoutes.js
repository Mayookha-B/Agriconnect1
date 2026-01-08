const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer= require('multer') // Simple setup for testing


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your root directory
  },
  filename: function (req, file, cb) {
    // Generates: 1736345000000-apple.jpg
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/products/add
// @desc    Add a new crop listing with 2dsphere location
router.post('/add', auth, upload.single('image'),async (req, res) => {
  try {
    const { 
      cropName, 
      category, 
      harvestDate, 
      expiryDate, 
      quantity, 
      price, 
      manualAddress, 
      lat, 
      lon, 
      image 
    } = req.body;

    // Validate coordinates
    if (!lat || !lon) {
      return res.status(400).json({ success: false, message: "Location coordinates are required." });
    }

    const newProduct = new Product({
      farmerId: req.user.id,
      cropName,
      category,
      harvestDate,
      expiryDate,
      quantity,
      price,
      manualAddress,
      image : req.file ? req.file.path : 'uploads/placeholder.jpg',
      // Mapping the flat lat/lon from frontend to GeoJSON [Lon, Lat]
      location: {
        type: 'Point',
        coordinates: [parseFloat(lon), parseFloat(lat)] // MUST BE [LONGITUDE, LATITUDE]
      }
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Crop listing created successfully!",
      product: savedProduct
    });

  } catch (error) {
    console.error("Product Add Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      details: error.message 
    });
  }
});

// @route   GET /api/products/nearby
// @desc    Find crops within a certain radius (Crucial for DeFi Marketplace)
router.get('/nearby', async (req, res) => {
  const { lat, lon, distance = 10 } = req.query; // distance in km

  try {
    const products = await Product.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lon), parseFloat(lat)] },
          $maxDistance: distance * 1000 // Convert km to meters
        }
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching nearby products" });
  }
});


module.exports = router;
