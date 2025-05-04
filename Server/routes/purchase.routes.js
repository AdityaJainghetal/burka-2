const express = require('express');
const { getProductByBarcode, scanAndIncreaseQuantity } = require('../controllers/puchase.controller');
const router = express.Router();

router.get("/barcode/:barcode", getProductByBarcode);
router.put("/scan", scanAndIncreaseQuantity);

module.exports = router;