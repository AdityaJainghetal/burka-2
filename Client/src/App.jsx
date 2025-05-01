// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers } from "lucide-react"
// import ScanQRCode from "./pages/ScanQRCode"
// import CreateProduct from "./pages/CreateProduct"
// import ProductList from "./pages/ProductList"
// import { CartProvider, useCart } from "./CartContext"
// import CartPage from "./pages/CartPage"
// import CategoryManagement from "./pages/CategoryManagement"
// import SubCategoryManagement from "./pages/SubCategory"
// import Registration from "./pages/Registration"
// import Login from "./pages/Login"
// import Sidbar from "./pages/Navbar"
// import Orders from "./pages/Orders"
// import AllPayment from "./pages/Allpayment"
// import { MdOutlinePayments } from "react-icons/md";
// import PaymentDetail from "./pages/Paymentdetail"
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode"
// function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </CartProvider>
//   )
// }

// function AppContent() {
//   const { cart } = useCart() // Fetch cart quantity from CartContext

//   return (
//     <div className="min-h-screen flex  bg-gray-50">
//      <header className="bg-white shadow-sm">
//   <div className="w-[100%] bg-red-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex justify-between h-16 items-center">
     
//       {/* Only keep Cart icon in top navbar */}
//       <div className=" hidden md:flex items-center space-x-4">
//       <div className=" flex-shrink-0 flex items-center">
//         <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//       </div>
//         <NavLink
//           to="/cart"
//           className={({ isActive }) =>
//             isActive
//               ? "text-primary-600 relative"
//               : "text-gray-500 hover:text-gray-700 relative"
//           }
//         >
//           <ShoppingCart size={24} />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//               {cart.length}
//             </span>
//           )}
//         </NavLink>



//         <NavLink
//           to="/cart"
//           className={({ isActive }) =>
//             isActive
//               ? "text-primary-600 relative"
//               : "text-gray-500 hover:text-gray-700 relative"
//           }
//         >
//           <ShoppingCart size={24} />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//               {cart.length}
//             </span>
//           )}
//         </NavLink>
//       </div>
//     </div>
//   </div>
// <Sidbar/>
// </header>


//       <main className=" w-[100%] py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <Routes>
//             <Route path="/" element={<ProductList />} />
//             <Route path="/scan" element={<ScanQRCode />} />
//             <Route path="/create" element={<CreateProduct />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/categories" element={<CategoryManagement />} />
//             <Route path="/subcategories" element={<SubCategoryManagement />} />
//             <Route path="/registration" element={<Registration/>}/>
//             <Route path="/orders" element={<Orders />} />       
//             <Route path="/login" element={<Login/>}/>
//             <Route path="/allpayment/:id" element={<AllPayment/>}/>
//             <Route path="/paymentdetail" element={<PaymentDetail/>}/>
//             <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode/>}/>
//             {/* <Route path="/purchase" element={<Purchase/>}/> */}

//           </Routes>
//         </div>
//       </main>

//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//         <div className="flex justify-around">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Home size={24} />
//             <span className="text-xs mt-1">Products</span>
//           </NavLink>
//           <NavLink
//             to="/scan"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <QrCode size={24} />
//             <span className="text-xs mt-1">Scan</span>
//           </NavLink>
//           <NavLink
//             to="/create"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <PlusCircle size={24} />
//             <span className="text-xs mt-1">Add</span>
//           </NavLink>





//           <NavLink
//             to="/categories"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} />
//             <span className="text-xs mt-1">Categories</span>
//           </NavLink>




//           <NavLink
//             to="/paymentdetail"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} />
//             <span className="text-xs mt-1">PaymentDetail</span>
//           </NavLink>







//           <NavLink
//             to="/allpayment"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <MdOutlinePayments size={24} />
//             <span className="text-xs mt-1">All payment</span>
//           </NavLink>

          
//           {/* Cart Link for Mobile */}
//           <NavLink
//             to="/cart"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <div className="relative">
//               <ShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                   {cart.length}
//                 </span>
//               )}
//             </div>
//             <span className="text-xs mt-1">Cart</span>
//           </NavLink>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default App





// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom"
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers } from "lucide-react"
// import ScanQRCode from "./pages/ScanQRCode"
// import CreateProduct from "./pages/CreateProduct"
// import ProductList from "./pages/ProductList"
// import { CartProvider, useCart } from "./CartContext"
// import CartPage from "./pages/CartPage"
// import CategoryManagement from "./pages/CategoryManagement"
// import SubCategoryManagement from "./pages/SubCategory"
// import Registration from "./pages/Registration"
// import Login from "./pages/Login"
// import Sidbar from "./pages/Navbar"
// import Orders from "./pages/Orders"
// import AllPayment from "./pages/Allpayment"
// import { MdOutlinePayments } from "react-icons/md";
// import PaymentDetail from "./pages/Paymentdetail"
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode"
// import AdminLogin from "./pages/AdminLogin"

// import { useState } from "react"
// import TodayOrders from "./pages/Report"
// import Dashboard from "./pages/Dashboard"
// import DeliverOrder from "./pages/Dispacthed"

// import ShippingModal from "./pages/ShippedOrder"
// import CancelOrderModal from "./pages/CancelOrder"
// import DeliveredOrder from "./pages/DilveredOrder"
// import ShippedOrdersDisplay from "./pages/ShippedOrdersDiplsay"

// import CancelledOrders from "./pages/CancelledOrder"

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const handleLogin = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };
//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>

    
//   )
// }

// function AppContent() {
//   const { cart } = useCart() // Fetch cart quantity from CartContext

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="w-[100%] bg-red-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             {/* Only keep Cart icon in top navbar */}
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="flex-shrink-0 flex items-center">
//                 <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//               </div>
            

//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary-600 relative"
//                     : "text-gray-500 hover:text-gray-700 relative"
//                 }
//               >
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//               </NavLink>
//             </div>
//           </div>
//         </div>
//         <Sidbar/>
//       </header>

