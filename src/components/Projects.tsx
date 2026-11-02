import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Layers,
  ArrowUpRight,
  Sparkles,
  Github,
  CheckCircle2,
  ExternalLink,
  Lock,
  Clock,
  Eye,
} from 'lucide-react';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { TantraLuxeMockup } from './mockups/TantraLuxeMockup';
import { CybersecurityMockup } from './mockups/CybersecurityMockup';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 bg-[#0C0C0C] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase"
          >
            SELECTED WORK
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#929BA5] max-w-2xl font-light">
            Architected full-stack enterprise systems and specialized AI forensics engines with verifiable technical depth.
          </p>
        </div>

        {/* Stacking Project Cards */}
        <div className="space-y-16">
          {PROJECTS_DATA.map((project, index) => {
            const isEcommerce = project.mockupType === 'ecommerce';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 transition-all duration-300 hover:border-purple-500/30 shadow-2xl group"
              >
                {/* Project Header Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-500 select-none">
                      {project.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs uppercase tracking-widest font-mono text-purple-400 font-bold">
                          {project.category}
                        </span>
                        {project.status && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                            <Clock className="w-3 h-3" />
                            <span>{project.status}</span>
                          </span>
                        )}
                        <span className="text-xs text-[#929BA5] font-mono">
                          • {project.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <h4 className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-medium">
                        {project.subtitle}
                      </h4>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>

                    {/* Verified GitHub Integration */}
                    {project.id === 'tantra-luxe' ? (
                      <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-[#D7E2EA] hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                        title="Repository hosted in private enterprise space. View GitHub profile."
                      >
                        <Lock className="w-3.5 h-3.5 text-[#929BA5]" />
                        <span>Private Repo • Profile</span>
                      </a>
                    ) : (
                      <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-[#D7E2EA] hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                        title="Active Research Repository. View on GitHub."
                      >
                        <Github className="w-3.5 h-3.5 text-purple-400" />
                        <span>GitHub Profile</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description & Key Specs */}
                <div className="my-8">
                  <p className="text-base sm:text-lg text-[#D7E2EA] font-light leading-relaxed max-w-4xl">
                    {project.description}
                  </p>

                  {/* Feature Highlights Grid */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
                    {project.keyFeatures.slice(0, 4).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-[#929BA5]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-purple-300 hover:border-purple-500/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Large Interactive Visual Preview / Mockup */}
                <div className="mt-6 pt-4 rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center justify-between mb-3 text-xs text-[#929BA5] px-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Interactive Browser Mockup Preview
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-purple-400 hover:text-purple-300 underline font-sans text-xs"
                    >
                      Inspect Full Architecture &#8599;
                    </button>
                  </div>

                  {isEcommerce ? <TantraLuxeMockup /> : <CybersecurityMockup />}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal for In-Depth Inspection */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
