// const Purchase = require('../models/Purchase.model');
// const imagekit = require('../config/imageKit')
// const {generateBarcode} = require('../config/bwip-js.config')

// const createPurchase = async (req, res) => {
//     try {
//       const {
//         name,
//         price,
     
//         description,
//         color,
//         fabric,
//         quantity,
//         size,
//       } = req.body;
  
//       // Parse JSON string if needed (e.g., size might be sent as stringified array)
//       const parsedSize = JSON.parse(size);
  
//       const uploadedImages = [];
  
//       const files = Array.isArray(req.files?.images)
//         ? req.files.images
//         : [req.files?.images]; // handles both single and multiple images
  
//       for (let file of files) {
//         const buffer = file.data; // file.data is a Buffer
//         const uploadResponse = await imagekit.upload({
//           file: buffer,
//           fileName: file.name,
//         });
  
//         uploadedImages.push(uploadResponse.url);
//       }
  
//       const newPurchase = new Purchase({
//         name,
//         price,
//         description,
//         color,
//         fabric,
//         quantity,
//         size: parsedSize,
       
//         images: uploadedImages,
//       });
  
//       await newPurchase.save();
  
//       // Generate Barcode
//       const barcodeImage = await generateBarcode(newPurchase._id.toString());
  
//       // Update Purchase with barcode
//       newPurchase.barcode = barcodeImage;
//       await newPurchase.save();
  
//       res.status(201).json(newPurchase);
//     } catch (error) {
//       console.error("Error creating Purchase:", error);
//       res.status(500).json({ error: error.message });
//     }
//   };




//   module.exports = {createPurchase};







// import asyncHandler from "express-async-handler";
// import Product from "../models/ProductModel.js";

// export const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
//   const { barcode } = req.body;

//   if (!barcode) {
//     res.status(400).json({ message: "Barcode is required." });
//     return;
//   }

//   const product = await Product.findOne({ barcode });

//   if (!product) {
//     res.status(404).json({ message: "Product not found." });
//     return;
//   }

//   product.quantity += 1;
//   await product.save();

//   res.json({
//     message: "Quantity increased by 1",
//     updatedQuantity: product.quantity,
//     productId: product._id,
//   });
// })


// module.exports = {  scanAndIncreaseQuantity };










// import asyncHandler from "express-async-handler";
// import Product from "../models/ProductModel.js";

// export const getProductByBarcode = asyncHandler(async (req, res) => {
//   const { barcode } = req.params;

//   if (!barcode) {
//     res.status(400);
//     throw new Error("Barcode is required");
//   }

//   const product = await Product.findOne({ barcode });

//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   res.json(product);
// });

// export const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
//   const { barcode } = req.body;

//   if (!barcode) {
//     res.status(400);
//     throw new Error("Barcode is required");
//   }

//   const product = await Product.findOne({ barcode });

//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   product.quantity += 1;
//   await product.save();

//   res.json({
//     message: "Quantity increased by 1",
//     updatedQuantity: product.quantity,
//     productId: product._id,
//   });
// });






const asyncHandler = require("express-async-handler");
const Product = require("../models/Purchase.model");

// @desc    Get product by barcode
// @route   GET /api/products/barcode/:barcode
// @access  Public
const getProductByBarcode = asyncHandler(async (req, res) => {
  const { barcode } = req.params;

  const product = await Product.findOne({ barcode }).select('-__v');

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// @desc    Scan and increase quantity
// @route   PUT /api/purchase/scan
// @access  Public
const scanAndIncreaseQuantity = asyncHandler(async (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    res.status(400);
    throw new Error('Barcode is required');
  }

  const product = await Product.findOne({ barcode });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.quantity += 1;
  const updatedProduct = await product.save();

  res.json({
    success: true,
    message: 'Product quantity updated',
    product: {
      _id: updatedProduct._id,
      title: updatedProduct.title,
      quantity: updatedProduct.quantity,
      barcode: updatedProduct.barcode
    }
  });
});

module.exports = {
  getProductByBarcode,
  scanAndIncreaseQuantity
};