//       <main className="w-[100%] py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <Routes>
//                 <Route path="/login"  element={<Login/>}/>



//           <Route path="/dashboard" element={<Dashboard/>}/>
//           <Route path="/" element={<ProductList/>}/>

//             <Route index element={<Dashboard />} />
//             <Route path="/scan" element={<ScanQRCode />} />
//             <Route path="/create" element={<CreateProduct />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/categories" element={<CategoryManagement />} />
//             <Route path="/subcategories" element={<SubCategoryManagement />} />
//             <Route path="/registration" element={<Registration/>}/>
//             <Route path="/orders" element={<Orders />} />       
//             <Route path="/login" element={<Login/>}/>
//             <Route path="/allpayment/:id" element={<AllPayment/>}/>
//             <Route path="/paymentdetail" element={<PaymentDetail/>}/>
//             <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode/>}/>
//             <Route path="/todayorder" element={<TodayOrders/>}/>
//             <Route path="/deliver-order/:id" element={<DeliverOrder />} />
//       <Route path="/ship-order/:id" element={<ShippingModal/>}/>
//       <Route path="/cancel-order/:id" element={<CancelOrderModal/>}/>
//       <Route path="/deliverorder" element={<DeliveredOrder/>}/>
//       <Route path="/shippedorderdisplay" element={<ShippedOrdersDisplay/>}/>
//       <Route path="/cancelorder" element={<CancelledOrders/>}/>



           


        
//           </Routes>
//         </div>
//       </main>

//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//         <div className="flex justify-around">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Home size={24} />
//             <span className="text-xs mt-1">Products</span>
//           </NavLink>
//           <NavLink
//             to="/scan"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <QrCode size={24} />
//             <span className="text-xs mt-1">Scan</span>
//           </NavLink>
//           <NavLink
//             to="/create"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <PlusCircle size={24} />
//             <span className="text-xs mt-1">Add</span>
//           </NavLink>
//           <NavLink
//             to="/categories"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} />
//             <span className="text-xs mt-1">Categories</span>
//           </NavLink>
//           <NavLink
//             to="/paymentdetail"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} />
//             <span className="text-xs mt-1">PaymentDetail</span>
//           </NavLink>
//           <NavLink
//             to="/allpayment"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <MdOutlinePayments size={24} />
//             <span className="text-xs mt-1">All payment</span>
//           </NavLink>
//           <NavLink
//             to="/cart"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <div className="relative">
//               <ShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                   {cart.length}
//                 </span>
//               )}
//             </div>
//             <span className="text-xs mt-1">Cart</span>
//           </NavLink>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default App




// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers, LogOut } from "lucide-react";
// import ScanQRCode from "./pages/ScanQRCode";
// import CreateProduct from "./pages/CreateProduct";
// import ProductList from "./pages/ProductList";
// import { CartProvider, useCart } from "./CartContext";
// import CartPage from "./pages/CartPage";
// import CategoryManagement from "./pages/CategoryManagement";
// import SubCategoryManagement from "./pages/SubCategory";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import Sidbar from "./pages/Navbar";
// import Orders from "./pages/Orders";
// import AllPayment from "./pages/Allpayment";
// import { MdOutlinePayments } from "react-icons/md";
// import PaymentDetail from "./pages/Paymentdetail";
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode";
// import AdminLogin from "./pages/AdminLogin";
// import { useState } from "react";
// import TodayOrders from "./pages/Report";
// import Dashboard from "./pages/Dashboard";
// import DeliverOrder from "./pages/Dispacthed";
// import ShippingModal from "./pages/ShippedOrder";
// import CancelOrderModal from "./pages/CancelOrder";
// import DeliveredOrder from "./pages/DilveredOrder";
// import ShippedOrdersDisplay from "./pages/ShippedOrdersDiplsay";
// import CancelledOrders from "./pages/CancelledOrder";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('isAuthenticated') === 'true'
//   );

//   const handleLogin = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     // Clear any other user-related data from localStorage if needed
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('userData');
//     localStorage.clear()
//     setIsAuthenticated(false);
//   };

//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent onLogout={handleLogout} />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent({ onLogout }) {
//   const { cart } = useCart();

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="w-[100%] bg-red-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="flex-shrink-0 flex items-center">
//                 <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//               </div>

//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary-600 relative"
//                     : "text-gray-500 hover:text-gray-700 relative"
//                 }
//               >
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//               </NavLink>

//               <button
//                 onClick={onLogout}
//                 className="text-gray-500 hover:text-gray-700 flex items-center ml-4"
//               >
//                 <LogOut size={20} className="mr-1" />
//                 <span className="text-sm">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         <Sidbar onLogout={onLogout} />
//       </header>

//       <main className="w-[100%] py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/" element={<ProductList />} />
            
//             <Route path="/scan" element={<ScanQRCode />} />
//             <Route path="/create" element={<CreateProduct />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/categories" element={<CategoryManagement />} />
//             <Route path="/subcategories" element={<SubCategoryManagement />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/allpayment/:id" element={<AllPayment />} />
//             <Route path="/paymentdetail" element={<PaymentDetail />} />
//             <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode />} />
//             <Route path="/todayorder" element={<TodayOrders />} />
//             <Route path="/deliver-order/:id" element={<DeliverOrder />} />
//             <Route path="/ship-order/:id" element={<ShippingModal />} />
//             <Route path="/cancel-order/:id" element={<CancelOrderModal />} />
//             <Route path="/deliverorder" element={<DeliveredOrder />} />
//             <Route path="/shippedorderdisplay" element={<ShippedOrdersDisplay />} />
//             <Route path="/cancelorder" element={<CancelledOrders />} />
//           </Routes>
//         </div>
//       </main>

