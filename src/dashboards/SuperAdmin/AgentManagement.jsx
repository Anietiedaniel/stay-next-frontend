import React, { useEffect, useState } from "react";
import ADMINAPI from "../../utils/adminaxios"; // Axios instance configured with baseURL and auth token

export default function AgentManagement() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    agencyName: "",
    agencyPhone: "",
    agencyEmail: "",
    state: "",
    otherInfo: "",
  });

  // ✅ Fetch all agents
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await ADMINAPI.get("/agents");
      setAgents(res.data.agents || []);
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // ✅ Approve or reject agent
  const handleReview = async (id, action) => {
    try {
      const endpoint = action === "approve" ? "approve" : "reject";
      await ADMINAPI.put(`/agents/${endpoint}/${id}`, { message: `Your verification has been ${action}` });
      fetchAgents();
    } catch (err) {
      console.error(`Failed to ${action} agent:`, err);
    }
  };

  // ✅ Delete agent
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      await ADMINAPI.delete(`/agents/${id}`);
      fetchAgents();
    } catch (err) {
      console.error("Failed to delete agent:", err);
    }
  };

  // ✅ Open view modal
  const openViewModal = (agent) => {
    setSelectedAgent(agent);
    setShowViewModal(true);
  };

  // ✅ Open edit modal
  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setFormData({
      agencyName: agent.verification?.agencyName || "",
      agencyPhone: agent.verification?.agencyPhone || "",
      agencyEmail: agent.verification?.agencyEmail || "",
      state: agent.verification?.state || "",
      otherInfo: agent.verification?.otherInfo || "",
    });
    setShowEditModal(true);
  };

  // ✅ Handle input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Update agent
  const handleUpdate = async () => {
    try {
      await ADMINAPI.put(`/agents/${selectedAgent._id}`, formData);
      setShowEditModal(false);
      fetchAgents();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin - Agent Management</h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">Agency</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">State</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.length ? (
                agents.map((agent) => (
                  <tr key={agent._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{agent.verification?.agencyName || "N/A"}</td>
                    <td className="p-3">{agent.verification?.agencyEmail || agent.userId?.email}</td>
                    <td className="p-3">{agent.verification?.agencyPhone || "N/A"}</td>
                    <td className="p-3">{agent.verification?.state || "N/A"}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          agent.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : agent.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {agent.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      {agent.submittedAt ? new Date(agent.submittedAt).toLocaleString() : "N/A"}
                    </td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleReview(agent._id, "approve")}
                        className="text-green-600 hover:text-green-800"
                        title="Approve"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button
                        onClick={() => handleReview(agent._id, "reject")}
                        className="text-red-600 hover:text-red-800"
                        title="Reject"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <button
                        onClick={() => openEditModal(agent)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => openViewModal(agent)}
                        className="text-gray-600 hover:text-gray-800"
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(agent._id)}
                        className="text-red-400 hover:text-red-600"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500 font-medium">
                    No agents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-xl font-bold mb-4">Agent Details</h2>
            <div className="space-y-2">
              <p><strong>Agency Name:</strong> {selectedAgent.verification?.agencyName || "N/A"}</p>
              <p><strong>Email:</strong> {selectedAgent.verification?.agencyEmail || selectedAgent.userId?.email}</p>
              <p><strong>Phone:</strong> {selectedAgent.verification?.agencyPhone || "N/A"}</p>
              <p><strong>State:</strong> {selectedAgent.verification?.state || "N/A"}</p>
              <p><strong>Status:</strong> {selectedAgent.status}</p>
              <p><strong>Other Info:</strong> {selectedAgent.verification?.otherInfo || "N/A"}</p>
              {selectedAgent.verification?.agencyLogo && (
                <img
                  src={selectedAgent.verification.agencyLogo}
                  alt="Agency Logo"
                  className="mt-2 w-32 h-32 object-contain border rounded"
                />
              )}
              {selectedAgent.verification?.nationalId && (
                <img
                  src={selectedAgent.verification.nationalId}
                  alt="National ID"
                  className="mt-2 w-48 h-32 object-contain border rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-xl font-bold mb-4">Update Agent Info</h2>
            <div className="space-y-4">
              {["agencyName", "agencyPhone", "agencyEmail", "state", "otherInfo"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium">{field.replace(/([A-Z])/g, " $1")}</label>
                  {field === "otherInfo" ? (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border rounded p-2 mt-1"
                    />
                  ) : (
                    <input
                      type={field === "agencyEmail" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border rounded p-2 mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
