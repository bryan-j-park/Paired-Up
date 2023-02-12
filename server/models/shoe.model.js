const mongoose = require('mongoose');
const ShoeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: [String],
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
  },
  imgUrls: {
    type: [String],
  },
  brand: {
    type: String,
  },
  categories: {
    type: [String],
  },
  colors: {
    type: [String],
  }
}, {timestamps: true});
module.exports.Shoe = mongoose.model('Shoe', ShoeSchema);