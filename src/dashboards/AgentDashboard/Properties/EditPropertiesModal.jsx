import React, { useState, useEffect } from "react";
import AGENTAPI from "../../../utils/agentaxios";
import { propertyCategories } from "../../../utils/propertyCategories";
import LoadingModal from "../../../utils/loader";

export default function EditPropertyModal({ show, onClose, initialData, onUpdate }) {
  const [propertyType, setPropertyType] = useState("");
  const [title, setTitle] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [duration, setDuration] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // ✅ Load initial data
  useEffect(() => {
    if (initialData) {
      setPropertyType(initialData.type || "");
      setTitle(initialData.title || "");
      setTransactionType(initialData.transactionType || "");
      setDuration(initialData.duration || "");

      const existingImages =
        initialData.images?.map((img) => ({ url: img, isNew: false })) || [];
      const existingVideos =
        initialData.youtubeVideos?.map((vid) => ({ url: vid, isNew: false })) || [];

      setImagePreviews(existingImages);
      setVideoPreviews(existingVideos);
      setNewImages([]);
      setNewVideos([]);
    }
  }, [initialData]);

  if (!show) return null;

  // ✅ Suggestion logic
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

  // ✅ Remove existing media
  const handleRemoveImage = async (url) => {
    setLoading(true);
    try {
      await AGENTAPI.delete("/agents/properties/delete-image", {
        data: { propertyId: initialData._id, imageUrl: url },
      });
      setImagePreviews((prev) => prev.filter((img) => img.url !== url));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = async (url) => {
    setLoading(true);
    try {
      await AGENTAPI.delete("/agents/properties/delete-video", {
        data: { propertyId: initialData._id, videoUrl: url },
      });
      setVideoPreviews((prev) => prev.filter((vid) => vid.url !== url));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new files
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true,
    }));
    setNewImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
    e.target.value = null;
  };

  const handleAddVideos = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true,
    }));
    setNewVideos((prev) => [...prev, ...files]);
    setVideoPreviews((prev) => [...prev, ...previews]);
    e.target.value = null;
  };

  const handleRemoveNewFile = (fileList, setFiles, setPreviews, index) => {
    const newFile = fileList[index];
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) =>
      prev.filter((p) => p.url !== URL.createObjectURL(newFile))
    );
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const form = e.target;
      const formData = new FormData();

      formData.append("type", propertyType);
      formData.append("title", title);
      formData.append("transactionType", transactionType);
      formData.append("location", form.location.value);
      formData.append("price", form.price.value);
      formData.append("features", form.features.value || "");
      formData.append("area", form.area?.value || "");
      formData.append("duration", duration);

      if (form.bedrooms?.value && Number(form.bedrooms.value) > 0)
        formData.append("bedrooms", form.bedrooms.value);

      if (form.toilets?.value && Number(form.toilets.value) > 0)
        formData.append("toilets", form.toilets.value);

      newImages.forEach((file) => formData.append("images", file));
      newVideos.forEach((file) => formData.append("videos", file));

      const res = await AGENTAPI.put(`/agents/properties/${initialData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onUpdate();
          onClose();
        }, 2000);
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
          Edit Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ✅ Property Type */}
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

          {/* ✅ Title with Suggestions */}
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

          {/* ✅ Transaction Type */}
          <select
            name="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Select Transaction Type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="book">Book</option>
          </select>

          {/* ✅ Duration (only for rent/book) */}
          {(transactionType === "rent" || transactionType === "book") && (
            <input
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (e.g. 6 months, 1 year)"
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          )}

          {/* ✅ Location */}
          <input
            name="location"
            defaultValue={initialData.location}
            placeholder="Location"
            required
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          />

          {/* ✅ Price */}
          <div className="relative w-full">
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
              ₦
            </span>
            <input
              name="price"
              type="number"
              defaultValue={initialData.price}
              placeholder="Price"
              required
              className="w-full pl-7 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          {/* ✅ Conditional Fields */}
          {propertyType === "Land" && (
            <input
              name="area"
              type="number"
              defaultValue={initialData.area}
              placeholder="Area (sq.m)"
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          )}

          {(propertyType === "Apartment" ||
            propertyType === "House" ||
            propertyType === "Duplex") && (
            <div className="grid grid-cols-2 gap-2">
              {initialData.bedrooms !== 0 && (
                <input
                  name="bedrooms"
                  type="number"
                  defaultValue={initialData.bedrooms || ""}
                  placeholder="Bedrooms"
                  min="0"
                  className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                />
              )}
              {initialData.toilets !== 0 && (
                <input
                  name="toilets"
                  type="number"
                  defaultValue={initialData.toilets || ""}
                  placeholder="Toilets"
                  min="0"
                  className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                />
              )}
            </div>
          )}

          {/* ✅ Features */}
          <textarea
            name="features"
            defaultValue={initialData.features}
            placeholder="Features (comma separated)"
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          />

          {/* ✅ Uploads */}
          <label
            htmlFor="editImageUpload"
            className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md p-4 hover:border-green-600 dark:hover:border-green-400 transition"
          >
            <span className="text-gray-600 dark:text-gray-300">
              Click to upload new images
            </span>
          </label>
          <input
            id="editImageUpload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddImages}
          />

          <label
            htmlFor="editVideoUpload"
            className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md p-4 hover:border-green-600 dark:hover:border-green-400 transition"
          >
            <span className="text-gray-600 dark:text-gray-300">
              Click to upload new videos
            </span>
          </label>
          <input
            id="editVideoUpload"
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={handleAddVideos}
          />

          {/* ✅ Media Previews */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((p, i) => (
                <div key={i} className="relative">
                  <img
                    src={p.url}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      p.isNew
                        ? handleRemoveNewFile(newImages, setNewImages, setImagePreviews, i)
                        : handleRemoveImage(p.url)
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {videoPreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {videoPreviews.map((v, i) => (
                <div key={i} className="relative w-28 h-20 bg-black rounded overflow-hidden">
                  <video src={v.url} className="w-full h-full object-cover" controls />
                  <button
                    type="button"
                    onClick={() =>
                      v.isNew
                        ? handleRemoveNewFile(newVideos, setNewVideos, setVideoPreviews, i)
                        : handleRemoveVideo(v.url)
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ✅ Buttons */}
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
              disabled={loading || success}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </form>

        {/* ✅ Loader Modal */}
        <LoadingModal
          loading={loading}
          success={success}
          error={error}
          message="Updating Property..."
          successMessage="Property Updated Successfully!"
          errorMessage="Failed to update property. Try again."
        />
      </div>
    </div>
  );
}
