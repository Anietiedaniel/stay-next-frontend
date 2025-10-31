'use client';
import React from 'react';

export default function Loader({ msg = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 text-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-green-500 opacity-10 blur-3xl" />

      {/* Loader Container */}
      <div className="relative w-32 h-32 mb-6">
        {/* Centered Image */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-20 h-20 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
            <img
              src="https://via.placeholder.com/80?text=LOGO"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Rotating Green Ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animation: 'spin 2s linear infinite' }}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#greenGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="80 200"
          />
          <defs>
            <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle Outer Glow */}
        <div className="absolute -inset-4 rounded-full bg-green-500 opacity-20 blur-xl animate-pulse" />
      </div>

      {/* Message Text */}
      <p className="text-green-400 text-lg font-semibold animate-pulse">{msg}</p>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
