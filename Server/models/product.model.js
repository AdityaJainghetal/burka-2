const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  barcode: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  color: { type: String },
  fabric: { type: String },
  size: [{ type: String }],
  mrp: { type: Number },
  images: [{ type: String }],
}, {
  timestamps: true
});

module.exports = mongoose.model('product', productSchema);