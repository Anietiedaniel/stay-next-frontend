import React, { useState } from "react";

const initialRenters = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    phone: "08012345678",
    property: "2-Bedroom Apartment in Lekki",
    status: "Active",
    date: "2025-08-01",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@gmail.com",
    phone: "08098765432",
    property: "Mini Flat in Yaba",
    status: "Pending",
    date: "2025-08-05",
  },
];

const initialBuyers = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "michael@gmail.com",
    phone: "08123456789",
    property: "3-Bedroom Duplex in Ikoyi",
    status: "Completed",
    date: "2025-07-28",
  },
  {
    id: 2,
    name: "Mary Jane",
    email: "mary@gmail.com",
    phone: "08187654321",
    property: "4-Bedroom Bungalow in Ajah",
    status: "Pending",
    date: "2025-08-10",
  },
];

const Clients = () => {
  const [selectedTab, setSelectedTab] = useState("renters");
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  const renderTable = (data) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-user mr-2"></i>Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-envelope mr-2"></i>Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-phone mr-2"></i>Phone
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-home mr-2"></i>Property
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-flag mr-2"></i>Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <i className="fas fa-calendar-alt mr-2"></i>Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((client, idx) => (
            <tr
              key={client.id}
              className={`${
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
            >
              <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                {client.name}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {client.email}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {client.phone}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {client.property}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                      : client.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-white"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white"
                  }`}
                >
                  {client.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                {client.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Clients
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["renters", "buyers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-2 rounded-xl font-medium shadow-sm transition-colors ${
              selectedTab === tab
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <i
              className={`mr-2 ${
                tab === "renters" ? "fas fa-user-friends" : "fas fa-user-tag"
              }`}
            ></i>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {selectedTab === "renters"
        ? renderTable(initialRenters)
        : renderTable(initialBuyers)}
    </div>
  );
};

export default Clients;