//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//         <div className="flex justify-around">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Home size={24} />
//             <span className="text-xs mt-1">Products</span>
//           </NavLink>
//           <NavLink
//             to="/scan"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <QrCode size={24} />
//             <span className="text-xs mt-1">Scan</span>
//           </NavLink>
//           <NavLink
//             to="/create"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <PlusCircle size={24} />
//             <span className="text-xs mt-1">Add</span>
//           </NavLink>
//           <NavLink
//             to="/categories"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} />
//             <span className="text-xs mt-1">Categories</span>
//           </NavLink>
//           <NavLink
//             to="/paymentdetail"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} />
//             <span className="text-xs mt-1">PaymentDetail</span>
//           </NavLink>
//           <button
//             onClick={onLogout}
//             className="text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//           >
//             <LogOut size={24} />
//             <span className="text-xs mt-1">Logout</span>
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers, LogOut, Menu } from "lucide-react";
// import ScanQRCode from "./pages/ScanQRCode";
// import CreateProduct from "./pages/CreateProduct";
// import ProductList from "./pages/ProductList";
// import { CartProvider, useCart } from "./CartContext";
// import CartPage from "./pages/CartPage";
// import CategoryManagement from "./pages/CategoryManagement";
// import SubCategoryManagement from "./pages/SubCategory";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import Sidbar from "./pages/Navbar";
// import Orders from "./pages/Orders";
// import AllPayment from "./pages/Allpayment";
// import { MdOutlinePayments } from "react-icons/md";
// import PaymentDetail from "./pages/Paymentdetail";
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode";
// import AdminLogin from "./pages/AdminLogin";
// import { useState } from "react";
// import TodayOrders from "./pages/Report";
// import Dashboard from "./pages/Dashboard";
// import DeliverOrder from "./pages/Dispacthed";
// import ShippingModal from "./pages/ShippedOrder";
// import CancelOrderModal from "./pages/CancelOrder";
// import DeliveredOrder from "./pages/DilveredOrder";
// import ShippedOrdersDisplay from "./pages/ShippedOrdersDiplsay";
// import CancelledOrders from "./pages/CancelledOrder";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('isAuthenticated') === 'true'
//   );

//   const handleLogin = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     // Clear any other user-related data from localStorage if needed
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('userData');
//     localStorage.clear()
//     setIsAuthenticated(false);
//   };

//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent onLogout={handleLogout} />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent({ onLogout }) {
//   const { cart } = useCart();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex bg-gray-50 ">
//     {/* Sidebar - Hidden on mobile */}
//     <div className="hidden md:block">
//       <Sidbar onLogout={onLogout} />
//     </div>
  
//     <div className="flex-1 flex flex-col">
//       {/* Responsive Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <Menu size={24} />
//               </button>
//             </div>
  
//             {/* Logo - Center on mobile, left on desktop */}
//             <div className="flex-shrink-0 flex items-center">
//               <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//             </div>
  
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-6">
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary-600 relative flex items-center"
//                     : "text-gray-500 hover:text-gray-700 relative flex items-center"
//                 }
//               >
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//                 <span className="ml-2 hidden lg:inline">Cart</span>
//               </NavLink>
  
//               <button
//                 onClick={onLogout}
//                 className="text-gray-500 hover:text-gray-700 flex items-center"
//               >
//                 <LogOut size={20} className="mr-1" />
//                 <span className="text-sm hidden lg:inline">Logout</span>
//               </button>
//             </div>
  
//             {/* Mobile Cart Icon */}
//             <div className="md:hidden flex items-center">
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary-600 relative"
//                     : "text-gray-500 hover:text-gray-700 relative"
//                 }
//               >
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//               </NavLink>
//             </div>
//           </div>
//         </div>
  
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white py-2 px-4 shadow-md h-[calc(100vh-4rem)] overflow-y-scroll">
//             <div className="flex flex-col space-y-3">
//             <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Home size={20} className="mr-2" /><span>Dashboard</span>
//               </NavLink>
//               <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Home size={20} className="mr-2" /><span>Products</span>
//               </NavLink>
//               <NavLink to="/scan" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <QrCode size={20} className="mr-2" /><span>Scan</span>
//               </NavLink>
//               <NavLink to="/create" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <PlusCircle size={20} className="mr-2" /><span>Add Product</span>
//               </NavLink>
//               <NavLink to="/categories" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Categories</span>
//               </NavLink>
//               <NavLink to="/subcategories" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Subcategories</span>
//               </NavLink>
//               <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <ShoppingCart size={20} className="mr-2" /><span>Cart</span>
//               </NavLink>
//               <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Orders</span>
//               </NavLink>
//               <NavLink to="/purchaseScanQRCode" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <QrCode size={20} className="mr-2" /><span>Purchase Scan</span>
//               </NavLink>
//               <NavLink to="/todayorder" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Today Orders</span>
//               </NavLink>
//               <NavLink to="/deliverorder" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Delivered</span>
//               </NavLink>
//               <NavLink to="/shippedorderdisplay" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Shipped</span>
//               </NavLink>
//               <NavLink to="/cancelorder" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary-600 flex items-center py-2" : "text-gray-500 hover:text-gray-700 flex items-center py-2"}>
//                 <Layers size={20} className="mr-2" /><span>Cancelled</span>
//               </NavLink>
//               <button
//                 onClick={() => {
//                   onLogout();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="text-gray-500 hover:text-gray-700 flex items-center py-2"
//               >
//                 <LogOut size={20} className="mr-2" /><span>Logout</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </header>
  
