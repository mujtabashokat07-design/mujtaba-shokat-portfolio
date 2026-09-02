import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Search, 
  TrendingUp, 
  Cpu, 
  Layout, 
  BookOpen, 
  Target 
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { OptimizedImage } from './OptimizedImage';

export const AboutSection: React.FC = () => {
  const learningFocusList = [
    {
      icon: <Search className="w-4 h-4 text-[#38bdf8]" />,
      label: 'Exploring datasets',
      description: 'Examining raw distributions, checking assumptions, and cleaning messy variables.'
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-[#38bdf8]" />,
      label: 'Finding patterns',
      description: 'Isolating correlations, statistical anomalies, and key relationships across features.'
    },
    {
      icon: <Cpu className="w-4 h-4 text-[#38bdf8]" />,
      label: 'Building machine-learning models',
      description: 'Training baseline and ensemble models with disciplined validation to avoid leakage.'
    },
    {
      icon: <Layout className="w-4 h-4 text-[#38bdf8]" />,
      label: 'Turning models into usable applications',
      description: 'Deploying algorithms into interactive Streamlit and FastAPI interfaces anyone can test.'
    },
    {
      icon: <BookOpen className="w-4 h-4 text-[#38bdf8]" />,
      label: 'Learning through real projects',
      description: 'Tackling end-to-end problems where every concept is grounded in reproducible code.'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>ABOUT</span>
          </div>

          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.1 }
              }
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-6 leading-tight flex flex-wrap gap-x-3 gap-y-1"
          >
            {"Curious about problems. Serious about the data.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.9, filter: "blur(4px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
            I'm a Data Science & ML student based in Hyderabad, Pakistan, focused on learning how data can be turned into useful decisions and working applications.
          </p>
        </div>

        {/* ======================================================== */}
        {/* EDITORIAL NARRATIVE & PROFILE FACTS                      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              I believe the most effective way to understand data science is by getting your hands dirty with real datasets. Rather than viewing machine learning purely as abstract math or isolated textbook examples, I approach each challenge as a question waiting for evidence.
            </p>

            <p>
              Every project I build starts with curiosity: understanding what the numbers represent, ensuring data integrity, choosing appropriate modeling techniques, and evaluating results honestly.
            </p>

            <div className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.08] my-6">
              <div className="text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-4 flex items-center space-x-2">
                <Target className="w-4 h-4 text-[#38bdf8]" />
                <span>WHAT I ENJOY DOING</span>
              </div>
              
              <div className="space-y-4">
                {learningFocusList.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm">
                    <div className="p-1.5 rounded-md bg-[#121822] border border-white/[0.06] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-normal">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-400">
              I'm actively seeking a <span className="text-slate-100 font-medium">Data Science & ML Internship</span> where I can support senior engineers, contribute to real data pipelines, and continuously sharpen my practical skills.
            </p>
          </div>

          {/* Right Column: Verified Profile Metadata Card with Real Photo */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-6 sm:p-7 space-y-6">
              
              {/* Professional Portrait Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121822] min-h-[260px] max-h-[340px] flex items-center justify-center">
                <OptimizedImage
                  src="/assets/projects/mujtaba-portrait.webp"
                  thumbnailSrc="/assets/projects/mujtaba-portrait-thumb.webp"
                  alt="Professional portrait of Mujtaba Shokat, Data Science & Machine Learning Intern"
                  aspectRatioClass="aspect-[4/5] w-full"
                  className="w-full h-full object-cover object-top"
                >
                  {/* Subtle Identity Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0b0e14]/90 backdrop-blur-md border border-white/10 flex items-center justify-between z-10">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-100">
                        {PROFILE_DATA.name}
                      </h3>
                      <div className="text-[11px] font-mono-data text-[#38bdf8]">
                        {PROFILE_DATA.role}
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400" title="Active Candidate" />
                  </div>
                </OptimizedImage>
              </div>

              {/* Profile Details List */}
              <div className="space-y-3.5 font-mono-data text-xs">
                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/[0.04]">
                  <span className="text-slate-400 uppercase">LOCATION</span>
                  <span className="text-slate-200 text-right">{PROFILE_DATA.location}</span>
                </div>

                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/[0.04]">
                  <span className="text-slate-400 uppercase">TARGET ROLE</span>
                  <span className="text-slate-200 text-right">{PROFILE_DATA.role}</span>
                </div>

                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/[0.04]">
                  <span className="text-slate-400 uppercase">AVAILABILITY</span>
                  <span className="text-emerald-400 text-right">Available for Internships</span>
                </div>

                <div className="flex items-start justify-between gap-4 py-1.5">
                  <span className="text-slate-400 uppercase">WORK MODE</span>
                  <span className="text-slate-200 text-right">Remote · Hybrid · On-Site</span>
                </div>
              </div>

              {/* Approach Philosophy Note */}
              <div className="p-3.5 rounded-xl bg-[#0f141d] border border-white/[0.06] text-xs text-slate-300 leading-relaxed font-mono-data">
                <span className="text-[#38bdf8] font-bold"># PERSPECTIVE:</span> "Good analysis doesn't start with a complex model. It starts with asking the right question and letting the data guide the outcome."
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
