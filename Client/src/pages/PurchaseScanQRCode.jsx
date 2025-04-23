// import { useRef, useState, useEffect } from "react";
// import { getProductByBarcode } from "../api";
// import { QrCode, Camera, AlertCircle } from "lucide-react";
// import { useCart } from "../CartContext";
// import jsQR from "jsqr";

// const PurchaseScanQRCode = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [product, setProduct] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [error, setError] = useState(null);
//   const [barcode, setBarcode] = useState(null);
//   const { cartItems, addToCart, updateCartItemQuantity, fetchCart } = useCart();

//   useEffect(() => {
//     if (!scanning) return;

//     let stream;
//     let animationId;

//     const startCamera = async () => {
//       try {
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "environment" },
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;

//           videoRef.current.onloadedmetadata = () => {
//             videoRef.current.play();
//             detectBarcode();
//           };
//         }

//         const detectBarcode = () => {
//           if (!videoRef.current || !canvasRef.current || !scanning) return;

//           const canvas = canvasRef.current;
//           const context = canvas.getContext("2d");

//           canvas.width = videoRef.current.videoWidth;
//           canvas.height = videoRef.current.videoHeight;

//           context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//           const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//           const code = jsQR(imageData.data, canvas.width, canvas.height);

//           if (code) {
//             const scannedBarcode = code.data;
//             setBarcode(scannedBarcode);
//             handleScannedProduct(scannedBarcode);
//           } else {
//             animationId = requestAnimationFrame(detectBarcode);
//           }
//         };

//         const handleScannedProduct = async (scannedBarcode) => {
//           try {
//             const response = await getProductByBarcode(scannedBarcode);
//             const product = response.data;
//             setProduct(product);
//             setScanning(false);
            
//             const existingItem = cartItems.find(item => item.productId === product._id);
            
//             if (existingItem) {
//               await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
//             } else {
//               await addToCart(product._id, 1);
//             }
            
//             await fetchCart();
//           } catch (err) {
//             setError("Product not found. Please try again or add this product.");
//             setScanning(false);
//           }
//         };
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         setError("Unable to access the camera. Please check permissions or run the code on a secure server (HTTPS).");
//         setScanning(false);
//       }
//     };

//     startCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       if (animationId) {
//         cancelAnimationFrame(animationId);
//       }
//     };
//   }, [scanning, cartItems, addToCart, updateCartItemQuantity, fetchCart]);

//   const startScanning = () => {
//     setError(null);
//     setProduct(null);
//     setBarcode(null);
//     setScanning(true);
//   };

//   const stopScanning = () => {
//     setScanning(false);
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h2 className="text-xl font-bold mb-4">Scan Product QR Code</h2>
      
//       {error && (
//         <div className="flex items-center bg-red-100 text-red-700 p-3 rounded mb-4">
//           <AlertCircle className="mr-2" />
//           {error}
//         </div>
//       )}
      
//       {product && (
//         <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
//           Product "{product.title}" added to cart!
//         </div>
//       )}
      
//       <div className="relative w-full max-w-md mb-4">
//         {scanning ? (
//           <>
//             <video 
//               ref={videoRef} 
//               className="w-full h-auto border rounded"
//               playsInline
//             />
//             <canvas 
//               ref={canvasRef} 
//               className="hidden"
//             />
//             <button
//               onClick={stopScanning}
//               className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
//             >
//               Stop Scanning
//             </button>
//           </>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded p-8 flex flex-col items-center">
//             <QrCode size={64} className="text-gray-400 mb-4" />
//             <button
//               onClick={startScanning}
//               className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition"
//             >
//               <Camera className="mr-2" />
//               Start Scanning
//             </button>
//           </div>
//         )}
//       </div>
      
//       {barcode && !scanning && (
//         <div className="mt-4 p-3 bg-gray-100 rounded">
//           Scanned Barcode: {barcode}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PurchaseScanQRCode;


import { useRef, useState, useEffect } from "react";
import { QrCode, Camera, AlertCircle, CheckCircle } from "lucide-react";
import { useCart } from "../CartContext";
import jsQR from "jsqr";
import axios from "axios";

const PurchaseScanQRCode = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart, updateCartItemQuantity, fetchCart } = useCart();

  // API function to get product by barcode
  const getProductByBarcode = async (barcode) => {
    try {
      const response = await axios.get(`/api/products/barcode/${barcode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Product not found");
    }
  };

  useEffect(() => {
    if (!scanning) return;

    let stream;
    let animationId;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            detectBarcode();
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access the camera. Please check permissions.");
        setScanning(false);
      }
    };

    const detectBarcode = () => {
      if (!videoRef.current || !canvasRef.current || !scanning) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        const scannedBarcode = code.data;
        setBarcode(scannedBarcode);
        handleScannedProduct(scannedBarcode);
      } else {
        animationId = requestAnimationFrame(detectBarcode);
      }
    };

    const handleScannedProduct = async (scannedBarcode) => {
      setLoading(true);
      try {
        const product = await getProductByBarcode(scannedBarcode);
        setProduct(product);
        
        const existingItem = cartItems.find(item => item.productId === product._id);
        if (existingItem) {
          await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
          await addToCart(product._id, 1);
        }
        
        await fetchCart();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setScanning(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [scanning, cartItems]);

  const startScanning = () => {
    setError(null);
    setProduct(null);
    setBarcode(null);
    setScanning(true);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Scan Product QR Code</h2>
      
      {error && (
        <div className="flex items-center bg-red-100 text-red-700 p-3 rounded mb-4 w-full max-w-md">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}
      
      {product && (
        <div className="flex items-center bg-green-100 text-green-700 p-3 rounded mb-4 w-full max-w-md">
          <CheckCircle className="mr-2" />
          {product.title} added to cart!
        </div>
      )}
      
      <div className="relative w-full max-w-md mb-4">
        {scanning ? (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-auto border rounded"
              playsInline
              muted
            />
            <canvas 
              ref={canvasRef} 
              className="hidden"
            />
            <button
              onClick={stopScanning}
              disabled={loading}
              className={`mt-4 w-full py-2 px-4 rounded flex items-center justify-center ${
                loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
              } text-white transition`}
            >
              {loading ? 'Processing...' : 'Stop Scanning'}
            </button>
          </>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded p-8 flex flex-col items-center">
            <QrCode size={64} className="text-gray-400 mb-4" />
            <button
              onClick={startScanning}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center transition"
            >
              <Camera className="mr-2" />
              Start Scanning
            </button>
          </div>
        )}
      </div>
      
      {barcode && !scanning && (
        <div className="mt-4 p-3 bg-gray-100 rounded w-full max-w-md text-center">
          Scanned Barcode: {barcode}
        </div>
      )}
    </div>
  );
};

export default PurchaseScanQRCode;