//      <main className="flex-1 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-x-auto">
//         <div className="px-4 py-6 sm:px-0">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/" element={<ProductList />} />
//             <Route path="/scan" element={<ScanQRCode />} />
//             <Route path="/create" element={<CreateProduct />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/categories" element={<CategoryManagement />} />
//             <Route path="/subcategories" element={<SubCategoryManagement />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/allpayment/:id" element={<AllPayment />} />
//             <Route path="/paymentdetail" element={<PaymentDetail />} />
//             <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode />} />
//             <Route path="/todayorder" element={<TodayOrders />} />
//             <Route path="/deliver-order/:id" element={<DeliverOrder />} />
//             <Route path="/ship-order/:id" element={<ShippingModal />} />
//             <Route path="/cancel-order/:id" element={<CancelOrderModal />} />
//             <Route path="/deliverorder" element={<DeliveredOrder />} />
//             <Route path="/shippedorderdisplay" element={<ShippedOrdersDisplay />} />
//             <Route path="/cancelorder" element={<CancelledOrders />} />
//           </Routes>
//         </div>
//       </main>
  
//       {/* Mobile Bottom Navigation */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//         <div className="flex justify-around">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Home size={24} /><span className="text-xs mt-1">Products</span>
//           </NavLink>
//           <NavLink
//             to="/scan"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <QrCode size={24} /><span className="text-xs mt-1">Scan</span>
//           </NavLink>
//           <NavLink
//             to="/create"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <PlusCircle size={24} /><span className="text-xs mt-1">Add</span>
//           </NavLink>
//           <NavLink
//             to="/categories"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <Layers size={24} /><span className="text-xs mt-1">Categories</span>
//           </NavLink>
//           <NavLink
//             to="/paymentdetail"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                 : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//             }
//           >
//             <MdOutlinePayments size={24} /><span className="text-xs mt-1">Payments</span>
//           </NavLink>
//         </div>
//       </nav>
//     </div>
//   </div>
  
//   );
// }

// export default App;




// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers, LogOut, Menu } from "lucide-react";
// import ScanQRCode from "./pages/ScanQRCode";
// import CreateProduct from "./pages/CreateProduct";
// import ProductList from "./pages/ProductList";
// import { CartProvider, useCart } from "./CartContext";
// import CartPage from "./pages/CartPage";
// import CategoryManagement from "./pages/CategoryManagement";
// import SubCategoryManagement from "./pages/SubCategory";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import Sidbar from "./pages/Navbar";
// import Orders from "./pages/Orders";
// import AllPayment from "./pages/Allpayment";
// import { MdOutlinePayments } from "react-icons/md";
// import PaymentDetail from "./pages/Paymentdetail";
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode";
// import AdminLogin from "./pages/AdminLogin";
// import { useState } from "react";
// import TodayOrders from "./pages/Report";
// import Dashboard from "./pages/Dashboard";
// import DeliverOrder from "./pages/Dispacthed";
// import ShippingModal from "./pages/ShippedOrder";
// import CancelOrderModal from "./pages/CancelOrder";
// import DeliveredOrder from "./pages/DilveredOrder";
// import ShippedOrdersDisplay from "./pages/ShippedOrdersDiplsay";
// import CancelledOrders from "./pages/CancelledOrder";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('isAuthenticated') === 'true'
//   );

//   const handleLogin = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsAuthenticated(false);
//   };

//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent onLogout={handleLogout} />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent({ onLogout }) {
//   const { cart } = useCart();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen w-[100vw] flex bg-gray-50">
//       <div className="hidden md:block">
//         <Sidbar onLogout={onLogout} />
//       </div>

//       <div className="flex-1 flex flex-col w-full">
//         {/* Header */}
//         <header className="bg-white shadow-sm sticky top-0 z-10">
//           <div className="w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16 items-center">
//               <div className="md:hidden flex items-center">
//                 <button
//                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <Menu size={24} />
//                 </button>
//               </div>

//               <div className="flex-shrink-0 flex items-center">
//                 <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//               </div>

//               <div className="hidden md:flex items-center space-x-6">
//                 <NavLink
//                   to="/cart"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-primary-600 relative flex items-center"
//                       : "text-gray-500 hover:text-gray-700 relative flex items-center"
//                   }
//                 >
//                   <ShoppingCart size={24} />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {cart.length}
//                     </span>
//                   )}
//                   <span className="ml-2 hidden lg:inline">Cart</span>
//                 </NavLink>

//                 <button
//                   onClick={onLogout}
//                   className="text-gray-500 hover:text-gray-700 flex items-center"
//                 >
//                   <LogOut size={20} className="mr-1" />
//                   <span className="text-sm hidden lg:inline">Logout</span>
//                 </button>
//               </div>

//               <div className="md:hidden flex items-center">
//                 <NavLink
//                   to="/cart"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-primary-600 relative"
//                       : "text-gray-500 hover:text-gray-700 relative"
//                   }
//                 >
//                   <ShoppingCart size={24} />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {cart.length}
//                     </span>
//                   )}
//                 </NavLink>
//               </div>
//             </div>
//           </div>
          

//           {mobileMenuOpen && (
//             <div className="md:hidden bg-white py-2 px-4 shadow-md h-[calc(100vh-4rem)] overflow-y-scroll">
//               <div className="flex flex-col space-y-3">
//                 {[
//                   { to: "/dashboard", icon: <Home />, label: "Dashboard" },
//                   { to: "/", icon: <Home />, label: "Products" },
//                   { to: "/scan", icon: <QrCode />, label: "Scan" },
//                   { to: "/create", icon: <PlusCircle />, label: "Add Product" },
//                   { to: "/categories", icon: <Layers />, label: "Categories" },
//                   { to: "/subcategories", icon: <Layers />, label: "Subcategories" },
//                   { to: "/cart", icon: <ShoppingCart />, label: "Cart" },
//                   { to: "/orders", icon: <Layers />, label: "Orders" },
//                   { to: "/purchaseScanQRCode", icon: <QrCode />, label: "Purchase Scan" },
//                   { to: "/todayorder", icon: <Layers />, label: "Today Orders" },
//                   { to: "/deliverorder", icon: <Layers />, label: "Delivered" },
//                   { to: "/shippedorderdisplay", icon: <Layers />, label: "Shipped" },
//                   { to: "/cancelorder", icon: <Layers />, label: "Cancelled" },
//                 ].map(({ to, icon, label }) => (
//                   <NavLink
//                     key={to}
//                     to={to}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className={({ isActive }) =>
//                       isActive
//                         ? "text-primary-600 flex items-center py-2"
//                         : "text-gray-500 hover:text-gray-700 flex items-center py-2"
//                     }
//                   >
//                     {icon}
//                     <span className="ml-2">{label}</span>
//                   </NavLink>
//                 ))}
//                 <button
//                   onClick={() => {
//                     onLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 flex items-center py-2"
//                 >
//                   <LogOut size={20} className="mr-2" /><span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           )}


