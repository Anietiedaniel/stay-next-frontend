import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios"; // ✅ your axios instance

export default function MyAgents() {
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await api.get("/agents"); // ✅ backend: getAllAgents
        setAgents(res.data.agents || []);
        console.log(res.data.agents)
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading agents...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Available Agents
      </h1>

      {agents.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          No agents found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col items-center"
            >
              <img
                src={
                  agent.profileImage ||
                  "https://via.placeholder.com/100?text=Agent"
                }
                alt={agent.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />

              <div className="text-center space-y-1">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {agent.fullName || agent.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {agent.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {agent.phone || "N/A"}
                </p>
                <div className="flex items-center justify-center mt-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      agent.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  <span
                    className={`text-xs font-medium ${
                      agent.isOnline
                        ? "text-green-600 dark:text-green-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {agent.isOnline ? "Available" : "Offline"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/visitor-dashboard/agents/${agent._id}`)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
