
const express = require('express');
const {  getProductByBarcode, scanAndIncreaseQuantity } = require('../controllers/puchase.controller');
const router = express.Router();

// To this (if using CommonJS):
// const { getProductByBarcode, scanAndIncreaseQuantity } = require("../controllers/purchase.controller");



router.get("/products/barcode/:barcode", getProductByBarcode);
router.put("/purchase/scan", scanAndIncreaseQuantity);

module.exports = router;
