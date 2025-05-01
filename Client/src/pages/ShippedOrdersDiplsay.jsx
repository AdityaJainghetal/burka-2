// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ShippedOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchShippedOrders();
//   }, []);

//   const fetchShippedOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:8080/order/status/shipped');
//       const shippedOrders = response.data.orders || [];
//       setOrders(shippedOrders);
//       toast.success(`Loaded ${shippedOrders.length} shipped orders`);
//     } catch (error) {
//       console.error('Error fetching shipped orders:', error);
//       toast.error('Failed to load shipped orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewOrderDetails = (orderId) => {
//     console.log('View order:', orderId);
//     toast.info(`Viewing order details for order ${orderId.substring(0, 8)}...`);
//   };

//   const markAsDelivered = async (orderId) => {
//     try {
//       await axios.patch(`http://localhost:8080/order/${orderId}`, {
//         status: 'delivered',
//         'deliveryDetails.deliveredAt': new Date().toISOString()
//       });
//       toast.success('Order marked as delivered');
//       fetchShippedOrders(); // Refresh the list
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       toast.error('Failed to update order status');
//     }
//   };

//   const columns = [
//     {
//       title: 'Order ID',
//       dataIndex: 'formattedId',
//       key: 'formattedId',
//       render: (id) => <span className="font-mono">{id || 'N/A'}</span>,
//     },
//     {
//       title: 'Customer',
//       dataIndex: ['shippingDetails', 'name'],
//       key: 'customer',
//       render: (customer) => <span className="font-medium">{customer || 'N/A'}</span>,
//     },
//     {
//       title: 'Order Date',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => (
//         <span className="text-gray-600">
//           {date ? new Date(date).toLocaleDateString() : 'N/A'}
//         </span>
//       ),
//     },
//     {
//       title: 'Shipped Date',
//       dataIndex: 'updatedAt',
//       key: 'shippedAt',
//       render: (date) => (
//         <span className="text-gray-600">
//           {date ? new Date(date).toLocaleDateString() : 'N/A'}
//         </span>
//       ),
//     },
//     {
//       title: 'Total Amount',
//       dataIndex: 'totalPriceAfterDiscount',
//       key: 'amount',
//       render: (amount) => (
//         <span className="font-bold text-blue-600">
//           ₹{amount ? amount.toFixed(2) : '0.00'}
//         </span>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//           {status ? status.toUpperCase() : 'N/A'}
//         </span>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => viewOrderDetails(record._id)}
//             className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
//           >
//             View
//           </button>
//           <button
//             onClick={() => markAsDelivered(record._id)}
//             className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
//           >
//             Mark Delivered
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="max-w-5xl  py-8">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Shipped Orders</h2>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">
//               Total: <span className="font-bold">{orders.length}</span> orders ready for delivery
//             </span>
//             <button
//               onClick={fetchShippedOrders}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Refreshing...
//                 </>
//               ) : 'Refresh'}
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {columns.map((column) => (
//                   <th
//                     key={column.key}
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan={columns.length} className="px-6 py-4 text-center">
//                     <div className="flex justify-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     </div>
//                   </td>
//                 </tr>
//               ) : orders.length === 0 ? (
//                 <tr>
//                   <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
//                     No shipped orders found
//                   </td>
//                 </tr>
//               ) : (
//                 orders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50">
//                     {columns.map((column) => (
//                       <td key={column.key} className="px-6 py-4 whitespace-nowrap">
//                         {column.render
//                           ? column.render(
//                               Array.isArray(column.dataIndex) 
//                                 ? column.dataIndex.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, order)
//                                 : order[column.dataIndex], 
//                               order
//                             )
//                           : order[column.dataIndex]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippedOrders;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShippedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    fetchShippedOrders();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => {
        const searchStr = searchText.toLowerCase();
        return (
          (order.formattedId && order.formattedId.toLowerCase().includes(searchStr)) ||
          (order.shippingDetails?.name && order.shippingDetails.name.toLowerCase().includes(searchStr)) ||
          (order.status && order.status.toLowerCase().includes(searchStr)) ||
          (order.totalPriceAfterDiscount && order.totalPriceAfterDiscount.toString().includes(searchStr))
        );
      });
      setFilteredOrders(filtered);
    }
  }, [searchText, orders]);

  const fetchShippedOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/order/status/shipped');
      const shippedOrders = response.data.orders || [];
      setOrders(shippedOrders);
      setFilteredOrders(shippedOrders);
      toast.success(`Loaded ${shippedOrders.length} shipped orders`);
    } catch (error) {
      console.error('Error fetching shipped orders:', error);
      toast.error('Failed to load shipped orders');
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = (orderId) => {
    console.log('View order:', orderId);
    toast.info(`Viewing order details for order ${orderId.substring(0, 8)}...`);
  };

  const markAsDelivered = async (orderId) => {
    try {
      await axios.patch(`http://localhost:8080/order/${orderId}`, {
        status: 'delivered',
        'deliveryDetails.deliveredAt': new Date().toISOString()
      });
      toast.success('Order marked as delivered');
      fetchShippedOrders(); // Refresh the list
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleRefresh = () => {
    setSearchText('');
    setResetPaginationToggle(!resetPaginationToggle);
    fetchShippedOrders();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders.map(order => ({
      'Order ID': order.formattedId,
      'Customer': order.shippingDetails?.name || 'N/A',
      'Order Date': order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
      'Shipped Date': order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A',
      'Total Amount': order.totalPriceAfterDiscount ? `₹${order.totalPriceAfterDiscount.toFixed(2)}` : '₹0.00',
      'Status': order.status ? order.status.toUpperCase() : 'N/A'
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shipped Orders');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'shipped_orders.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Shipped Orders Report', 14, 16);
    
    const tableData = filteredOrders.map(order => [
      order.formattedId || 'N/A',
      order.shippingDetails?.name || 'N/A',
      order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
      order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A',
      order.totalPriceAfterDiscount ? `₹${order.totalPriceAfterDiscount.toFixed(2)}` : '₹0.00',
      order.status ? order.status.toUpperCase() : 'N/A'
    ]);

    doc.autoTable({
      head: [['Order ID', 'Customer', 'Order Date', 'Shipped Date', 'Total Amount', 'Status']],
      body: tableData,
      startY: 20,
      styles: {
        cellPadding: 2,
        fontSize: 8,
        valign: 'middle',
        halign: 'left'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    doc.save('shipped_orders.pdf');
  };

  const columns = [
    {
      name: 'Order ID',
      selector: row => row.formattedId,
      sortable: true,
      cell: row => <span className="font-mono">{row.formattedId || 'N/A'}</span>,
    },
    {
      name: 'Customer',
      selector: row => row.shippingDetails?.name || 'N/A',
      sortable: true,
      cell: row => <span className="font-medium">{row.shippingDetails?.name || 'N/A'}</span>,
    },
    {
      name: 'Order Date',
      selector: row => row.createdAt || '',
      sortable: true,
      cell: row => (
        <span className="text-gray-600">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      name: 'Shipped Date',
      selector: row => row.updatedAt || '',
      sortable: true,
      cell: row => (
        <span className="text-gray-600">
          {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      name: 'Total Amount',
      selector: row => row.totalPriceAfterDiscount || 0,
      sortable: true,
      cell: row => (
        <span className="font-bold text-blue-600">
          ₹{row.totalPriceAfterDiscount ? row.totalPriceAfterDiscount.toFixed(2) : '0.00'}
        </span>
      ),
    },
    {
      name: 'Status',
      selector: row => row.status || '',
      sortable: true,
      cell: row => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {row.status ? row.status.toUpperCase() : 'N/A'}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button
            onClick={() => viewOrderDetails(row._id)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            View
          </button>
          <button
            onClick={() => markAsDelivered(row._id)}
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            Mark Delivered
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const subHeaderComponent = (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder="Search orders..."
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Export to Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl  py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shipped Orders</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Total: <span className="font-bold">{filteredOrders.length}</span> orders ready for delivery
            </span>
            <button
              onClick={handleRefresh}
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

        <DataTable
          columns={columns}
          data={filteredOrders}
          progressPending={loading}
          progressComponent={
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
          noDataComponent={
            <div className="py-8 text-center text-gray-500">
              No shipped orders found
            </div>
          }
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponent}
          persistTableHead
          highlightOnHover
          striped
          customStyles={{
            headCells: {
              style: {
                backgroundColor: '#f9fafb',
                color: '#374151',
                fontWeight: '600',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
              },
            },
            cells: {
              style: {
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ShippedOrders;