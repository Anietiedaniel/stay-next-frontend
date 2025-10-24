import React, { useState } from 'react';

const AddProjectModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    status: 'Available',
    features: '',
    images: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(e.target.files)],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData.images.forEach((img) => data.append('images', img));
      } else {
        data.append(key, formData[key]);
      }
    }

    onSubmit(data);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-2xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            className="col-span-2 p-2 border dark:bg-gray-800 dark:border-gray-700"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            className="col-span-2 p-2 border dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            required
            className="p-2 border dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            className="p-2 border dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            name="type"
            placeholder="Type (Apartment, etc)"
            onChange={handleChange}
            required
            className="p-2 border dark:bg-gray-800 dark:border-gray-700"
          />
          <select
            name="status"
            onChange={handleChange}
            className="p-2 border dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
          <input
            name="features"
            placeholder="Features (comma separated)"
            onChange={handleChange}
            className="col-span-2 p-2 border dark:bg-gray-800 dark:border-gray-700"
          />
          <div className="col-span-2 w-44">
            <label
              htmlFor="propertyImages"
              className="block cursor-pointer bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700"
            >
              Upload Image
            </label>
            <input
              id="propertyImages"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>


          {/* Image previews */}
          <div className="col-span-2 flex flex-wrap gap-2 mt-2">
            {formData.images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-20 h-20 object-cover rounded border border-gray-300 dark:border-gray-700"
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
