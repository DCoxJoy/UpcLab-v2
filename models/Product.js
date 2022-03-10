const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
 
  productname: {
    type: String,
    required: true
  },
  producttype: {
    type: String
  },
  packgtype: {
    type: String
  },
  productline: {
    type: String
  },
  devicetype: {
    type: String
  },
  devicebrand: {
    type: String
  },
  upc: {
    type: String
  },
  innercarton: {
    type: String
  },
  mastercarton: {
    type: String
  },
  modelsku: {
    type: String
  },
  pkgid: {
    type: String
  },
  specs: {
    type: String
  },
  status: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('product', ProductSchema);