//         </header>

//         {/* Main Content Area with Fixed Width and Scroll */}
//         <main className="flex-1 max-w-full w-full py-6 px-2 sm:px-4 overflow-hidden">
//           <div className="w-full max-w-7xl mx-auto h-full overflow-auto px-4 py-4 bg-white rounded-lg shadow">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/" element={<ProductList />} />
//               <Route path="/scan" element={<ScanQRCode />} />
//               <Route path="/create" element={<CreateProduct />} />
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/categories" element={<CategoryManagement />} />
//               <Route path="/subcategories" element={<SubCategoryManagement />} />
//               <Route path="/registration" element={<Registration />} />
//               <Route path="/orders" element={<Orders />} />
//               <Route path="/allpayment/:id" element={<AllPayment />} />
//               <Route path="/paymentdetail" element={<PaymentDetail />} />
//               <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode />} />
//               <Route path="/todayorder" element={<TodayOrders />} />
//               <Route path="/deliver-order/:id" element={<DeliverOrder />} />
//               <Route path="/ship-order/:id" element={<ShippingModal />} />
//               <Route path="/cancel-order/:id" element={<CancelOrderModal />} />
//               <Route path="/deliverorder" element={<DeliveredOrder />} />
//               <Route path="/shippedorderdisplay" element={<ShippedOrdersDisplay />} />
//               <Route path="/cancelorder" element={<CancelledOrders />} />
//             </Routes>
//           </div>
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
//           <div className="flex justify-around">
//             {[
//               { to: "/", icon: <Home />, label: "Products" },
//               { to: "/scan", icon: <QrCode />, label: "Scan" },
//               { to: "/create", icon: <PlusCircle />, label: "Add" },
//               { to: "/categories", icon: <Layers />, label: "Categories" },
//               { to: "/paymentdetail", icon: <MdOutlinePayments />, label: "Payments" },
//             ].map(({ to, icon, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                     : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//                 }
//               >
//                 {icon}
//                 <span className="text-xs mt-1">{label}</span>
//               </NavLink>
//             ))}
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
// import { 
//   Home, 
//   QrCode, 
//   PlusCircle, 
//   ShoppingCart, 
//   Layers, 
//   LogOut, 
//   Menu,
//   BarChart2,
//   Package,
//   List,
//   Grid,
//   ClipboardList,
//   Truck,
//   UserPlus
// } from "lucide-react";
// import { MdOutlinePayments } from "react-icons/md";
// import ScanQRCode from "./pages/ScanQRCode";
// import CreateProduct from "./pages/CreateProduct";
// import ProductList from "./pages/ProductList";
// import { CartProvider, useCart } from "./CartContext";
// import CartPage from "./pages/CartPage";
// import CategoryManagement from "./pages/CategoryManagement";
// import SubCategoryManagement from "./pages/SubCategory";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import Sidbar from "./pages/Navbar";
// import Orders from "./pages/Orders";
// import AllPayment from "./pages/Allpayment";
// import PaymentDetail from "./pages/Paymentdetail";
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode";
// import AdminLogin from "./pages/AdminLogin";
// import { useState } from "react";
// import TodayOrders from "./pages/Report";
// import Dashboard from "./pages/Dashboard";
// import DeliverOrder from "./pages/Dispacthed";
// import ShippingModal from "./pages/ShippedOrder";
// import CancelOrderModal from "./pages/CancelOrder";
// import DeliveredOrder from "./pages/DilveredOrder";
// import ShippedOrdersDisplay from "./pages/ShippedOrdersDiplsay";
// import CancelledOrders from "./pages/CancelledOrder";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('isAuthenticated') === 'true'
//   );

//   const handleLogin = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsAuthenticated(false);
//   };

//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent onLogout={handleLogout} />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent({ onLogout }) {
//   const { cart } = useCart();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (item) => {
//     setOpenDropdown(openDropdown === item ? null : item);
//   };

//   return (
//     <div className="min-h-screen w-[100vw] flex bg-gray-50">
//       <div className="hidden md:block">
//         <Sidbar onLogout={onLogout} />
//       </div>

//       <div className="flex-1 flex flex-col w-full">
//         {/* Header */}
//         <header className="bg-white shadow-sm sticky top-0 z-10">
//           <div className="w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16 items-center">
//               <div className="md:hidden flex items-center">
//                 <button
//                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <Menu size={24} />
//                 </button>
//               </div>

//               <div className="flex-shrink-0 flex items-center">
//                 <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//               </div>

//               <div className="hidden md:flex items-center space-x-6">
//                 <NavLink
//                   to="/cart"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-primary-600 relative flex items-center"
//                       : "text-gray-500 hover:text-gray-700 relative flex items-center"
//                   }
//                 >
//                   <ShoppingCart size={24} />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {cart.length}
//                     </span>
//                   )}
//                   <span className="ml-2 hidden lg:inline">Cart</span>
//                 </NavLink>

//                 <button
//                   onClick={onLogout}
//                   className="text-gray-500 hover:text-gray-700 flex items-center"
//                 >
//                   <LogOut size={20} className="mr-1" />
//                   <span className="text-sm hidden lg:inline">Logout</span>
//                 </button>
//               </div>

