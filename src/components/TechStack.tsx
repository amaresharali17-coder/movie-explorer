import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Coffee,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Coffee,
  Database,
  Terminal,
  Cpu,
  Layers,
};

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredCategories =
    activeCategory === 'ALL'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="relative py-28 bg-[#0C0C0C] overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Competencies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase"
          >
            MY TECH STACK
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#929BA5] max-w-2xl font-light">
            Verified technical proficiencies built through hands-on full-stack development, database engineering, and industry internship.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeCategory === 'ALL'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-white/[0.03] text-[#929BA5] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
          >
            ALL CATEGORIES
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(cat.title)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeCategory === cat.title
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/[0.03] text-[#929BA5] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] || Layers;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Card Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide uppercase">
                        {category.title}
                      </h3>
                      <span className="text-[11px] text-[#929BA5] block">
                        {category.skills.length} Core Skills
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#929BA5] leading-relaxed mb-6 font-light">
                    {category.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/40 hover:bg-purple-950/20 text-xs font-medium text-[#D7E2EA] hover:text-white transition-all duration-200 cursor-default group/pill"
                      >
                        <CheckCircle className="w-3 h-3 text-purple-400 group-hover/pill:text-blue-400 transition-colors" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Accent Line */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#929BA5]">
                  <span>Production &amp; Project Ready</span>
                  <span className="text-purple-400 font-medium group-hover:translate-x-1 transition-transform duration-200">
                    Verified &#8594;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
