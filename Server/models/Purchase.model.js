// const mongoose = require('mongoose');

// const purchaseSchema = new mongoose.Schema({

//   barcode: { type: String, required: true, unique: true },
  
//   purchaseDate: { type: Date, default: Date.now },
 
// });

// const Product = mongoose.model('purchase', purchaseSchema);

// module.exports = Product;







const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true 
  },
  quantity: { type: Number, required: true, min: 1 },
  purchaseDate: { type: Date, default: Date.now },
 
});

module.exports = mongoose.model('purchase', purchaseSchema);