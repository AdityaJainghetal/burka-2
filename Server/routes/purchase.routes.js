const express = require('express');
const { getProductByBarcode, scanAndIncreaseQuantity } = require('../controllers/purchase.controller');

const router = express.Router();

router.get('/barcode/:barcode', getProductByBarcode);
router.put('/scan', scanAndIncreaseQuantity);

module.exports = router;