//               <div className="md:hidden flex items-center">
//                 <NavLink
//                   to="/cart"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-primary-600 relative"
//                       : "text-gray-500 hover:text-gray-700 relative"
//                   }
//                 >
//                   <ShoppingCart size={24} />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {cart.length}
//                     </span>
//                   )}
//                 </NavLink>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu with Dropdowns */}
//           {mobileMenuOpen && (
//             <div className="md:hidden bg-white py-2 px-4 shadow-md h-[calc(100vh-4rem)] overflow-y-auto">
//               <div className="flex flex-col space-y-1">
//                 {/* Dashboard */}
//                 <NavLink
//                   to="/dashboard"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <BarChart2 className="w-5 h-5 mr-3" />
//                   Dashboard
//                 </NavLink>

//                 {/* Products */}
//                 <NavLink
//                   to="/"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <Home className="w-5 h-5 mr-3" />
//                   Products
//                 </NavLink>

//                 {/* Master Dropdown */}
//                 <div className="mb-1">
//                   <button
//                     onClick={() => toggleDropdown('master')}
//                     className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium ${
//                       openDropdown === 'master'
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <Layers className="w-5 h-5 mr-3" />
//                       Master
//                     </div>
//                     {openDropdown === 'master' ? (
//                       <ChevronUp className="w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4" />
//                     )}
//                   </button>
//                   {openDropdown === 'master' && (
//                     <div className="ml-8 mt-1 space-y-1">
//                       <NavLink
//                         to="/categories"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <List className="w-4 h-4 mr-3" />
//                         Categories
//                       </NavLink>
//                       <NavLink
//                         to="/subcategories"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <Grid className="w-4 h-4 mr-3" />
//                         Subcategories
//                       </NavLink>
//                       <NavLink
//                         to="/create"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <PlusCircle className="w-4 h-4 mr-3" />
//                         Add Product
//                       </NavLink>
//                     </div>
//                   )}
//                 </div>

//                 {/* Scan */}
//                 <NavLink
//                   to="/scan"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <QrCode className="w-5 h-5 mr-3" />
//                   Scan
//                 </NavLink>

//                 {/* Orders Dropdown */}
//                 <div className="mb-1">
//                   <button
//                     onClick={() => toggleDropdown('orders')}
//                     className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium ${
//                       openDropdown === 'orders'
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <Package className="w-5 h-5 mr-3" />
//                       Orders
//                     </div>
//                     {openDropdown === 'orders' ? (
//                       <ChevronUp className="w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4" />
//                     )}
//                   </button>
//                   {openDropdown === 'orders' && (
//                     <div className="ml-8 mt-1 space-y-1">
//                       <NavLink
//                         to="/todayorder"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <ClipboardList className="w-4 h-4 mr-3" />
//                         Today Orders
//                       </NavLink>
//                       <NavLink
//                         to="/orders"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <ClipboardList className="w-4 h-4 mr-3" />
//                         Total Orders
//                       </NavLink>
//                       <NavLink
//                         to="/deliverorder"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <Truck className="w-4 h-4 mr-3" />
//                         Delivered
//                       </NavLink>
//                       <NavLink
//                         to="/shippedorderdisplay"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <Truck className="w-4 h-4 mr-3" />
//                         Shipped
//                       </NavLink>
//                       <NavLink
//                         to="/cancelorder"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={({ isActive }) =>
//                           `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                             isActive
//                               ? "bg-blue-100 text-blue-600"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//                           }`
//                         }
//                       >
//                         <Truck className="w-4 h-4 mr-3" />
//                         Cancelled
//                       </NavLink>
//                     </div>
//                   )}
//                 </div>

//                 {/* Purchase Scan */}
//                 <NavLink
//                   to="/purchaseScanQRCode"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <QrCode className="w-5 h-5 mr-3" />
//                   Purchase Scan
//                 </NavLink>

//                 {/* Cart */}
//                 <NavLink
//                   to="/cart"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <ShoppingCart className="w-5 h-5 mr-3" />
//                   Cart
//                   {cart.length > 0 && (
//                     <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
//                       {cart.length}
//                     </span>
//                   )}
//                 </NavLink>

//                 {/* Payments */}
//                 <NavLink
//                   to="/paymentdetail"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <MdOutlinePayments className="w-5 h-5 mr-3" />
//                   Payments
//                 </NavLink>

//                 {/* Registration */}
//                 <NavLink
//                   to="/registration"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <UserPlus className="w-5 h-5 mr-3" />
//                   Registration
//                 </NavLink>

