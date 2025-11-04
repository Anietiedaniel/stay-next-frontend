import React, { useState } from "react";
import {
  propertyCategories,
  propertyFieldRequirements,
} from "../../../utils/propertyCategories";
import GlowingRealEstateLoader from "../../../utils/loader";

export default function AddPropertyModal({ show, onClose, onSubmit }) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [propertyType, setPropertyType] = useState("");
  const [title, setTitle] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [duration, setDuration] = useState("");
  const [durationSuggestions, setDurationSuggestions] = useState([]);
  const [showDurationSuggestions, setShowDurationSuggestions] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!show) return null;

  const fieldReq = propertyFieldRequirements[propertyType] || {};

  /** 🧠 Title Suggestions (based on type) */
  const getSuggestions = (input, type) => {
    if (!type || !propertyCategories[type]) return [];
    const allTitles = propertyCategories[type];
    if (!input.trim()) return allTitles;
    return allTitles.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setSuggestions(getSuggestions(value, propertyType));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setTitle(suggestion);
    setShowSuggestions(false);
  };

  /** 🕒 Duration Suggestions (Rent + Book) */
  const rentDurations = ["Monthly", "Quarterly", "Bi-Annually", "Yearly"];
  const bookDurations = ["Daily", "Weekend", "Weekly", "Full Stay"];

  const getDurationSuggestions = (input) => {
    const base =
      transactionType === "rent" ? rentDurations : transactionType === "book" ? bookDurations : [];
    if (!input.trim()) return base;
    return base.filter((d) => d.toLowerCase().includes(input.toLowerCase()));
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    setDurationSuggestions(getDurationSuggestions(value));
    setShowDurationSuggestions(true);
  };

  const handleDurationClick = (suggestion) => {
    setDuration(suggestion);
    setShowDurationSuggestions(false);
  };

  /** 🖼 File Upload Handlers */
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    setImageFiles((prev) => [...prev, ...files]);
    e.target.value = null;
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoPreviews((prev) => [...prev, URL.createObjectURL(file)]);
    setVideoFiles((prev) => [...prev, file]);
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index) => {
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /** ✅ Submit Property */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("type", propertyType);
      formData.append("title", title);
      formData.append("transactionType", transactionType);

      if (transactionType === "rent" || transactionType === "book") {
        formData.append("duration", duration);
      }

      formData.append("location", e.target.location.value);
      if (fieldReq.showPrice) formData.append("price", e.target.price.value);
      if (fieldReq.showFeatures)
        formData.append("features", e.target.features.value);
      if (fieldReq.showArea && e.target.area)
        formData.append("area", e.target.area.value);
      if (fieldReq.showBedrooms && e.target.bedrooms)
        formData.append("bedrooms", e.target.bedrooms.value);
      if (fieldReq.showToilets && e.target.toilets)
        formData.append("toilets", e.target.toilets.value);

      imageFiles.forEach((file) => formData.append("images", file));
      videoFiles.forEach((file) => formData.append("videos", file));

      const response = await onSubmit(formData);

      if (response.status === 200 || response.status === 201) {
        e.target.reset();
        setImagePreviews([]);
        setImageFiles([]);
        setVideoPreviews([]);
        setVideoFiles([]);
        setPropertyType("");
        setTitle("");
        setTransactionType("");
        setDuration("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2500);
      } else throw new Error();
    } catch (err) {
      console.error(err);
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Add Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Property Type */}
          <select
            name="type"
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
              setSuggestions(propertyCategories[e.target.value] || []);
              setShowSuggestions(false);
            }}
            required
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Select Property Type</option>
            {Object.keys(propertyCategories).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Title with Suggestions */}
          <div className="relative">
            <input
              name="title"
              value={title}
              onChange={handleTitleChange}
              onFocus={() => {
                if (propertyType) {
                  setSuggestions(getSuggestions(title, propertyType));
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Start typing title..."
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full max-h-40 overflow-y-auto rounded mt-1 shadow-md">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-2 hover:bg-green-600 hover:text-white cursor-pointer dark:hover:bg-green-700"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Transaction Type */}
          <select
            name="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Listing Type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="book">Book</option>
          </select>

          {/* Duration (Rent + Book) */}
          {(transactionType === "rent" || transactionType === "book") && (
            <div className="relative">
              <input
                name="duration"
                value={duration}
                onChange={handleDurationChange}
                onFocus={() => {
                  setDurationSuggestions(getDurationSuggestions(duration));
                  setShowDurationSuggestions(true);
                }}
                onBlur={() =>
                  setTimeout(() => setShowDurationSuggestions(false), 150)
                }
                placeholder={
                  transactionType === "book"
                    ? "Enter or select booking period..."
                    : "Enter or select rent duration..."
                }
                required
                className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
              {showDurationSuggestions && durationSuggestions.length > 0 && (
                <ul className="absolute z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full max-h-40 overflow-y-auto rounded mt-1 shadow-md">
                  {durationSuggestions.map((d, i) => (
                    <li
                      key={i}
                      onClick={() => handleDurationClick(d)}
                      className="px-3 py-2 hover:bg-green-600 hover:text-white cursor-pointer dark:hover:bg-green-700"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            required
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          />

          {/* Price */}
          {fieldReq.showPrice && (
            <div className="relative w-full">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
                ₦
              </span>
              <input
                name="price"
                type="number"
                placeholder="Price"
                required
                className="w-full pl-7 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
          )}

          {/* Features */}
          {fieldReq.showFeatures && (
            <textarea
              name="features"
              placeholder="Description or Features"
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          )}

          {/* Uploads */}
          {fieldReq.showImages && (
            <div className="space-y-2">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md p-4 hover:border-green-600 transition"
              >
                <span className="text-gray-600 dark:text-gray-300">
                  Upload Images
                </span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImagesChange}
              />
            </div>
          )}

          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Video Upload */}
          {fieldReq.showVideo && (
            <div className="space-y-2">
              <label
                htmlFor="videoUpload"
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md p-4 hover:border-green-600 transition"
              >
                <span className="text-gray-600 dark:text-gray-300">
                  Upload a Property Video
                </span>
              </label>
              <input
                id="videoUpload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
              />
            </div>
          )}

          {videoPreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {videoPreviews.map((src, i) => (
                <div key={i} className="relative">
                  <video src={src} controls className="w-32 h-20 rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
              disabled={loading || success}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              disabled={loading || success}
            >
              Add
            </button>
          </div>
        </form>

        <GlowingRealEstateLoader
          loading={loading}
          success={success}
          error={error}
          message="Adding Property..."
          successMessage="Property Added Successfully!"
        />
      </div>
    </div>
  );
}
