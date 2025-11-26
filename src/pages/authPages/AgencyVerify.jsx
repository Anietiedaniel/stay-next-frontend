import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png"; // your main logo

const AgencyComingSoon = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Logo"
        className="w-28 h-28 mb-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Agency Onboarding Portal
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-center text-lg md:text-xl text-gray-600 mb-12 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Our Agency Portal is coming soon! Agencies will be able to onboard their agents, upload properties, manage listings, and provide services seamlessly. Stay tuned! 🚀
      </motion.p>

      {/* Rotating circle */}
      <motion.div
        className="relative w-40 h-40 mb-8"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 border-dashed border-green-500 rounded-full" />
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-6 text-gray-500 text-center text-sm md:text-base max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        We are preparing a full-featured platform for agencies to manage their agents and offerings efficiently. Coming soon! 🌟
      </motion.p>
    </div>
  );
};

export default AgencyComingSoon;
