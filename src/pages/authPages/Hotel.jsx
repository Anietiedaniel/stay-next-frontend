import React from "react";
import { motion } from "framer-motion";
import { Building2, CalendarHeart, MapPin } from "lucide-react";

const HotelComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-100">
      
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Building2 size={80} className="text-green-600" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hotel & Event Hall Portal
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 text-center max-w-md mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Manage your rooms, event spaces, pricing, bookings, and guest inquiries — all in one place.
        The next level hospitality tool is almost here. 🌟
      </motion.p>

      {/* Center Animation */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="relative w-40 h-40 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-600"></div>
        <CalendarHeart size={40} className="text-green-500" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-10 flex items-center gap-2 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <MapPin size={18} />
        <p className="text-sm md:text-base">Coming soon. Manage your hospitality business with ease.</p>
      </motion.div>
    </div>
  );
};

export default HotelComingSoon;
