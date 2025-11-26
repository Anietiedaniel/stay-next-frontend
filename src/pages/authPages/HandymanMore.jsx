import React from "react";
import { motion } from "framer-motion";
import { User, Star, Wrench, MapPin, Camera, BadgeCheck } from "lucide-react";

const ServiceProviderPortal = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black overflow-hidden">

      {/* Floating lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.12, scale: 1.2 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl top-20 left-10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.12, scale: 1.2 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl bottom-24 right-16"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* COMING SOON BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-6 w-fit px-6 py-2 rounded-full bg-white/70 border border-gray-300 shadow"
        >
          <p className="text-lg font-semibold tracking-wide text-gray-700">
            🚧 Coming Soon 🚧
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900"
        >
          Become a Verified Service Provider
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-700 max-w-3xl mx-auto text-center text-lg mb-16"
        >
          Showcase your personal skills, get hired by clients near you, build your
          reputation, and grow your independent service business. Perfect for 
          skilled workers, freelancers, and solo professionals.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-black">
          <FeatureCard
            icon={<User size={40} />}
            title="Build Your Profile"
            text="Create a powerful professional profile with your skills, bio, experience, and service categories."
          />

          <FeatureCard
            icon={<Camera size={40} />}
            title="Upload Your Portfolio"
            text="Show real photos of your work—completed jobs, before/after images, and certifications."
          />

          <FeatureCard
            icon={<Star size={40} />}
            title="Earn Ratings"
            text="Clients rate your work, helping you build credibility and attract more customers."
          />

          <FeatureCard
            icon={<MapPin size={40} />}
            title="Get Local Jobs"
            text="Receive jobs from customers around your location or within your preferred areas."
          />

          <FeatureCard
            icon={<Wrench size={40} />}
            title="Multiple Services"
            text="Offer more than one service—plumbing, electrical, painting, cleaning, and more."
          />

          <FeatureCard
            icon={<BadgeCheck size={40} />}
            title="Verified Badge"
            text="Get your identity verified to earn a verified badge and attract premium clients."
          />
        </div>

        {/* COMING SOON MESSAGE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-16 text-gray-900 text-lg"
        >
          This portal is currently being built for you. Stay tuned for the official launch! 🌟
        </motion.p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 120 }}
    className="bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-2xl text-center shadow-md"
  >
    <div className="flex justify-center text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-700">{text}</p>
  </motion.div>
);

export default ServiceProviderPortal;