//                 {/* Logout */}
//                 <button
//                   onClick={() => {
//                     onLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="flex items-center px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 >
//                   <LogOut className="w-5 h-5 mr-3" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 max-w-full w-full py-6 px-2 sm:px-4 overflow-hidden">
//           <div className="w-full max-w-7xl mx-auto h-full overflow-auto px-4 py-4 bg-white rounded-lg shadow">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/" element={<ProductList />} />
//               <Route path="/scan" element={<ScanQRCode />} />
//               <Route path="/create" element={<CreateProduct />} />
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/categories" element={<CategoryManagement />} />
//               <Route path="/subcategories" element={<SubCategoryManagement />} />
//               <Route path="/registration" element={<Registration />} />
//               <Route path="/orders" element={<Orders />} />
//               <Route path="/allpayment/:id" element={<AllPayment />} />
//               <Route path="/paymentdetail" element={<PaymentDetail />} />
//               <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode />} />
//               <Route path="/todayorder" element={<TodayOrders />} />
//               <Route path="/deliver-order/:id" element={<DeliverOrder />} />
//               <Route path="/ship-order/:id" element={<ShippingModal />} />
//               <Route path="/cancel-order/:id" element={<CancelOrderModal />} />
//               <Route path="/deliverorder" element={<DeliveredOrder />} />
//               <Route path="/shippedorderdisplay" element={<ShippedOrdersDisplay />} />
//               <Route path="/cancelorder" element={<CancelledOrders />} />
//             </Routes>
//           </div>
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
//           <div className="flex justify-around">
//             {[
//               { to: "/", icon: <Home />, label: "Products" },
//               { to: "/scan", icon: <QrCode />, label: "Scan" },
//               { to: "/create", icon: <PlusCircle />, label: "Add" },
//               { to: "/categories", icon: <Layers />, label: "Categories" },
//               { to: "/paymentdetail", icon: <MdOutlinePayments />, label: "Payments" },
//             ].map(({ to, icon, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary-600 flex flex-col items-center py-2 px-3"
//                     : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//                 }
//               >
//                 {icon}
//                 <span className="text-xs mt-1">{label}</span>
//               </NavLink>
//             ))}
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { 
  Home, 
  QrCode, 
  PlusCircle, 
  ShoppingCart, 
  Layers, 
  LogOut, 
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  List,
  Grid,
  ClipboardList,
  Truck,
  UserPlus,
  BarChart2
} from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import ScanQRCode from "./pages/ScanQRCode";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import { CartProvider, useCart } from "./CartContext";
import CartPage from "./pages/CartPage";
import CategoryManagement from "./pages/CategoryManagement";
import SubCategoryManagement from "./pages/SubCategory";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Sidbar from "./pages/Navbar";
import Orders from "./pages/Orders";
import AllPayment from "./pages/Allpayment";
import PaymentDetail from "./pages/Paymentdetail";
import PurchaseScanQRCode from "./pages/PurchaseScanQRCode";
import AdminLogin from "./pages/AdminLogin";
import { useState } from "react";
import TodayOrders from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import DeliverOrder from "./pages/Dispacthed";
import ShippingModal from "./pages/ShippedOrder";
import CancelOrderModal from "./pages/CancelOrder";
import DeliveredOrder from "./pages/DilveredOrder";
import ShippedOrdersDisplay from "./pages/ShippedOrdersDiplsay";
import CancelledOrders from "./pages/CancelledOrder";
import Invoice from "./pages/Invoice";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <CartProvider>
      <Router>
        {isAuthenticated ? (
          <AppContent onLogout={handleLogout} />
        ) : (
          <Routes>
            <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
          </Routes>
        )}
      </Router>
    </CartProvider>
  );
}

