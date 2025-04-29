// const Order = require('../models/orderModel');

// // Create a new order
// const createOrder = async (req, res) => {
//   try {
//     const { orderItems, totalPrice, totalPriceAfterDiscount, discountName } = req.body;
// console.log(orderItems, totalPrice, totalPriceAfterDiscount, discountName , "sdsfdsfdd")
//     if (
//       !orderItems ||
//       !Array.isArray(orderItems) ||
//       orderItems.length === 0 ||
//       totalPrice === undefined ||
//       totalPriceAfterDiscount === undefined
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: orderItems, totalPrice, or totalPriceAfterDiscount',
//       });
//     }

//     for (const item of orderItems) {
//       if (!item.productName || item.price === undefined || item.quantity === undefined) {
//         return res.status(400).json({
//           success: false,
//           message: 'Each order item must include productName, price, and quantity',
//         });
//       }
//     }

//     const order = new Order({
//       orderItems,
//       totalPrice,
//       vendorName:discountName,
//       totalPriceAfterDiscount,
//       discountName,
//       dueAmount: totalPriceAfterDiscount,
//       paymentStatus: 'pending',
//       status: 'pending', // Initialize status as pending
//     });

//     const savedOrder = await order.save();

//     res.status(201).json({
//       success: true,
//       message: 'Order created successfully',
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while creating order',
//       error: error.message,
//     });
//   }
// };





// const deliverOrder = async (req, res) => {
//   const { orderId } = req.params;
//   console.log("Order ID received in params:", orderId);

//   try {
//     const { status, deliveryRemark, deliveryDate } = req.body;
//     console.log("Request body:", { status, deliveryRemark, deliveryDate });

//     // Validate delivery details
//     if (!status || !deliveryRemark || !deliveryDate) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required delivery details: status, deliveryRemark, and deliveryDate are required',
//       });
//     }

//     // Optional: Validate ObjectId format
//     if (!orderId || orderId.length !== 24) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid order ID format',
//       });
//     }

//     const order = await Order.findById(orderId);
//     console.log("Order from DB:", order);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     if (order.status === 'delivered') {
//       return res.status(400).json({
//         success: false,
//         message: 'Order is already marked as delivered',
//       });
//     }

//     order.status = status;
//     order.deliveryDetails = {
//       remark: deliveryRemark,
//       receivedBy: "Customer",
//     };
//     order.deliveredAt = new Date(deliveryDate);

//     const updatedOrder = await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order marked as delivered successfully',
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error('Error delivering order:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to deliver order',
//       error: error.message,
//     });
//   }
// };

// // Get all orders
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve orders',
//       error: error.message,
//     });
//   }
// };

// // Get a single order by ID
// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error retrieving order',
//       error: error.message,
//     });
//   }
// };

// // Update an order
// const updateOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     const { status, ...otherUpdates } = req.body;

//     // Validate status update based on dueAmount
//     if (status) {
//       if (order.dueAmount > 0 || status !== 'pending') {
//         return res.status(400).json({
//           success: false,
//           message: 'Order status cannot be updated to anything other than pending while due amount is greater than 0',
//         });
//       }
//       if (order.dueAmount === 0 || status === 'pending') {
//         return res.status(400).json({
//           success: false,
//           message: 'Order status cannot be set to pending when due amount is 0',
//         });
//       }
//       order.status = status;
//     }

//     // Apply other updates (e.g., shippingAddress, etc.)
//     Object.assign(order, otherUpdates);

//     const updatedOrder = await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order updated successfully',
//       order: updatedOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update order',
//       error: error.message,
//     });
//   }
// };

// // Delete an order
// const deleteOrder = async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Order deleted successfully',
//       order: deletedOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete order',
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
//   deliverOrder
// };




const Order = require('../models/orderModel');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice, totalPriceAfterDiscount, discountName } = req.body;
    console.log(orderItems, totalPrice, totalPriceAfterDiscount, discountName , "sdsfdsfdd");

    if (
      !orderItems ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0 ||
      totalPrice === undefined ||
      totalPriceAfterDiscount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: orderItems, totalPrice, or totalPriceAfterDiscount',
      });
    }

    for (const item of orderItems) {
      if (!item.productName || item.price === undefined || item.quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Each order item must include productName, price, and quantity',
        });
      }
    }

    // Ensure that totalPrice and totalPriceAfterDiscount are non-negative
    if (totalPrice < 0 || totalPriceAfterDiscount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Total prices cannot be negative',
      });
    }

    const order = new Order({
      orderItems,
      totalPrice,
      vendorName: discountName,
      totalPriceAfterDiscount,
      discountName,
      dueAmount: totalPriceAfterDiscount,
      paymentStatus: 'pending',
      status: 'pending', // Initialize status as pending
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order',
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving order',
      error: error.message,
    });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const { status, ...otherUpdates } = req.body;

    // Apply status updates with additional checks if necessary
    if (status) {
      order.status = status;
    }

    // Apply other updates (e.g., shippingAddress, etc.)
    Object.assign(order, otherUpdates);

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message,
    });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      order: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message,
    });
  }
};

const shipOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark, shippingDate } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Validate order can be shipped
    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: `Order cannot be shipped from current status: ${order.status}`
      });
    }

    order.status = 'shipped';
    order.shippingDetails = {
      remark: remark || '',
      shippedAt: shippingDate || new Date()
    };

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: 'Order shipped successfully',
      order: updatedOrder
    });
  } catch (err) {
    console.error('Error shipping order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to ship order',
      error: err.message
    });
  }
}
const DilveredOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryDetails } = req.body;

    if (!deliveryDetails || !deliveryDetails.receivedBy || !deliveryDetails.remark) {
      return res.status(400).json({
        success: false,
        message: 'Please provide delivery details including receivedBy and remark'
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order is already delivered
    if (order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Order is already delivered'
      });
    }

    // Update order status and delivery details
    order.status = 'delivered';
    order.deliveryDetails = {
      receivedBy: deliveryDetails.receivedBy,
      remark: deliveryDetails.remark,
      deliveredAt: new Date()
    };

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: 'Order marked as delivered successfully',
      order: updatedOrder
    });
  } catch (err) {
    console.error('Error delivering order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to deliver order',
      error: err.message
    });
  }
};
  
  const CancelledOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      order.status = 'cancelled';
      order.cancellationReason = req.body.reason;
      await order.save();
  
      res.json({ order });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // Get all delivered orders
const getDeliveredOrders = async (req, res) => {
  try {
    // Find orders with status 'delivered' and sort by delivery date (newest first)
    const deliveredOrders = await Order.find({ status: 'delivered' })
      .sort({ 'deliveryDetails.deliveredAt': -1 });

    res.status(200).json({
      success: true,
      count: deliveredOrders.length,
      orders: deliveredOrders,
    });
  } catch (error) {
    console.error('Error fetching delivered orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delivered orders',
      error: error.message,
    });
  }
};

const getShippedOrders = async (req, res) => {
  try {
    const shippedOrders = await Order.find({ status: 'shipped' })
      .sort({ 'shippingDetails.shippedAt': -1 });
    res.status(200).json({ success: true, orders: shippedOrders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCancelledOrders = async (req, res) => {
  try {
    const cancelledOrders = await Order.find({ status: 'cancelled' })
      .sort({ updatedAt: -1 });
    res.status(200).json({ success: true, orders: cancelledOrders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  DilveredOrder,
  shipOrder,
  CancelledOrder,
  getDeliveredOrders,
  getShippedOrders,
  getCancelledOrders

};
