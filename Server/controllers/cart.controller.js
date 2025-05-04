const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Add a product to the cart with specified quantity
const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: `Only ${product.stock} items available in stock` });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ products: [{ product: productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                const newQuantity = cart.products[productIndex].quantity + quantity;
                if (product.stock < newQuantity) {
                    return res.status(400).json({ message: `Only ${product.stock} items available in stock` });
                }
                cart.products[productIndex].quantity = newQuantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }

        await cart.save();
        const updatedCart = await Cart.findOne().populate('products.product');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a product to the cart by barcode
const addToCartByBarcode = async (req, res) => {
    try {
        const { barcode, quantity = 1 } = req.body;

        if (!barcode) {
            return res.status(400).json({ message: "Barcode is required" });
        }

        const product = await Product.findOne({ barcode });
        if (!product) {
            return res.status(404).json({ message: "Product not found for this barcode" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: `Only ${product.stock} items available in stock` });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ products: [{ product: product._id, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === product._id.toString());
            if (productIndex > -1) {
                const newQuantity = cart.products[productIndex].quantity + quantity;
                if (product.stock < newQuantity) {
                    return res.status(400).json({ message: `Only ${product.stock} items available in stock` });
                }
                cart.products[productIndex].quantity = newQuantity;
            } else {
                cart.products.push({ product: product._id, quantity });
            }
        }

        await cart.save();
        const updatedCart = await Cart.findOne().populate('products.product');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product quantity in cart, delete if quantity is 0
const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: `Only ${product.stock} items available in stock` });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity <= 0) {
            cart.products.splice(productIndex, 1);
        } else {
            cart.products[productIndex].quantity = quantity;
        }

        await cart.save();
        const updatedCart = await Cart.findOne().populate('products.product');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a product from the cart
const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        const updatedCart = await Cart.findOne().populate('products.product');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the cart details
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart, addToCartByBarcode, updateCartItem, removeCartItem, getCart };