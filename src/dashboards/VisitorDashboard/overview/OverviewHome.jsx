import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OverviewVisitor = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    expensesData: [],
    recentProperties: [],
    messages: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setDashboardData({
        expensesData: [
          { month: 'Jan', expense: 20000 },
          { month: 'Feb', expense: 25000 },
          { month: 'Mar', expense: 18000 },
          { month: 'Apr', expense: 22000 },
        ],
        recentProperties: [
          { id: 1, title: '3 Bedroom Duplex in Lekki', status: 'Available', image: 'https://via.placeholder.com/80' },
          { id: 2, title: 'Luxury Apartment at Ikoyi', status: 'Available', image: 'https://via.placeholder.com/80' },
          { id: 3, title: 'Mini Flat in Ikeja', status: 'Rented', image: 'https://via.placeholder.com/80' },
        ],
        messages: [
          { id: 1, agent: 'Agent Chidera', content: 'Hi, I’m reaching out regarding your interest in the 3 Bedroom Duplex.', unread: true, time: '10:15 AM' },
          { id: 2, agent: 'Agent Tolu', content: 'Hello! Can we schedule a viewing for next week?', unread: true, time: 'Yesterday, 2:45 PM' },
          { id: 3, agent: 'Agent Emeka', content: 'Your application for the Mini Flat has been approved.', unread: false, time: 'Aug 12, 2025' },
        ],
      });
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-center text-lg">Loading dashboard...</p>
      </div>
    );
  }

  const { expensesData, recentProperties, messages } = dashboardData;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold -mt-6 mb-4 text-gray-800 dark:text-gray-100">
        Visitor Dashboard
      </h1>

      {/* Expenses Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Monthly Expenses (₦87,000)</h2>
          <button
            onClick={() => navigate("/visitor-dashboard/overview/expenses")}
            className="text-sm text-red-600 dark:text-red-300 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex items-end gap-4 h-40">
          {expensesData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center w-16">
              <div
                className="w-6 rounded bg-red-500"
                style={{ height: `${data.expense / 500}px` }}
              ></div>
              <span className="text-sm mt-1">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Properties</h2>
          <button
            onClick={() => navigate("/visitor-dashboard/overview/properties")}
            className="text-sm text-green-600 dark:text-green-300 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {recentProperties.map((prop) => (
            <div
              key={prop.id}
              className="flex items-center space-x-4 border dark:border-gray-500 p-2 rounded bg-white dark:bg-gray-600"
            >
              <img
                src={prop.image}
                alt={prop.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-sm">{prop.title}</h3>
                <span className="text-xs text-gray-600 dark:text-gray-200">
                  {prop.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Messages Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Messages from Agents</h2>
          <button
            onClick={() => navigate("/visitor-dashboard/overview/messages")}
            className="text-sm text-green-500 dark:text-green-300 hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col p-4 rounded-lg shadow transition ${
                msg.unread
                  ? "bg-blue-50 dark:bg-blue-900 border border-blue-400 dark:border-blue-700"
                  : "bg-gray-50 dark:bg-gray-700 border border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-800 dark:text-gray-100">{msg.agent}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewVisitor;
