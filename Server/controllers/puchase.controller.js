const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model"); // Assuming Product model exists
const Purchase = require("../models/Purchase.model");

// @desc    Get product by barcode
// @route   GET /api/purchase/barcode/:barcode
// @access  Public
const getProductByBarcode = asyncHandler(async (req, res) => {
  const { barcode } = req.params;

  if (!barcode) {
    res.status(400);
    throw new Error("Barcode is required");
  }

  console.log("Fetching product for barcode:", barcode);
  const product = await Product.findOne({ barcode });

  if (!product) {
    console.log("Product not found for barcode:", barcode);
    res.status(404);
    throw new Error("Product not found");
  }

  console.log("Product found:", product);
  res.json(product);
});

// @desc    Scan and increase purchase quantity
// @route   PUT /api/purchase/scan
// @access  Public
const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
  const { barcode, quantity = 1 } = req.body;

  if (!barcode) {
    console.log("Barcode missing in request");
    res.status(400);
    throw new Error("Barcode is required");
  }

  console.log("Scanning barcode:", barcode, "Quantity:", quantity);
  const product = await Product.findOne({ barcode });

  if (!product) {
    console.log("Product not found for barcode:", barcode);
    res.status(404);
    throw new Error("Product not found");
  }

  // Find or create a purchase record
  let purchase = await Purchase.findOne({
    "products.product": product._id
  });

  if (purchase) {
    // Update existing purchase
    const productEntry = purchase.products.find(p => p.product.toString() === product._id.toString());
    productEntry.quantity = (parseInt(productEntry.quantity) || 0) + quantity;
    console.log("Updated purchase quantity:", productEntry.quantity);
  } else {
    // Create new purchase
    purchase = new Purchase({
      products: [{ product: product._id, quantity }],
      quantity // Top-level quantity for backward compatibility
    });
    console.log("Created new purchase for product:", product._id);
  }

  await purchase.save();

  res.json({
    message: `Quantity increased by ${quantity}`,
    updatedQuantity: purchase.products.find(p => p.product.toString() === product._id.toString()).quantity,
    productId: product._id,
    purchaseId: purchase._id
  });
});

module.exports = {
  getProductByBarcode,
  scanAndIncreaseQuantity
};