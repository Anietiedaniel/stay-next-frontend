import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

export default function LoadingModal({
  loading,
  success,
  error,
  message = "Processing...",
  successMessage = "Success!",
  errorMessage = "Something went wrong!",
  onClose,
}) {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (loading || success || error) setVisible(true);

    if (success || error) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          setFadeOut(false);
          if (onClose) onClose();
        }, 500);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, success, error]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="p-8 flex flex-col items-center text-center w-[90%] max-w-sm animate-fadeIn relative overflow-visible">
        {/* ✅ Loading */}
        {loading && (
          <>
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-green-500 opacity-80 shadow-[0_0_25px_rgba(34,197,94,0.4)]"></div>
              <img
                src={logo}
                alt="App Logo"
                className="absolute inset-0 m-auto w-16 h-16 object-contain rounded-full shadow-lg animate-zoomPulse"
              />
            </div>
            <p className="text-lg font-bold text-black animate-fadeIn">{message}</p>
          </>
        )}

        {/* ✅ Success */}
        {success && (
          <>
            <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-20 h-20 mb-5 animate-bounce shadow-[0_0_20px_rgba(34,197,94,0.6)]">
              <i className="fa-solid fa-check text-3xl"></i>
            </div>
            <p className="text-lg font-bold text-green-400 animate-fadeIn">{successMessage}</p>
          </>
        )}

        {/* ❌ Error */}
        {error && (
          <>
            <div className="flex items-center justify-center bg-red-500 text-white rounded-full w-20 h-20 mb-5 animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.6)]">
              <i className="fa-solid fa-xmark text-3xl"></i>
            </div>
            <p className="text-lg font-bold text-red-400 animate-fadeIn">{errorMessage}</p>
          </>
        )}
      </div>

      {/* ✅ Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes zoomPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-zoomPulse { animation: zoomPulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
