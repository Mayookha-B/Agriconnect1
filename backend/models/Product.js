const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  farmerAddress: { type: String, required: true },
  category: { type: String, default: 'Vegetables' },
  imageCid: { type: String }, // IPFS Hash
  
  // GEOLOCATION MODULE
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// CRITICAL: Create the 2dsphere index for proximity searching
productSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Product', productSchema);