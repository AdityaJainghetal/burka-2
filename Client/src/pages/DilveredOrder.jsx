import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveredOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  const fetchDeliveredOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://burka-2-1.onrender.com/order/status/delivered');
      // Filter to ensure only delivered orders are shown (though API should already do this)
      const deliveredOrders = response.data.orders || [];
      setOrders(deliveredOrders);
      toast.success(`Loaded ${deliveredOrders.length} delivered orders`);
    } catch (error) {
      console.error('Error fetching delivered orders:', error);
      toast.error('Failed to load delivered orders');
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = (orderId) => {
    // Logic to view order details
    console.log('View order:', orderId);
    toast.info(`Viewing order details for order ${orderId.substring(0, 8)}...`);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'formattedId',
      key: 'formattedId',
      render: (id) => <span className="font-mono">{id || 'N/A'}</span>,
    },
    {
      title: 'Customer',
      dataIndex: ['deliveryDetails', 'receivedBy'],
      key: 'customer',
      render: (customer) => <span className="font-medium">{customer || 'N/A'}</span>,
    },
    {
      title: 'Delivery Date',
      dataIndex: ['deliveryDetails', 'deliveredAt'],
      key: 'deliveredAt',
      render: (date) => (
        <span className="text-gray-600">
          {date ? new Date(date).toLocaleString() : 'N/A'}
        </span>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalPriceAfterDiscount',
      key: 'amount',
      render: (amount) => (
        <span className="font-bold text-green-600">
          ₹{amount ? amount.toFixed(2) : '0.00'}
        </span>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        
        if (status === 'paid') {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        } else if (status === 'pending') {
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
        } else if (status === 'partially_paid') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        }
        
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
            {status ? status.replace('_', ' ').toUpperCase() : 'N/A'}
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <button
          onClick={() => viewOrderDetails(record._id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-6xl  ms-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Delivered Orders</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Total: <span className="font-bold">{orders.length}</span> orders
            </span>
            <button
              onClick={fetchDeliveredOrders}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                    No delivered orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                        {column.render
                          ? column.render(
                              Array.isArray(column.dataIndex) 
                                ? column.dataIndex.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, order)
                                : order[column.dataIndex], 
                              order
                            )
                          : order[column.dataIndex]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrders;