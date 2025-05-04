const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // Corrected to match Product model
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
}, {
    timestamps: true,
});

const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;