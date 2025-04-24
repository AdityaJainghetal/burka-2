const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({

  barcode: { type: String, required: true, unique: true },
  
  purchaseDate: { type: Date, default: Date.now },
 
});

const Product = mongoose.model('purchase', purchaseSchema);

module.exports = Product;