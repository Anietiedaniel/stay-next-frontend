import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/images/logo.png"; // Replace with your logo path

const GlowingRealEstateLoader = ({
  message,
  logoSize,
  ringColors,
  orbitColor,
  bgGradient,
  textColor,
  orbitCount,
  orbitIconClass,
}) => {
  // ✅ Safe fallback for ringColors
  const safeRingColors =
    Array.isArray(ringColors) && ringColors.length >= 3
      ? ringColors
      : ["#22c55e", "#16a34a", "#059669"];

  // Generate orbit icons
  const orbits = Array.from({ length: orbitCount || 6 }, (_, i) => {
    const angle = (360 / (orbitCount || 6)) * i;
    return (
      <i
        key={i}
        className={`${orbitIconClass || "fa fa-home"} absolute animate-orbit text-2xl`}
        style={{
          color: orbitColor || "#facc15",
          textShadow: "0 0 10px #facc15, 0 0 20px #fbbf24, 0 0 30px #f59e0b",
          transform: `rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
        }}
      />
    );
  });

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br ${bgGradient || "from-green-900 to-green-700"} z-50`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing Rings */}
        <div
          className="absolute rounded-full animate-spin-slow"
          style={{
            width: "18rem",
            height: "18rem",
            border: `4px solid ${safeRingColors[0]}`,
            boxShadow: `0 0 20px ${safeRingColors[0]}, 0 0 40px ${safeRingColors[0]}`,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-spin-slow-reverse"
          style={{
            width: "12rem",
            height: "12rem",
            border: `4px solid ${safeRingColors[1]}`,
            boxShadow: `0 0 20px ${safeRingColors[1]}, 0 0 35px ${safeRingColors[1]}`,
          }}
        ></div>
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            width: "7rem",
            height: "7rem",
            border: `4px solid ${safeRingColors[2]}`,
            boxShadow: `0 0 15px ${safeRingColors[2]}, 0 0 25px ${safeRingColors[2]}`,
          }}
        ></div>

        {/* Orbiting Icons */}
        <div className="absolute w-0 h-0">{orbits}</div>

        {/* Glowing Logo */}
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: logoSize || 80,
            height: logoSize || 80,
            boxShadow: "0 0 20px #22c55e, 0 0 40px #16a34a, 0 0 60px #059669",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="animate-bounce-slow w-full h-full p-2"
            style={{ filter: "drop-shadow(0 0 10px #22c55e)" }}
          />
        </div>

        {/* Glowing Text */}
        <p
          className={`mt-6 text-lg font-bold ${textColor || "text-green-200"} text-center`}
          style={{
            textShadow: "0 0 5px #22c55e, 0 0 10px #16a34a, 0 0 15px #059669",
          }}
        >
          {message || "Loading..."}
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 10s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-orbit { animation: orbit 8s linear infinite; }
      `}</style>
    </div>
  );
};

// PropTypes
GlowingRealEstateLoader.propTypes = {
  message: PropTypes.string,
  logoSize: PropTypes.number,
  ringColors: PropTypes.arrayOf(PropTypes.string),
  orbitColor: PropTypes.string,
  bgGradient: PropTypes.string,
  textColor: PropTypes.string,
  orbitCount: PropTypes.number,
  orbitIconClass: PropTypes.string,
};

// Default Props
GlowingRealEstateLoader.defaultProps = {
  message: "Loading...",
  logoSize: 80,
  ringColors: ["#22c55e", "#16a34a", "#059669"],
  orbitColor: "#facc15",
  bgGradient: "from-green-900 to-green-700",
  textColor: "text-green-200",
  orbitCount: 6,
  orbitIconClass: "fa fa-home",
};

export default GlowingRealEstateLoader;
