import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth"; // adjust path to your useAuth

const AgentPaymentPage = () => {
  const { user } = useAuth(); // get agent info
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Mock payment history (replace with API)
  useEffect(() => {
    setPaymentHistory([
      { id: 1, payer: "John Doe", date: "2025-08-01", amount: 5000, status: "Completed" },
      { id: 2, payer: "Jane Smith", date: "2025-07-15", amount: 7500, status: "Completed" },
      { id: 3, payer: "Mark Johnson", date: "2025-07-01", amount: 3000, status: "Pending" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <i className="fas fa-credit-card"></i> Payments Received
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            View all payments made by clients
          </p>
        </div>

        {/* Agent Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-user"></i> Agent Info
          </h2>
          <p><span className="font-medium">Name:</span> {user?.name || "John Doe"}</p>
          <p><span className="font-medium">Email:</span> {user?.email || "agent@example.com"}</p>
          <p><span className="font-medium">Phone:</span> {user?.phone || "+234 801 234 5678"}</p>
        </div>

        {/* Payment History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-history"></i> Payment History
          </h2>
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                    <th className="px-4 py-2">Payer</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount (₦)</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((p) => (
                    <tr key={p.id} className="border-b dark:border-gray-600">
                      <td className="px-4 py-2">{p.payer}</td>
                      <td className="px-4 py-2">{p.date}</td>
                      <td className="px-4 py-2">{p.amount.toLocaleString()}</td>
                      <td className={`px-4 py-2 font-semibold ${p.status === "Completed" ? "text-green-600" : "text-yellow-500"}`}>
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No payments have been made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentPaymentPage;
