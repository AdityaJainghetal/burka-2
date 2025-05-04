import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const DeliverOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    receivedBy: '',
    remark: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!deliveryDetails.receivedBy || !deliveryDetails.remark) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/order/${id}/deliver`, {
        deliveryDetails
      });
      navigate('/orders');
    } catch (err) {
      console.error('Failed to deliver order:', err);
      setError(err.response?.data?.message || 'Failed to deliver order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Deliver Order #{id.slice(-6).toUpperCase()}</h2>
      
      {order && (
        <div className="mb-4">
          <p className="font-semibold">Customer: {order.user?.name || 'Guest'}</p>
          <p>Total: ₹{order.totalPriceAfterDiscount || order.totalPrice}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="receivedBy">
            Received By
          </label>
          <input
            type="text"
            id="receivedBy"
            name="receivedBy"
            value={deliveryDetails.receivedBy}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter recipient name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="remark">
            Delivery Remarks
          </label>
          <textarea
            id="remark"
            name="remark"
            value={deliveryDetails.remark}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
            placeholder="Any delivery notes or remarks"
            required
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
            {loading ? 'Processing...' : 'Confirm Delivery'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliverOrder;