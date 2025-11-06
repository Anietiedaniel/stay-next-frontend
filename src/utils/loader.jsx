import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/images/logo.png"; // your logo path

const LoadingModal = ({
  loading,
  success,
  error,
  message = "Processing...",
  successMessage = "Operation Successful!",
  errorMessage = "Something went wrong.",
}) => {
  if (!loading && !success && !error) return null;

  let displayMessage = message;
  let iconClass = "fa-solid fa-spinner fa-spin text-blue-500";
  let colorClass = "text-blue-500";

  if (success) {
    displayMessage = successMessage;
    iconClass = "fa-solid fa-circle-check text-green-500";
    colorClass = "text-green-500";
  } else if (error) {
    displayMessage = errorMessage;
    iconClass = "fa-solid fa-circle-xmark text-red-500";
    colorClass = "text-red-500";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl text-center w-[320px] border border-white/30">
        <div className="flex flex-col items-center space-y-5">
          {/* Center Image (Logo or Loader Visual) */}
          <img
            src={logo}
            alt="App Logo"
            className="w-20 h-20 object-contain animate-pulse"
          />

          {/* Dynamic Icon */}
          <i className={`${iconClass} text-5xl ${colorClass}`}></i>

          {/* Message Text */}
          <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
            {displayMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

LoadingModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default LoadingModal;
