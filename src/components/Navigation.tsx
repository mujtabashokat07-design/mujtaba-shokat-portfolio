import React, { useState, useEffect } from 'react';
import { PROFILE_DATA, NAV_LINKS } from '../data/portfolioData';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onResumeClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onResumeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080a0e]/85 backdrop-blur-md border-b border-white/8 py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Name */}
          <a
            href="#"
            className="group flex items-center space-x-2 text-slate-100 font-semibold tracking-tight transition-colors hover:text-[#38bdf8]"
            id="nav-brand-link"
          >
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] opacity-80 group-hover:scale-125 transition-transform" />
            <span className="text-base sm:text-lg font-medium tracking-normal text-slate-100">{PROFILE_DATA.name}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative group text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors py-1"
                id={`desktop-nav-${link.id}`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#38bdf8] transition-all duration-200 group-hover:w-full opacity-80" />
              </a>
            ))}

            {/* Resume Action Button */}
            <button
              type="button"
              id="nav-resume-btn"
              onClick={onResumeClick}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/5 border border-white/10 hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 hover:text-[#38bdf8] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Resume</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              id="mobile-resume-btn-header"
              onClick={onResumeClick}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-slate-200 bg-white/5 border border-white/10"
              aria-label="Download Resume"
            >
              <FileText className="w-3 h-3 text-[#38bdf8] mr-1" />
              <span>CV</span>
            </button>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent focus:border-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#0a0d13]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-4">
            <div className="text-[11px] font-mono-data uppercase tracking-wider text-slate-400 pb-1 border-b border-white/5">
              Navigation
            </div>
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-slate-300 hover:text-[#38bdf8] transition-colors py-1 flex items-center justify-between"
                id={`mobile-nav-${link.id}`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40" />
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                id="drawer-resume-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onResumeClick) onResumeClick();
                }}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-100 bg-[#141b24] border border-white/15 hover:border-[#38bdf8]/50 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#38bdf8]" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
