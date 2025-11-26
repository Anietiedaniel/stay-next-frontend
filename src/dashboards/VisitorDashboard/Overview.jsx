import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerDashboardOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const stored = JSON.parse(localStorage.getItem("user"));
  const userId = stored?._id;

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3006/api/clients/overview", {headers: { "x-user-id": userId }});
      console.log("overview:", res);
      setOverview(res.data);
    } catch (err) {
      console.error("Overview error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-gray-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!overview) {
    return (
      <p className="text-center py-20 text-gray-500">
        Failed to load dashboard data.
      </p>
    );
  }

  return (
    <div className="w-full px-4 md:px-10 py-6">
      {/* Greeting */}
      <h2 className="text-2xl font-bold mb-6 dark:text-gray-100">
        Welcome back, <span className="text-green-500">{overview.name}</span>
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Saved Properties */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-300">Saved</h4>
          <p className="text-3xl font-bold text-green-500">
            {overview.saved}
          </p>
        </div>

        {/* Booked Viewings */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-300">Viewings</h4>
          <p className="text-3xl font-bold text-blue-500">
            {overview.viewRequests?.total || 0}
          </p>
        </div>

        {/* Activities */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-300">Activities</h4>
          <p className="text-3xl font-bold text-purple-500">
            {overview.activities?.total || 0}
          </p>
        </div>

        {/* Referral Earnings */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-300">
            Referral Earnings
          </h4>
          <p className="text-3xl font-bold text-yellow-500">
            ₦{overview.referral?.earnings || 0}
          </p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-8">
        <h3 className="text-lg font-semibold dark:text-gray-100 mb-3">
          Recent Activity
        </h3>

        {(!overview.recentActivities ||
          overview.recentActivities.length === 0) ? (
          <p className="text-gray-500 dark:text-gray-300">No activities yet.</p>
        ) : (
          <ul className="space-y-3">
            {overview.recentActivities.map((act, i) => (
              <li
                key={i}
                className="p-4 border dark:border-gray-700 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium dark:text-gray-100 capitalize">
                    {act.type}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {new Date(act.date).toLocaleDateString()}
                  </p>
                </div>

                {act.amount && (
                  <p className="font-bold text-green-500">₦{act.amount}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Saved Count Preview (backend ONLY sends count) */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-8">
        <h3 className="text-lg font-semibold dark:text-gray-100 mb-3">
          Saved Properties
        </h3>

        {overview.saved === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No saved properties yet.</p>
        ) : (
          <p className="text-gray-300 dark:text-gray-200">
            You have <span className="font-bold">{overview.saved}</span> saved
            properties.
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboardOverview;
