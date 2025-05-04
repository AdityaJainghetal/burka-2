const asyncHandler = require('express-async-handler');
const Purchase = require('../models/Purchase.model');
const Product = require('../models/product.model');

// @desc    Get product by barcode
// @route   GET /api/purchase/barcode/:barcode
// @access  Public
const getProductByBarcode = asyncHandler(async (req, res) => {
  const { barcode } = req.params;

  if (!barcode) {
    res.status(400);
    throw new Error('Barcode is required');
  }

  const product = await Product.findOne({ barcode }).populate('category subCategory');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// @desc    Record or update purchase by barcode
// @route   PUT /api/purchase/scan
// @access  Public
const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
  const { barcode, quantity = 1 } = req.body;

  if (!barcode) {
    res.status(400);
    throw new Error('Barcode is required');
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be a positive integer');
  }

  const product = await Product.findOne({ barcode });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let purchase = await Purchase.findOne({ 'products.product': product._id });
  if (!purchase) {
    purchase = new Purchase({
      products: [{ product: product._id, quantity }],
      purchaseDate: new Date()
    });
  } else {
    const productIndex = purchase.products.findIndex(p => p.product.toString() === product._id.toString());
    if (productIndex > -1) {
      purchase.products[productIndex].quantity += quantity;
    } else {
      purchase.products.push({ product: product._id, quantity });
    }
  }

  await purchase.save();
  const updatedPurchase = await Purchase.findById(purchase._id).populate('products.product');

  // Update product stock
  product.stock += quantity;
  await product.save();

  res.json({
    message: `Purchase recorded, quantity increased by ${quantity}`,
    updatedPurchase,
    productId: product._id
  });
});

module.exports = {
  getProductByBarcode,
  scanAndIncreaseQuantity
};