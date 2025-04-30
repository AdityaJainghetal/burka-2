// import React from 'react';



//   const [todaysTotal, setTodaysTotal] = useState({ quantity: 0, price: 0 });


//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("https://burka-2-1.onrender.com/order");
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       const todaysOrders = res.data.orders.filter(order => {
//         const orderDate = new Date(order.createdAt);
//         return orderDate >= today;
//       });
      
//       setOrders(todaysOrders);
//       setFilteredOrders(todaysOrders);
//       calculateTodaysTotals(todaysOrders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//  useEffect(() => {
//     fetchOrders();
//   }, []);


//   const calculateTodaysTotals = (orders) => {
//     let totalQuantity = 0;
//     let totalPrice = 0;
    
//     orders.forEach(order => {
//       order.orderItems?.forEach(item => {
//         totalQuantity += item.quantity || 0;
//         totalPrice += (item.priceAfterDiscount || item.price || 0) * (item.quantity || 0);
//       });
//     });
    
//     setTodaysTotal({
//       quantity: totalQuantity,
//       price: totalPrice
//     });
//   };

// const Dashboard = () => {
//   // Sample data - replace with your actual data
//   const stats = [
//     { title: "New Orders", value: {todaysTotal.quantity}, info: "More info", color: "bg-blue-100 text-blue-800" },
//     { title: "Total Order", value: "156", info: "More info", color: "bg-green-100 text-green-800" },
//     { title: "Dispatched & Delivered", value: "112", info: "More info", color: "bg-purple-100 text-purple-800" },
//     { title: "Total Items Return", value: "8", info: "More info", color: "bg-yellow-100 text-yellow-800" },
//   ];

//   const otherCards = [
//     { title: "CONTACT ENQUIRY", value: "0" },
//     { title: "TODAY'S LOOK", value: "0" },
//     { title: "NEW KEYWORD SEARCH", value: "0" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">AVC</h1>
//           <div className="text-sm text-gray-500">Admin</div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Dashboard Title */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//           <p className="text-gray-600">All data for today</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className={`p-6 rounded-lg shadow ${stat.color}`}>
//               <h3 className="text-lg font-medium">{stat.title}</h3>
//               <p className="text-3xl font-bold my-2">{stat.value}</p>
//               <p className="text-sm">{stat.info}</p>
//             </div>
//           ))}
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Complete Databases */}
//           <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium mb-4">Complete Databases</h3>
//             <div className="bg-gray-100 p-4 rounded">
//               <p className="font-medium">All Products (20)</p>
//             </div>
//           </div>

//           {/* Name/Total/Address */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium mb-4">Name</h3>
//             <div className="space-y-2">
//               <p className="font-medium">Total</p>
//               <p className="text-sm text-gray-600">Address</p>
//             </div>
//           </div>
//         </div>

//         {/* Three Small Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {otherCards.map((card, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
//               <h3 className="text-lg font-medium mb-2">{card.title}</h3>
//               <p className="text-2xl font-bold">{card.value}</p>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t mt-8">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
//           <p>AV Clothings.</p>
//           <p>Design By Sky Info Group</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [todaysTotal, setTodaysTotal] = useState({ quantity: 0, price: 0 });
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("https://burka-2-1.onrender.com/order");
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       const todaysOrders = res.data.orders.filter(order => {
//         const orderDate = new Date(order.createdAt);
//         return orderDate >= today;
//       });
      
//       setOrders(todaysOrders);
//       setFilteredOrders(todaysOrders);
//       calculateTodaysTotals(todaysOrders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("https://burka-2-1.onrender.com/order");
//       console.log(res)
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
//       const res = await axios.get(`https://burka-2-1.onrender.com/payments/${orderId}`);
   
//       setPaymentDetails(res.data.payments || []);
//     } catch (err) {
//       console.error("Failed to fetch payment details:", err);
//       setPaymentDetails([]);
//     }
//   };

//   useEffect(() => {

  
//     fetchOrders();
//   }, []);

//   const calculateTodaysTotals = (orders) => {
//     let totalQuantity = 0;
//     let totalPrice = 0;
    
//     orders.forEach(order => {
//       order.orderItems?.forEach(item => {
//         totalQuantity += item.quantity || 0;
//         totalPrice += (item.priceAfterDiscount || item.price || 0) * (item.quantity || 0);
//       });
//     });
    
//     setTodaysTotal({
//       quantity: totalQuantity,
//       price: totalPrice
//     });
//   };

//   // Sample data - replace with your actual data
//   const stats = [
//     { title: "New Orders", value: todaysTotal.quantity, info: "More info", color: "bg-blue-100 text-blue-800" },
//     { title: "Total Order", value: "156", info: "More info", color: "bg-green-100 text-green-800" },
//     { title: "Dispatched & Delivered", value: "112", info: "More info", color: "bg-purple-100 text-purple-800" },
//     { title: "Total Items Return", value: "8", info: "More info", color: "bg-yellow-100 text-yellow-800" },
//   ];

//   const otherCards = [
//     { title: "CONTACT ENQUIRY", value: "0" },
//     { title: "TODAY'S LOOK", value: "0" },
//     { title: "NEW KEYWORD SEARCH", value: "0" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">AVC</h1>
//           <div className="text-sm text-gray-500">Admin</div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Dashboard Title */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//           <p className="text-gray-600">All data for today</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className={`p-6 rounded-lg shadow ${stat.color}`}>
//               <h3 className="text-lg font-medium">{stat.title}</h3>
//               <p className="text-3xl font-bold my-2">{stat.value}</p>
//               <p className="text-sm">{stat.info}</p>
//             </div>
//           ))}
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Complete Databases */}
//           <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium mb-4">Complete Databases</h3>
//             <div className="bg-gray-100 p-4 rounded">
//               <p className="font-medium">All Products (20)</p>
//             </div>
//           </div>

//           {/* Name/Total/Address */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium mb-4">Name</h3>
//             <div className="space-y-2">
//               <p className="font-medium">Total</p>
//               <p className="text-sm text-gray-600">Address</p>
//             </div>
//           </div>
//         </div>

//         {/* Three Small Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {otherCards.map((card, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
//               <h3 className="text-lg font-medium mb-2">{card.title}</h3>
//               <p className="text-2xl font-bold">{card.value}</p>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t mt-8">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
//           <p>AV Clothings.</p>
//           <p>Design By Sky Info Group</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [todaysTotal, setTodaysTotal] = useState({ quantity: 0, price: 0 });
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://burka-2-1.onrender.com/order");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaysOrders = res.data.orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= today;
      });
      
      setOrders(res.data.orders); // All orders
      setFilteredOrders(todaysOrders); // Today's orders
      setTotalOrdersCount(res.data.orders.length); // Total number of orders
      calculateTodaysTotals(todaysOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateTodaysTotals = (orders) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    
    orders.forEach(order => {
      order.orderItems?.forEach(item => {
        totalQuantity += item.quantity || 0;
        totalPrice += (item.priceAfterDiscount || item.price || 0) * (item.quantity || 0);
      });
    });
    
    setTodaysTotal({
      quantity: totalQuantity,
      price: totalPrice
    });
  };

  // Stats data
  const stats = [
    { 
      title: "New Orders", 
      value: todaysTotal.quantity, 
      info: "Today's orders", 
      color: "bg-blue-100 text-blue-800",
      onClick: () => navigate("/todayorder")
    },
    { 
      title: "Total Order", 
      value: totalOrdersCount, 
      info: "All orders count", 
      color: "bg-green-100 text-green-800", 
      onClick: () => navigate("/orders")
    },
    { 
      title: "Dispatched & Delivered", 
      value: "112", 
      info: "More info", 
      color: "bg-purple-100 text-purple-800",
      onClick: () => {} // Add navigation if needed
    },
    { 
      title: "Total Items Return", 
      value: "8", 
      info: "More info", 
      color: "bg-yellow-100 text-yellow-800",
      onClick: () => {} // Add navigation if needed
    },
  ];



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl  ms-auto py-8 bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">AVC</h1>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">All data for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg shadow ${stat.color} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={stat.onClick}
            >
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold my-2">{stat.value}</p>
              <p className="text-sm">{stat.info}</p>
            </div>
          ))}
        </div>


      </main>
    </div>
  );
};

export default Dashboard;