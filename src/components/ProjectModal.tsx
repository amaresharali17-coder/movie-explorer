import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layers, Cpu, Database, Calendar, ExternalLink, Github, Shield } from 'lucide-react';
import { Project } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141418] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-[#D7E2EA]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#929BA5] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-12 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                Project {project.number}
              </span>
              <span className="text-[#929BA5]">•</span>
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                {project.category}
              </span>
              {project.status && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  {project.status}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {project.title}
            </h3>
            <h4 className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mt-1">
              {project.subtitle}
            </h4>
            <div className="flex items-center gap-2 text-xs text-[#929BA5] mt-2">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Duration: {project.duration}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#929BA5] mb-2">
              Executive Overview
            </h5>
            <p className="text-sm sm:text-base text-[#D7E2EA] font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture & Engineering Breakdown */}
          {project.architecture && (
            <div className="mb-8">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#929BA5] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>System Architecture Flow</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-[#D7E2EA]"
                  >
                    <span className="text-purple-400 font-bold mr-2">Layer {idx + 1}:</span>
                    <span>{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features List */}
          <div className="mb-8">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#929BA5] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Technical Implementations &amp; Scope</span>
            </h5>
            <ul className="space-y-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#D7E2EA] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#929BA5] mb-3">
              Technologies &amp; Protocols
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-purple-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions & Verification */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#929BA5]">
              {project.id === 'tantra-luxe' ? (
                <span className="italic">
                  Built with Java 21, Jakarta Servlets &amp; Apache Tomcat 10.1. Code repository private / enterprise portfolio.
                </span>
              ) : (
                <span className="italic text-amber-300/90">
                  Active academic &amp; forensics research project under ongoing development.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-white transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Amaresh's GitHub</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:opacity-90 transition-opacity"
              >
                Close Details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
