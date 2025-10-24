import { useState } from "react";

const initialProperties = [
  {
    id: 1,
    title: "2-Bedroom Apartment in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: "₦35,000,000",
    type: "Apartment",
    dateListed: "2025-07-20",
    status: "Active",
    views: 105,
    image: "https://via.placeholder.com/100",
    transactionType: "Bought",
  },
  {
    id: 2,
    title: "Land in Ikoyi",
    location: "Ikoyi, Lagos",
    price: "₦250,000,000",
    type: "Land",
    dateListed: "2025-07-18",
    status: "Pending",
    views: 22,
    image: "https://via.placeholder.com/100",
    transactionType: "Rented",
  },
];

export default function VisitorProperties() {
  const [properties] = useState(initialProperties);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterTransaction, setFilterTransaction] = useState(null);

  const filteredProperties = properties.filter(
    (p) =>
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.transactionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)) &&
      (!filterTransaction || p.transactionType === filterTransaction)
  );

  const propertyTypes = [...new Set(properties.map((p) => p.type))];
  const transactionTypes = [...new Set(properties.map((p) => p.transactionType))];

  // Summary counts
  const total = properties.length;
  const bought = properties.filter((p) => p.transactionType === "Bought").length;
  const rented = properties.filter((p) => p.transactionType === "Rented").length;
  const pending = properties.filter((p) => p.status === "Pending").length;
  const totalViews = properties.reduce((acc, p) => acc + p.views, 0);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold -mt-6 mb-4 text-gray-800 dark:text-gray-100">
        My Properties
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div
          onClick={() => setFilterTransaction(null)}
          className="cursor-pointer bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center hover:shadow-lg transition"
        >
          <i className="fas fa-home text-green-500 text-xl mb-2"></i>
          <h3 className="font-bold text-lg">{total}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total</p>
        </div>
        <div
          onClick={() => setFilterTransaction("Bought")}
          className="cursor-pointer bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center hover:shadow-lg transition"
        >
          <i className="fas fa-shopping-cart text-blue-500 text-xl mb-2"></i>
          <h3 className="font-bold text-lg">{bought}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Bought</p>
        </div>
        <div
          onClick={() => setFilterTransaction("Rented")}
          className="cursor-pointer bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center hover:shadow-lg transition"
        >
          <i className="fas fa-key text-yellow-500 text-xl mb-2"></i>
          <h3 className="font-bold text-lg">{rented}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Rented</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center">
          <i className="fas fa-clock text-orange-500 text-xl mb-2"></i>
          <h3 className="font-bold text-lg">{pending}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center">
          <i className="fas fa-eye text-purple-500 text-xl mb-2"></i>
          <h3 className="font-bold text-lg">{totalViews}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Views</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Search by Title / ID / Type / Location / Bought or Rented"
            className="border border-gray-300 p-2 rounded-md dark:bg-gray-700 w-full"
          />
          {showSuggestions && searchTerm && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto text-sm shadow">
              {propertyTypes
                .filter((type) =>
                  type.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((type, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(type);
                      setShowSuggestions(false);
                    }}
                  >
                    <i className="fas fa-building text-green-600 mr-2"></i>
                    {type}
                  </li>
                ))}
              {transactionTypes
                .filter((t) =>
                  t.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((t, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(t);
                      setShowSuggestions(false);
                    }}
                  >
                    <i
                      className={`fas ${
                        t === "Bought"
                          ? "fa-shopping-cart text-blue-600"
                          : "fa-key text-yellow-600"
                      } mr-2`}
                    ></i>
                    {t} Properties
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* VIEW GRID / LIST */}
      <div className="flex justify-end mb-2">
        <button
          className="text-sm underline text-green-700 dark:text-green-400"
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          {viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-700 rounded-xl shadow p-4"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {p.location}
              </p>
              <p className="text-green-700 dark:text-green-300 font-bold">
                {p.price}
              </p>
              <div className="flex justify-between text-xs mt-2 text-gray-600 dark:text-gray-300">
                <span>{p.type}</span>
                <span>{p.transactionType}</span>
                <span>{p.status}</span>
              </div>
              <div className="mt-3 flex gap-2 justify-between text-sm">
                <button
                  className="text-blue-600 dark:text-blue-400"
                  onClick={() => setSelectedProperty(p)}
                >
                  <i className="fas fa-eye mr-1"></i>View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full bg-white dark:bg-gray-700 rounded-xl shadow text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Type</th>
                <th>Bought/Rented</th>
                <th>Date</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">
                    <img
                      src={p.image}
                      className="w-16 h-10 object-cover rounded"
                      alt="Property"
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.location}</td>
                  <td>{p.price}</td>
                  <td>{p.type}</td>
                  <td>{p.transactionType}</td>
                  <td>{p.dateListed}</td>
                  <td>{p.status}</td>
                  <td>{p.views}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => setSelectedProperty(p)}
                      className="text-blue-600 dark:text-blue-400"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedProperty.title}
            </h2>
            <img
              src={selectedProperty.image}
              alt="Property"
              className="w-full h-40 object-cover rounded mb-3"
            />
            <p>
              <strong>Location:</strong> {selectedProperty.location}
            </p>
            <p>
              <strong>Price:</strong> {selectedProperty.price}
            </p>
            <p>
              <strong>Type:</strong> {selectedProperty.type}
            </p>
            <p>
              <strong>Transaction:</strong> {selectedProperty.transactionType}
            </p>
            <p>
              <strong>Status:</strong> {selectedProperty.status}
            </p>
            <button
              onClick={() => setSelectedProperty(null)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
