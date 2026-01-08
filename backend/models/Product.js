const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  harvestDate: { type: Date, required: true }, //
  expiryDate: { type: Date, required: true },  //
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  }
});

productSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Product', productSchema);