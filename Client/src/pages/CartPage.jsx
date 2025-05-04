import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  AlertCircle,
  CreditCard,
} from "lucide-react";

const CartPage = () => {
  const { cart, fetchCart } = useCart();
  const [editedQuantities, setEditedQuantities] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemsBeingDeleted, setItemsBeingDeleted] = useState({});
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [discount, setDiscount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  useEffect(() => {
    const initial = {};
    cart.forEach(item => {
      if (item.product) {
        initial[item._id] = item.quantity;
      }
    });
    setEditedQuantities(initial);
  }, [cart]);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
        setVendors(res.data);
      } catch {
        setError("Failed to load vendors.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    const vendor = vendors.find(v => v._id === selectedVendor);
    setDiscount(vendor?.discount || 0);
  }, [selectedVendor, vendors]);

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) =>
        item.product
          ? sum + item.product.price * (editedQuantities[item._id] || 1)
          : sum,
      0
    );
    const discAmt = (subtotal * discount) / 100;
    return { subtotal, discount: discAmt, total: subtotal - discAmt };
  };

  const { subtotal, discount: discountAmount, total } = calculateTotal();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 10, 10);

    const cols = ["Product", "Price", "Qty", "Subtotal"];
    const rows = cart
      .filter(item => item.product)
      .map(item => [
        item.product.name,
        `₹${item.product.price}`,
        editedQuantities[item._id],
        `₹${(item.product.price * editedQuantities[item._id]).toFixed(2)}`
      ]);

    autoTable(doc, { head: [cols], body: rows, startY: 20 });
    const startY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 10, startY);
    doc.text(
      `Discount (${discount}%): ₹${discountAmount.toFixed(2)}`,
      10,
      startY + 10
    );
    doc.setFontSize(14);
    doc.text(`Total: ₹${total.toFixed(2)}`, 10, startY + 20);
    doc.save("invoice.pdf");
  };

  const handleQuantityChange = (id, qty) => {
    const item = cart.find(item => item._id === id);
    if (!item.product || qty < 1 || qty > item.product.stock) {
      return;
    }
    setEditedQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const handleDelete = async id => {
    setItemsBeingDeleted(prev => ({ ...prev, [id]: true }));
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/remove/${id}`);
      await fetchCart();
    } catch {
      setError("Failed to delete.");
    } finally {
      setItemsBeingDeleted(prev => ({ ...prev, [id]: false }));
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePayment = async () => {
    setProcessingPayment(true);
    setError(null);

    const payload = {
      orderItems: cart
        .filter(item => item.product)
        .map(item => ({
          productId: item.product._id,
          productName: item.product.name,
          price: item.product.price,
          quantity: editedQuantities[item._id],
          productImage: item.product.images[0] || "",
          discountName: vendors.find(v => v._id === selectedVendor)?.firmName || "",
          discountPercentage: discount,
          priceAfterDiscount:
            item.product.price - (item.product.price * discount) / 100,
        })),
      totalPrice: subtotal,
      totalPriceAfterDiscount: total,
    };

    try {
      // Create order
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/order`, payload);

      if (res.data.success) {
        setPaymentSuccess(true);

        // Remove all cart items
        const deletionPromises = cart
          .filter(item => item.product)
          .map(async item => {
            try {
              await axios.delete(`${import.meta.env.VITE_API_URL}/cart/remove/${item.product._id}`);
            } catch (err) {
              console.error(`Failed to remove product ${item.product._id}:`, err);
              throw new Error(`Failed to remove ${item.product.name} from cart.`);
            }
          });

        try {
          await Promise.all(deletionPromises);
        } catch (err) {
          setError(err.message || "Some items could not be removed from the cart.");
        }

        // Refresh cart
        await fetchCart();

        setTimeout(() => {
          closeModal();
          setCheckoutDone(true);
        }, 1000);
      } else {
        setError("Order creation failed.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.message || "Something went wrong during checkout.");
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {cart.filter(item => item.product).length === 0 ? (
        <div className="border rounded shadow-sm flex flex-col items-center py-10">
          <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-500">Your cart is empty</p>
          <button className="mt-4 px-4 py-2 border rounded hover:bg-gray-50">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item =>
              item.product && (
                <div
                  key={item._id}
                  className="border rounded shadow-sm p-4 flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex gap-4">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                    ) : (
                      <div className="h-20 w-20 bg-gray-100 flex items-center justify-center rounded">
                        <ShoppingCart className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h2 className="font-medium text-lg">{item.product.name}</h2>
                      <p className="text-gray-500">₹{item.product.price} each</p>
                      <p className="text-gray-500">
                        {item.product.stock > 0
                          ? `${item.product.stock} in stock`
                          : "Out of stock"}
                      </p>
                      <div className="flex items-center mt-2">
                        <input
                          type="number"
                          value={editedQuantities[item._id] || 1}
                          onChange={e => {
                            const value = parseInt(e.target.value, 10);
                            handleQuantityChange(
                              item._id,
                              isNaN(value) || value < 1 ? 1 : value
                            );
                          }}
                          min="1"
                          max={item.product.stock}
                          className="h-8 w-16 text-center border-t border-b"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-medium text-lg">
                      ₹{(item.product.price * editedQuantities[item._id]).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDelete(item.product._id)}
                      disabled={itemsBeingDeleted[item._id]}
                      className="mt-2 px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 disabled:opacity-50"
                    >
                      {itemsBeingDeleted[item._id] ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-6 border rounded shadow-sm p-4">
            <div className="mb-4">
              <label className="block text-sm mb-1">Select Vendor</label>
              <select
                value={selectedVendor}
                onChange={e => setSelectedVendor(e.target.value)}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select a vendor</option>
                {vendors.map(v => (
                  <option key={v._id} value={v._id}>
                    {v.firmName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Discount</label>
              <input
                readOnly
                value={discount > 0 ? `${discount}%` : ""}
                className="w-full border rounded bg-gray-100 px-4 py-2"
              />
              {discount > 0 && (
                <p className="text-green-600 text-sm mt-1">
                  {discount}% applied!
                </p>
              )}
            </div>

            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2) === "NaN" ? 0 : subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between py-1">
                <span>Discount</span>
                <span>
                  -₹{discountAmount.toFixed(2) === "NaN" ? 0 : discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between py-1 font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2) === "NaN" ? 0 : total.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex gap-2">
              {!checkoutDone ? (
                <button
                  onClick={openModal}
                  disabled={!selectedVendor}
                  className={`w-full px-4 py-2 rounded flex items-center justify-center ${
                    !selectedVendor
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Checkout
                </button>
              ) : (
                <button
                  onClick={generatePDF}
                  className="w-full px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Download Invoice
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Confirm Your Order
            </h2>

            <div className="space-y-2 mb-4 text-sm text-gray-700">
              {cart
                .filter(item => item.product)
                .map(item => (
                  <div key={item._id} className="flex justify-between">
                    <span>
                      {item.product.name} (x{editedQuantities[item._id]})
                    </span>
                    <span>
                      ₹{(item.product.price * editedQuantities[item._id]).toFixed(2)}
                    </span>
                  </div>
                ))}
              <hr className="my-2" />
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">
                    Discount ({discount}% -{" "}
                    {vendors.find(v => v._id === selectedVendor)?.firmName})
                  </span>
                  <span className="text-green-600">
                    -₹{discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={processingPayment}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={processingPayment}
                className={`px-4 py-2 rounded text-white flex items-center justify-center ${
                  processingPayment
                    ? "bg-yellow-500 cursor-not-allowed"
                    : paymentSuccess
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {processingPayment
                  ? "Processing..."
                  : paymentSuccess
                  ? "Order placed"
                  : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;