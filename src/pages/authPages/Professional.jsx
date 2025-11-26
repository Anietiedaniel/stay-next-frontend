import React from "react";
import { motion } from "framer-motion";
import { HardHat, Sparkles, ClipboardCheck } from "lucide-react";

const ProfessionalComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-100">
      
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <HardHat size={80} className="text-green-600" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Professional Portal
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 text-center max-w-lg mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Designed for Engineers, Architects, Surveyors, Builders and other certified 
        professionals. Showcase your portfolio, publish your completed projects, 
        receive client requests, and grow your professional reputation. 
        This powerful workspace is launching soon. ✨
      </motion.p>

      {/* Center Animation */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="relative w-40 h-40 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-600"></div>
        <Sparkles size={40} className="text-green-500" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-10 flex items-center gap-2 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <ClipboardCheck size={20} />
        <p className="text-sm md:text-base">
          Professional tools and verification are on the way. Stay ready.
        </p>
      </motion.div>
    </div>
  );
};

export default ProfessionalComingSoon;
