import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Mail, Github, Sparkles, Terminal, Database, Cpu, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0C0C0C]"
    >
      {/* Three.js 3D Interactive Digital Sculpture */}
      <ThreeHeroScene />

      {/* Ambient Gradient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-1" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Eyebrow Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/10 mb-6 shadow-lg shadow-purple-950/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA] font-medium">
              TAP Academy AI Dev Intern • Bengaluru, India
            </span>
          </motion.div>

          {/* Main Oversized Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.9] select-none">
              HI, I'M <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-white via-[#E2E8F0] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-sm">
                AMARESH.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-300 uppercase">
              JAVA DEVELOPER &amp; FULL-STACK DEVELOPER
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg md:text-xl text-[#929BA5] max-w-3xl mx-auto leading-relaxed font-light"
          >
            I'm a Computer Science Engineering student passionate about building practical software solutions, developing full-stack applications, and exploring AI-powered technologies.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full"
          >
            {/* Explore My Work */}
            <button
              onClick={() => scrollTo('projects')}
              className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm tracking-wide shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">EXPLORE MY WORK</span>
              <ArrowDownRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Contact Me */}
            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3.5 rounded-2xl glass-panel text-[#D7E2EA] font-semibold text-sm tracking-wide hover:text-white hover:bg-white/[0.08] hover:border-purple-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>CONTACT ME</span>
            </button>

            {/* Official GitHub Profile Button */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-[#D7E2EA] font-semibold text-sm tracking-wide hover:text-white hover:border-blue-400/50 hover:bg-white/[0.08] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
              title="Amaresh's GitHub Profile"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GITHUB</span>
            </a>
          </motion.div>

          {/* Floating Technology Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl"
          >
            {[
              { name: 'Core & Advanced Java', icon: Terminal, color: 'text-purple-400' },
              { name: 'OOP & MVC Pattern', icon: Layers, color: 'text-blue-400' },
              { name: 'MySQL & Relational DBs', icon: Database, color: 'text-indigo-400' },
              { name: 'AI Software Development', icon: Cpu, color: 'text-cyan-400' },
              { name: 'JSP, Servlets & JDBC', icon: Sparkles, color: 'text-violet-400' },
            ].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-[#929BA5] hover:text-white hover:border-white/[0.15] transition-colors"
                >
                  <Icon className={`w-3.5 h-3.5 ${tech.color}`} />
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase text-[#929BA5]">Scroll to discover</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-purple-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
