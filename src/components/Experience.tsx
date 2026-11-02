import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, Terminal, Sparkles } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#0C0C0C] overflow-hidden">
      {/* Subtle lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase"
          >
            PROFESSIONAL EXPERIENCE
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline spine */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-900/30" />

          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-12 sm:pl-20 mb-12"
            >
              {/* Glowing Timeline Indicator Node */}
              <div className="absolute left-1.5 sm:left-5.5 top-1.5 -translate-x-1/2 flex items-center justify-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-tr from-purple-600 to-blue-500 border-2 border-[#0C0C0C] shadow-lg shadow-purple-600/50" />
                </span>
              </div>

              {/* Experience Card */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Current Position</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      <Building className="w-4 h-4 text-purple-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 text-xs text-[#929BA5]">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] font-medium text-[#D7E2EA]">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Responsibility List */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-[#929BA5] font-semibold">
                    Key Contributions &amp; Engineering Scope:
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#D7E2EA] font-light leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="mt-7 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#929BA5] mr-2 font-medium">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
