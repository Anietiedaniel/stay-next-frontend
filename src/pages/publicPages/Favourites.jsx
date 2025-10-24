import React, { useState } from "react";

export const FavoritesPage = () => {
  const [favorites] = useState([
    {
      id: 1,
      title: "Dream Penthouse Suite",
      price: "$500,000",
      location: "Banana Island, Lagos",
      image: "https://via.placeholder.com/400x250",
      status: "For Sale",
    },
    {
      id: 2,
      title: "Cozy Family Bungalow",
      price: "$180,000",
      location: "Ibadan, Oyo",
      image: "https://via.placeholder.com/400x250",
      status: "For Sale",
    },
    {
      id: 3,
      title: "Luxury 3-Bed Apartment",
      price: "$250,000",
      location: "Ikoyi, Lagos",
      image: "https://via.placeholder.com/400x250",
      status: "For Sale",
    },
  ]);

  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleCompare = () => {
    alert(`Comparing properties: ${selected.join(", ")}`);
  };

  const handleShare = (id) => {
    alert(`Sharing property ${id}...`);
  };

  const handleBookVisit = (id) => {
    alert(`Booking a visit for property ${id}...`);
  };

  return (
    <div className="md:mt-0 mt-16 p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
        <i className="fas fa-heart text-red-500"></i> My Favorites
      </h2>
      <p className="text-gray-600 mb-4">
        Your top picks — compare, share, or book visits directly from here.
      </p>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="border rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition transform relative bg-white"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <i className="fas fa-heart absolute top-3 right-3 text-red-500 text-2xl"></i>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="text-green-600 font-bold">{property.price}</p>
                  <p className="text-gray-500">{property.location}</p>
                  <span className="text-sm text-blue-500">{property.status}</span>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={selected.includes(property.id)}
                        onChange={() => toggleSelect(property.id)}
                      />
                      Select
                    </label>
                    <button
                      onClick={() => handleShare(property.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      <i className="fas fa-share-alt"></i> Share
                    </button>
                    <button
                      onClick={() => handleBookVisit(property.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      <i className="fas fa-calendar"></i> Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCompare}
                className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <i className="fas fa-balance-scale"></i> Compare {selected.length}{" "}
                {selected.length > 1 ? "Properties" : "Property"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default FavoritesPage;