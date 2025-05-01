import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PaymentForm from './PaymentForm';

const AllPayment = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderAndPayments = async () => {
      try {
        const orderRes = await axios.get(`http://localhost:8080/order/${id}`);
        setOrder(orderRes.data.order);

        const paymentsRes = await axios.get(`http://localhost:8080/payments/${id}`);
        setPayments(paymentsRes.data.payments || []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchOrderAndPayments();
  }, [id]);

  const handlePaymentSuccess = async (newPayment) => {
    try {
      // Add the new payment to the payments array
      setPayments([...payments, newPayment]);

      // Fetch the updated order to ensure consistency
      const orderRes = await axios.get(`http://localhost:8080/order/${id}`);
      setOrder(orderRes.data.order);
    } catch (err) {
      console.error('Error updating order after payment:', err);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!order) {
    return <div className="container mx-auto px-4 py-8">Order not found</div>;
  }

  const { orderItems, totalPrice, totalPriceAfterDiscount, dueAmount, status } = order;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Order Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h1>
        <div className="flex justify-between mb-4">
          <p className="text-sm text-gray-600">
            Order Status:{' '}
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                status === 'delivered'
                  ? 'bg-green-100 text-green-800'
                  : status === 'processing' || status === 'shipped'
                  ? 'bg-blue-100 text-blue-800'
                  : status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {status?.toUpperCase() || 'PENDING'}
            </span>
          </p>
        </div>

        
      </div>

      {/* Payment Form (Hidden if dueAmount is 0) */}
      {dueAmount > 0 && (
        <PaymentForm
          orderId={id}
          totalAmount={totalPriceAfterDiscount || totalPrice || 0}
          dueAmount={dueAmount || 0}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Payments History */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiving Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remark</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.paymentMode || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount?.toLocaleString() || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.receivingDate
                      ? new Date(payment.receivingDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.remark || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {payment.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No payments recorded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayment;






// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const AllPayment = () => {
//   const { id } = useParams();
//   const [payments, setPayments] = useState([]);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Form States
//   const [paymentMode, setPaymentMode] = useState('Cash');
//   const [amount, setAmount] = useState('');
//   const [receivingDate, setReceivingDate] = useState('');
//   const [remark, setRemark] = useState('');
//   const [chequeNumber, setChequeNumber] = useState('');
//   const [chequeDate, setChequeDate] = useState('');
//   const [chequeDetail, setChequeDetail] = useState('');

//   useEffect(() => {
//     const fetchOrderAndPayments = async () => {
//       try {
//         const orderRes = await axios.get(`http://localhost:8080/order/${id}`);
//         setOrder(orderRes.data.order);

//         const paymentsRes = await axios.get(`http://localhost:8080/payments/${id}`);
//         setPayments(paymentsRes.data.payments || []);

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       }
//     };

//     fetchOrderAndPayments();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       orderId: id,
//       paymentMode,
//       amount,
//       receivingDate,
//       remark,
//     };

//     if (paymentMode === 'Cheque') {
//       payload.chequeNumber = chequeNumber;
//       payload.chequeDate = chequeDate;
//       payload.chequeDetail = chequeDetail;
//     }

//     try {
//       const res = await axios.post('http://localhost:8080/payment', payload);
//       setPayments([...payments, res.data.payment]);

//       const orderRes = await axios.get(`http://localhost:8080/order/${id}`);
//       setOrder(orderRes.data.order);

//       // Reset form
//       setAmount('');
//       setReceivingDate('');
//       setRemark('');
//       setChequeNumber('');
//       setChequeDate('');
//       setChequeDetail('');
//       setPaymentMode('Cash');
//     } catch (err) {
//       console.error('Payment error:', err);
//     }
//   };

//   if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
//   if (!order) return <div className="container mx-auto px-4 py-8">Order not found</div>;

//   const { totalPrice, totalPriceAfterDiscount, dueAmount, status } = order;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Order Summary */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h1>
//         <div className="flex justify-between mb-4">
//           <p className="text-sm text-gray-600">
//             Order Status:{' '}
//             <span
//               className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                 status === 'delivered'
//                   ? 'bg-green-100 text-green-800'
//                   : status === 'processing' || status === 'shipped'
//                   ? 'bg-blue-100 text-blue-800'
//                   : status === 'cancelled'
//                   ? 'bg-red-100 text-red-800'
//                   : 'bg-yellow-100 text-yellow-800'
//               }`}
//             >
//               {status?.toUpperCase() || 'PENDING'}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Payment Form */}
//       {dueAmount > 0 && (
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-xl font-semibold mb-4">Add Payment</h2>

//           {/* Payment Mode */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
//             <select
//               value={paymentMode}
//               onChange={(e) => setPaymentMode(e.target.value)}
//               className="w-full border border-gray-300 rounded-md p-2"
//             >
//               <option value="Cash">Cash</option>
//               <option value="Cheque">Cheque</option>
//             </select>
//           </div>

//           {/* Amount */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               max={dueAmount}
//               min="1"
//               required
//               className="w-full border border-gray-300 rounded-md p-2"
//             />
//             <p className="text-sm text-gray-500 mt-1">Due Amount: ₹{dueAmount}</p>
//           </div>

//           {/* Receiving Date */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Receiving Date</label>
//             <input
//               type="date"
//               value={receivingDate}
//               onChange={(e) => setReceivingDate(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           {/* Remark */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
//             <input
//               type="text"
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//               className="w-full border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           {/* Cheque Fields */}
//           {paymentMode === 'Cheque' && (
//             <>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Enter Cheque Detail</label>
//                 <input
//                   type="text"
//                   value={chequeDetail}
//                   onChange={(e) => setChequeDetail(e.target.value)}
//                   required
//                   className="w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Enter Cheque No.</label>
//                 <input
//                   type="text"
//                   value={chequeNumber}
//                   onChange={(e) => setChequeNumber(e.target.value)}
//                   required
//                   className="w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date of Cheque</label>
//                 <input
//                   type="date"
//                   value={chequeDate}
//                   onChange={(e) => setChequeDate(e.target.value)}
//                   required
//                   className="w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//             </>
//           )}

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Submit Payment
//           </button>
//         </form>
//       )}

//       {/* Payment History Table */}
//       <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
//         <h2 className="text-xl font-semibold mb-4">Payment History</h2>

//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Payment Mode
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Receiving Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Remark
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {payments.length > 0 ? (
//               payments.map((payment) => (
//                 <tr key={payment._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {payment.paymentMode || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ₹{payment.amount?.toLocaleString() || 0}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {payment.receivingDate
//                       ? new Date(payment.receivingDate).toLocaleDateString()
//                       : 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {payment.remark || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         payment.status === 'Completed'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}
//                     >
//                       {payment.status || 'Unknown'}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
//                   No payments recorded yet
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllPayment;


