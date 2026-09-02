import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/portfolioData';
import { DataFlowVisual } from './DataFlowVisual';
import { HeroDataEnvironment } from './HeroDataEnvironment';
import { ArrowDown, Github, Linkedin, MapPin, FileText } from 'lucide-react';

interface HeroProps {
  onResumeClick?: () => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onResumeClick, onExploreClick }) => {
  const handleScrollToWork = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const workSection = document.querySelector('#work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Animated Data Environment Background Layer */}
      <HeroDataEnvironment />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Primary Editorial Narrative & Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-7">
            
            {/* 1. Availability Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              id="hero-availability-indicator"
              className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#101620] border border-white/[0.08] text-xs font-medium text-slate-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="tracking-tight">{PROFILE_DATA.availability}</span>
            </motion.div>

            {/* 2. Primary Headline (Dominant Editorial Visual Statement) */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              id="hero-primary-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-[1.12]"
            >
              <span className="block font-semibold">Have a question.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-[#38bdf8] relative">
                Let the data{' '}
                <span className="relative inline-block text-[#38bdf8] drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                  answer it.
                </span>
              </span>
            </motion.h1>

            {/* 3. Short Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              id="hero-supporting-text"
              className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              {PROFILE_DATA.supportingText}
            </motion.p>

            {/* 4. Personal Identity & Location (Human, Clean, Editorial) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              id="hero-identity-block"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-slate-300"
            >
              <div className="font-semibold text-slate-100 text-base">
                {PROFILE_DATA.name}
              </div>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <div className="text-[#38bdf8] font-medium">
                {PROFILE_DATA.role}
              </div>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{PROFILE_DATA.location}</span>
              </div>
            </motion.div>

            {/* 5. Primary Action Calls-to-Action (CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <button
                type="button"
                id="hero-primary-cta"
                onClick={handleScrollToWork}
                className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#38bdf8] text-[#080a0e] font-semibold text-sm hover:bg-[#7dd3fc] transition-all duration-200 cursor-pointer shadow-[0_2px_16px_rgba(56,189,248,0.25)] hover:shadow-[0_4px_20px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                id="hero-secondary-cta"
                onClick={onResumeClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#0e1219] text-slate-200 font-medium text-sm border border-white/[0.08] hover:border-[#38bdf8]/40 hover:text-white transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#38bdf8] transition-transform duration-200 group-hover:scale-110" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* 6. Subtle Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              className="flex items-center space-x-6 pt-1 text-xs font-mono-data text-slate-400"
            >
              <a
                href={PROFILE_DATA.links.github}
                target="_blank"
                rel="noreferrer"
                id="hero-github-link"
                className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-[#38bdf8] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_DATA.links.linkedin}
                target="_blank"
                rel="noreferrer"
                id="hero-linkedin-link"
                className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-[#38bdf8] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: Clean Editorial Data-Flow Object */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-5 w-full"
          >
            <DataFlowVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
