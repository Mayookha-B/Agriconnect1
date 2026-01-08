const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Grains', 'Vegetables', 'Fruits'],
    default: 'Grains'
  },
  harvestDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  manualAddress: {
    type: String,
    required: true
  },
  
  // --- UPDATED GEOLOCATION FOR 2DSPHERE ---
  location: {
    type: {
      type: String,
      enum: ['Point'], // Must be 'Point'
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  
  image: {
    type: String,
    default: 'placeholder.jpg'
  },
  status: {
    type: String,
    enum: ['Available', 'Sold Out', 'In Transit'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// --- CRITICAL: ADDING THE 2DSPHERE INDEX ---
ProductSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Product', ProductSchema);