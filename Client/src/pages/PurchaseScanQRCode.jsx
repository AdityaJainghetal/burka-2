// import { useRef, useState, useEffect } from "react";
// import { getProductByBarcode } from "../api";
// import { QrCode, Camera, AlertCircle, CheckCircle } from "lucide-react";
// import jsQR from "jsqr";

// const PurchaseScanQRCode = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [product, setProduct] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [error, setError] = useState(null);
//   const [barcode, setBarcode] = useState(null);
//   const [loading, setLoading] = useState(false);

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
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         setError("Unable to access the camera. Please check permissions.");
//         setScanning(false);
//       }
//     };

//     const detectBarcode = () => {
//       if (!videoRef.current || !canvasRef.current || !scanning) return;

//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;

//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const code = jsQR(imageData.data, canvas.width, canvas.height);

//       if (code) {
//         const scannedBarcode = code.data;
//         setBarcode(scannedBarcode);
//         handleScannedProduct(scannedBarcode);
//       } else {
//         animationId = requestAnimationFrame(detectBarcode);
//       }
//     };

//     const handleScannedProduct = async (scannedBarcode) => {
//       setLoading(true);
//       try {
//         const product = await getProductByBarcode(scannedBarcode);
//         setProduct(product);
//         // Here you would typically handle the purchase logic
//         // For example, you might call a purchase API or set up a purchase state
//       } catch (err) {
//         setError(err.message || "Product not found");
//       } finally {
//         setLoading(false);
//         setScanning(false);
//       }
//     };

//     startCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//       if (animationId) {
//         cancelAnimationFrame(animationId);
//       }
//     };
//   }, [scanning]);

//   const startScanning = () => {
//     setError(null);
//     setProduct(null);
//     setBarcode(null);
//     setScanning(true);
//   };

//   const stopScanning = () => {
//     setScanning(false);
//   };

//   const handlePurchase = () => {
//     // Implement your purchase logic here
//     // This would typically call an API to process the purchase
//     console.log("Purchasing product:", product);
//     alert(`Purchase successful for ${product.name}`);
//     setProduct(null);
//     setBarcode(null);
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h2 className="text-xl font-bold mb-4">Scan Product QR Code for Purchase</h2>

//       {error && (
//         <div className="flex items-center bg-red-100 text-red-700 p-3 rounded mb-4 w-full max-w-md">
//           <AlertCircle className="mr-2" />
//           {error}
//         </div>
//       )}

//       {product && (
//         <div className="w-full max-w-md mb-4">
//           <div className="flex items-center bg-green-100 text-green-700 p-3 rounded mb-2">
//             <CheckCircle className="mr-2" />
//             Product scanned successfully!
//           </div>
//           <div className="p-4 border border-gray-200 rounded-lg">
//             <h3 className="text-lg font-medium">{product.name}</h3>
//             <p className="text-gray-600">Price: ₹{product.price.toFixed(2)}</p>
//             <button
//               onClick={handlePurchase}
//               className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
//             >
//               Confirm Purchase
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="relative w-full max-w-md mb-4">
//         {scanning ? (
//           <>
//             <video 
//               ref={videoRef} 
//               className="w-full h-auto border rounded"
//               playsInline
//               muted
//             />
//             <canvas 
//               ref={canvasRef} 
//               className="hidden"
//             />
//             <button
//               onClick={stopScanning}
//               disabled={loading}
//               className={`mt-4 w-full py-2 px-4 rounded flex items-center justify-center ${
//                 loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
//               } text-white transition`}
//             >
//               {loading ? 'Processing...' : 'Stop Scanning'}
//             </button>
//           </>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded p-8 flex flex-col items-center">
//             <QrCode size={64} className="text-gray-400 mb-4" />
//             <button
//               onClick={startScanning}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center transition"
//             >
//               <Camera className="mr-2" />
//               Start Scanning
//             </button>
//           </div>
//         )}
//       </div>

//       {barcode && !scanning && !product && (
//         <div className="mt-4 p-3 bg-gray-100 rounded w-full max-w-md text-center">
//           Scanned Barcode: {barcode}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PurchaseScanQRCode;








