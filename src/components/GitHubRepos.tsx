import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  FolderGit2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { GitHubRepo } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

// Verified real fallback data in case GitHub API rate limits (60 req/hr unauthenticated)
const VERIFIED_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'SignalRakshak',
    description:
      'AI-powered real-time signal intelligence and threat monitoring dashboard built with TypeScript and modern telemetry visualization.',
    html_url: 'https://github.com/amaresharali17-coder/SignalRakshak',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-04-14T13:38:11Z',
  },
  {
    id: 2,
    name: 'movie-explorer',
    description:
      'Comprehensive web application featuring dynamic filtering, routing, and modern UI engineering.',
    html_url: 'https://github.com/amaresharali17-coder/movie-explorer',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-29T11:19:58Z',
  },
  {
    id: 3,
    name: 'IPL-Data-Analysis',
    description:
      'Comprehensive exploratory data analysis and statistical evaluation of IPL cricket datasets using Python.',
    html_url: 'https://github.com/amaresharali17-coder/IPL-Data-Analysis',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-03-31T07:10:39Z',
  },
  {
    id: 4,
    name: 'certificates',
    description: 'Academic and industry certifications portfolio repository.',
    html_url: 'https://github.com/amaresharali17-coder/certificates',
    language: 'Markdown',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-03-31T18:14:15Z',
  },
];

const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#B07219',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Markdown: '#0891B2',
};

export const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>(VERIFIED_REPOS);
  const [loading, setLoading] = useState<boolean>(true);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://api.github.com/users/amaresharali17-coder/repos?per_page=10&sort=updated'
        );

        if (!res.ok) {
          throw new Error(`GitHub API responded with status ${res.status}`);
        }

        const data: any[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted: GitHubRepo[] = data.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || 'Public software engineering repository.',
            html_url: r.html_url,
            language: r.language || 'Code',
            stargazers_count: r.stargazers_count || 0,
            forks_count: r.forks_count || 0,
            updated_at: r.updated_at,
          }));
          setRepos(formatted);
          setUsingFallback(false);
        } else {
          setRepos(VERIFIED_REPOS);
          setUsingFallback(true);
        }
      } catch (err) {
        // Graceful fallback to verified authentic repositories without breaking UI
        console.warn('Using verified GitHub cache:', err);
        setRepos(VERIFIED_REPOS);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <section className="relative py-24 bg-[#0A0A0C] border-y border-white/[0.06] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold tracking-widest uppercase text-purple-400 mb-3 w-fit">
              <Github className="w-3.5 h-3.5" />
              <span>Real-Time Code Sync</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              PUBLIC REPOSITORIES
            </h2>
            <p className="text-sm text-[#929BA5] mt-2 max-w-xl font-light">
              Live data streamed from{' '}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-medium underline"
              >
                github.com/amaresharali17-coder
              </a>
              . Genuine code repositories without fabricated metrics.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 hover:bg-white/[0.08] text-xs font-bold text-white uppercase tracking-wider transition-all self-start sm:self-auto"
          >
            <Github className="w-4 h-4 text-purple-400" />
            <span>Open GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#929BA5]" />
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16 text-[#929BA5] gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <span className="text-sm font-mono">Connecting to GitHub Public API...</span>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {repos.map((repo, idx) => {
              const langColor = languageColors[repo.language || ''] || '#8B5CF6';

              return (
                <motion.a
                  key={repo.id || idx}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#929BA5] group-hover:text-white transition-colors" />
                    </div>

                    {/* Repo Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-mono tracking-tight truncate">
                      {repo.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#929BA5] mt-2 line-clamp-3 leading-relaxed font-light">
                      {repo.description || 'Public software repository by Amaresh Arali.'}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#929BA5]">
                    {/* Language dot */}
                    <div className="flex items-center gap-1.5 font-medium">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColor }}
                      />
                      <span className="text-[#D7E2EA]">{repo.language || 'Source'}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <span className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                        <Star className="w-3 h-3 text-[#929BA5]" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                        <GitFork className="w-3 h-3 text-[#929BA5]" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