function AppContent({ onLogout }) {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const navItems = [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: BarChart2,
      },
  
      {
        label: "Master",
        icon: Layers,
        subItems: [
          { to: "/categories", label: "All Categories", icon: List },
          { to: "/subcategories", label: "Sub-Categories", icon: Grid },
          { to: "/create", label: "Add Product", icon: PlusCircle },
        ],
      },
  
      {
        label: "View Products",
        icon: Package,
        subItems: [
          { to: "/", label: "All Products", icon: Home },
         
        ],
      },
  
  
      
      {
        label: "Orders",
        icon: Package,
        subItems: [
          { to: "/todayorder", label: "Today Order", icon: ClipboardList },
          { to: "/orders", label: "Total Orders", icon: ClipboardList },
          { to: "/deliverorder", label: "Dispatch Order", icon: Truck },
          { to: "/shippedorderdisplay", label: "Shipped Orders", icon: QrCode },
          { to: "/cancelorder", label: "Cancel Order", icon: QrCode },
        ],
      },
  
  
      {
        label: "Stock-in",
        icon: Package,
        subItems: [
          { to: "/purchaseScanQRCode", label: "Purchase Scan", icon: QrCode },
     
        ],
      },
  
  
  
      {
        label: "Billing",
        icon: Package,
        subItems: [
          { to: "/scan", label: "Scan QR", icon: QrCode },
          { to: "/invoice", label: "All Invoices", icon: ClipboardList },
     
        ],
      },
  
  
  
     
  
      { to: "/registration", label: "Registration", icon: UserPlus },
      
    
    ];
  return (
    <div className="min-h-screen w-[100vw] flex bg-gray-50">
      <div className="hidden md:block">
        <Sidbar onLogout={onLogout} />
      </div>

      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
              </div>

          

              <div className="md:hidden flex items-center">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-600 relative"
                      : "text-gray-500 hover:text-gray-700 relative"
                  }
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                

                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <LogOut size={20} className="mr-1" />
                  <span className="text-sm hidden lg:inline">Logout</span>
                </button>
             
              <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-600 relative"
                      : "text-gray-500 hover:text-gray-700 relative"
                  }
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
                </div>
            </div>
          </div>

          {/* Mobile Menu with Dropdowns */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white py-2 px-4 shadow-md h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <div key={item.label} className="mb-1">
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium ${
                            openDropdown === item.label
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                          }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                          </div>
                          {openDropdown === item.label ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        {openDropdown === item.label && (
                          <div className="ml-8 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <NavLink
                                key={subItem.to}
                                to={subItem.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive
                                      ? "bg-blue-100 text-blue-600"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                  }`
                                }
                              >
                                <subItem.icon className="w-4 h-4 mr-3" />
                                {subItem.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-3 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                      {item.to === '/cart' && cart.length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {cart.length}
                        </span>
                      )}
                    </NavLink>
                  );
                })}

                {/* Logout Button */}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content Area with Fixed Width and Scroll */}
        <main className="flex-1 max-w-full w-full py-6 px-2 sm:px-4 overflow-hidden md:ml-[10vw]">

          <div className="w-full max-w-7xl mx-auto h-full overflow-auto px-4 py-4 bg-white rounded-lg shadow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<ProductList />} />
              <Route path="/scan" element={<ScanQRCode />} />
              <Route path="/create" element={<CreateProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/categories" element={<CategoryManagement />} />
              <Route path="/subcategories" element={<SubCategoryManagement />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/allpayment/:id" element={<AllPayment />} />
              <Route path="/paymentdetail" element={<PaymentDetail />} />
              <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode />} />
              <Route path="/todayorder" element={<TodayOrders />} />
              <Route path="/deliver-order/:id" element={<DeliverOrder />} />
              <Route path="/ship-order/:id" element={<ShippingModal />} />
              <Route path="/cancel-order/:id" element={<CancelOrderModal />} />
              <Route path="/deliverorder" element={<DeliveredOrder />} />
              <Route path="/shippedorderdisplay" element={<ShippedOrdersDisplay />} />
              <Route path="/cancelorder" element={<CancelledOrders />} />
              <Route path="/invoice" element={<Invoice/>} />

            </Routes>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="flex justify-around">
            {[
              { to: "/", icon: <Home />, label: "Products" },
              { to: "/scan", icon: <QrCode />, label: "Scan" },
              { to: "/create", icon: <PlusCircle />, label: "Add" },
              { to: "/categories", icon: <Layers />, label: "Categories" },
              { to: "/paymentdetail", icon: <MdOutlinePayments />, label: "Payments" },
            ].map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-600 flex flex-col items-center py-2 px-3"
                    : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
                }
              >
                {icon}
                <span className="text-xs mt-1">{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers } from "lucide-react";
// import ScanQRCode from "./pages/ScanQRCode";
// import CreateProduct from "./pages/CreateProduct";
// import ProductList from "./pages/ProductList";
// import { CartProvider, useCart } from "./CartContext";
// import CartPage from "./pages/CartPage";
// import CategoryManagement from "./pages/CategoryManagement";
// import SubCategoryManagement from "./pages/SubCategory";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import Orders from "./pages/Orders";
// import AllPayment from "./pages/Allpayment";
// import { MdOutlinePayments } from "react-icons/md";
// import PaymentDetail from "./pages/Paymentdetail";
// import PurchaseScanQRCode from "./pages/PurchaseScanQRCode";
// import AdminLogin from "./pages/AdminLogin";
// import { useState } from "react";
// import TodayOrders from "./pages/Report";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent() {
//   const { cart } = useCart();

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:flex-shrink-0">
//         <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
//           <div className="flex items-center h-16 px-4 border-b border-gray-200">
//             <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//           </div>
//           <div className="flex flex-col flex-grow overflow-y-auto">
//             <nav className="flex-1 px-2 py-4 space-y-1">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <Home className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Products
//               </NavLink>
//               <NavLink
//                 to="/scan"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <QrCode className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Scan
//               </NavLink>
//               <NavLink
//                 to="/create"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <PlusCircle className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Add Product
//               </NavLink>
//               <NavLink
//                 to="/categories"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <Layers className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Categories
//               </NavLink>
//               <NavLink
//                 to="/orders"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <Layers className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Orders
//               </NavLink>
//               <NavLink
//                 to="/paymentdetail"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <Layers className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Payment Detail
//               </NavLink>
//               <NavLink
//                 to="/allpayment"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <MdOutlinePayments className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 All Payments
//               </NavLink>
//               <NavLink
//                 to="/todayorder"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <Layers className="flex-shrink-0 w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-500" />
//                 Today's Orders
//               </NavLink>
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   `group flex items-center px-4 py-2 text-sm rounded-md ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <div className="relative flex-shrink-0 w-5 h-5 mr-3">
//                   <ShoppingCart className="text-gray-500 group-hover:text-gray-500" />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {cart.length}
//                     </span>
//                   )}
//                 </div>
//                 Cart
//               </NavLink>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Top Navigation */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between px-4 py-4 sm:px-6">
//             <div className="flex items-center md:hidden">
//               <h1 className="text-xl font-bold text-primary-600">ProductScan</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   `relative ${isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}`
//                 }
//               >
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//               </NavLink>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
//           <Routes>
//             <Route path="/login" element={<Login />} />
            
//             <Route index element={<Dashboard />}/>
//               {/* <Route index element={<ProductList />} /> */}
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/product" element={<ProductList />} />
//               <Route path="/scan" element={<ScanQRCode />} />
//               <Route path="/create" element={<CreateProduct />} />
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/categories" element={<CategoryManagement />} />
//               <Route path="/subcategories" element={<SubCategoryManagement />} />
//               <Route path="/registration" element={<Registration />} />
//               <Route path="/orders" element={<Orders />} />
//               <Route path="/allpayment/:id" element={<AllPayment />} />
//               <Route path="/paymentdetail" element={<PaymentDetail />} />
//               <Route path="/purchaseScanQRCode" element={<PurchaseScanQRCode />} />
//               <Route path="/todayorder" element={<TodayOrders />} />
//             {/* </Route> */}
//           </Routes>
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//           <div className="flex justify-around">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex flex-col items-center py-2 px-3 ${
//                   isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
//                 }`
//               }
//             >
//               <Home size={24} />
//               <span className="text-xs mt-1">Products</span>
//             </NavLink>
//             <NavLink
//               to="/scan"
//               className={({ isActive }) =>
//                 `flex flex-col items-center py-2 px-3 ${
//                   isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
//                 }`
//               }
//             >
//               <QrCode size={24} />
//               <span className="text-xs mt-1">Scan</span>
//             </NavLink>
//             <NavLink
//               to="/create"
//               className={({ isActive }) =>
//                 `flex flex-col items-center py-2 px-3 ${
//                   isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
//                 }`
//               }
//             >
//               <PlusCircle size={24} />
//               <span className="text-xs mt-1">Add</span>
//             </NavLink>
//             <NavLink
//               to="/cart"
//               className={({ isActive }) =>
//                 `flex flex-col items-center py-2 px-3 ${
//                   isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
//                 }`
//               }
//             >
//               <div className="relative">
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//               </div>
//               <span className="text-xs mt-1">Cart</span>
//             </NavLink>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default App;