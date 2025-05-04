const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, purchaseProduct } = require('../controllers/product.controller');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/purchase', purchaseProduct);

module.exports = router;