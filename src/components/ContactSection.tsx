import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/portfolioData';
import { 
  Mail, 
  Linkedin, 
  Github, 
  ArrowRight, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ContactSectionProps {
  onResumeClick?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onResumeClick }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setStatusMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();

    // 1. Validate required fields
    if (!trimmedName) {
      setValidationError('Please enter your name.');
      return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!trimmedMessage) {
      setValidationError('Please enter your message.');
      return;
    }

    // 3. Construct recipient, subject, body, and encoded URLs
    const recipient = 'mujtabashokat07@gmail.com';
    const subjectText = `Portfolio Contact — ${trimmedName}`;
    const bodyText = `Name: ${trimmedName}\n\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;

    const encodedSubject = encodeURIComponent(subjectText);
    const encodedBody = encodeURIComponent(bodyText);

    // Primary: Gmail Web Compose URL (opens directly in a new top-level browser tab)
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;

    // Fallback: standard mailto URL
    const mailtoUrl = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;

    let openedGmail = false;

    try {
      const newWin = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
      if (newWin && !newWin.closed) {
        openedGmail = true;
      }
    } catch {
      openedGmail = false;
    }

    if (openedGmail) {
      setStatusMessage('Your email draft is ready in Gmail.');
    } else {
      // Fallback to top-level mailto navigation
      try {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
      } catch {
        window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
      }
      setStatusMessage('Your email app should open with the message ready to send.');
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      {/* Background Ambience & Converging Light Field */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38bdf8]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* EDITORIAL CLOSING GRID (LEFT: INFO / RIGHT: FORM)         */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Editorial Intro, Primary Email & Availability */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Section Eyebrow & Heading */}
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                <span>LET'S TALK</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-6 leading-tight">
                Have a data problem worth exploring?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Whether you're looking for a Data Science & ML intern or want to discuss a data project, I'd be happy to hear from you.
              </p>
            </div>

            {/* Signature Data Process Detail: QUESTION -> DISCUSSION -> NEXT STEP */}
            <div className="p-4 rounded-2xl bg-[#0b0e14] border border-white/[0.06]">
              <div className="text-[10px] font-mono-data uppercase tracking-wider text-slate-400 mb-2.5">
                COLLABORATION FLOW
              </div>
              <div className="flex items-center justify-between text-xs font-mono-data text-slate-300">
                <span className="px-2.5 py-1 rounded-md bg-[#121822] text-[#38bdf8] border border-white/[0.06]">
                  QUESTION
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2.5 py-1 rounded-md bg-[#121822] text-slate-200 border border-white/[0.06]">
                  DISCUSSION
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2.5 py-1 rounded-md bg-[#121822] text-emerald-400 border border-white/[0.06]">
                  NEXT STEP
                </span>
              </div>
            </div>

            {/* Primary Contact Box */}
            <div className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT EMAIL</span>
                </div>
                <span className="text-[11px] font-mono-data text-slate-400">
                  Primary Reach
                </span>
              </div>

              <div className="text-lg sm:text-xl font-mono-data text-slate-100 font-semibold break-all">
                {PROFILE_DATA.links.email}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Email Mujtaba Prominent Mailto CTA */}
                <a
                  href={`mailto:${PROFILE_DATA.links.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-email-mujtaba-btn"
                  className="group min-h-[44px] inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#080a0e] font-semibold text-xs sm:text-sm font-mono-data transition-colors cursor-pointer"
                >
                  <span>Email Mujtaba</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                {/* Copy Email Helper */}
                <button
                  type="button"
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="min-h-[44px] inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#121822] hover:bg-[#182230] border border-white/10 text-xs font-mono-data text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Recruiter Availability Block */}
            <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/[0.06] flex items-start space-x-3.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <div className="space-y-1">
                <div className="text-sm font-semibold text-slate-100">
                  Currently open to Data Science & ML internships.
                </div>
                <div className="text-xs font-mono-data text-slate-400">
                  Remote · Hybrid · On-site
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Streamlined Functional Contact Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-6 sm:p-8 space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fill out the fields below to prepare a prefilled message in your email client.
                </p>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-4 font-mono-data text-xs" noValidate>
                
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-form-name" className="block text-slate-300 uppercase text-[11px] mb-1.5">
                    Name <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    id="contact-form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name or company"
                    className="w-full min-h-[44px] rounded-xl bg-[#101520] border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#38bdf8]/60 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-form-email" className="block text-slate-300 uppercase text-[11px] mb-1.5">
                    Email <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    id="contact-form-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full min-h-[44px] rounded-xl bg-[#101520] border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#38bdf8]/60 transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-form-message" className="block text-slate-300 uppercase text-[11px] mb-1.5">
                    Message <span className="text-[#38bdf8]">*</span>
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me a little about what you're working on..."
                    className="w-full rounded-xl bg-[#101520] border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#38bdf8]/60 transition-colors resize-none"
                  />
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {validationError}
                  </div>
                )}

                {/* Safe Status Message (No fake "sent" message) */}
                {statusMessage && (
                  <div className="p-3 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  className="group w-full min-h-[44px] inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#080a0e] font-semibold text-sm transition-colors cursor-pointer"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <div className="pt-2 text-[11px] font-mono-data text-slate-400 text-center">
                Uses standard email client handoff with prefilled recipient and details.
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* SECONDARY NETWORKS & RESUME CTA ROW                      */}
        {/* ======================================================== */}
        <div className="mt-12 pt-10 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* GitHub Card */}
          <a
            href={PROFILE_DATA.links.github}
            target="_blank"
            rel="noreferrer"
            id="contact-github-link"
            className="group min-h-[48px] p-4 rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#38bdf8]/30 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#121822] text-[#38bdf8] border border-white/[0.06]">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono-data text-slate-400 uppercase">Code & Tasks</div>
                <div className="text-sm font-semibold text-slate-100 group-hover:text-[#38bdf8] transition-colors">
                  GitHub
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* LinkedIn Card */}
          <a
            href={PROFILE_DATA.links.linkedin}
            target="_blank"
            rel="noreferrer"
            id="contact-linkedin-link"
            className="group min-h-[48px] p-4 rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#38bdf8]/30 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#121822] text-[#38bdf8] border border-white/[0.06]">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono-data text-slate-400 uppercase">Network</div>
                <div className="text-sm font-semibold text-slate-100 group-hover:text-[#38bdf8] transition-colors">
                  LinkedIn
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* View / Download Resume */}
          <button
            type="button"
            id="contact-resume-modal-btn"
            onClick={onResumeClick}
            className="group min-h-[48px] p-4 rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#38bdf8]/30 transition-colors flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#121822] text-[#38bdf8] border border-white/[0.06]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono-data text-slate-400 uppercase">Qualifications</div>
                <div className="text-sm font-semibold text-slate-100 group-hover:text-[#38bdf8] transition-colors">
                  View / Download Resume
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#38bdf8] group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
};
