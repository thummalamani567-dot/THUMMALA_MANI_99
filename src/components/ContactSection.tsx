import React, { useState, useEffect } from 'react';
import { personalData, getActiveProfile } from '../data';
import { PersonalData } from '../types';

interface ContactProps {
  accentColor: string;
}

export default function ContactSection({ accentColor }: ContactProps) {
  const [profile, setProfile] = useState<PersonalData>(getActiveProfile());

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getActiveProfile());
    };
    window.addEventListener('profileUpdate', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('profileUpdate', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleStartConversation = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open mail client
    window.location.href = `mailto:${profile.email}`;
  };

  const getAccentTextClass = () => {
    switch (accentColor) {
      case 'sky': return 'text-sky-400';
      case 'indigo': return 'text-indigo-400';
      case 'emerald': return 'text-emerald-400';
      case 'amber': return 'text-amber-400';
      default: return 'text-blue-400';
    }
  };

  const getAccentBtnClass = () => {
    switch (accentColor) {
      case 'sky':
        return 'bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-[0_4px_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.75)]';
      case 'indigo':
        return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.75)]';
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-[0_4px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.75)]';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-[0_4px_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.75)]';
      default:
        return 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.75)]';
    }
  };

  const getAccentGlowStyle = () => {
    switch (accentColor) {
      case 'sky': return 'rgba(56,189,248,0.15)';
      case 'indigo': return 'rgba(99,102,241,0.15)';
      case 'emerald': return 'rgba(16,185,129,0.15)';
      case 'amber': return 'rgba(245,158,11,0.15)';
      default: return 'rgba(59,130,246,0.15)';
    }
  };

  const getAccentBorderClass = () => {
    switch (accentColor) {
      case 'sky': return 'border-sky-500/20';
      case 'indigo': return 'border-indigo-500/20';
      case 'emerald': return 'border-emerald-500/20';
      case 'amber': return 'border-amber-500/20';
      default: return 'border-blue-500/20';
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent min-h-[90vh] flex flex-col justify-between">
      {/* Soft central light highlight to mimic the glowing plexus core, fully dynamic */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0 filter blur-3xl opacity-40 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${getAccentGlowStyle()} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex-grow flex flex-col justify-center items-center">
        
        {/* Section Heading matching the screenshot perfectly */}
        <div className="mb-4">
          <p className={`text-xs sm:text-sm font-mono tracking-[0.25em] ${getAccentTextClass()} font-extrabold uppercase mb-4 transition-colors duration-500`}>
            03 . Connection Point
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Get In Touch
          </h2>
        </div>

        {/* Center Pill Button matching the screenshot perfectly */}
        <div className="mt-10 mb-12">
          <button
            onClick={handleStartConversation}
            className={`px-10 py-4 active:scale-95 rounded-full font-sans font-bold text-base transition-all duration-500 hover:-translate-y-0.5 cursor-pointer z-20 flex items-center gap-2 tracking-wide ${getAccentBtnClass()}`}
          >
            <span>Start a Conversation</span>
          </button>
        </div>

      </div>

      {/* Footer Copyright block matching the photo footer structure perfectly */}
      <div className="w-full text-center relative z-10 px-4 mt-20">
        <div className={`max-w-4xl mx-auto pt-8 border-t ${getAccentBorderClass()} text-slate-500 text-[11px] sm:text-xs font-mono tracking-wider flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 transition-colors duration-500`}>
          <span>© 2026 {profile.name}</span>
          <span className="hidden sm:inline">•</span>
          <span>computer science (artificial intelligence)</span>
          <span className="hidden sm:inline">•</span>
          <span>Chittoor, india</span>
        </div>
      </div>
    </section>
  );
}
