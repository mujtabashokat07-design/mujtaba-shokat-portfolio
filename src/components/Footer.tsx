import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Journey', href: '#journey' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="footer" className="relative py-12 sm:py-16 border-t border-white/[0.06] bg-[#06080b] overflow-hidden">
      {/* Restrained animated background data line */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          
          {/* Left Column: Identity & Status Indicator */}
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-100">
              {PROFILE_DATA.name}
            </div>
            <div className="text-xs font-mono-data text-slate-400">
              {PROFILE_DATA.role}
            </div>
            
            {/* Subtle Availability Status Indicator */}
            <div className="inline-flex items-center space-x-2 pt-1 text-xs font-mono-data text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Open to Data Science & ML Internships</span>
            </div>
          </div>

          {/* Right Column: Navigation & Social Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            
            {/* Quick Navigation */}
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5 text-xs font-mono-data text-slate-400">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-slate-100 transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center space-x-4 text-slate-400 border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-4 sm:pt-0 sm:pl-6">
              <a
                href={PROFILE_DATA.links.github}
                target="_blank"
                rel="noreferrer"
                id="footer-github-link"
                className="hover:text-[#38bdf8] transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PROFILE_DATA.links.linkedin}
                target="_blank"
                rel="noreferrer"
                id="footer-linkedin-link"
                className="hover:text-[#38bdf8] transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Scroll to Top */}
              <button
                type="button"
                id="footer-back-to-top"
                onClick={handleScrollTop}
                className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Closing Line */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 text-center sm:text-left text-xs font-mono-data text-slate-400"
        >
          Built with curiosity, data, and a lot of iteration.
        </motion.div>

      </div>
    </footer>
  );
};