// import { useRef, useState, useEffect } from "react";
// import { QrCode, Camera, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
// import jsQR from "jsqr";
// import axios from "axios";

// const PurchaseScanQRCode = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [product, setProduct] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [error, setError] = useState(null);
//   const [barcode, setBarcode] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [purchaseLoading, setPurchaseLoading] = useState(false);
//   const [purchaseSuccess, setPurchaseSuccess] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   // Get product by barcode
//   const getProductByBarcode = async (barcode) => {
//     try {
//       const response = await axios.get(`/api/products/barcode/${barcode}`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Product not found");
//     }
//   };

//   // Record purchase in backend
//   const recordPurchase = async (productId, quantity) => {
//     try {
//       const response = await axios.post('/api/purchases', {
//         productId,
//         quantity,
//         purchaseDate: new Date().toISOString()
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Failed to record purchase");
//     }
//   };

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
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         setError("Unable to access the camera. Please check permissions.");
//         setScanning(false);
//       }
//     };

//     const detectBarcode = () => {
//       if (!videoRef.current || !canvasRef.current || !scanning) return;

//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;

//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const code = jsQR(imageData.data, canvas.width, canvas.height);

//       if (code) {
//         const scannedBarcode = code.data;
//         setBarcode(scannedBarcode);
//         handleScannedProduct(scannedBarcode);
//       } else {
//         animationId = requestAnimationFrame(detectBarcode);
//       }
//     };

//     const handleScannedProduct = async (scannedBarcode) => {
//       setLoading(true);
//       try {
//         const product = await getProductByBarcode(scannedBarcode);
//         setProduct(product);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//         setScanning(false);
//       }
//     };

//     startCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//       if (animationId) {
//         cancelAnimationFrame(animationId);
//       }
//     };
//   }, [scanning]);

//   const startScanning = () => {
//     setError(null);
//     setProduct(null);
//     setBarcode(null);
//     setPurchaseSuccess(false);
//     setScanning(true);
//   };

//   const stopScanning = () => {
//     setScanning(false);
//   };

//   const handlePurchase = async () => {
//     if (!product) return;
    
//     setPurchaseLoading(true);
//     try {
//       await recordPurchase(product._id, quantity);
//       setPurchaseSuccess(true);
//       setProduct(null);
//       setBarcode(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setPurchaseLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4 flex items-center">
//         <QrCode className="mr-2" />
//         Purchase Scanner
//       </h2>

//       {error && (
//         <div className="flex items-center bg-red-100 text-red-700 p-3 rounded mb-4 w-full">
//           <AlertCircle className="mr-2" />
//           {error}
//         </div>
//       )}

//       {purchaseSuccess && (
//         <div className="flex items-center bg-green-100 text-green-700 p-3 rounded mb-4 w-full">
//           <CheckCircle className="mr-2" />
//           Purchase recorded successfully!
//         </div>
//       )}

//       <div className="relative w-full mb-4">
//         {scanning ? (
//           <>
//             <video 
//               ref={videoRef} 
//               className="w-full h-auto border rounded"
//               playsInline
//               muted
//             />
//             <canvas 
//               ref={canvasRef} 
//               className="hidden"
//             />
//             <button
//               onClick={stopScanning}
//               disabled={loading}
//               className={`mt-4 w-full py-2 px-4 rounded flex items-center justify-center ${
//                 loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
//               } text-white transition`}
//             >
//               {loading ? <Loader2 className="animate-spin mr-2" /> : null}
//               {loading ? 'Processing...' : 'Stop Scanning'}
//             </button>
//           </>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded p-8 flex flex-col items-center">
//             <QrCode size={64} className="text-gray-400 mb-4" />
//             <button
//               onClick={startScanning}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center transition"
//             >
//               <Camera className="mr-2" />
//               Start Scanning
//             </button>
//           </div>
//         )}
//       </div>

