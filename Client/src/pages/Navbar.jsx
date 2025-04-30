// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   QrCode,
//   PlusCircle,
//   Layers,
//   LayoutGrid,
//   UserPlus,
//   LogIn,
// } from "lucide-react";

// const navItems = [
//   { to: "/", label: "Products", icon: Home },
//   { to: "/scan", label: "Scan QR", icon: QrCode },
//   { to: "/categories", label: "Categories", icon: Layers },
//   { to: "/subcategories", label: "Sub-Categories", icon: LayoutGrid },
//   { to: "/create", label: "Add Product", icon: PlusCircle },
//   { to: "/registration", label: "Registration", icon: UserPlus },
//   { to: "/login", label: "Login", icon: LogIn },
// ];

// const Sidbar = () => {
//   return (
//     <aside className="hidden md:block w-64 fixed top-16 left-0 h-[calc(100%-4rem)] bg-white shadow-lg border-r z-50">
//       <div className="p-4">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
//         <nav className="flex flex-col space-y-2">
//           {navItems.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                   isActive
//                     ? "bg-primary-100 text-primary-600"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
//                 }`
//               }
//             >
//               <Icon className="w-5 h-5 mr-3" />
//               {label}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidbar;



// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   QrCode,
//   PlusCircle,
//   Layers,
//   LayoutGrid,
//   UserPlus,
//   LogIn,
//   Menu,
//   X,
// } from "lucide-react";

// const navItems = [
//   // { to: "/", label: "Productsvhjv", icon: Home },
//   { to: "/", label: "Products", icon: Home },



//   { to: "/scan", label: "Scan QR", icon: QrCode },
//   { to: "/categories", label: "Categories", icon: Layers },
//   { to: "/subcategories", label: "Sub-Categories", icon: LayoutGrid },
//   { to: "/create", label: "Add Product", icon: PlusCircle },
//   { to: "/orders", label: "Orders", icon: LayoutGrid },
//   // { to: "/allpayment", label: "AllPayment", icon: LayoutGrid },

//   // { to: "/paymentdetail", label: "PaymentDetail", icon: LayoutGrid },
//   { to: "/registration", label: "Registration", icon: UserPlus },

//   // { to: "/login", label: "Login", icon: LogIn },
//   { to: "/purchaseScanQRCode", label: "PurchaseScanQRCode", icon: LogIn },
//   { to: "/todayorder", label: "Report", icon: LogIn },
//   { to: "/dashboard", label: "Dashboard", icon: LogIn },
//   { to: "/deliverorder", label: "Deliver-order", icon: LogIn },




  


  







  

  

  

// ];

// const Sidbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Mobile Hamburger Button */}
//       {isMobile && (
//         <button
//           onClick={toggleSidebar}
//           className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-700"
//           aria-label="Toggle menu"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       )}

//       {/* Overlay for mobile */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`bg-white shadow-lg border-r z-50 transition-all duration-300 ease-in-out ${
//           isMobile
//             ? `fixed top-0 left-0 h-full w-64 transform ${
//                 isOpen ? "translate-x-0" : "-translate-x-full"
//               }`
//             : "hidden md:block md:w-64 md:fixed md:top-16 md:left-0 md:h-[calc(100%-4rem)]"
//         }`}
//       >

//         <div className="p-4 h-full flex flex-col">
          
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
//           <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto">
//             {navItems.map(({ to, label, icon: Icon }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 onClick={() => isMobile && setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
//                     isActive
//                       ? "bg-primary-100 text-primary-600"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
//                   }`
//                 }
//               >
//                 <Icon className="w-5 h-5 mr-3" />
//                 {label}
//               </NavLink>
//             ))}
//           </nav>
          
//           {/* Mobile close button inside sidebar */}
//           {isMobile && (
//             <button
//               onClick={toggleSidebar}
//               className="mt-auto p-2 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center md:hidden"
//             >
//               <X className="w-5 h-5 mr-2" />
//               Close Menu
//             </button>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidbar;





import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  QrCode,
  PlusCircle,
  Layers,
  LayoutGrid,
  UserPlus,
  LogIn,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  List,
  Grid,
  ClipboardList,
  BarChart2,
  Truck,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    // Clear any other user-related data from localStorage if needed
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.clear()
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

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
      label: "Products",
      icon: Package,
      subItems: [
        { to: "/", label: "All Products", icon: Home },
        { to: "/create", label: "Add Product", icon: PlusCircle },
      ],
    },
    {
      label: "Categories",
      icon: Layers,
      subItems: [
        { to: "/categories", label: "All Categories", icon: List },
        { to: "/subcategories", label: "Sub-Categories", icon: Grid },
      ],
    },
    { to: "/scan", label: "Scan QR", icon: QrCode },
    { to: "/orders", label: "Orders", icon: ClipboardList },
    // { to: "/deliverorder", label: "Deliveries", icon: Truck },
    { to: "/todayorder", label: "Reports", icon: ClipboardList },
    { to: "/registration", label: "Registration", icon: UserPlus },
    { to: "/purchaseScanQRCode", label: "Purchase Scan", icon: QrCode },
 

    { to: "/deliverorder", label: "Deliverorder", icon: Truck },
    // { to: "/shiporder", label: "Shiporder", icon: QrCode },
    // { to: "/dilveredOrder", label: "DilveredOrder", icon: QrCode },
    { to: "/shippedorderdisplay", label: "Shippedorderdisplay", icon: QrCode },
    { to: "/cancelorder", label: "cancelorder", icon: QrCode },








    
    

    

  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg border-r z-50 transition-all duration-300 ease-in-out ${
          isMobile
            ? `fixed top-0 left-0 h-full w-64 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "hidden md:block md:w-64 md:fixed md:top-16 md:left-0 md:h-[calc(100%-4rem)]"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-6 px-3 py-2 border-b border-gray-200">
            Admin Panel
          </h2>
          <nav className="flex-1 flex flex-col space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="mb-1">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
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
                            onClick={() => isMobile && setIsOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
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
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile close button inside sidebar */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="mt-auto p-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center md:hidden"
            >
              <X className="w-5 h-5 mr-2" />
              Close Menu
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;