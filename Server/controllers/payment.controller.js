const Payment = require('../models/payment.modal');
const Order = require('../models/orderModel');

// Create a new payment
const createPayment = async (req, res) => {
  const { orderId, amount, paymentMode, receivingDate, remark ,chequeNumber} = req.body;

  try {
    // Validate required fields
    if (!orderId || !amount || !paymentMode) {
      return res.status(400).json({
        success: false,
        message: 'Order ID, amount, and payment mode are required',
      });
    }

    // Ensure amount is a positive number
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount must be greater than zero',
      });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if the payment amount is valid (less than or equal to due amount)
    if (amount > order.dueAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment amount (₹${amount}) exceeds due amount (₹${order.dueAmount})`,
      });
    }

    // Create a new payment
    const payment = new Payment({
      orderId,
      amount,
      paymentMode,
      chequeNumber,
      receivingDate: receivingDate || new Date(),
      remark: remark || '',
      status: 'Completed',
    });

    const savedPayment = await payment.save();

    // Update the order with the payment reference and due amount
    order.payments.push(savedPayment._id);
    order.dueAmount -= amount;

    // Update payment status based on due amount
    if (order.dueAmount === 0) {
      order.paymentStatus = 'paid';
      order.status = 'processing'; // Set status to processing when dueAmount is 0
    } else if (order.dueAmount < order.totalPriceAfterDiscount) {
      order.paymentStatus = 'partially_paid';
      order.status = 'pending'; // Ensure status remains pending if dueAmount > 0
    } else {
      order.paymentStatus = 'pending';
      order.status = 'pending';
    }

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      payment: savedPayment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating payment',
      error: error.message,
    });
  }
};

// Get payments for a specific order
const getPaymentsByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    const payments = await Payment.find({ orderId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching payments',
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentsByOrderId,
};