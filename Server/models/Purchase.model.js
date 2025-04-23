
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    quantity: { 
      type: Number, 
      default: 0 
    },
    barcode: { 
      type: String, 
      unique: true,
      required: true
    },
   
    price: {
      type: Number,
      required: true
    },
    description: String,
    image: String
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema)