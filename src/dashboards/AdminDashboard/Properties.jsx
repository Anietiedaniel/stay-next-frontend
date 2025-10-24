import React, { useState } from 'react';
import AddPropertyModal from './Properties/PropertiesModal';

const initialProperties = [
  {
    id: 1,
    title: '2-Bedroom Apartment in Lekki',
    location: 'Lekki Phase 1, Lagos',
    price: '₦35,000,000',
    type: 'Apartment',
    dateListed: '2025-07-20',
    status: 'Active',
    views: 105,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    title: 'Land in Ikoyi',
    location: 'Ikoyi, Lagos',
    price: '₦250,000,000',
    type: 'Land',
    dateListed: '2025-07-18',
    status: 'Pending',
    views: 22,
    image: 'https://via.placeholder.com/100',
  },
];

export default function Properties() {
  const [properties, setProperties] = useState(initialProperties);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewModeModal, setViewModeModal] = useState(null); // 'view' | 'edit' | null

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  );

  const propertyTypes = [...new Set(properties.map(p => p.type))];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    const formObj = Object.fromEntries(formData.entries());
    if (viewModeModal === 'edit' && selectedProperty) {
      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? { ...p, ...formObj } : p))
      );
    } else {
      const newProp = {
        id: properties.length + 1,
        ...formObj,
        image: URL.createObjectURL(formData.getAll('images')[0]),
        dateListed: new Date().toISOString().split('T')[0],
        views: 0,
      };
      setProperties([...properties, newProp]);
    }

    setShowAddModal(false);
    setSelectedProperty(null);
    setViewModeModal(null);
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold -mt-6 mb-4 text-gray-800 dark:text-gray-100">Properties</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { icon: 'fa-home', label: 'Total Properties', value: 25 },
          { icon: 'fa-circle-check', label: 'Active Listings', value: 18 },
          { icon: 'fa-clock', label: 'Pending Approval', value: 3 },
          { icon: 'fa-ban', label: 'Inactive Listings', value: 4 },
          { icon: 'fa-eye', label: 'Total Views', value: 543 },].map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
            <i className={`fas ${card.icon} text-green-600 dark:text-green-500 text-2xl`}></i>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-200">{card.label}</p>
              <h2 className="text-lg font-bold dark:text-gray-100">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
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
            placeholder="Search by Title / ID / Type / Location"
            className="border border-gray-300 p-2 rounded-md dark:bg-gray-700 w-full"
          />
          {showSuggestions && searchTerm && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto text-sm shadow">
              {propertyTypes
                .filter((type) => type.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((type, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(type);
                      setShowSuggestions(false);
                    }}
                  >
                    {type}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <button
          onClick={() => {
            setSelectedProperty(null);
            setViewModeModal(null);
            setShowAddModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          <i className="fas fa-plus mr-2"></i>Add Property
        </button>
        <div className="flex gap-2 text-sm">
          <button className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md">
            <i className="fas fa-file-export mr-1"></i>Export
          </button>
          <button className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md">
            <i className="fas fa-share-alt mr-1"></i>Share Listings
          </button>
          <button
            className="text-sm underline text-green-700 dark:text-green-400"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <i className={`fas ${viewMode === 'grid' ? 'fa-list' : 'fa-th'} mr-1`}></i>
            {viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
          </button>
        </div>
      </div>

      {/* View Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((p) => (
            <div key={p.id} className="bg-white dark:bg-gray-700 rounded-xl shadow p-4">
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{p.location}</p>
              <p className="text-green-700 dark:text-green-300 font-bold">{p.price}</p>
              <div className="flex justify-between text-xs mt-2 text-gray-600 dark:text-gray-300">
                <span>{p.type}</span>
                <span>{p.status}</span>
              </div>
              <div className="mt-3 flex gap-2 justify-between text-sm">
                <button
                  className="text-blue-600 dark:text-blue-400"
                  onClick={() => {
                    setSelectedProperty(p);
                    setViewModeModal('view');
                  }}
                >
                  <i className="fas fa-eye mr-1"></i>View
                </button>
                <button
                  className="text-yellow-600 dark:text-yellow-400"
                  onClick={() => {
                    setSelectedProperty(p);
                    setViewModeModal('edit');
                    setShowAddModal(true);
                  }}
                >
                  <i className="fas fa-edit mr-1"></i>Edit
                </button>
                <button
                  className="text-red-600 dark:text-red-400"
                  onClick={() => handleDelete(p.id)}
                >
                  <i className="fas fa-trash mr-1"></i>Delete
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
                    <img src={p.image} className="w-16 h-10 object-cover rounded" alt="Property" />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.location}</td>
                  <td>{p.price}</td>
                  <td>{p.type}</td>
                  <td>{p.dateListed}</td>
                  <td>{p.status}</td>
                  <td>{p.views}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProperty(p);
                        setViewModeModal('view');
                      }}
                      className="text-blue-600 dark:text-blue-400"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProperty(p);
                        setViewModeModal('edit');
                        setShowAddModal(true);
                      }}
                      className="text-yellow-600 dark:text-yellow-400"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 dark:text-red-500"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewModeModal === 'view' && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedProperty.title}</h2>
            <img src={selectedProperty.image} alt="Property" className="w-full h-40 object-cover rounded mb-3" />
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Price:</strong> {selectedProperty.price}</p>
            <p><strong>Type:</strong> {selectedProperty.type}</p>
            <p><strong>Status:</strong> {selectedProperty.status}</p>
            <button
              onClick={() => {
                setSelectedProperty(null);
                setViewModeModal(null);
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddPropertyModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedProperty(null);
          setViewModeModal(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={viewModeModal === 'edit' ? selectedProperty : null}
      />
    </div>
  );
}
