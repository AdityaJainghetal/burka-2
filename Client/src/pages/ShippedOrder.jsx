
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ShipOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  
  const [shippingDetails, setShippingDetails] = useState({
    remark: "",
    shippingDate: new Date().toISOString().split('T')[0] // Default to today's date
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put(`https://burka-2-2.onrender.com/order/${id}/ship`, {
        remark: shippingDetails.remark,
        shippingDate: shippingDetails.shippingDate
      });
      navigate('/orders', { 
        state: { 
          success: `Order #${id.slice(-6).toUpperCase()} shipped successfully!`
        } 
      });
    } catch (err) {
      console.error('Failed to ship order:', err);
      setError(err.response?.data?.message || 'Failed to ship order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ship Order #{id.slice(-6).toUpperCase()}</h2>
      
      {order && (
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <p className="font-semibold">Customer: {order.user?.name || 'Guest'}</p>
          <p>Total: ₹{order.totalPriceAfterDiscount || order.totalPrice}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="shippingDate">
            Shipping Date
          </label>
          <input
            type="date"
            id="shippingDate"
            name="shippingDate"
            value={shippingDetails.shippingDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="remark">
            Shipping Remarks
          </label>
          <textarea
            id="remark"
            name="remark"
            value={shippingDetails.remark}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
            placeholder="Additional shipping notes"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/orders')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Shipment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipOrder;