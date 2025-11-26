// import React, { useState } from "react";

// const PaymentTab = () => {
//   const [type, setType] = useState("Rent");
//   const [property, setProperty] = useState("");
//   const [duration, setDuration] = useState("");
//   const [buyer, setBuyer] = useState("");
//   const [amount, setAmount] = useState("");
//   const [method, setMethod] = useState("Paystack");
//   const [receipts, setReceipts] = useState([]);
//   const [showReceipt, setShowReceipt] = useState(null);

//   // Handle payment submission
//   const handlePayment = (e) => {
//     e.preventDefault();
//     if (!amount || !property) return alert("Fill in all required fields!");

//     const newReceipt = {
//       id: Date.now(),
//       type,
//       property,
//       duration: type === "Rent" ? duration : null,
//       buyer: type === "Purchase" ? buyer : null,
//       amount,
//       method,
//       date: new Date().toLocaleString(),
//       ref: "TXN-" + Math.floor(Math.random() * 1000000),
//     };

//     setReceipts([newReceipt, ...receipts]);
//     // Reset form
//     setProperty("");
//     setDuration("");
//     setBuyer("");
//     setAmount("");
//   };

//   // Share receipt
//   const shareReceipt = async (receipt) => {
//     let text = `Receipt\nType: ${receipt.type}\nProperty: ${receipt.property}\nAmount: ₦${receipt.amount}\nMethod: ${receipt.method}\nDate: ${receipt.date}\nRef: ${receipt.ref}`;
//     if (receipt.type === "Rent") {
//       text += `\nDuration: ${receipt.duration}`;
//     } else {
//       text += `\nBuyer: ${receipt.buyer}`;
//     }

//     if (navigator.share) {
//       try {
//         await navigator.share({ title: "Payment Receipt", text });
//       } catch (err) {
//         console.log("Share cancelled");
//       }
//     } else {
//       navigator.clipboard.writeText(text);
//       alert("Receipt copied to clipboard!");
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <h2 className="text-2xl font-bold mb-4 dark:text-white">
//         <i className="fas fa-credit-card mr-2 text-green-600"></i>
//         Payments
//       </h2>

//       {/* Payment Form */}
//       <form
//         onSubmit={handlePayment}
//         className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-6"
//       >
//         <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">
//           Make a Payment
//         </h3>

//         {/* Type */}
//         <div className="mb-3">
//           <label className="block mb-1 dark:text-gray-300">Payment Type</label>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//           >
//             <option>Rent</option>
//             <option>Purchase</option>
//           </select>
//         </div>

//         {/* Property */}
//         <div className="mb-3">
//           <label className="block mb-1 dark:text-gray-300">Property</label>
//           <input
//             type="text"
//             placeholder="e.g. 3-Bedroom Apartment, Lekki"
//             value={property}
//             onChange={(e) => setProperty(e.target.value)}
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* Rent Duration */}
//         {type === "Rent" && (
//           <div className="mb-3">
//             <label className="block mb-1 dark:text-gray-300">Duration</label>
//             <input
//               type="text"
//               placeholder="e.g. 12 Months (Jan 2025 - Dec 2025)"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//               className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//         )}

//         {/* Buyer Name (only for purchase) */}
//         {type === "Purchase" && (
//           <div className="mb-3">
//             <label className="block mb-1 dark:text-gray-300">Buyer Name</label>
//             <input
//               type="text"
//               placeholder="e.g. John Doe"
//               value={buyer}
//               onChange={(e) => setBuyer(e.target.value)}
//               className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//         )}

//         {/* Amount */}
//         <div className="mb-3">
//           <label className="block mb-1 dark:text-gray-300">Amount (₦)</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* Method */}
//         <div className="mb-3">
//           <label className="block mb-1 dark:text-gray-300">Method</label>
//           <select
//             value={method}
//             onChange={(e) => setMethod(e.target.value)}
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//           >
//             <option>Paystack</option>
//             <option>Stripe</option>
//             <option>Bank Transfer</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//         >
//           <i className="fas fa-lock mr-2"></i> Pay Now
//         </button>
//       </form>

//       {/* Receipts List */}
//       <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
//         <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">
//           Payment Receipts
//         </h3>
//         {receipts.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">No receipts yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {receipts.map((r) => (
//               <li
//                 key={r.id}
//                 className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-600"
//               >
//                 <div>
//                   <p className="font-semibold dark:text-gray-200">
//                     {r.type} – ₦{r.amount}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Ref: {r.ref} • {r.date}
//                   </p>
//                 </div>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => setShowReceipt(r)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                   >
//                     <i className="fas fa-eye"></i>
//                   </button>
//                   <button
//                     onClick={() => shareReceipt(r)}
//                     className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                   >
//                     <i className="fas fa-share-alt"></i>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Receipt Modal */}
//       {showReceipt && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full">
//             <h3 className="text-xl font-bold mb-4 dark:text-white">
//               {showReceipt.type} Receipt
//             </h3>
//             <p className="mb-2 dark:text-gray-300">
//               <b>Reference:</b> {showReceipt.ref}
//             </p>
//             <p className="mb-2 dark:text-gray-300">
//               <b>Property:</b> {showReceipt.property}
//             </p>
//             {showReceipt.type === "Rent" && (
//               <p className="mb-2 dark:text-gray-300">
//                 <b>Duration:</b> {showReceipt.duration}
//               </p>
//             )}
//             {showReceipt.type === "Purchase" && (
//               <p className="mb-2 dark:text-gray-300">
//                 <b>Buyer:</b> {showReceipt.buyer}
//               </p>
//             )}
//             <p className="mb-2 dark:text-gray-300">
//               <b>Amount:</b> ₦{showReceipt.amount}
//             </p>
//             <p className="mb-2 dark:text-gray-300">
//               <b>Method:</b> {showReceipt.method}
//             </p>
//             <p className="mb-2 dark:text-gray-300">
//               <b>Date:</b> {showReceipt.date}
//             </p>

//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 onClick={() => shareReceipt(showReceipt)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 <i className="fas fa-share-alt mr-2"></i> Share
//               </button>
//               <button
//                 onClick={() => setShowReceipt(null)}
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentTab;


import React from "react";

const PaymentTab = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Payments
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
        This feature is coming soon. Stay tuned for updates!
      </p>
    </div>
  );
};

export default PaymentTab;
