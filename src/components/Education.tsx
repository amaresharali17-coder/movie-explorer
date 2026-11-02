import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 bg-[#0C0C0C] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase"
          >
            EDUCATION
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Academic Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline spine */}
          <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative pl-12 sm:pl-20 mb-10 last:mb-0"
            >
              {/* Timeline Indicator */}
              <div className="absolute left-1.5 sm:left-5.5 top-1 -translate-x-1/2 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#0C0C0C] border-2 border-purple-500 flex items-center justify-center shadow-lg shadow-purple-600/40">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400" />
                </div>
              </div>

              {/* Card */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
                      {idx === 0 ? 'Undergraduate Degree' : 'Higher Secondary Education'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mt-1">
                      {edu.institution}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs text-[#929BA5]">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] font-medium text-white">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {edu.details && (
                  <div className="mt-4 space-y-1.5">
                    {edu.details.map((detail, dIdx) => (
                      <p key={dIdx} className="text-sm text-[#929BA5] font-light leading-relaxed">
                        • {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
