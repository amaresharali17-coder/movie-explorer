import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Phone, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08080A] border-t border-white/[0.08] text-[#929BA5] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white font-extrabold text-base shadow-lg shadow-purple-600/30">
              AA
            </div>
            <div>
              <div className="text-white font-bold tracking-tight text-sm uppercase">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs text-[#929BA5] font-light">
                Java Full-Stack Developer • Bengaluru
              </div>
            </div>
          </div>

          {/* Social Links including verified GitHub profile */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] transition-all"
              title="Send Email"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] transition-all"
              title="Call Direct"
              aria-label="Call Direct"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-[#60A5FA] border border-white/[0.06] transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-purple-300 border border-white/[0.06] transition-all"
              title="Official GitHub Profile"
              aria-label="Official GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-[#D7E2EA] hover:text-white transition-all transform hover:-translate-y-0.5"
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-center sm:text-left">
          <div className="text-[#D7E2EA] font-semibold tracking-wider uppercase">
            DESIGNED &amp; DEVELOPED BY AMARESH ARALI
          </div>

          <div className="text-[#929BA5]">
            © 2026 ALL RIGHTS RESERVED
          </div>

          <div className="text-[11px] font-mono text-[#636B75]">
            React 18 • TypeScript • Tailwind CSS • Three.js
          </div>
        </div>
      </div>
    </footer>
  );
};
