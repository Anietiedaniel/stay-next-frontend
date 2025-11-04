'use client';
import React from 'react';
import logo from '../assets/images/logo.png'

export default function GlowingRealEstateLoader({ msg = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/30 z-50 text-center">
      {/* Loader Circle */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        {/* Animated gradient ring */}
        <div className="absolute w-full h-full rounded-full border-t-4 border-green-400 border-opacity-70 animate-spin"></div>

        {/* Inner glow pulse */}
        <div className="absolute w-28 h-28 rounded-full bg-green-500/20 blur-md animate-pulse"></div>

        {/* Center circle zoom in/out */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/40 animate-zoomInOut">
          <img src={logo} alt="company-logo-loader" />
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-green-400 text-lg font-semibold tracking-wide animate-pulse">
        {msg}
      </p>

      {/* Custom Keyframes */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes zoomInOut {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .animate-zoomInOut {
          animation: zoomInOut 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
