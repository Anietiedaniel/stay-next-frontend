import React from "react";
import { motion } from "framer-motion";
import {
  HardHat,
  Building2,
  Ruler,
  Briefcase,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const ProfessionalsPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-800 px-6 py-24">

      {/* Soft Background Glow Effects (light subtle glows for white theme) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1.4 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-0 right-0 w-96 h-96 bg-green-200/40 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1.2 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-emerald-200/30 rounded-full blur-3xl"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Professional Services on Our Platform
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mt-4 leading-relaxed">
            Our system connects clients with verified industry professionals—ensuring 
            your building, renovation, or planning project gets expert attention.
          </p>
        </div>

        {/* Professionals Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">

          {/* Engineers */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-center shadow-md"
          >
            <HardHat className="w-14 h-14 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Engineers</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Structural, civil, and electrical engineers for complete project handling.
            </p>
          </motion.div>

          {/* Architects */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-center shadow-md"
          >
            <Building2 className="w-14 h-14 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Architects</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Modern, classic, and luxury-building experts for complete planning.
            </p>
          </motion.div>

          {/* Planners */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-center shadow-md"
          >
            <Ruler className="w-14 h-14 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Planners</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Certified planners who map out and structure your building concepts.
            </p>
          </motion.div>

          {/* Contractors */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-center shadow-md"
          >
            <Briefcase className="w-14 h-14 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Contractors</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Trusted builders for construction, repairs, finishing, and more.
            </p>
          </motion.div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="mt-24 bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-14 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why Having Professionals Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="flex gap-4">
              <CheckCircle className="w-8 h-8 text-green-500 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">Accurate Planning</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Experts ensure your project follows correct design standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-8 h-8 text-green-500 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">Avoid Costly Errors</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Avoid structural failures, wrong materials, and expensive rework.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-8 h-8 text-green-500 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">Trusted Experts</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Work only with verified professionals matched to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-3xl font-medium">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsPage;
