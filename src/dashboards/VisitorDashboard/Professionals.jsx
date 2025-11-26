import React from "react";
import { Briefcase, HardHat, Ruler, Building2, Sparkles } from "lucide-react";

const professionals = [
  { name: "Engineers", icon: <HardHat size={36} />, description: "Structural, civil, mechanical engineers." },
  { name: "Architects", icon: <Ruler size={36} />, description: "Design and plan your dream spaces." },
  { name: "Contractors", icon: <Building2 size={36} />, description: "Reliable contractors for your projects." },
  { name: "Interior Designers", icon: <Sparkles size={36} />, description: "Beautify and style your interiors." },
  { name: "Surveyors", icon: <Briefcase size={36} />, description: "Accurate property surveys." },
];

const BuyerProfessionalsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Professionals
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-10">
        Browse our trusted professionals (Coming Soon)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {professionals.map((pro) => (
          <div
            key={pro.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
          >
            <div className="text-green-600 mb-4">{pro.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{pro.name}</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center text-sm">{pro.description}</p>
            <span className="mt-4 inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-400 dark:bg-gray-600 rounded-full">
              Coming Soon
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerProfessionalsPage;
