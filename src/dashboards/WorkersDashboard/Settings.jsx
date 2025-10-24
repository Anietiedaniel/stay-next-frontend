import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import API from "../../utils/axios";

const SettingsVisitor = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    notifications: true,
  });

const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

// Sync theme with <html> and localStorage
useEffect(() => {
  const root = document.documentElement;
  if (darkMode) {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  const [uploading, setUploading] = useState(false);

  // Populate form from user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        notifications: user.notifications ?? true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploading(true);
      const res = await API.post("/auth/upload-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data; // match your backend response
      console.log("Uploaded image URL:", imageUrl);
      await API.put("/auth/settings", { profileImage: imageUrl });

      updateUser({ ...user, profileImage: imageUrl });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/auth/settings", formData);
      updateUser(res.data.user);
      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating settings");
    }
  };

  const handleReset = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      notifications: user.notifications ?? true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="bg-green-600 text-white py-6 px-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <i className="fas fa-cogs"></i> Account Settings
          </h2>
          <p className="text-sm opacity-80">Manage your profile & preferences</p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1 text-sm border rounded border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6 relative px-6">
          <div className="relative">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-600">
                <i className="fas fa-user"></i>
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-green-500 rounded-full px-2 cursor-pointer">
              <i className="fas fa-camera text-white text-sm"></i>
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          {uploading && <span className="text-xs text-green-600 mt-1">Uploading...</span>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <i className="fas fa-user"></i> Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <i className="fas fa-sliders-h"></i> Preferences
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded"
                />
                <span>
                  <i className="fas fa-bell text-green-600"></i> Enable Notifications
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-300 dark:border-gray-600">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <i className="fas fa-undo"></i> Reset
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <i className="fas fa-save"></i> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsVisitor;
