// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [paymentDetails, setPaymentDetails] = useState([]);
//   const printRef = React.useRef();
//   const navigate = useNavigate();
  

//   console.log(selectedOrder,"ewfwefwe")

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/order");
//       console.log(res)
//       setOrders(res.data.orders);
//       setFilteredOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch payment details for a specific order
//   const fetchPaymentDetails = async (orderId) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/payments/${orderId}`);
   
//       setPaymentDetails(res.data.payments || []);
//     } catch (err) {
//       console.error("Failed to fetch payment details:", err);
//       setPaymentDetails([]);
//     }
//   };
 

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus, dueAmount) => {
//     try {
//       // Client-side validation
//       if (dueAmount > 0 && newStatus !== "pending") {
//         alert("Order status cannot be updated to anything other than pending while due amount is greater than 0");
//         return;
//       }
//       if (dueAmount === 0 && newStatus === "pending") {
//         alert("Order status cannot be set to pending when due amount is 0");
//         return;
//       }

//       await axios.put(`http://localhost:8080/order/${orderId}`, { status: newStatus });
//       fetchOrders();
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   // Handle print functionality
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//   });

//   // View order details and fetch payments
//   const viewOrderDetails = async (order) => {
//     setSelectedOrder(order);
//     await fetchPaymentDetails(order._id);
//   };

//   // Close modal
//   const closeModal = () => {
//     setSelectedOrder(null);
//     setPaymentDetails([]);
//   };

//   // Navigate to AllPayment page for the specific order
//   const navigateToPayments = (orderId) => {
//     navigate(`/allpayment/${orderId}`);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Filter orders based on search
//   useEffect(() => {
//     const result = orders.filter((order) => {
//       const searchLower = search.toLowerCase();
//       return (
//         order._id?.toLowerCase().includes(searchLower) ||
//         order.user?.name?.toLowerCase().includes(searchLower) ||
//         new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(searchLower) ||
//         `${order.totalPriceAfterDiscount ?? order.totalPrice}`.toLowerCase().includes(searchLower) ||
//         order.status?.toLowerCase().includes(searchLower) ||
//         order.paymentStatus?.toLowerCase().includes(searchLower)
//       );
//     });
//     setFilteredOrders(result);
//   }, [search, orders]);

//   const columns = [
//     {
//       name: "Order ID",
//       selector: (row) => row._id.slice(-6).toUpperCase(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Date",
//       selector: (row) => new Date(row.createdAt).toLocaleDateString(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Customer",
//       selector: (row) => row.orderItems[0]?.productName,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Total",
//       selector: (row) => `₹${row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Due Amount",
//       selector: (row) => `₹${row.dueAmount ?? row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Payment Status",
//       cell: (row) => {
//         const paymentStatus = row.paymentStatus || "pending";
//         return (
//           <span
//             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//               ${paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//                 paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
//                 "bg-yellow-100 text-yellow-800"}`}
//           >
//             {paymentStatus.toUpperCase()}
//           </span>
//         );
//       },
//       width: "120px",
//     },
//     {
//       name: "Order Status",
//       cell: (row) => {
//         const status = row.status || "pending";
//         return (
//           <span
//             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//               ${status === "delivered" ? "bg-green-100 text-green-800" : 
//                 status === "processing" || status === "shipped" ? "bg-blue-100 text-blue-800" : 
//                 status === "cancelled" ? "bg-red-100 text-red-800" : 
//                 "bg-yellow-100 text-yellow-800"}`}
//           >
//             {status.toUpperCase()}
//           </span>
//         );
//       },
//       width: "150px",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex flex-col gap-2">
//           <button
//             onClick={() => viewOrderDetails(row)}
//             className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
//           >
//             View
//           </button>
//           {/* <select
//             value={row.status || "pending"}
//             onChange={(e) => updateOrderStatus(row._id, e.target.value, row.dueAmount)}
//             className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="pending">Pending</option>
//             {row.dueAmount === 0 || (
//               <>
//                 <option value="processing">Processing</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//               </>
//             )}
//             <option value="cancelled">Disptached</option>
//             <option value="cancelled">delivered</option>
            
//           </select> */}
//           <select
//   value={row.status || "pending"}
//   onChange={(e) => {
//     const selectedValue = e.target.value;

//     // Check if the selected value is "Cancelled"
//     if (selectedValue === "Cancelled") {
//       const reason = prompt("Please provide a reason for cancellation:");
//       if (reason) {
//         // Call the update function with the reason
//         updateOrderStatus(row._id, selectedValue, row.dueAmount, reason);
//       } else {
//         // If no reason is provided, revert to the previous status
//         e.target.value = row.status || "pending"; // Revert to previous status
//       }
//     } else {
//       // For other statuses, just update the status
//       updateOrderStatus(row._id, selectedValue, row.dueAmount);
//     }
//   }}
//   className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
// >
//   <option value="pending">Pending</option>
//   {row.dueAmount === 0 || (
//     <>
//       <option value="processing">Processing</option>
//       <option value="shipped">Shipped</option>
//       <option value="delivered">Delivered</option>
//       <option value="Cancelled">Cancelled</option>
//     </>
//   )}
// </select>
//         </div>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Payment",
//       cell: (row) => (
//         <button
//           onClick={() => navigateToPayments(row._id)}
//           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//         >
//           {row.paymentStatus === "paid" ? "View Payments" : "Add Payment"}
//         </button>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Print",
//       cell: (row) => (
//         <button
//           onClick={() => {
//             viewOrderDetails(row);
//             setTimeout(handlePrint, 500);
//           }}
//           className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded hover:bg-purple-100"
//         >
//           Print
//         </button>
//       ),
//       width: "100px",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={fetchOrders}
//             className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//               />
//             </svg>
//             Refresh
//           </button>
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg
//                 className="h-5 w-5 text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={filteredOrders}
//           progressPending={loading}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 25, 50, 100]}
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent={
//             <div className="p-4 text-center text-gray-500">
//               No orders found. Try adjusting your search or create a new order.
//             </div>
//           }
//         />
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6" ref={printRef}>
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold">
//                     Order #{selectedOrder._id.slice(-6).toUpperCase()}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handlePrint}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                       />
//                     </svg>
//                     Print
//                   </button>
//                   <button
//                     onClick={closeModal}
//                     className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-bold mb-2 text-gray-700">
//                     Customer Information
//                   </h4>
//                   <div className="space-y-1 text-sm">
//                     <p>
//                       <span className="font-medium">Name:</span>{" "}
//                       {selectedOrder.user?.name || "Guest"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Phone:</span>{" "}
//                       {selectedOrder.shippingAddress?.phone || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Address:</span>{" "}
//                       {selectedOrder.shippingAddress?.address || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">City:</span>{" "}
//                       {selectedOrder.shippingAddress?.city || "N/A"},{" "}
//                       {selectedOrder.shippingAddress?.state || "N/A"}{" "}
//                       {selectedOrder.shippingAddress?.zipCode || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-bold mb-2 text-gray-700">Order Summary</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Order Status:</span>
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${selectedOrder.status === "delivered" ? "bg-green-100 text-green-800" : 
//                             selectedOrder.status === "processing" || selectedOrder.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//                             selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : 
//                             "bg-yellow-100 text-yellow-800"}`}
//                       >
//                         {(selectedOrder.status || "pending").toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Subtotal:</span>
//                       <span>₹{selectedOrder.totalPrice || 0}</span>
//                     </div>
//                     {selectedOrder.totalPriceAfterDiscount && (
//                       <div className="flex justify-between">
//                         <span>Discount:</span>
//                         <span className="text-red-500">
//                           -₹
//                           {selectedOrder.totalPrice -
//                             selectedOrder.totalPriceAfterDiscount}
//                         </span>
//                       </div>
//                     )}
//                     <div className="flex justify-between font-bold border-t pt-2">
//                       <span>Total:</span>
//                       <span>
//                         ₹
//                         {selectedOrder.totalPriceAfterDiscount ||
//                           selectedOrder.totalPrice ||
//                           0}
//                       </span>
//                     </div>
//                     <div className="flex justify-between font-bold border-t pt-2">
//                       <span>Due Amount:</span>
//                       <span>₹{selectedOrder.dueAmount || 0}</span>
//                     </div>

//                     <h4 className="font-bold mt-4 mb-2 text-gray-700">
//                       Payment Information
//                     </h4>
//                     {paymentDetails.length > 0 ? (
//                       <div className="space-y-2 text-sm">
//                         <p>
//                           <span className="font-medium">Payment Status:</span>{" "}
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${selectedOrder.paymentStatus === "paid"
//                                 ? "bg-green-100 text-green-800"
//                                 : selectedOrder.paymentStatus ===
//                                   "partially_paid"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-yellow-100 text-yellow-800"}`}
//                           >
//                             {(selectedOrder.paymentStatus || "pending").toUpperCase()}
//                           </span>
//                         </p>
//                         <button
//                           onClick={() => navigateToPayments(selectedOrder._id)}
//                           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//                         >
//                           View/Add Payments
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-yellow-600">No payment details found</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {paymentDetails.length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="font-bold mb-2 text-gray-700">
//                     Payment History
//                   </h4>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Payment Mode
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Amount
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Date
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Remark
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {paymentDetails.map((payment) => (
//                           <tr key={payment._id}>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.paymentMode || "N/A"}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               ₹{payment.amount?.toLocaleString() || 0}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.receivingDate
//                                 ? new Date(payment.receivingDate).toLocaleDateString()
//                                 : "N/A"}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.remark || "N/A"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h4 className="font-bold mb-2 text-gray-700">Order Items</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Product
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Price
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Qty
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Total
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {selectedOrder.orderItems?.map((item, index) => (
//                         <tr key={index}>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10">
//                                 <img
//                                   className="h-10 w-10 rounded object-cover"
//                                   src={
//                                     item.productImage ||
//                                     "https://via.placeholder.com/40"
//                                   }
//                                   alt={item.productName || "Product"}
//                                 />
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {item.productName || "Product"}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             ₹{item.priceAfterDiscount || item.price || 0}
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             {item.quantity || 0}
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             ₹
//                             {(item.priceAfterDiscount || item.price || 0) *
//                               (item.quantity || 0)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [paymentDetails, setPaymentDetails] = useState([]);
//   const printRef = React.useRef();
//   const navigate = useNavigate();

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/order");
//       setOrders(res.data.orders);
//       setFilteredOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPaymentDetails = async (orderId) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/payments/${orderId}`);
//       setPaymentDetails(res.data.payments || []);
//     } catch (err) {
//       console.error("Failed to fetch payment details:", err);
//       setPaymentDetails([]);
//     }
//   };



//   const updateOrderStatus = async (orderId, newStatus,  reason = null) => {
//     try {
     
//       if (newStatus === "shipped") {
//         navigate(`/ship-order/${orderId}`, { state: { order: selectedOrder } });
//         return;
//       } else if (newStatus === "delivered") {
//         navigate(`/deliver-order/${orderId}`, { state: { order: selectedOrder } });
//         return;
//       }
  
//       // Rest of the function remains the same...
//       if (newStatus === "cancelled") {
//         if (!reason) {
//           reason = prompt("Please provide a reason for cancellation:");
//           if (!reason) return;
//         }
//       }
  
//       const updateData = { status: newStatus };
//       if (reason) updateData.cancellationReason = reason;
      
//       await axios.put(`http://localhost:8080/order/${orderId}`, updateData);
//       fetchOrders();
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//   });

//   const viewOrderDetails = async (order) => {
//     setSelectedOrder(order);
//     await fetchPaymentDetails(order._id);
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setPaymentDetails([]);
//   };

//   const navigateToPayments = (orderId) => {
//     navigate(`/allpayment/${orderId}`);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     const result = orders.filter((order) => {
//       const searchLower = search.toLowerCase();
//       return (
//         order._id?.toLowerCase().includes(searchLower) ||
//         order.user?.name?.toLowerCase().includes(searchLower) ||
//         new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(searchLower) ||
//         `${order.totalPriceAfterDiscount ?? order.totalPrice}`.toLowerCase().includes(searchLower) ||
//         order.status?.toLowerCase().includes(searchLower) ||
//         order.paymentStatus?.toLowerCase().includes(searchLower)
//       );
//     });
//     setFilteredOrders(result);
//   }, [search, orders]);

//   const columns = [
//     {
//       name: "Order ID",
//       selector: (row) => row._id.slice(-6).toUpperCase(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Date",
//       selector: (row) => new Date(row.createdAt).toLocaleDateString(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Customer",
//       selector: (row) => row.orderItems[0]?.productName,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Total",
//       selector: (row) => `₹${row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Due Amount",
//       selector: (row) => `₹${row.dueAmount ?? row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Payment Status",
//       cell: (row) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//             ${row.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//               row.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
//               "bg-yellow-100 text-yellow-800"}`}
//         >
//           {(row.paymentStatus || "pending").toUpperCase()}
//         </span>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Order Status",
//       cell: (row) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//             ${row.status === "delivered" ? "bg-green-100 text-green-800" : 
//               row.status === "processing" || row.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//               row.status === "cancelled" ? "bg-red-100 text-red-800" : 
//               "bg-yellow-100 text-yellow-800"}`}
//         >
//           {(row.status || "pending").toUpperCase()}
//         </span>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex flex-col gap-2">
//           <button
//             onClick={() => viewOrderDetails(row)}
//             className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
//           >
//             View
//           </button>
//           <select
//             value={row.status || "pending"}
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               if (selectedValue === "cancelled") {
//                 const reason = prompt("Please provide a reason for cancellation:");
//                 if (reason) {
//                   updateOrderStatus(row._id, selectedValue, row.dueAmount, reason);
//                 } else {
//                   e.target.value = row.status || "pending";
//                 }
//               } else {
//                 updateOrderStatus(row._id, selectedValue, row.dueAmount);
//               }
//             }}
//             className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="pending">Pending</option>
//             {row.dueAmount === 0 && (
//               <>
//                 <option value="processing">Processing</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="cancelled">Cancelled</option>
//               </>
//             )}
//           </select>
//         </div>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Payment",
//       cell: (row) => (
//         <button
//           onClick={() => navigateToPayments(row._id)}
//           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//         >
//           {row.paymentStatus === "paid" ? "View Payments" : "Add Payment"}
//         </button>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Print",
//       cell: (row) => (
//         <button
//           onClick={() => {
//             viewOrderDetails(row);
//             setTimeout(handlePrint, 500);
//           }}
//           className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded hover:bg-purple-100"
//         >
//           Print
//         </button>
//       ),
//       width: "100px",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header and Search - remains the same */}
//       {/* DataTable - remains the same */}
//       {/* Order Details Modal - remains the same */}
//       <div className="flex justify-between items-center mb-6">
//          <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
//          <div className="flex gap-2">
//            <button
//             onClick={fetchOrders}
//             className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//               />
//             </svg>
//             Refresh
//           </button>
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg
//                 className="h-5 w-5 text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={filteredOrders}
//           progressPending={loading}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 25, 50, 100]}
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent={
//             <div className="p-4 text-center text-gray-500">
//               No orders found. Try adjusting your search or create a new order.
//             </div>
//           }
//         />
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6" ref={printRef}>
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold">
//                     Order #{selectedOrder._id.slice(-6).toUpperCase()}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handlePrint}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                       />
//                     </svg>
//                     Print
//                   </button>
//                   <button
//                     onClick={closeModal}
//                     className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-bold mb-2 text-gray-700">
//                     Customer Information
//                   </h4>
//                   <div className="space-y-1 text-sm">
//                     <p>
//                       <span className="font-medium">Name:</span>{" "}
//                       {selectedOrder.user?.name || "Guest"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Phone:</span>{" "}
//                       {selectedOrder.shippingAddress?.phone || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Address:</span>{" "}
//                       {selectedOrder.shippingAddress?.address || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">City:</span>{" "}
//                       {selectedOrder.shippingAddress?.city || "N/A"},{" "}
//                       {selectedOrder.shippingAddress?.state || "N/A"}{" "}
//                       {selectedOrder.shippingAddress?.zipCode || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-bold mb-2 text-gray-700">Order Summary</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Order Status:</span>
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${selectedOrder.status === "delivered" ? "bg-green-100 text-green-800" : 
//                             selectedOrder.status === "processing" || selectedOrder.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//                             selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : 
//                             "bg-yellow-100 text-yellow-800"}`}
//                       >
//                         {(selectedOrder.status || "pending").toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Subtotal:</span>
//                       <span>₹{selectedOrder.totalPrice || 0}</span>
//                     </div>
//                     {selectedOrder.totalPriceAfterDiscount && (
//                       <div className="flex justify-between">
//                         <span>Discount:</span>
//                         <span className="text-red-500">
//                           -₹
//                           {selectedOrder.totalPrice -
//                             selectedOrder.totalPriceAfterDiscount}
//                         </span>
//                       </div>
//                     )}
//                     <div className="flex justify-between font-bold border-t pt-2">
//                       <span>Total:</span>
//                       <span>
//                         ₹
//                         {selectedOrder.totalPriceAfterDiscount ||
//                           selectedOrder.totalPrice ||
//                           0}
//                       </span>
//                     </div>
//                     <div className="flex justify-between font-bold border-t pt-2">
//                       <span>Due Amount:</span>
//                       <span>₹{selectedOrder.dueAmount || 0}</span>
//                     </div>

//                     <h4 className="font-bold mt-4 mb-2 text-gray-700">
//                       Payment Information
//                     </h4>
//                     {paymentDetails.length > 0 ? (
//                       <div className="space-y-2 text-sm">
//                         <p>
//                           <span className="font-medium">Payment Status:</span>{" "}
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${selectedOrder.paymentStatus === "paid"
//                                 ? "bg-green-100 text-green-800"
//                                 : selectedOrder.paymentStatus ===
//                                   "partially_paid"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-yellow-100 text-yellow-800"}`}
//                           >
//                             {(selectedOrder.paymentStatus || "pending").toUpperCase()}
//                           </span>
//                         </p>
//                         <button
//                           onClick={() => navigateToPayments(selectedOrder._id)}
//                           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//                         >
//                           View/Add Payments
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-yellow-600">No payment details found</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {paymentDetails.length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="font-bold mb-2 text-gray-700">
//                     Payment History
//                   </h4>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Payment Mode
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Amount
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Date
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Remark
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {paymentDetails.map((payment) => (
//                           <tr key={payment._id}>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.paymentMode || "N/A"}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               ₹{payment.amount?.toLocaleString() || 0}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.receivingDate
//                                 ? new Date(payment.receivingDate).toLocaleDateString()
//                                 : "N/A"}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.remark || "N/A"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h4 className="font-bold mb-2 text-gray-700">Order Items</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Product
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Price
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Qty
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Total
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {selectedOrder.orderItems?.map((item, index) => (
//                         <tr key={index}>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10">
//                                 <img
//                                   className="h-10 w-10 rounded object-cover"
//                                   src={
//                                     item.productImage ||
//                                     "https://via.placeholder.com/40"
//                                   }
//                                   alt={item.productName || "Product"}
//                                 />
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {item.productName || "Product"}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             ₹{item.priceAfterDiscount || item.price || 0}
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             {item.quantity || 0}
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             ₹
//                             {(item.priceAfterDiscount || item.price || 0) *
//                               (item.quantity || 0)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [paymentDetails, setPaymentDetails] = useState([]);
//   const printRef = React.useRef();
//   const navigate = useNavigate();

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/order");
//       setOrders(res.data.orders);
//       setFilteredOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPaymentDetails = async (orderId) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/payments/${orderId}`);
//       setPaymentDetails(res.data.payments || []);
//     } catch (err) {
//       console.error("Failed to fetch payment details:", err);
//       setPaymentDetails([]);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus, reason = null) => {
//     try {
//       if (newStatus === "shipped") {
//         navigate(`/shiporder/${orderId}`, { state: { order: selectedOrder } });
//         return;
//       } else if (newStatus === "delivered") {
//         navigate(`/deliver-order/${orderId}`, { state: { order: selectedOrder } });
//         return;
//       }

//       // For cancelled status, get reason if not provided
//       if (newStatus === "cancelled") {
//         if (!reason) {
//           reason = prompt("Please provide a reason for cancellation:");
//           if (!reason) return; // User cancelled the prompt
//         }
//       }

//       const updateData = { status: newStatus };
//       if (reason) updateData.cancellationReason = reason;
      
//       await axios.put(`http://localhost:8080/order/${orderId}`, updateData);
//       fetchOrders(); // Refresh the orders list
      
//       // Close modal if open
//       if (selectedOrder?._id === orderId) {
//         closeModal();
//       }
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//   });

//   const viewOrderDetails = async (order) => {
//     setSelectedOrder(order);
//     await fetchPaymentDetails(order._id);
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setPaymentDetails([]);
//   };

//   const navigateToPayments = (orderId) => {
//     navigate(`/allpayment/${orderId}`);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     const result = orders.filter((order) => {
//       const searchLower = search.toLowerCase();
//       return (
//         order._id?.toLowerCase().includes(searchLower) ||
//         order.user?.name?.toLowerCase().includes(searchLower) ||
//         new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(searchLower) ||
//         `${order.totalPriceAfterDiscount ?? order.totalPrice}`.toLowerCase().includes(searchLower) ||
//         order.status?.toLowerCase().includes(searchLower) ||
//         order.paymentStatus?.toLowerCase().includes(searchLower)
//       );
//     });
//     setFilteredOrders(result);
//   }, [search, orders]);

//   const columns = [
//     {
//       name: "Order ID",
//       selector: (row) => row._id.slice(-6).toUpperCase(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Date",
//       selector: (row) => new Date(row.createdAt).toLocaleDateString(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Customer",
//       selector: (row) => row.orderItems[0]?.productName,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Total",
//       selector: (row) => `₹${row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Due Amount",
//       selector: (row) => `₹${row.dueAmount ?? row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Payment Status",
//       cell: (row) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//             ${row.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//               row.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
//               "bg-yellow-100 text-yellow-800"}`}
//         >
//           {(row.paymentStatus || "pending").toUpperCase()}
//         </span>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Order Status",
//       cell: (row) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//             ${row.status === "delivered" ? "bg-green-100 text-green-800" : 
//               row.status === "processing" || row.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//               row.status === "cancelled" ? "bg-red-100 text-red-800" : 
//               "bg-yellow-100 text-yellow-800"}`}
//         >
//           {(row.status || "pending").toUpperCase()}
//         </span>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex flex-col gap-2">
//           <button
//             onClick={() => viewOrderDetails(row)}
//             className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
//           >
//             View
//           </button>
//           <select
//             value={row.status || "pending"}
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               if (selectedValue === "cancelled") {
//                 const reason = prompt("Please provide a reason for cancellation:");
//                 if (reason) {
//                   updateOrderStatus(row._id, selectedValue, reason);
//                 } else {
//                   e.target.value = row.status || "pending";
//                 }
//               } else {
//                 updateOrderStatus(row._id, selectedValue);
//               }
//             }}
//             className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Payment",
//       cell: (row) => (
//         <button
//           onClick={() => navigateToPayments(row._id)}
//           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//         >
//           {row.paymentStatus === "paid" ? "View Payments" : "Add Payment"}
//         </button>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Print",
//       cell: (row) => (
//         <button
//           onClick={() => {
//             viewOrderDetails(row);
//             setTimeout(handlePrint, 500);
//           }}
//           className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded hover:bg-purple-100"
//         >
//           Print
//         </button>
//       ),
//       width: "100px",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={fetchOrders}
//             className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//               />
//             </svg>
//             Refresh
//           </button>
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//         <div className="relative flex-grow">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg
//               className="h-5 w-5 text-gray-400"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search orders..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={filteredOrders}
//           progressPending={loading}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 25, 50, 100]}
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent={
//             <div className="p-4 text-center text-gray-500">
//               No orders found. Try adjusting your search or create a new order.
//             </div>
//           }
//         />
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6" ref={printRef}>
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold">
//                     Order #{selectedOrder._id.slice(-6).toUpperCase()}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handlePrint}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                       />
//                     </svg>
//                     Print
//                   </button>
//                   <button
//                     onClick={closeModal}
//                     className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-bold mb-2 text-gray-700">
//                     Customer Information
//                   </h4>
//                   <div className="space-y-1 text-sm">
//                     <p>
//                       <span className="font-medium">Name:</span>{" "}
//                       {selectedOrder.user?.name || "Guest"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Phone:</span>{" "}
//                       {selectedOrder.shippingAddress?.phone || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Address:</span>{" "}
//                       {selectedOrder.shippingAddress?.address || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">City:</span>{" "}
//                       {selectedOrder.shippingAddress?.city || "N/A"},{" "}
//                       {selectedOrder.shippingAddress?.state || "N/A"}{" "}
//                       {selectedOrder.shippingAddress?.zipCode || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-bold mb-2 text-gray-700">Order Summary</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Order Status:</span>
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${selectedOrder.status === "delivered" ? "bg-green-100 text-green-800" : 
//                             selectedOrder.status === "processing" || selectedOrder.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//                             selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : 
//                             "bg-yellow-100 text-yellow-800"}`}
//                       >
//                         {(selectedOrder.status || "pending").toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Subtotal:</span>
//                       <span>₹{selectedOrder.totalPrice || 0}</span>
//                     </div>
//                     {selectedOrder.totalPriceAfterDiscount && (
//                       <div className="flex justify-between">
//                         <span>Discount:</span>
//                         <span className="text-red-500">
//                           -₹
//                           {selectedOrder.totalPrice -
//                             selectedOrder.totalPriceAfterDiscount}
//                         </span>
//                       </div>
//                     )}
//                     <div className="flex justify-between font-bold border-t pt-2">
//                       <span>Total:</span>
//                       <span>
//                         ₹
//                         {selectedOrder.totalPriceAfterDiscount ||
//                           selectedOrder.totalPrice ||
//                           0}
//                       </span>
//                     </div>
//                     <div className="flex justify-between font-bold border-t pt-2">
//                       <span>Due Amount:</span>
//                       <span>₹{selectedOrder.dueAmount || 0}</span>
//                     </div>

//                     <h4 className="font-bold mt-4 mb-2 text-gray-700">
//                       Payment Information
//                     </h4>
//                     {paymentDetails.length > 0 ? (
//                       <div className="space-y-2 text-sm">
//                         <p>
//                           <span className="font-medium">Payment Status:</span>{" "}
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${selectedOrder.paymentStatus === "paid"
//                                 ? "bg-green-100 text-green-800"
//                                 : selectedOrder.paymentStatus ===
//                                   "partially_paid"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-yellow-100 text-yellow-800"}`}
//                           >
//                             {(selectedOrder.paymentStatus || "pending").toUpperCase()}
//                           </span>
//                         </p>
//                         <button
//                           onClick={() => navigateToPayments(selectedOrder._id)}
//                           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//                         >
//                           View/Add Payments
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-yellow-600">No payment details found</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {paymentDetails.length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="font-bold mb-2 text-gray-700">
//                     Payment History
//                   </h4>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Payment Mode
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Amount
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Date
//                           </th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Remark
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {paymentDetails.map((payment) => (
//                           <tr key={payment._id}>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.paymentMode || "N/A"}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               ₹{payment.amount?.toLocaleString() || 0}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.receivingDate
//                                 ? new Date(payment.receivingDate).toLocaleDateString()
//                                 : "N/A"}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-500">
//                               {payment.remark || "N/A"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h4 className="font-bold mb-2 text-gray-700">Order Items</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Product
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Price
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Qty
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Total
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {selectedOrder.orderItems?.map((item, index) => (
//                         <tr key={index}>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10">
//                                 <img
//                                   className="h-10 w-10 rounded object-cover"
//                                   src={
//                                     item.productImage ||
//                                     "https://via.placeholder.com/40"
//                                   }
//                                   alt={item.productName || "Product"}
//                                 />
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {item.productName || "Product"}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             ₹{item.priceAfterDiscount || item.price || 0}
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             {item.quantity || 0}
//                           </td>
//                           <td className="px-4 py-3 text-sm text-gray-500">
//                             ₹
//                             {(item.priceAfterDiscount || item.price || 0) *
//                               (item.quantity || 0)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;




// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { debounce } from "lodash";

// const Orders = () => {
//   // State management
//   const [state, setState] = useState({
//     orders: [],
//     filteredOrders: [],
//     loading: true,
//     error: null,
//     search: "",
//     selectedOrder: null,
//     paymentDetails: [],
//     updatingStatus: {} // Track status updates per order
//   });

//   const printRef = React.useRef();
//   const navigate = useNavigate();

//   // Memoized fetch function
//   const fetchOrders = useCallback(async () => {
//     try {
//       setState(prev => ({ ...prev, loading: true, error: null }));
//       const res = await axios.get("http://localhost:8080/order");
//       setState(prev => ({
//         ...prev,
//         orders: res.data.orders,
//         filteredOrders: res.data.orders,
//         loading: false
//       }));
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//       setState(prev => ({
//         ...prev,
//         loading: false,
//         error: "Failed to fetch orders. Please try again."
//       }));
//     }
//   }, []);

//   // Payment details fetch with loading state
//   const fetchPaymentDetails = async (orderId) => {
//     try {
//       setState(prev => ({ ...prev, paymentDetailsLoading: true }));
//       const res = await axios.get(`http://localhost:8080/payments/${orderId}`);
//       setState(prev => ({
//         ...prev,
//         paymentDetails: res.data.payments || [],
//         paymentDetailsLoading: false
//       }));
//     } catch (err) {
//       console.error("Failed to fetch payment details:", err);
//       setState(prev => ({
//         ...prev,
//         paymentDetails: [],
//         paymentDetailsLoading: false
//       }));
//     }
//   };

//   // Enhanced status update with loading state
//   const updateOrderStatus = async (orderId, newStatus, reason = null) => {
//     try {
//       setState(prev => ({
//         ...prev,
//         updatingStatus: { ...prev.updatingStatus, [orderId]: true }
//       }));

//       if (newStatus === "shipped") {
//         navigate(`/ship-order/${orderId}`, { 
//           state: { order: state.selectedOrder } 
//         });
//         return;
//       } else if (newStatus === "delivered") {
//         navigate(`/deliver-order/${orderId}`, { 
//           state: { order: state.selectedOrder } 
//         });
//         return;
//       }

//       if (newStatus === "cancelled" && !reason) {
//         reason = prompt("Please provide a reason for cancellation:");
//         if (!reason) {
//           setState(prev => ({
//             ...prev,
//             updatingStatus: { ...prev.updatingStatus, [orderId]: false }
//           }));
//           return;
//         }
//       }

//       const updateData = { status: newStatus };
//       if (reason) updateData.cancellationReason = reason;
      
//       await axios.put(`http://localhost:8080/order/${orderId}`, updateData);
//       await fetchOrders(); // Wait for refresh
      
//       if (state.selectedOrder?._id === orderId) {
//         closeModal();
//       }
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert("Failed to update order status. Please try again.");
//     } finally {
//       setState(prev => ({
//         ...prev,
//         updatingStatus: { ...prev.updatingStatus, [orderId]: false }
//       }));
//     }
//   };

//   // Debounced search
//   const handleSearch = debounce((searchValue) => {
//     const result = state.orders.filter((order) => {
//       const searchLower = searchValue.toLowerCase();
//       return (
//         order._id?.toLowerCase().includes(searchLower) ||
//         order.user?.name?.toLowerCase().includes(searchLower) ||
//         new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(searchLower) ||
//         `${order.totalPriceAfterDiscount ?? order.totalPrice}`.toLowerCase().includes(searchLower) ||
//         order.status?.toLowerCase().includes(searchLower) ||
//         order.paymentStatus?.toLowerCase().includes(searchLower)
//       );
//     });
//     setState(prev => ({ ...prev, filteredOrders: result }));
//   }, 300);

//   // Print handler
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     pageStyle: `
//       @page { size: auto; margin: 5mm; }
//       @media print {
//         body { -webkit-print-color-adjust: exact; }
//         .no-print { display: none !important; }
//       }
//     `,
//     removeAfterPrint: true
//   });

//   // View order details
//   const viewOrderDetails = async (order) => {
//     setState(prev => ({ ...prev, selectedOrder: order }));
//     await fetchPaymentDetails(order._id);
//   };

//   const closeModal = () => {
//     setState(prev => ({ ...prev, selectedOrder: null, paymentDetails: [] }));
//   };

//   const navigateToPayments = (orderId) => {
//     navigate(`/allpayment/${orderId}`);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // Columns definition
//   const columns = [
//     {
//             name: "Order ID",
//             selector: (row) => row._id.slice(-6).toUpperCase(),
//             sortable: true,
//             width: "120px",
//           },
//           {
//             name: "Date",
//             selector: (row) => new Date(row.createdAt).toLocaleDateString(),
//             sortable: true,
//             width: "120px",
//           },
//           {
//             name: "Customer",
//             selector: (row) => row.orderItems[0]?.productName,
//             sortable: true,
//             width: "150px",
//           },
//           {
//             name: "Total",
//             selector: (row) => `₹${row.totalPriceAfterDiscount ?? row.totalPrice}`,
//             sortable: true,
//             width: "120px",
//           },
//           {
//             name: "Due Amount",
//             selector: (row) => `₹${row.dueAmount ?? row.totalPriceAfterDiscount ?? row.totalPrice}`,
//             sortable: true,
//             width: "120px",
//           },
//           {
//             name: "Payment Status",
//             cell: (row) => (
//               <span
//                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                   ${row.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//                     row.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
//                     "bg-yellow-100 text-yellow-800"}`}
//               >
//                 {(row.paymentStatus || "pending").toUpperCase()}
//               </span>
//             ),
//             width: "120px",
//           },
//           {
//             name: "Order Status",
//             cell: (row) => (
//               <span
//                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                   ${row.status === "delivered" ? "bg-green-100 text-green-800" : 
//                     row.status === "processing" || row.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//                     row.status === "cancelled" ? "bg-red-100 text-red-800" : 
//                     "bg-yellow-100 text-yellow-800"}`}
//               >
//                 {(row.status || "pending").toUpperCase()}
//               </span>
//             ),
//             width: "150px",
//           },
//     // ... (your existing columns with small improvements)
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex flex-col gap-2">
//           <button
//             onClick={() => viewOrderDetails(row)}
//             className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
//             disabled={state.updatingStatus[row._id]}
//           >
//             View
//           </button>
//           <select
//             value={row.status || "pending"}
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               if (selectedValue === "cancelled") {
//                 const reason = prompt("Please provide a reason for cancellation:");
//                 if (reason) {
//                   updateOrderStatus(row._id, selectedValue, reason);
//                 } else {
//                   e.target.value = row.status || "pending";
//                 }
//               } else {
//                 updateOrderStatus(row._id, selectedValue);
//               }
//             }}
//             className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//             disabled={state.updatingStatus[row._id]}
//           >
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//           {state.updatingStatus[row._id] && (
//             <span className="text-xs text-gray-500">Updating...</span>
//           )}
//         </div>
//       ),
//       width: "180px",
//     },
//     {
//             name: "Payment",
//             cell: (row) => (
//               <button
//                 onClick={() => navigateToPayments(row._id)}
//                 className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//               >
//                 {row.paymentStatus === "paid" ? "View Payments" : "Add Payment"}
//               </button>
//             ),
//             width: "120px",
//           },
//           {
//             name: "Print",
//             cell: (row) => (
//               <button
//                 onClick={() => {
//                   viewOrderDetails(row);
//                   setTimeout(handlePrint, 500);
//                 }}
//                 className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded hover:bg-purple-100"
//               >
//                 Print
//               </button>
//             ),
//             width: "100px",
//           },
//     // ... rest of your columns
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header and search - same as before */}
//       <div className="flex justify-between items-center mb-6">
//          <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
//        <div className="flex gap-2">
//          <button
//            onClick={fetchOrders}
//            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-1"
//          >
          
//                <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//               />
//             </svg>
//             Refresh
//           </button>
//           </div>
//           </div>
//       {/* Error message */}
//       {state.error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {state.error}
//           <button 
//             onClick={fetchOrders}
//             className="ml-2 text-red-700 font-semibold"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* DataTable */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={state.filteredOrders}
//           progressPending={state.loading}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 25, 50, 100]}
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent={
//             <div className="p-4 text-center text-gray-500">
//               {state.error ? 'Error loading orders' : 'No orders found'}
//             </div>
//           }
//         />
//       </div>

//       {/* Order Details Modal */}
//       {state.selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6" ref={printRef}>
//               {/* Modal content - same as before */}
//             </div>
            
//             {/* Close button outside print area */}
//             <button
//               onClick={closeModal}
//               className="no-print absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;



// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { debounce } from "lodash";

// const Orders = () => {
//   // State management
//   const [state, setState] = useState({
//     orders: [],
//     filteredOrders: [],
//     loading: true,
//     error: null,
//     search: "",
//     selectedOrder: null,
//     paymentDetails: [],
//     paymentDetailsLoading: false,
//     updatingStatus: {} // Track status updates per order
//   });

//   const printRef = React.useRef();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Memoized fetch function
//   const fetchOrders = useCallback(async () => {
//     try {
//       setState(prev => ({ ...prev, loading: true, error: null }));
//       const res = await axios.get("http://localhost:8080/order");
//       setState(prev => ({
//         ...prev,
//         orders: res.data.orders,
//         filteredOrders: res.data.orders,
//         loading: false
//       }));
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//       setState(prev => ({
//         ...prev,
//         loading: false,
//         error: "Failed to fetch orders. Please try again."
//       }));
//     }
//   }, []);

//   // Payment details fetch with loading state
//   const fetchPaymentDetails = async (orderId) => {
//     try {
//       setState(prev => ({ ...prev, paymentDetailsLoading: true }));
//       const res = await axios.get(`http://localhost:8080/payments/${orderId}`);
//       setState(prev => ({
//         ...prev,
//         paymentDetails: res.data.payments || [],
//         paymentDetailsLoading: false
//       }));
//     } catch (err) {
//       console.error("Failed to fetch payment details:", err);
//       setState(prev => ({
//         ...prev,
//         paymentDetails: [],
//         paymentDetailsLoading: false
//       }));
//     }
//   };

//   // Enhanced status update with loading state
//   const updateOrderStatus = async (orderId, newStatus, reason = null) => {
//     try {
//       setState(prev => ({
//         ...prev,
//         updatingStatus: { ...prev.updatingStatus, [orderId]: true }
//       }));

//       // Find the complete order object
//       const orderToUpdate = state.orders.find(order => order._id === orderId);

//       if (newStatus === "shipped") {
//         navigate(`/ship-order/${orderId}`, { 
//           state: { order: orderToUpdate } 
//         });
//         return;
//       } else if (newStatus === "delivered") {
//         navigate(`/deliver-order/${orderId}`, { 
//           state: { order: orderToUpdate } 
//         });
//         return;
//       }

//       if (newStatus === "cancelled" && !reason) {
//         reason = prompt("Please provide a reason for cancellation:");
//         if (!reason) {
//           setState(prev => ({
//             ...prev,
//             updatingStatus: { ...prev.updatingStatus, [orderId]: false }
//           }));
//           return;
//         }
//       }

//       const updateData = { status: newStatus };
//       if (reason) updateData.cancellationReason = reason;
      
//       await axios.put(`http://localhost:8080/order/${orderId}`, updateData);
//       await fetchOrders(); // Wait for refresh
      
//       if (state.selectedOrder?._id === orderId) {
//         closeModal();
//       }
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert("Failed to update order status. Please try again.");
//     } finally {
//       setState(prev => ({
//         ...prev,
//         updatingStatus: { ...prev.updatingStatus, [orderId]: false }
//       }));
//     }
//   };

//   // Debounced search
//   const handleSearch = debounce((searchValue) => {
//     const result = state.orders.filter((order) => {
//       const searchLower = searchValue.toLowerCase();
//       return (
//         order._id?.toLowerCase().includes(searchLower) ||
//         (order.user?.name?.toLowerCase().includes(searchLower)) ||
//         new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(searchLower) ||
//         `${order.totalPriceAfterDiscount ?? order.totalPrice}`.toLowerCase().includes(searchLower) ||
//         order.status?.toLowerCase().includes(searchLower) ||
//         order.paymentStatus?.toLowerCase().includes(searchLower)
//       );
//     });
//     setState(prev => ({ ...prev, filteredOrders: result }));
//   }, 300);

//   // Print handler
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     pageStyle: `
//       @page { size: auto; margin: 5mm; }
//       @media print {
//         body { -webkit-print-color-adjust: exact; }
//         .no-print { display: none !important; }
//       }
//     `,
//     removeAfterPrint: true
//   });

//   // View order details
//   const viewOrderDetails = async (order) => {
//     setState(prev => ({ ...prev, selectedOrder: order }));
//     await fetchPaymentDetails(order._id);
//   };

//   const closeModal = () => {
//     setState(prev => ({ ...prev, selectedOrder: null, paymentDetails: [] }));
//   };

//   const navigateToPayments = (orderId) => {
//     navigate(`/allpayment/${orderId}`);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // Columns definition
//   const columns = [
//     {
//       name: "Order ID",
//       selector: (row) => row._id.slice(-6).toUpperCase(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Date",
//       selector: (row) => new Date(row.createdAt).toLocaleDateString(),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Customer",
//       selector: (row) => row.user?.name || "Guest",
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Total",
//       selector: (row) => `₹${row.totalPriceAfterDiscount ?? row.totalPrice}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Due Amount",
//       selector: (row) => `₹${row.dueAmount ?? (row.totalPriceAfterDiscount ?? row.totalPrice) - (row.paidAmount || 0)}`,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Payment Status",
//       cell: (row) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//             ${row.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//               row.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
//               "bg-yellow-100 text-yellow-800"}`}
//         >
//           {(row.paymentStatus || "pending").toUpperCase()}
//         </span>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Order Status",
//       cell: (row) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//             ${row.status === "delivered" ? "bg-green-100 text-green-800" : 
//               row.status === "processing" || row.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//               row.status === "cancelled" ? "bg-red-100 text-red-800" : 
//               "bg-yellow-100 text-yellow-800"}`}
//         >
//           {(row.status || "pending").toUpperCase()}
//         </span>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex flex-col gap-2">
//           <button
//             onClick={() => viewOrderDetails(row)}
//             className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
//             disabled={state.updatingStatus[row._id]}
//           >
//             View
//           </button>
//           <select
//             value={row.status || "pending"}
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               updateOrderStatus(row._id, selectedValue);
//             }}
//             className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//             disabled={state.updatingStatus[row._id]}
//           >
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//           {state.updatingStatus[row._id] && (
//             <span className="text-xs text-gray-500">Updating...</span>
//           )}
//         </div>
//       ),
//       width: "180px",
//     },
//     {
//       name: "Payment",
//       cell: (row) => (
//         <button
//           onClick={() => navigateToPayments(row._id)}
//           className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
//         >
//           {row.paymentStatus === "paid" ? "View Payments" : "Add Payment"}
//         </button>
//       ),
//       width: "120px",
//     },
//     {
//       name: "Print",
//       cell: (row) => (
//         <button
//           onClick={() => {
//             viewOrderDetails(row);
//             setTimeout(handlePrint, 500);
//           }}
//           className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded hover:bg-purple-100"
//         >
//           Print
//         </button>
//       ),
//       width: "100px",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header and search */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search orders..."
//             onChange={(e) => handleSearch(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md text-sm"
//           />
//           <button
//             onClick={fetchOrders}
//             className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//               />
//             </svg>
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Error message */}
//       {state.error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {state.error}
//           <button 
//             onClick={fetchOrders}
//             className="ml-2 text-red-700 font-semibold"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* DataTable */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={state.filteredOrders}
//           progressPending={state.loading}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 25, 50, 100]}
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent={
//             <div className="p-4 text-center text-gray-500">
//               {state.error ? 'Error loading orders' : 'No orders found'}
//             </div>
//           }
//         />
//       </div>

//       {/* Order Details Modal */}
//       {state.selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6" ref={printRef}>
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold">Order #{state.selectedOrder._id.slice(-6).toUpperCase()}</h3>
//                   <p className="text-sm text-gray-500">
//                     Date: {new Date(state.selectedOrder.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold">Status: 
//                     <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${state.selectedOrder.status === "delivered" ? "bg-green-100 text-green-800" : 
//                         state.selectedOrder.status === "processing" || state.selectedOrder.status === "shipped" ? "bg-blue-100 text-blue-800" : 
//                         state.selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : 
//                         "bg-yellow-100 text-yellow-800"}`}>
//                       {(state.selectedOrder.status || "pending").toUpperCase()}
//                     </span>
//                   </p>
//                   <p className="font-semibold">Payment: 
//                     <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${state.selectedOrder.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//                         state.selectedOrder.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
//                         "bg-yellow-100 text-yellow-800"}`}>
//                       {(state.selectedOrder.paymentStatus || "pending").toUpperCase()}
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="border rounded-lg p-4">
//                   <h4 className="font-bold mb-2">Customer Details</h4>
//                   <p><span className="font-semibold">Name:</span> {state.selectedOrder.user?.name || "Guest"}</p>
//                   <p><span className="font-semibold">Phone:</span> {state.selectedOrder.user?.phone || "N/A"}</p>
//                   <p><span className="font-semibold">Email:</span> {state.selectedOrder.user?.email || "N/A"}</p>
//                 </div>

//                 <div className="border rounded-lg p-4">
//                   <h4 className="font-bold mb-2">Order Summary</h4>
//                   <p><span className="font-semibold">Total:</span> ₹{state.selectedOrder.totalPrice}</p>
//                   {state.selectedOrder.totalPriceAfterDiscount && (
//                     <p><span className="font-semibold">After Discount:</span> ₹{state.selectedOrder.totalPriceAfterDiscount}</p>
//                   )}
//                   <p><span className="font-semibold">Paid Amount:</span> ₹{state.selectedOrder.paidAmount || 0}</p>
//                   <p><span className="font-semibold">Due Amount:</span> ₹{state.selectedOrder.dueAmount || 
//                     (state.selectedOrder.totalPriceAfterDiscount ?? state.selectedOrder.totalPrice) - (state.selectedOrder.paidAmount || 0)}</p>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h4 className="font-bold mb-2">Order Items</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {state.selectedOrder.orderItems.map((item, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {item.productName}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {item.quantity}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             ₹{item.price}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             ₹{item.price * item.quantity}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {state.selectedOrder.status === "cancelled" && state.selectedOrder.cancellationReason && (
//                 <div className="mb-6 p-4 bg-red-50 rounded-lg">
//                   <h4 className="font-bold text-red-800 mb-2">Cancellation Reason</h4>
//                   <p className="text-red-700">{state.selectedOrder.cancellationReason}</p>
//                 </div>
//               )}

//               {state.paymentDetails.length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="font-bold mb-2">Payment History</h4>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {state.paymentDetails.map((payment, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                               {new Date(payment.paymentDate).toLocaleDateString()}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               ₹{payment.amount}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {payment.paymentMethod}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {payment.referenceNumber || "N/A"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Close button outside print area */}
//             <button
//               onClick={closeModal}
//               className="no-print absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { debounce } from "lodash";

const Orders = () => {
  // State management
  const [state, setState] = useState({
    orders: [],
    filteredOrders: [],
    loading: true,
    error: null,
    search: "",
    selectedOrder: null,
    paymentDetails: [],
    paymentDetailsLoading: false,
    updatingStatus: {} // Track status updates per order
  });

  const printRef = React.useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Memoized fetch function
  const fetchOrders = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const res = await axios.get("http://localhost:8080/order");
      setState(prev => ({
        ...prev,
        orders: res.data.orders,
        filteredOrders: res.data.orders,
        loading: false
      }));
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Failed to fetch orders. Please try again."
      }));
    }
  }, []);

  // Payment details fetch with loading state
  const fetchPaymentDetails = async (orderId) => {
    try {
      setState(prev => ({ ...prev, paymentDetailsLoading: true }));
      const res = await axios.get(`http://localhost:8080/payments/${orderId}`);
      setState(prev => ({
        ...prev,
        paymentDetails: res.data.payments || [],
        paymentDetailsLoading: false
      }));
    } catch (err) {
      console.error("Failed to fetch payment details:", err);
      setState(prev => ({
        ...prev,
        paymentDetails: [],
        paymentDetailsLoading: false
      }));
    }
  };

  // Enhanced status update with loading state
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setState(prev => ({
        ...prev,
        updatingStatus: { ...prev.updatingStatus, [orderId]: true }
      }));

      // Find the complete order object
      const orderToUpdate = state.orders.find(order => order._id === orderId);

      if (newStatus === "shipped") {
        navigate(`/ship-order/${orderId}`, { 
          state: { order: orderToUpdate } 
        });
        return;
      } else if (newStatus === "delivered") {
        navigate(`/deliver-order/${orderId}`, { 
          state: { order: orderToUpdate } 
        });
        return;
      } else if (newStatus === "cancelled") {
        navigate(`/cancel-order/${orderId}`, { 
          state: { order: orderToUpdate } 
        });
        return;
      }

      await axios.put(`http://localhost:8080/order/${orderId}`, { status: newStatus });
      await fetchOrders(); // Wait for refresh
      
      if (state.selectedOrder?._id === orderId) {
        closeModal();
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status. Please try again.");
    } finally {
      setState(prev => ({
        ...prev,
        updatingStatus: { ...prev.updatingStatus, [orderId]: false }
      }));
    }
  };

  // Debounced search
  const handleSearch = debounce((searchValue) => {
    const result = state.orders.filter((order) => {
      const searchLower = searchValue.toLowerCase();
      return (
        order._id?.toLowerCase().includes(searchLower) ||
        (order.user?.name?.toLowerCase().includes(searchLower)) ||
        new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(searchLower) ||
        `${order.totalPriceAfterDiscount ?? order.totalPrice}`.toLowerCase().includes(searchLower) ||
        order.status?.toLowerCase().includes(searchLower) ||
        order.paymentStatus?.toLowerCase().includes(searchLower)
      );
    });
    setState(prev => ({ ...prev, filteredOrders: result }));
  }, 300);

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page { size: auto; margin: 5mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        .print-header { display: block !important; }
        .print-footer { display: block !important; }
        .print-logo { max-width: 150px; margin-bottom: 20px; }
        .print-signature { margin-top: 50px; display: flex; justify-content: space-between; }
        .print-photo { max-width: 200px; margin-top: 20px; }
      }
    `,
    removeAfterPrint: true
  });

  // View order details
  const viewOrderDetails = async (order) => {
    setState(prev => ({ ...prev, selectedOrder: order }));
    await fetchPaymentDetails(order._id);
  };

  const closeModal = () => {
    setState(prev => ({ ...prev, selectedOrder: null, paymentDetails: [] }));
  };

  const navigateToPayments = (orderId) => {
    navigate(`/allpayment/${orderId}`);
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Columns definition
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row._id.slice(-6).toUpperCase(),
      sortable: true,
      width: "120px",
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      width: "120px",
    },
    {
      name: "Customer",
      selector: (row) => row.user?.name || "Guest",
      sortable: true,
      width: "150px",
    },
    {
      name: "Total",
      selector: (row) => `₹${row.totalPriceAfterDiscount ?? row.totalPrice}`,
      sortable: true,
      width: "120px",
    },
    {
      name: "Due Amount",
      selector: (row) => `₹${row.dueAmount ?? (row.totalPriceAfterDiscount ?? row.totalPrice) - (row.paidAmount || 0)}`,
      sortable: true,
      width: "120px",
    },
    {
      name: "Payment Status",
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${row.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
              row.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
              "bg-yellow-100 text-yellow-800"}`}
        >
          {(row.paymentStatus || "pending").toUpperCase()}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Order Status",
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${row.status === "delivered" ? "bg-green-100 text-green-800" : 
              row.status === "processing" || row.status === "shipped" ? "bg-blue-100 text-blue-800" : 
              row.status === "cancelled" ? "bg-red-100 text-red-800" : 
              "bg-yellow-100 text-yellow-800"}`}
        >
          {(row.status || "pending").toUpperCase()}
        </span>
      ),
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => viewOrderDetails(row)}
            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
            disabled={state.updatingStatus[row._id]}
          >
            View
          </button>
          <select
            value={row.status || "pending"}
            onChange={(e) => {
              const selectedValue = e.target.value;
              updateOrderStatus(row._id, selectedValue);
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            disabled={state.updatingStatus[row._id]}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {state.updatingStatus[row._id] && (
            <span className="text-xs text-gray-500">Updating...</span>
          )}
        </div>
      ),
      width: "180px",
    },
    {
      name: "Payment",
      cell: (row) => (
        <button
          onClick={() => navigateToPayments(row._id)}
          className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
        >
          {row.paymentStatus === "paid" ? "View Payments" : "Add Payment"}
        </button>
      ),
      width: "120px",
    },
    {
      name: "Print",
      cell: (row) => (
        <button
          onClick={() => {
            viewOrderDetails(row);
            setTimeout(handlePrint, 500);
          }}
          className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded hover:bg-purple-100"
        >
          Print
        </button>
      ),
      width: "100px",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header and search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search orders..."
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={fetchOrders}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Error message */}
      {state.error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {state.error}
          <button 
            onClick={fetchOrders}
            className="ml-2 text-red-700 font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={state.filteredOrders}
          progressPending={state.loading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          highlightOnHover
          striped
          responsive
          noDataComponent={
            <div className="p-4 text-center text-gray-500">
              {state.error ? 'Error loading orders' : 'No orders found'}
            </div>
          }
        />
      </div>

      {/* Order Details Modal */}
      {state.selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6" ref={printRef}>
              {/* Print Header - only visible when printing */}
              <div className="print-header hidden mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold">Company Name</h1>
                    <p className="text-gray-600">123 Business Street, City</p>
                    <p className="text-gray-600">Phone: (123) 456-7890</p>
                  </div>
                  <div className="print-logo">
                    {/* Replace with your logo image */}
                    <div className="bg-gray-200 w-32 h-32 flex items-center justify-center">
                      <span className="text-gray-500">Company Logo</span>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-t-2 border-gray-300" />
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Order #{state.selectedOrder._id.slice(-6).toUpperCase()}</h3>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(state.selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Status: 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${state.selectedOrder.status === "delivered" ? "bg-green-100 text-green-800" : 
                        state.selectedOrder.status === "processing" || state.selectedOrder.status === "shipped" ? "bg-blue-100 text-blue-800" : 
                        state.selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : 
                        "bg-yellow-100 text-yellow-800"}`}>
                      {(state.selectedOrder.status || "pending").toUpperCase()}
                    </span>
                  </p>
                  <p className="font-semibold">Payment: 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${state.selectedOrder.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
                        state.selectedOrder.paymentStatus === "partially_paid" ? "bg-blue-100 text-blue-800" : 
                        "bg-yellow-100 text-yellow-800"}`}>
                      {(state.selectedOrder.paymentStatus || "pending").toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold mb-2">Customer Details</h4>
                  <p><span className="font-semibold">Name:</span> {state.selectedOrder.user?.name || "Guest"}</p>
                  <p><span className="font-semibold">Phone:</span> {state.selectedOrder.user?.phone || "N/A"}</p>
                  <p><span className="font-semibold">Email:</span> {state.selectedOrder.user?.email || "N/A"}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold mb-2">Order Summary</h4>
                  <p><span className="font-semibold">Total:</span> ₹{state.selectedOrder.totalPrice}</p>
                  {state.selectedOrder.totalPriceAfterDiscount && (
                    <p><span className="font-semibold">After Discount:</span> ₹{state.selectedOrder.totalPriceAfterDiscount}</p>
                  )}
                  <p><span className="font-semibold">Paid Amount:</span> ₹{state.selectedOrder.paidAmount || 0}</p>
                  <p><span className="font-semibold">Due Amount:</span> ₹{state.selectedOrder.dueAmount || 
                    (state.selectedOrder.totalPriceAfterDiscount ?? state.selectedOrder.totalPrice) - (state.selectedOrder.paidAmount || 0)}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Order Items</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.selectedOrder.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.productName}
                            {item.image && (
                              <div className="print-photo hidden mt-2">
                                <img 
                                  src={item.image} 
                                  alt={item.productName} 
                                  className="max-w-xs border border-gray-300"
                                />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{item.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {state.selectedOrder.status === "cancelled" && state.selectedOrder.cancellationReason && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">Cancellation Reason</h4>
                  <p className="text-red-700">{state.selectedOrder.cancellationReason}</p>
                </div>
              )}

              {state.paymentDetails.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Payment History</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {state.paymentDetails.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.paymentMethod}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.referenceNumber || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              
              <div className="print-footer hidden mt-8">
                <div className="print-signature">
                  <div>
                    <p className="border-t border-gray-400 pt-2">Customer Signature</p>
                  </div>
                  <div>
                    <p className="border-t border-gray-400 pt-2">Company Representative</p>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Thank you for your business!
                </div>
              </div>
            </div>
            
            {/* Close button outside print area */}
            <button
              onClick={closeModal}
              className="no-print absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;