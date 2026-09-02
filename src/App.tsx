import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { DataJourneySection } from './components/DataJourneySection';
import { ProblemsSection } from './components/ProblemsSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { DataToInsightInteraction } from './components/DataToInsightInteraction';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DataGridBackground } from './components/DataGridBackground';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeModalOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeModalOpen(false);
  };

  const handleExploreWork = () => {
    const workElem = document.querySelector('#work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080a0e] text-[#f1f5f9] selection:bg-[#38bdf8]/20 selection:text-[#38bdf8]">
      {/* Minimal Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Ambient background data grid */}
      <DataGridBackground />

      {/* Primary Sticky Header */}
      <Navigation onResumeClick={handleOpenResume} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section with Interactive Data Flow */}
        <Hero
          onResumeClick={handleOpenResume}
          onExploreClick={handleExploreWork}
        />

        {/* 2. Data Journey (Signature Foundation) */}
        <DataJourneySection />

        {/* 3. Problems I Solve (Dual Audience) */}
        <ProblemsSection />

        {/* 4. Selected Work (Projects Foundation) */}
        <SelectedWorkSection />

        {/* 5. About (Philosophy & Background) */}
        <AboutSection />

        {/* 6. Skills (Technical Matrix) */}
        <SkillsSection />

        {/* 7. Experience & Education (Academic Track) */}
        <ExperienceEducationSection />

        {/* 8. Signature Visual Interaction (From Data to Insight) */}
        <DataToInsightInteraction />

        {/* 9. Contact (Direct Outreach) */}
        <ContactSection onResumeClick={handleOpenResume} />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Interactive Resume Modal Blueprint */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={handleCloseResume}
      />
    </div>
  );
}
