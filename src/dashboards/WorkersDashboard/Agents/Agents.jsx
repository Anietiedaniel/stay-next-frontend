import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAgents = () => {
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch agents
    setTimeout(() => {
      setAgents([
        {
          id: 1,
          name: 'Chidera Okafor',
          email: 'chidera.agent@example.com',
          phone: '+234 800 123 4567',
          status: 'Available',
          image: 'https://via.placeholder.com/80',
        },
        {
          id: 2,
          name: 'Tolu Adebayo',
          email: 'tolu.agent@example.com',
          phone: '+234 800 987 6543',
          status: 'Offline',
          image: 'https://via.placeholder.com/80',
        },
        {
          id: 3,
          name: 'Emeka Nwosu',
          email: 'emeka.agent@example.com',
          phone: '+234 801 234 5678',
          status: 'Available',
          image: 'https://via.placeholder.com/80',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading agents...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        My Agents
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center space-y-3 transition hover:shadow-lg"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="text-center">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">{agent.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{agent.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{agent.phone}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  agent.status === 'Available'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {agent.status}
              </span>
            </div>
            <button
              onClick={() => navigate(`/visitor-dashboard/agents/${agent.id}`)}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {agents.length === 0 && (
        <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
          No agents found.
        </div>
      )}
    </div>
  );
};

export default MyAgents;
