import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VisitorMessages = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          agent: 'Agent Chidera',
          content: 'Hi, I’m reaching out regarding your interest in the 3 Bedroom Duplex.',
          unread: true,
          time: '10:15 AM',
        },
        {
          id: 2,
          agent: 'Agent Tolu',
          content: 'Hello! Can we schedule a viewing for next week?',
          unread: true,
          time: 'Yesterday, 2:45 PM',
        },
        {
          id: 3,
          agent: 'Agent Emeka',
          content: 'Your application for the Mini Flat has been approved.',
          unread: false,
          time: 'Aug 12, 2025',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Messages from Agents
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg divide-y divide-gray-100 dark:divide-gray-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 flex justify-between items-start transition hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg ${
              msg.unread
                ? 'bg-blue-50 dark:bg-blue-900 border border-blue-400 dark:border-blue-700 font-medium'
                : 'bg-gray-50 dark:bg-gray-700 border border-gray-300'
            }`}
          >
            <div className="flex flex-col">
              <p className="text-gray-800 dark:text-gray-100 font-semibold">{msg.agent}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{msg.content}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{msg.time}</p>
            </div>
            <div>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                Open
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
            No messages found.
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorMessages;
