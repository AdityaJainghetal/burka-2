// const express = require('express');
// const {
//   createOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
//   deliverOrder,
// } = require('../controllers/order.controller');

// const router = express.Router();

// router.post('/', createOrder);
// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);
// // router.put('/:id/deliver', deliverOrder);
// // router.put(':id/ship-order', deliverOrder);
// // router.put(':id/deliver', deliverOrder);

// router.put('/deliver/:orderId', deliverOrder);

// module.exports = router;


const express = require('express');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  CancelledOrder ,
  DilveredOrder,
  shipOrder,
  getDeliveredOrders,
  getShippedOrders,
  getCancelledOrders

  
} = require('../controllers/order.controller');


const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get an order by ID
router.get('/:id', getOrderById);

// Update an order by ID
router.put('/:id', updateOrder);

// Delete an order by ID
router.delete('/:id', deleteOrder);

// Deliver an order by orderId
// router.put('/deliver/:orderId', deliverOrder);

router.put('/:id/deliver',  DilveredOrder)
router.put("/:id/cancel",CancelledOrder ),
router.put("/:id/ship", shipOrder),

router.get('/status/delivered', getDeliveredOrders);
router.get('/status/shipped', getShippedOrders);


router.get('/status/cancelled', getCancelledOrders);

module.exports = router;
