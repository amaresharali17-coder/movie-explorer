import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Server, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const EngineeringPhilosophy: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#FBFBFD] text-[#1D1D1F] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1 rounded-full bg-black/[0.05] border border-black/10 text-xs font-semibold tracking-widest uppercase text-[#6E6E73] mb-4"
          >
            <span>Apple-Inspired Minimalism</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1D1D1F] uppercase leading-[0.95]"
          >
            HOW I ENGINEER.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg sm:text-2xl text-[#86868B] font-light max-w-3xl leading-relaxed"
          >
            Clean backend architecture. Relational database integrity. AI-accelerated execution.
          </motion.p>
        </div>

        {/* 3 Apple-Style Minimalist Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-xl shadow-black/[0.03] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Server className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                Pillar 01
              </span>
              <h3 className="text-2xl font-bold text-[#1D1D1F] mt-1 mb-3">
                Architectural Clarity
              </h3>
              <p className="text-sm text-[#86868B] leading-relaxed font-light">
                Adhering to strict MVC principles and Object-Oriented Design. Separating business domains, data persistence, and UI controllers for maintainable systems.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-[#1D1D1F]">
              <Check className="w-4 h-4 text-purple-600" />
              <span>Java 21 • Servlets • Jakarta • OOP</span>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-xl shadow-black/[0.03] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Database className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                Pillar 02
              </span>
              <h3 className="text-2xl font-bold text-[#1D1D1F] mt-1 mb-3">
                Relational Rigor
              </h3>
              <p className="text-sm text-[#86868B] leading-relaxed font-light">
                Structuring normalized SQL schemas in MySQL &amp; PostgreSQL. Establishing referential integrity, indexing strategies, and optimized relational joins.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-[#1D1D1F]">
              <Check className="w-4 h-4 text-blue-600" />
              <span>ACID Guarantees • Complex Joins • JDBC</span>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-xl shadow-black/[0.03] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                Pillar 03
              </span>
              <h3 className="text-2xl font-bold text-[#1D1D1F] mt-1 mb-3">
                AI &amp; Innovation
              </h3>
              <p className="text-sm text-[#86868B] leading-relaxed font-light">
                Harnessing AI toolchains at TAP Academy for rapid prototyping, algorithmic debugging, and deep learning models for volatile memory forensics.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-[#1D1D1F]">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Deep Learning • TAI Platform • Fast Velocity</span>
            </div>
          </motion.div>
        </div>

        {/* Recruiter Punchline Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl bg-black text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              Engineering Mindset
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              "I build software that works reliably under load — from relational tables to modern interfaces."
            </h4>
            <p className="text-sm text-[#929BA5] mt-2 font-light">
              Amaresh Arali • Computer Science and Engineering @ BCET
            </p>
          </div>

          <a
            href="#contact"
            className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D7E2EA] transition-all transform hover:scale-105 shrink-0"
          >
            Connect With Me &#8594;
          </a>
        </motion.div>
      </div>
    </section>
  );
};
