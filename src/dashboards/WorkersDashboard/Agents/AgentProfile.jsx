import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AgentDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      // Example agent data (replace with real API)
      setAgent({
        id,
        name: 'Chidera Okafor',
        email: 'chidera.agent@example.com',
        phone: '+234 800 123 4567',
        status: 'Available',
        image: 'https://via.placeholder.com/150',
      });

      setMessages([
        {
          id: 1,
          content: 'Hi! I’m reaching out regarding your interest in the 3 Bedroom Duplex.',
          time: '10:15 AM',
          unread: true,
        },
        {
          id: 2,
          content: 'Your application for the Mini Flat has been approved.',
          time: 'Yesterday, 2:45 PM',
          unread: false,
        },
      ]);

      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading agent details...
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Agent not found.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Agent Profile */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{agent.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{agent.email}</p>
          <p className="text-gray-600 dark:text-gray-300">{agent.phone}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
              agent.status === 'Available'
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {agent.status}
          </span>

          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <a
              href={`mailto:${agent.email}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition text-sm"
            >
              Email
            </a>
            <a
              href={`tel:${agent.phone}`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition text-sm"
            >
              Call
            </a>
            <a
              href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Agent Messages */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Messages from {agent.name}</h2>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg border transition ${
                msg.unread
                  ? 'bg-blue-50 dark:bg-blue-900 border-blue-400 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{msg.time}</span>
                {msg.unread && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full dark:bg-blue-800 dark:text-blue-300">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-800 dark:text-gray-100">{msg.content}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
              No messages from this agent.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
