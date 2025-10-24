import React, { useEffect, useState } from "react";
import API from "../../utils/adminsaxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [editOpen, setEditOpen] = useState(false);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await API.get("/");
      console.log(res.data);
      setAdmins(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Create new admin
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) {
      toast.warn("Name and email are required");
      return;
    }
    try {
      setCreating(true);
      await API.post("/create", newAdmin);
      toast.success("Admin created! Credentials sent via email.");
      setNewAdmin({ name: "", email: "" });
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setCreating(false);
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await API.delete(`/${id}`);
      toast.success("Admin deleted successfully");
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete admin");
    }
  };

  // Reset admin password
  const handleResetPassword = async (id) => {
    if (!window.confirm("Reset password for this admin?")) return;
    try {
      await API.post(`/${id}/reset-password`);
      toast.success("Password reset successfully. New credentials sent via email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  // View / Edit admin
  const handleView = async (id) => {
    try {
      const res = await API.get(`/${id}`);
      setSelectedAdmin(res.data);
      setEditData({ name: res.data.name, email: res.data.email });
      setEditOpen(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch admin details");
    }
  };

  // Update admin
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/${selectedAdmin._id}`, editData);
      toast.success("Admin updated successfully");
      setEditOpen(false);
      setSelectedAdmin(null);
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update admin");
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) +
      " " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <i className="fas fa-user-shield text-green-600"></i> Admin Management
      </h2>

      {/* Create Admin Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-5 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          required
          className="w-full md:w-1/4 border p-2 rounded-lg"
          disabled={creating}
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          required
          className="w-full md:w-1/4 border p-2 rounded-lg"
          disabled={creating}
        />
        <button
          type="submit"
          disabled={creating}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-60"
        >
          <i className="fas fa-plus"></i> {creating ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Admins Table */}
      {loading ? (
        <p>Loading admins...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3 capitalize">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{formatDateTime(admin.createdAt)}</td>
                  <td className="p-3 text-center flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleView(admin._id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View / Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      onClick={() => handleResetPassword(admin._id)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Reset Password"
                    >
                      <i className="fas fa-key"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-5 text-center text-gray-500">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setEditOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="fas fa-user-edit text-blue-600"></i> Edit Admin
            </h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="border p-2 rounded-lg"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="border p-2 rounded-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2 justify-center"
              >
                <i className="fas fa-save"></i> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
