


const asyncHandler = require("express-async-handler");
const Product = require("../models/Purchase.model");

// @desc    Get product by barcode
// @route   GET /api/products/barcode/:barcode
// @access  Public
const getProductByBarcode = async function scanBarcode(barcode) {
  try {
      const product = await Product.findOne({ barcode: barcode });
      if (product) {
          product.quantity += 1; // Increment quantity
          await product.save(); // Save the updated product
          console.log(`Quantity updated: ${product.quantity}`);
      } else {
          console.log('Product not found');
      }
  } catch (error) {
      console.error('Error updating quantity:', error);
  }
}

const purchaseproduct =async (req, res) => {
  
    try {
      const product = await Product.findOne({ barcode: req.params.barcode });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
      const { barcode } = req.body;
    
      if (!barcode) {
        res.status(400);
        throw new Error("Barcode is required");
      }
    
      const product = await Product.findOne({ barcode });
    
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
    
      product.quantity += 1;
      await product.save();
    
      res.json({
        message: "Quantity increased by 1",
        updatedQuantity: product.quantity,
        productId: product._id,
      });
    });
  
 

module.exports = {
  getProductByBarcode,
  scanAndIncreaseQuantity,
  purchaseproduct
};
