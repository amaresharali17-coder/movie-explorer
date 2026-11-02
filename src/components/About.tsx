import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { ABOUT_CONTENT } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-[#0C0C0C] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4"
          >
            <span>Engineering Profile</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase"
          >
            ABOUT ME
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-4" />
        </div>

        {/* Centered Bio with Animated Sentence Reveal */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="space-y-6 text-lg sm:text-xl md:text-2xl text-[#D7E2EA] font-light leading-relaxed">
            {ABOUT_CONTENT.bio.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={idx === 0 ? 'font-medium text-white text-xl sm:text-2xl md:text-3xl leading-snug' : 'text-[#929BA5]'}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* 4 Visual Interactive Engineering Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Programming Icon & OOP Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
              Java &amp; OOP Architecture
            </h3>
            <p className="text-sm text-[#929BA5] leading-relaxed mb-4">
              Writing clean, modular Java code emphasizing encapsulation, inheritance, polymorphism, and abstraction.
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-purple-300">
              <span className="text-blue-400">class</span> <span className="text-emerald-300">EnterpriseService</span> <br />
              &nbsp;&nbsp;<span className="text-purple-400">implements</span> <span className="text-amber-200">IBackendLogic</span>
            </div>
          </motion.div>

          {/* 2. Database Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
              Relational Database Design
            </h3>
            <p className="text-sm text-[#929BA5] leading-relaxed mb-4">
              Architecting normalized schemas in MySQL &amp; PostgreSQL with complex joins and transactional integrity.
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-blue-300 flex flex-col gap-1">
              <div className="flex justify-between text-[11px] text-[#929BA5]">
                <span>USERS [1]</span>
                <span className="text-blue-400">➔ FK ➔</span>
                <span>ORDERS [N]</span>
              </div>
              <span className="text-emerald-400 text-[10px]">Indexed • ACID Compliant</span>
            </div>
          </motion.div>

          {/* 3. Abstract AI Object & Classifier */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
              AI &amp; Neural Forensics
            </h3>
            <p className="text-sm text-[#929BA5] leading-relaxed mb-4">
              Building deep learning classification pipelines for memory telemetry and leveraging prompt-driven development.
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-cyan-300">
              <span className="text-[#929BA5]">RAM Dump:</span> <span className="text-emerald-400">Classified [Benign / Anomaly]</span><br />
              <span className="text-purple-300 text-[10px]">SHA-256 Verified Ledger</span>
            </div>
          </motion.div>

          {/* 4. Software Engineering Illustration (MVC) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
              Full-Stack MVC Workflow
            </h3>
            <p className="text-sm text-[#929BA5] leading-relaxed mb-4">
              Decoupling presentation, controller orchestration, and backend persistence on enterprise servers like Tomcat.
            </p>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-violet-300 flex items-center justify-between text-[11px]">
              <span className="px-1.5 py-0.5 rounded bg-purple-900/40 border border-purple-500/40">JSP</span>
              <span>⇄</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-900/40 border border-blue-500/40">Servlet</span>
              <span>⇄</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 border border-emerald-500/40">MySQL</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ABOUT_CONTENT.highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <div className="text-xs uppercase tracking-wider text-[#929BA5] mb-1 font-medium">{item.label}</div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
