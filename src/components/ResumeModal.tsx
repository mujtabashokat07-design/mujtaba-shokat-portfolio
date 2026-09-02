import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';
import { 
  FileText, 
  X, 
  Download, 
  ExternalLink, 
  Mail, 
  MapPin, 
  FolderGit2, 
  GraduationCap, 
  Briefcase, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="resume-modal-dialog"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0b0e14] border border-white/10 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0d121a]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#141d2b] text-[#38bdf8] border border-[#38bdf8]/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Master Resume — Mujtaba Shokat
              </h3>
              <div className="text-xs font-mono-data text-[#38bdf8]">
                Verified PDF Document · Ready for Review & Download
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Direct Open PDF in New Tab */}
            <a
              href="/assets/Mujtaba_Shokat_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              id="resume-modal-open-pdf-btn"
              className="min-h-[40px] inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#121822] hover:bg-[#182230] border border-white/10 text-xs font-mono-data text-slate-200 hover:text-white transition-colors"
              aria-label="Open Master Resume PDF in new tab"
            >
              <span>Open PDF</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Direct Download PDF */}
            <a
              href="/assets/Mujtaba_Shokat_Resume.pdf"
              download="Mujtaba_Shokat_Resume.pdf"
              id="resume-modal-download-pdf-btn"
              className="min-h-[40px] inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#080a0e] font-semibold text-xs font-mono-data transition-colors shadow-[0_2px_10px_rgba(56,189,248,0.2)]"
              aria-label="Download Master Resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              id="resume-modal-close-btn"
              className="p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Structured Resume View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#090c12]">
          
          {/* Document Header */}
          <div className="text-center pb-6 border-b border-white/[0.08] space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 uppercase">
              Mujtaba Shokat
            </h1>
            <div className="text-sm font-mono-data text-[#38bdf8] font-medium">
              Data Science & AI/ML | Machine Learning | NLP
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono-data text-slate-400 pt-1">
              <span>+92 315 3515062</span>
              <span>•</span>
              <span>mujtabashokat07@gmail.com</span>
              <span>•</span>
              <span>Pakistan</span>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-1 text-xs font-mono-data text-[#38bdf8]">
              <a href={PROFILE_DATA.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <span>•</span>
              <a href={PROFILE_DATA.links.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              <span>•</span>
              <a href="#work" onClick={onClose} className="hover:underline">Portfolio</a>
            </div>
          </div>

          {/* 1. PROFILE */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono-data font-bold text-[#38bdf8] tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>PROFILE</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Aspiring Data Science and AI/ML professional with hands-on project and internship experience in Python, data analysis, machine learning, NLP, and predictive modeling. Built end-to-end applications using Pandas, NumPy, Scikit-learn, Streamlit, FastAPI, and MongoDB. Comfortable with data cleaning, EDA, model evaluation, REST APIs, and building simple ML applications. Seeking Data Science, AI/ML, and related internship roles.
            </p>
          </div>

          {/* 2. TECHNICAL SKILLS */}
          <div className="space-y-3">
            <div className="text-xs font-mono-data font-bold text-[#38bdf8] tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>TECHNICAL SKILLS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-data">
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04]">
                <span className="font-bold text-slate-200">Programming:</span> <span className="text-slate-300">Python, Pandas, NumPy</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04]">
                <span className="font-bold text-slate-200">Data Analysis:</span> <span className="text-slate-300">EDA, data cleaning, statistics, feature preprocessing, data visualization</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04]">
                <span className="font-bold text-slate-200">Machine Learning:</span> <span className="text-slate-300">Scikit-learn, regression, classification, model evaluation</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04]">
                <span className="font-bold text-slate-200">NLP:</span> <span className="text-slate-300">Transformers, Hugging Face, text classification, sentiment analysis</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04]">
                <span className="font-bold text-slate-200">Visualization:</span> <span className="text-slate-300">Matplotlib, Seaborn, Plotly</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04]">
                <span className="font-bold text-slate-200">Development:</span> <span className="text-slate-300">Streamlit, FastAPI, REST APIs, Uvicorn</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.04] sm:col-span-2">
                <span className="font-bold text-slate-200">Database & Tools:</span> <span className="text-slate-300">MongoDB, MongoDB Atlas, Git, GitHub, Jupyter, Google Colab, VS Code, Kaggle</span>
              </div>
            </div>
          </div>

          {/* 3. EXPERIENCE */}
          <div className="space-y-3">
            <div className="text-xs font-mono-data font-bold text-[#38bdf8] tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>EXPERIENCE</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="text-sm font-bold text-slate-100">
                  Data Science Intern — CodeAlpha
                </div>
                <div className="text-xs font-mono-data text-[#38bdf8]">
                  Remote | June 2026 – July 2026
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-normal">
                <li>• Completed three classification tasks using Iris, Car Data, and Advertising datasets.</li>
                <li>• Cleaned and prepared datasets for analysis and model training.</li>
                <li>• Applied EDA and data visualization to understand patterns and features.</li>
                <li>• Built and evaluated machine learning models using Python and Scikit-learn.</li>
                <li>• Documented and maintained internship work in GitHub.</li>
              </ul>
            </div>
          </div>

          {/* 4. SELECTED PROJECTS */}
          <div className="space-y-3">
            <div className="text-xs font-mono-data font-bold text-[#38bdf8] tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>SELECTED PROJECTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* VoltSense AI */}
              <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2">
                <div className="font-bold text-slate-100">
                  VoltSense AI — Peak-Hour Electricity Classification
                </div>
                <div className="text-[11px] font-mono-data text-[#38bdf8]">
                  Python · ML · FastAPI · MongoDB · Streamlit
                </div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Built ML app to classify electricity peak hours and probability.</li>
                  <li>• Logistic Regression & Random Forest model comparison.</li>
                  <li>• REST API with FastAPI & MongoDB Atlas storage.</li>
                </ul>
              </div>

              {/* Telco Churn */}
              <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2">
                <div className="font-bold text-slate-100">
                  Telco Customer Churn Prediction
                </div>
                <div className="text-[11px] font-mono-data text-[#38bdf8]">
                  Python · Scikit-learn · Streamlit
                </div>
                <ul className="space-y-1 text-slate-300">
                  <li>• End-to-end churn prediction from cleaning to evaluation.</li>
                  <li>• Handled missing values and categorical preprocessing.</li>
                  <li>• Random Forest classifier evaluated via Accuracy & ROC-AUC.</li>
                </ul>
              </div>

              {/* Global AI Salary */}
              <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2">
                <div className="font-bold text-slate-100">
                  Global AI/ML Salary Analysis
                </div>
                <div className="text-[11px] font-mono-data text-[#38bdf8]">
                  Python · EDA · Regression
                </div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Exploratory analysis and regression modeling across AI/ML roles and geographies.</li>
                  <li>• One-Hot Encoding and feature preparation for salary_in_usd target.</li>
                  <li>• Linear Regression & Random Forest evaluated with MAE, MSE, R².</li>
                </ul>
              </div>

              {/* FIFA 2026 */}
              <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2">
                <div className="font-bold text-slate-100">
                  FIFA 2026 Player Performance
                </div>
                <div className="text-[11px] font-mono-data text-[#38bdf8]">
                  Python · ML · Streamlit
                </div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Analyzed player data to isolate performance trends.</li>
                  <li>• Compared Linear Regression, Decision Tree, and Random Forest.</li>
                  <li>• Streamlit dashboard for exploration and prediction.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. EDUCATION & CERTIFICATIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Education */}
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono-data font-bold text-[#38bdf8] uppercase">
                EDUCATION
              </div>
              <div className="text-xs text-slate-200">
                <div className="font-bold">Intermediate — Pre-Engineering</div>
                <div className="text-slate-400">Govt Degree College & P.G. Center, Latifabad (2024–2026)</div>
                <div className="text-amber-400 font-mono-data text-[11px] mt-0.5">Result Awaited</div>
              </div>
              <div className="text-xs text-slate-200 pt-2 border-t border-white/[0.04]">
                <div className="font-bold">Artificial Intelligence & Data Science</div>
                <div className="text-slate-400">Saylani Mass IT Training (SMIT) (2025–2026)</div>
                <div className="text-emerald-400 font-mono-data text-[11px] mt-0.5">Completed; Certificate Awaited</div>
              </div>
            </div>

            {/* Certifications & Virtual Experience */}
            <div className="p-4 rounded-2xl bg-[#0f141d] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono-data font-bold text-[#38bdf8] uppercase">
                CERTIFICATIONS & SIMULATIONS
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>CodeAlpha — Data Science Internship Certificate</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>HP LIFE — Data Science & Analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>British Airways — Data Science Job Simulation, Forage</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-white/[0.08] bg-[#0d121a]">
          <span className="text-xs font-mono-data text-slate-400 text-center sm:text-left">
            Authentic candidate documentation for recruiter evaluation.
          </span>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <a
              href="/assets/Mujtaba_Shokat_Resume.pdf"
              download="Mujtaba_Shokat_Resume.pdf"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-[#38bdf8] text-[#080a0e] font-semibold text-xs font-mono-data hover:bg-[#7dd3fc] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master Resume (PDF)</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#141b24] border border-white/10 text-xs font-mono-data text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
