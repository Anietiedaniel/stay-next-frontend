import React, { useEffect, useState } from "react";
import API from "../../utils/adminaxios";

export default function AdminAgentDashboard() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch agents
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/agents");
      setAgents(res.data.agents || []);
      setFilteredAgents(res.data.agents || []);
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Approve / Reject actions
  const handleReview = async (id, action) => {
    try {
      const endpoint = action === "approve" ? "approve" : "reject";
      await API.put(`/agents/${endpoint}/${id}`, {
        message: `Your verification has been ${action}`,
      });
      fetchAgents();
    } catch (err) {
      console.error(`Failed to ${action} agent:`, err);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = agents.filter((agent) => {
      const name = agent.user?.name?.toLowerCase() || "";
      const submittedDate = agent.submittedAt
        ? new Date(agent.submittedAt).toLocaleDateString()
        : "";
      return name.includes(query) || submittedDate.includes(query);
    });

    setFilteredAgents(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Agent Management
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or submission date..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.length ? (
            filteredAgents.map((agent) => (
              <div
                key={agent._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Header */}
                <div
                  className="h-32 w-full bg-green-600 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${agent.coverImage || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {agent.user?.profileImage ? (
                    <img
                      src={agent.user.profileImage}
                      alt="Agent"
                      className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
                      {agent.user?.name?.[0] || "A"}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <h2 className="text-xl font-bold text-gray-800">
                    {agent.user?.name || "Unknown Agent"}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span>{" "}
                    {agent.user?.email || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span>{" "}
                    {agent.phone || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">State:</span>{" "}
                    {agent.state || "N/A"}
                  </p>

                  {agent.verification?.agencyName && (
                    <div className="flex items-center space-x-2 mt-2">
                      {agent.verification.agencyLogo && (
                        <img
                          src={agent.verification.agencyLogo}
                          alt="Agency Logo"
                          className="w-10 h-10 object-cover rounded-full border"
                        />
                      )}
                      <span className="font-medium text-gray-700">
                        {agent.verification.agencyName}
                      </span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      agent.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : agent.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {agent.status || "Pending"}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleReview(agent._id, "approve")}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(agent._id, "reject")}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setSelectedAgent(agent)}
                      className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10 text-lg font-medium">
              No agents found
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedAgent.user?.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedAgent.user?.email || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedAgent.phone || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">State:</span>{" "}
                  {selectedAgent.state || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedAgent.status || "N/A"}
                </p>
                {selectedAgent.otherInfo && (
                  <p>
                    <span className="font-semibold">Other Info:</span>{" "}
                    {selectedAgent.otherInfo}
                  </p>
                )}
              </div>

              {selectedAgent.verification?.agencyName && (
                <div className="space-y-2">
                  {selectedAgent.verification.agencyLogo && (
                    <img
                      src={selectedAgent.verification.agencyLogo}
                      alt="Agency Logo"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  )}
                  <p className="font-semibold">
                    Agency: {selectedAgent.verification.agencyName}
                  </p>
                </div>
              )}
            </div>

            {selectedAgent.nationalId && (
              <div className="mt-4">
                <p className="font-semibold">National ID:</p>
                <img
                  src={selectedAgent.nationalId}
                  alt="National ID"
                  className="w-full h-48 object-contain border rounded mt-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
