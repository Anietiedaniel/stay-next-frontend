import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Building2,
  Rocket,
  HeartHandshake,
  Award,
} from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16">

      {/* TOP HERO */}
      <section className="max-w-6xl mx-auto px-6 text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900"
        >
          We Are StayNext
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
        >
          A modern ecosystem bringing together buyers, agents, professionals
          and service providers — all in one smooth, organized workflow.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-1 bg-green-600 mx-auto rounded-full mt-6"
        />
      </section>

      {/* THREE-COLUMN FEATURE GRID */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition"
        >
          <Users size={50} className="text-green-600 mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            StayNext is a digital-first platform that simplifies real estate
            and home service management for everyone.
          </p>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition"
        >
          <Rocket size={50} className="text-green-600 mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To modernize property search and home services through automation,
            trusted professionals, and real-time digital tools.
          </p>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition"
        >
          <HeartHandshake size={50} className="text-green-600 mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Our Values</h2>
          <ul className="text-gray-600 space-y-2">
            <li>✔ Transparency & Trust</li>
            <li>✔ Innovation & Automation</li>
            <li>✔ Fairness & Customer-focus</li>
            <li>✔ Quality & Reliability</li>
          </ul>
        </motion.div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose StayNext?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              From verified agents and professionals to automated tools for
              property discovery, StayNext brings simplicity and speed to your
              entire real estate journey.
            </p>
            <ul className="mt-4 text-gray-700 space-y-2">
              <li>● Verified, trusted partners</li>
              <li>● Smooth user experience</li>
              <li>● Organized workflow for all categories</li>
              <li>● Real-time digital automation</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
          >
            <ShieldCheck size={65} className="text-green-600 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Secure & Verified
            </h3>
            <p className="text-gray-600">
              Every agent, professional, and service provider on StayNext
              follows strict verification standards for user protection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-green-600 text-white p-12 rounded-3xl text-center shadow-xl"
        >
          <Award size={70} className="mx-auto mb-6" />
          <h3 className="text-3xl font-extrabold mb-3">Our Commitment</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We aim to build the most reliable, efficient, and user-friendly
            digital ecosystem for real estate and home services — supporting
            buyers, agents, professionals, and providers equally.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUsPage;
