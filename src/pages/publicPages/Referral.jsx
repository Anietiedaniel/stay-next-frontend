import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Building2,
  Rocket,
  HeartHandshake,
  Award,
  Leaf,
  Handshake,
  Lightbulb,
  Target,
  Globe2,
  Zap,
} from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-800">

      {/* TOP HERO */}
      <section className="relative overflow-hidden bg-purple-700 py-24 px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#ffffff_1px,transparent_1px)] bg-[length:24px_24px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6"
          >
            <Building2 size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
              PropTech, reimagined
            </span>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            We Are PropertyZone
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-stone-300 mt-5 text-lg max-w-2xl mx-auto"
          >
            Connecting people, property, and possibilities — a technology-driven
            ecosystem for verification, management, and sustainable real estate
            across Africa.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-1 bg-emerald-500 mx-auto rounded-full mt-8"
          />
        </div>
      </section>

      {/* THREE-COLUMN FEATURE GRID */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12 mb-24 relative z-10">
        {[
          {
            icon: Globe2,
            title: "Who We Are",
            text: "PropertyZone LTD is a technology-driven real estate company pioneering the digital transformation of the property sector through innovative PropTech solutions.",
          },
          {
            icon: Rocket,
            title: "Our Mission",
            text: "To leverage technology, innovation, and strategic partnerships to deliver secure, transparent, and sustainable real estate solutions for every stakeholder.",
          },
          {
            icon: HeartHandshake,
            title: "Our Values",
            values: [
              "Transparency & integrity",
              "Innovation & automation",
              "Customer-centricity",
              "Sustainability & reliability",
            ],
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white rounded-2xl p-8 border border-stone-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">
              <card.icon size={26} className="text-emerald-700" strokeWidth={1.75} />
            </div>
            <h2 className="text-xl font-bold mb-3 text-stone-900">{card.title}</h2>
            {card.text && (
              <p className="text-stone-600 leading-relaxed text-[15px]">{card.text}</p>
            )}
            {card.values && (
              <ul className="text-stone-600 space-y-2.5 text-[15px]">
                {card.values.map((v) => (
                  <li key={v} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </section>

      {/* WHAT WE DO — services strip */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-stone-900 mb-3">What We Do</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            A full technology stack covering verification, tenancy, and property discovery.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Property verification",
              text: "Verify ownership, documentation, and authenticity to reduce fraud and speed up due diligence.",
            },
            {
              icon: Zap,
              title: "Rent & tenant management",
              text: "Automated rent collection, digital receipts, lease tracking, and tenant notifications.",
            },
            {
              icon: Building2,
              title: "Property listings",
              text: "A digital marketplace for owners, agents, and developers to market properties effectively.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
            >
              <s.icon size={28} className="text-emerald-700 mb-4" strokeWidth={1.75} />
              <h3 className="font-bold text-stone-900 mb-2">{s.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-white border-y border-stone-200 py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Why choose PropertyZone?
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              From verified agents and professionals to automated tools for
              property discovery, PropertyZone brings simplicity and speed to
              your entire real estate journey.
            </p>
            <ul className="space-y-3">
              {[
                "Verified, trusted partners",
                "Smooth, intuitive user experience",
                "Organized workflow across every category",
                "Real-time digital automation",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-stone-700">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck size={14} className="text-emerald-700" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900 p-9 rounded-2xl shadow-xl"
          >
            <div className="w-16 h-16 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-6">
              <ShieldCheck size={32} className="text-emerald-400" strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Secure & verified
            </h3>
            <p className="text-stone-300 leading-relaxed">
              Every agent, professional, and service provider on PropertyZone
              follows strict verification standards to protect our users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES STRIP */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-stone-900 mb-3">Our core values</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            The principles that guide every product decision we make.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: Lightbulb, label: "Innovation" },
            { icon: ShieldCheck, label: "Integrity" },
            { icon: Award, label: "Excellence" },
            { icon: Users, label: "Customer-centricity" },
            { icon: Handshake, label: "Collaboration" },
            { icon: Leaf, label: "Sustainability" },
            { icon: Target, label: "Reliability" },
            { icon: Globe2, label: "Scale & reach" },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-stone-200 rounded-xl p-5 text-center hover:border-emerald-300 hover:shadow-sm transition-all duration-300"
            >
              <v.icon size={22} className="text-emerald-700 mx-auto mb-3" strokeWidth={1.75} />
              <p className="text-sm font-semibold text-stone-800">{v.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-stone-900 text-white p-12 rounded-3xl text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,#10b981_0%,transparent_60%)]" />
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
              <Award size={32} className="text-emerald-400" strokeWidth={1.75} />
            </div>
            <h3 className="text-3xl font-extrabold mb-3">Our commitment</h3>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
              We aim to build the most reliable, efficient, and user-friendly
              digital ecosystem for real estate and home services — supporting
              buyers, agents, professionals, and providers equally.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUsPage;