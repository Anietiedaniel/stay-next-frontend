import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccessModal() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => navigate('/login') }
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg mx-auto">
            <div className="rounded-3xl bg-gradient-to-tr from-white/5 via-white/10 to-white/5 border border-white/10 p-8 shadow-2xl">
              
              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl ring-1 ring-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
              </div>

              {/* Message */}
              <h2 className="text-3xl font-bold text-white text-center mt-6">
                Registration Successful
              </h2>

              <p className="text-gray-300 text-center mt-3">
                We’ve sent a verification link to your email.
                <br />
                Please check your inbox to activate your account.
              </p>

              {/* Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate('/login') }
                  className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition active:scale-95"
                >
                  OKAY, GOT IT
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
