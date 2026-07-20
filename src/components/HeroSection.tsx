import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Upload, Check, User, Code, Camera, RefreshCw } from 'lucide-react';
import { personalData, statsData, getActiveProfile, saveProfileData } from '../data';
import { PersonalData } from '../types';
import InteractiveGlowCard from './InteractiveGlowCard';
import EditProfileModal from './EditProfileModal';

interface HeroProps {
  accentColor: string;
}

export default function HeroSection({ accentColor }: HeroProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [profile, setProfile] = useState<PersonalData>(getActiveProfile());
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const isCustomImage = profile.imagePlaceholder !== personalData.imagePlaceholder;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        saveProfileData({ imagePlaceholder: base64String });
        setToastMessage("Profile picture updated successfully! ✅");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveProfileData({ imagePlaceholder: personalData.imagePlaceholder });
    setToastMessage("Reset profile picture to default SVG. 🔄");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const getAccentBtnClass = () => {
    switch (accentColor) {
      case 'sky':
        return 'bg-sky-600 hover:bg-sky-500 shadow-sky-500/20';
      case 'indigo':
        return 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20';
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20';
      default:
        return 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20';
    }
  };

  const getAccentTextClass = () => {
    switch (accentColor) {
      case 'sky':
        return 'text-sky-400';
      case 'indigo':
        return 'text-indigo-400';
      case 'emerald':
        return 'text-emerald-400';
      case 'amber':
        return 'text-amber-400';
      default:
        return 'text-blue-400';
    }
  };

  const getAccentGlowClass = () => {
    switch (accentColor) {
      case 'sky':
        return 'bg-sky-500/10 border-sky-500/30';
      case 'indigo':
        return 'bg-indigo-500/10 border-indigo-500/30';
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/30';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  const getAccentImageFrameClass = () => {
    switch (accentColor) {
      case 'sky':
        return 'border-sky-500/25 shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)]';
      case 'indigo':
        return 'border-indigo-500/25 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]';
      case 'emerald':
        return 'border-emerald-500/25 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]';
      case 'amber':
        return 'border-amber-500/25 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]';
      default:
        return 'border-blue-500/25 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]';
    }
  };

  // Safe client-side replacement of the alert
  const handleDownloadResume = () => {
    setToastMessage("Thummala Mani's Premium Resume PDF is being compiled with latest credentials & downloaded into your downloads folder! ✅");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:py-36 overflow-hidden flex flex-col items-center">
      {/* Background glow meshes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-radial-glow opacity-65" />
        {/* Subtle grid patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            {/* Quick Greeting */}
            <div className="flex justify-center lg:justify-start">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider font-semibold uppercase ${getAccentGlowClass()}`}>
                <span className="flex h-2 w-2 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${accentColor === 'emerald' ? 'bg-emerald-400' : accentColor === 'sky' ? 'bg-sky-400' : 'bg-blue-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${accentColor === 'emerald' ? 'bg-emerald-500' : accentColor === 'sky' ? 'bg-sky-500' : 'bg-blue-500'}`}></span>
                </span>
                <span>Active CSE Student</span>
              </span>
            </div>

            {/* Main Headlines */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Crafting Digital Value as <br />
              <span className={`bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent`}>
                {profile.name}
              </span>
            </h1>

            <p className={`text-lg md:text-xl font-medium tracking-tight ${getAccentTextClass()} font-mono`}>
              {profile.title}
            </p>

            <p className="text-slate-400 max-w-xl text-base md:text-lg leading-relaxed mx-auto lg:mx-0">
              {profile.subtitle} I specialize in translating complex computer science paradigms into interactive, highly performant web architectures. Learn about my academic path and coding records below.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md group ${getAccentBtnClass()} text-white`}
              >
                <span>Contact Me</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={handleDownloadResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>
            </div>


          </div>

          {/* Profile Photo Column */}
          <div className="lg:col-span-1" /> {/* Spacer */}
          
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Elegant glowing frame */}
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 select-none">
              
              {/* Floating Edit Profile Details button */}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute top-3 right-3 p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer z-30 hover:scale-110 active:scale-95 transition-all shadow-lg"
                title="Edit Profile Details"
              >
                <User size={15} />
              </button>
              
              {/* Outer decorative back glows */}
              <div className={`absolute -inset-1.5 rounded-3xl bg-gradient-to-r ${
                accentColor === 'indigo'
                  ? 'from-indigo-600 to-purple-600'
                  : accentColor === 'sky'
                  ? 'from-sky-400 to-cyan-500'
                  : accentColor === 'emerald'
                  ? 'from-emerald-500 to-teal-500'
                  : accentColor === 'amber'
                  ? 'from-amber-500 to-orange-500'
                  : 'from-blue-600 to-cyan-500'
              } opacity-40 blur-lg group-hover:opacity-60 transition duration-300`} />

              {/* Main Image Container with a premium subtle glow */}
              <div className={`relative w-full h-full rounded-3xl overflow-hidden glass-card flex items-center justify-center border transition-all duration-500 ${getAccentImageFrameClass()}`}>
                <img
                  src={profile.imagePlaceholder}
                  alt="Thummala Mani Portfolio Profile Representation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Hover overlay with Upload/Change Photo controls */}
                <div className="absolute inset-0 bg-[#020617]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 z-20">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md ${getAccentBtnClass()}`}
                  >
                    <Camera size={14} />
                    <span>Change Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-850 hover:border-slate-700 hover:bg-slate-800 active:scale-95 transition-all"
                  >
                    <User size={12} />
                    <span>Edit Profile Details</span>
                  </button>
                  
                  {isCustomImage && (
                    <button
                      type="button"
                      onClick={handleResetImage}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wide text-slate-400 hover:text-white bg-slate-900 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800 active:scale-95 transition-all"
                    >
                      <RefreshCw size={10} className="animate-spin-hover" />
                      <span>Reset to Default</span>
                    </button>
                  )}
                </div>

                {/* Active Border Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Visual Label Tag bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none z-10">
                  <p className="text-xs font-semibold text-white/90 drop-shadow-md tracking-wider uppercase font-mono">
                    {profile.name}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Counter Stats Container (Bento Stat Board) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
          {statsData.map((stat, i) => (
            <InteractiveGlowCard
              key={i}
              className="p-6 flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs font-semibold tracking-wider font-mono uppercase">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-lg bg-slate-950/50 border border-white/5 ${getAccentTextClass()}`}>
                  <Code size={14} />
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  {stat.value}
                  <span className={getAccentTextClass()}>{stat.suffix}</span>
                </span>
                <p className="text-slate-500 text-xs mt-1.5 leading-normal font-sans">
                  {stat.description}
                </p>
              </div>
            </InteractiveGlowCard>
          ))}
        </div>

      </div>

      {/* Modern custom toast overlay replaces global window alert */}
      {showToast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl glass-card border border-white/10 glow-${accentColor} text-white flex items-center gap-3 backdrop-blur-md animate-pulse`}>
          <div className={`w-2.5 h-2.5 rounded-full ${accentColor === 'indigo' ? 'bg-indigo-500' : accentColor === 'sky' ? 'bg-sky-500' : accentColor === 'emerald' ? 'bg-emerald-500' : accentColor === 'amber' ? 'bg-amber-500' : 'bg-blue-500'} animate-ping shrink-0`} />
          <div className="text-xs font-sans font-medium text-slate-200">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Dynamic Profile Edit Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentProfile={profile}
        accentColor={accentColor}
      />

    </section>
  );
}
