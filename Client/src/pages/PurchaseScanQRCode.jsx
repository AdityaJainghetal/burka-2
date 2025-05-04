import { useRef, useState, useEffect } from "react";
import { QrCode, Camera, AlertCircle, CheckCircle, Loader2, X, Scan, ShoppingCart } from "lucide-react";
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
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  // Get product by barcode
  const getProductByBarcode = async (barcode) => {
    try {
      const response = await axios.get(`http://localhost:8080/purchase/barcode/${barcode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Product not found");
    }
  };

  // Update purchase and product stock
  const updateProductQuantity = async (barcode, quantity) => {
    try {
      const response = await axios.put('http://localhost:8080/purchase/scan', {
        barcode,
        quantity
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to record purchase");
    }
  };

  // Add product to cart by barcode
  const addToCart = async (barcode, quantity) => {
    setCartLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/cart/addByBarcode`, {
        barcode,
        quantity
      });
      setShowAddToCartModal(false);
      setScannedProduct(null);
      setCartQuantity(1);
      setBarcode(null);
      setProduct(null);
      setPurchaseSuccess(true);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add product to cart");
    } finally {
      setCartLoading(false);
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
        const productData = await getProductByBarcode(scannedBarcode);
        setScannedProduct(productData);
        setShowAddToCartModal(true);
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
    setScannedProduct(null);
    setShowAddToCartModal(false);
    setCartQuantity(1);
    setScanning(true);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  const handlePurchase = async () => {
    if (!product || !barcode) return;
    
    setPurchaseLoading(true);
    try {
      await updateProductQuantity(barcode, quantity);
      setPurchaseSuccess(true);
      setProduct(null);
      setBarcode(null);
      setQuantity(1);
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
              <span>Action completed successfully!</span>
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

          {/* Add to Cart Modal */}
          {showAddToCartModal && scannedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Add to Cart</h2>
                  <button
                    onClick={() => setShowAddToCartModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="mb-4 space-y-2">
                  <p className="text-lg font-medium">{scannedProduct.name}</p>
                  <p className="text-sm text-gray-600">Price: ₹{scannedProduct.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Available: {scannedProduct.stock} in stock</p>
                  <p className="text-sm text-gray-600">Barcode: {barcode}</p>
                  {scannedProduct.description && (
                    <p className="text-sm text-gray-600">Description: {scannedProduct.description}</p>
                  )}
                  {scannedProduct.category && (
                    <p className="text-sm text-gray-600">Category: {scannedProduct.category.name}</p>
                  )}
                  {scannedProduct.size && scannedProduct.size.length > 0 && (
                    <p className="text-sm text-gray-600">Sizes: {scannedProduct.size.join(', ')}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={scannedProduct.stock}
                    value={cartQuantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value >= 1 && value <= scannedProduct.stock) {
                        setCartQuantity(value);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddToCartModal(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => addToCart(barcode, cartQuantity)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
                    disabled={cartLoading}
                  >
                    {cartLoading ? (
                      <Loader2 size={18} className="mr-2 animate-spin" />
                    ) : (
                      <ShoppingCart size={18} className="mr-2" />
                    )}
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scanned Product for Purchase */}
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
                  <span className="text-gray-600">Quantity to Add:</span>
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
                    <span>{purchaseLoading ? 'Processing...' : 'Record Purchase'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scanned Barcode Info */}
          {barcode && !product && !scanning && !showAddToCartModal && (
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