import React from "react";
import { Paintbrush, Zap, Wrench, Hammer, Settings } from "lucide-react";

const serviceProviders = [
  { name: "Painters", icon: <Paintbrush size={50} />, description: "Professional painting services for homes and offices." },
  { name: "Electricians", icon: <Zap size={50} />, description: "Certified electricians for installations and repairs." },
  { name: "Plumbers", icon: <Wrench size={50} />, description: "Reliable plumbing solutions for all your needs." },
  { name: "Carpenters", icon: <Hammer size={50} />, description: "Expert carpentry for furniture and interiors." },
  { name: "Handymen", icon: <Settings size={50} />, description: "General maintenance and repair services." },
];

const BuyerServiceProvidersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 space-y-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Service Providers
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-12">
        Browse our trusted service providers (Coming Soon)
      </p>

      {serviceProviders.map((service, index) => (
        <section
          key={service.name}
          className={`flex flex-col md:flex-row items-center justify-between rounded-2xl p-8 shadow-lg 
            ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} 
            bg-white dark:bg-gray-800`}
        >
          <div className="flex-shrink-0 text-green-600 mb-4 md:mb-0">
            {service.icon}
          </div>
          <div className="md:w-2/3 md:px-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{service.name}</h2>
            <p className="text-gray-500 dark:text-gray-300 mb-4">{service.description}</p>
            <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-gray-400 dark:bg-gray-600 rounded-full">
              Coming Soon
            </span>
          </div>
        </section>
      ))}
    </div>
  );
};

export default BuyerServiceProvidersPage;
