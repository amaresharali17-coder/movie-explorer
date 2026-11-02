import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#8B5CF6', '#3B82F6', '#A78BFA'],
      });
    } catch (e) {
      // safe fallback
    }

    // Open direct mail client with prefilled details
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0C0C0C] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

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
            <span>Open for Opportunities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase"
          >
            LET'S BUILD SOMETHING GREAT.
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-4" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-[#929BA5] max-w-2xl font-light leading-relaxed"
          >
            I'm always interested in connecting with developers, recruiters, and people working on exciting technology projects. Let's connect and create something meaningful.
          </motion.p>
        </div>

        {/* Content Grid: Left Contact Info, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Contact & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
              Contact Information
            </h3>

            {/* Email Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex items-center justify-between group">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 flex-1 truncate mr-2"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs uppercase font-mono tracking-wider text-[#929BA5]">
                    Email Address
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#929BA5] hover:text-white transition-colors"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex items-center justify-between group">
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-4 flex-1 truncate mr-2"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs uppercase font-mono tracking-wider text-[#929BA5]">
                    Phone (Direct)
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {PERSONAL_INFO.phoneDisplay}
                  </div>
                </div>
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#929BA5] hover:text-white transition-colors"
                title="Copy Phone"
                aria-label="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4 truncate">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-[#60A5FA] group-hover:scale-105 transition-transform shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-[#929BA5]">
                    Professional Network
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                    linkedin.com/in/amaresh-arali
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#929BA5] group-hover:text-white transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4 truncate">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-[#929BA5]">
                    Official GitHub
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    github.com/amaresharali17-coder
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#929BA5] group-hover:text-white transition-colors" />
            </a>

            {/* Quick Action Button Strip */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 py-3 px-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider text-center transition-all"
              >
                EMAIL ME
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider text-center transition-all"
              >
                LINKEDIN PROFILE
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span>Send a Message</span>
              </h3>
              <p className="text-xs text-[#929BA5] mb-6">
                Fills and launches your default email client with your message directed to {PERSONAL_INFO.email}.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#929BA5] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Recruiter"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-white placeholder-[#636B75] focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#929BA5] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-white placeholder-[#636B75] focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#929BA5] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity / Java Role"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-white placeholder-[#636B75] focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#929BA5] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Amaresh, I came across your portfolio and would love to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-white placeholder-[#636B75] focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </form>

              {/* Real Transparency Note as requested in guidelines */}
              <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5 text-xs text-[#929BA5]">
                <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Configuration Transparency:</strong> This form immediately opens your local or web email client with all entered fields pre-populated to guarantee zero message loss. To enable headless automated serverless email delivery without a mail app, an EmailJS, Resend, or Formspree API key can be integrated.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