//       {product && (
//         <div className="w-full mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
//           <h3 className="text-lg font-medium mb-2">{product.name}</h3>
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-gray-600">Price:</span>
//             <span className="font-bold">₹{product.price.toFixed(2)}</span>
//           </div>
          
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-gray-600">Quantity:</span>
//             <div className="flex items-center">
//               <button 
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
//               >
//                 -
//               </button>
//               <span className="px-4 py-1 border-t border-b">{quantity}</span>
//               <button 
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           <button
//             onClick={handlePurchase}
//             disabled={purchaseLoading}
//             className={`w-full py-2 px-4 rounded flex items-center justify-center ${
//               purchaseLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
//             } text-white transition`}
//           >
//             {purchaseLoading ? <Loader2 className="animate-spin mr-2" /> : null}
//             {purchaseLoading ? 'Processing...' : 'Confirm Purchase'}
//           </button>
//         </div>
//       )}

//       {barcode && !product && !scanning && (
//         <div className="mt-2 p-3 bg-gray-100 rounded w-full text-center text-sm">
//           Scanned Barcode: {barcode}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PurchaseScanQRCode;












import { useRef, useState, useEffect } from "react";
import { QrCode, Camera, AlertCircle, CheckCircle, Loader2, X, Scan } from "lucide-react";
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
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Get product by barcode
  const getProductByBarcode = async (barcode) => {
    try {
      const response = await axios.get(`/api/products/barcode/${barcode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Product not found");
    }
  };

  // Record purchase in backend
  const recordPurchase = async (productId, quantity) => {
    try {
      const response = await axios.post('/api/purchases', {
        productId,
        quantity,
        purchaseDate: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to record purchase");
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
  }, [scanning]);

  const startScanning = () => {
    setError(null);
    setProduct(null);
    setBarcode(null);
    setPurchaseSuccess(false);
    setScanning(true);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  const handlePurchase = async () => {
    if (!product) return;
    
    setPurchaseLoading(true);
    try {
      await recordPurchase(product._id, quantity);
      setPurchaseSuccess(true);
      setProduct(null);
      setBarcode(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <QrCode className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Purchase Scanner</h1>
            </div>
            {scanning && (
              <button 
                onClick={stopScanning}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Status Messages */}
        <div className="px-6 pt-4">
          {error && (
            <div className="flex items-center bg-red-50 text-red-700 p-3 rounded-lg mb-4 border border-red-200">
              <AlertCircle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {purchaseSuccess && (
            <div className="flex items-center bg-green-50 text-green-700 p-3 rounded-lg mb-4 border border-green-200">
              <CheckCircle className="mr-2 flex-shrink-0" />
              <span>Purchase recorded successfully!</span>
            </div>
          )}
        </div>

        {/* Scanner Area */}
        <div className="px-6 pb-6">
          {scanning ? (
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-blue-400">
                <video 
                  ref={videoRef} 
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                />
                {/* Scanner overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 border-4 border-blue-400 rounded-lg">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-400 animate-pulse"></div>
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-400 animate-pulse"></div>
                    <div className="absolute -right-1 top-0 bottom-0 w-1 bg-blue-400 animate-pulse"></div>
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-400 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="mt-4 text-center text-sm text-gray-500">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing QR code...</span>
                  </div>
                ) : (
                  <span>Point your camera at a QR code</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8">
              <div className="relative mb-6">
                <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border-2 border-dashed border-blue-200">
                  <QrCode className="h-20 w-20 text-blue-400" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-blue-500 rounded-full p-3 shadow-lg">
                  <Scan className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <button
                onClick={startScanning}
                className="w-full max-w-xs py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition flex items-center justify-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>Start Scanning</span>
              </button>
            </div>
          )}

          {/* Scanned Product */}
          {product && (
            <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={handlePurchase}
                    disabled={purchaseLoading}
                    className={`w-full py-3 rounded-lg font-medium text-white transition flex items-center justify-center space-x-2 ${
                      purchaseLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                    }`}
                  >
                    {purchaseLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                    <span>{purchaseLoading ? 'Processing...' : 'Confirm Purchase'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scanned Barcode Info */}
          {barcode && !product && !scanning && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-center text-sm">
              <span className="font-medium">Scanned Barcode:</span> {barcode}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseScanQRCode;