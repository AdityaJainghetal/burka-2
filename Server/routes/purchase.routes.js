
const express = require('express');
const {  getProductByBarcode ,scanAndIncreaseQuantity} = require('../controllers/puchase.controller');
const router = express.Router();

// To this (if using CommonJS):
// const { getProductByBarcode, scanAndIncreaseQuantity } = require("../controllers/purchase.controller");



router.get("/barcode/:barcode", getProductByBarcode);
router.put("/scan", scanAndIncreaseQuantity);

module.exports = router;
