// const asyncHandler = require("express-async-handler");
// const Product = require("../models/product.model");
// const Purchase = require("../models/Purchase2.Model");

// // @desc    Get product by barcode number
// // @route   GET /api/purchase/barcode/:barcode
// // @access  Public
// const getProductByBarcode = asyncHandler(async (req, res) => {
//   const { barcode } = req.params;

//   if (!barcode) {
//     console.log("Barcode missing in request");
//     res.status(400);
//     throw new Error("Barcode is required");
//   }

//   console.log("Fetching product for barcodeNumber:", barcode);
//   const product = await Product.findOne({ barcodeNumber: barcode });

//   if (!product) {
//     console.log("Product not found for barcodeNumber:", barcode);
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   console.log("Product found:", product);
//   res.json(product);
// });

// // @desc    Scan and increase purchase stock
// // @route   PUT /api/purchase/scan
// // @access  Public
// const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
//   const { barcode, stock = 1 } = req.body;

//   if (!barcode) {
//     console.log("Barcode missing in request");
//     res.status(400);
//     throw new Error("Barcode is required");
//   }

//   console.log("Scanning barcodeNumber:", barcode, "Quantity:", stock);
//   const product = await Product.findOne({ barcodeNumber: barcode });

//   if (!product) {
//     console.log("Product not found for barcodeNumber:", barcode);
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   // Find or create a purchase record
//   let purchase = await Purchase.findOne({
//     "products.product": product._id
//   });

//   if (purchase) {
//     // Update existing purchase
//     const productEntry = purchase.products.find(p => p.product.toString() === product._id.toString());
//     productEntry.stock = (parseInt(productEntry.stock) || 0) + stock;
//     purchase.stock += stock; // Update top-level stock
//     console.log("Updated purchase stock:", productEntry.stock);
//   } else {
//     // Create new purchase
//     purchase = new Purchase({
//       products: [{ product: product._id, stock }],
//       stock
//     });
//     console.log("Created new purchase for product:", product._id);
//   }

//   await purchase.save();

//   res.json({
//     message: `Quantity increased by ${stock}`,
//     updatedQuantity: purchase.products.find(p => p.product.toString() === product._id.toString()).stock,
//     productId: product._id,
//     purchaseId: purchase._id
//   });
// });

// module.exports = {
//   getProductByBarcode,
//   scanAndIncreaseQuantity
// };



const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const Purchase = require("../models/Purchase2.Model");

// @desc    Get product by barcode number
// @route   GET /api/purchase/barcode/:barcode
// @access  Public
const getProductByBarcode = asyncHandler(async (req, res) => {
  const { barcode } = req.params;

  if (!barcode) {
    console.log("Barcode missing in request");
    res.status(400);
    throw new Error("Barcode is required");
  }

  console.log("Fetching product for barcodeNumber:", barcode);
  const product = await Product.findOne({ barcodeNumber: barcode });

  if (!product) {
    console.log("Product not found for barcodeNumber:", barcode);
    res.status(404);
    throw new Error("Product not found");
  }

  console.log("Product found:", product);
  res.json(product);
});

// @desc    Scan and increase purchase stock and product stock
// @route   PUT /api/purchase/scan
// @access  Public
const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
  const { barcode, stock = 1 } = req.body;

  if (!barcode) {
    console.log("Barcode missing in request");
    res.status(400);
    throw new Error("Barcode is required");
  }

  console.log("Scanning barcodeNumber:", barcode, "Quantity:", stock);
  const product = await Product.findOne({ barcodeNumber: barcode });

  if (!product) {
    console.log("Product not found for barcodeNumber:", barcode);
    res.status(404);
    throw new Error("Product not found");
  }

  // Update product stock
  product.stock = (parseInt(product.stock) || 0) + stock;
  await product.save();
  console.log("Updated product stock:", product.stock);

  // Find or create a purchase record
  let purchase = await Purchase.findOne({
    "products.product": product._id,
  });

  if (purchase) {
    // Update existing purchase
    const productEntry = purchase.products.find(
      (p) => p.product.toString() === product._id.toString()
    );
    productEntry.stock = (parseInt(productEntry.stock) || 0) + stock;
    purchase.stock += stock; // Update top-level stock
    console.log("Updated purchase stock:", productEntry.stock);
  } else {
    // Create new purchase
    purchase = new Purchase({
      products: [{ product: product._id, stock }],
      stock,
    });
    console.log("Created new purchase for product:", product._id);
  }

  await purchase.save();

  res.json({
    message: `Quantity increased by ${stock}`,
    updatedProductStock: product.stock,
    updatedPurchaseQuantity: purchase.products.find(
      (p) => p.product.toString() === product._id.toString()
    ).stock,
    productId: product._id,
    purchaseId: purchase._id,
  });
});

module.exports = {
  getProductByBarcode,
  scanAndIncreaseQuantity,
};