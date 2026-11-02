import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { GitHubRepos } from './components/GitHubRepos';
import { EngineeringPhilosophy } from './components/EngineeringPhilosophy';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  useEffect(() => {
    // Add smooth scroll listener or any global accessibility adjustments
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // modal close or focus reset
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-purple-600/30 selection:text-white relative">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Landing with 3D Object & Typography */}
        <Hero />

        {/* 2. Dual Horizontal Animated Technology Marquee */}
        <Marquee />

        {/* 3. About Me Section with Scroll Reveals & Visual Elements */}
        <About />

        {/* 4. Technical Skills Stack Cards */}
        <TechStack />

        {/* 5. Professional Experience Timeline */}
        <Experience />

        {/* 6. Featured Work Projects with Interactive Browser Mockups */}
        <Projects />

        {/* 7. Live Verified GitHub Public Repositories */}
        <GitHubRepos />

        {/* 8. Apple-Inspired High-Contrast Engineering Philosophy */}
        <EngineeringPhilosophy />

        {/* 9. Education Timeline */}
        <Education />

        {/* 10. Direct Contact Section & Message Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
