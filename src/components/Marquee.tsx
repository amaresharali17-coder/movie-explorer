import React from 'react';
import { MARQUEE_TECH } from '../data/portfolioData';

export const Marquee: React.FC = () => {
  // Split into two balanced sets or offset rows
  const row1 = [...MARQUEE_TECH, ...MARQUEE_TECH];
  const reversedTech = [...MARQUEE_TECH].reverse();
  const row2 = [...reversedTech, ...reversedTech];

  return (
    <section className="relative py-12 bg-[#0A0A0C] border-y border-white/[0.06] overflow-hidden select-none">
      {/* Side gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-5">
        {/* Row 1: Leftward moving */}
        <div className="flex overflow-hidden group">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee-left group-hover:[animation-play-state:paused]">
            {row1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-6 text-sm sm:text-base font-bold tracking-widest text-[#929BA5] hover:text-white transition-colors duration-200"
              >
                <span className="px-3.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-purple-900/10 transition-all">
                  {item}
                </span>
                <span className="text-purple-500/50 font-black text-xs">◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward moving */}
        <div className="flex overflow-hidden group">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee-right group-hover:[animation-play-state:paused]">
            {row2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-6 text-sm sm:text-base font-bold tracking-widest text-[#929BA5] hover:text-white transition-colors duration-200"
              >
                <span className="px-3.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 hover:bg-blue-900/10 transition-all">
                  {item}
                </span>
                <span className="text-blue-500/50 font-black text-xs">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
