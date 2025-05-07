const express = require('express');
const { getProductByBarcode, scanAndIncreaseQuantity } = require('../controllers/purchase2.controller');
const router = express.Router();

router.get("/barcode/:barcodes", getProductByBarcode);
router.put("/scans", scanAndIncreaseQuantity);

module.exports = router;