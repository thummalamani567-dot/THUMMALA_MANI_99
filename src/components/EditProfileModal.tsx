import React, { useState } from 'react';
import { X, Save, RotateCcw, Link, User, Briefcase, Mail, Phone, Info } from 'lucide-react';
import { PersonalData } from '../types';
import { personalData, saveProfileData } from '../data';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: PersonalData;
  accentColor: string;
}

export default function EditProfileModal({ isOpen, onClose, currentProfile, accentColor }: EditProfileModalProps) {
  const [formData, setFormData] = useState<PersonalData>({ ...currentProfile });
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileData(formData);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore the default professional template profile? This will clear your custom edits.")) {
      setFormData({ ...personalData });
    }
  };

  const getAccentBtnClass = () => {
    switch (accentColor) {
      case 'sky': return 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20';
      case 'indigo': return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md shadow-emerald-600/20';
      case 'amber': return 'bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-600/20';
      default: return 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20';
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Form container */}
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-900 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 ${getAccentTextClass()}`}>
              <User size={18} />
            </div>
            <div>
              <h3 className="text-white font-display font-bold text-lg">Edit Profile Information</h3>
              <p className="text-xs text-slate-500 font-mono">Dynamic client-side portfolio customizer</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-6 space-y-5 custom-scrollbar">
          
          {/* Section: Basic Identity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-1.5 flex items-center gap-1.5">
              <Briefcase size={12} className={getAccentTextClass()} />
              <span>Identity & Focus</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Thummala Mani"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-sans"
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Professional Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Modern Web Platforms"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Hero Statement / Subtitle</label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                required
                rows={2}
                placeholder="High-performance websites designed for ambitious startups."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-sans resize-none"
              />
            </div>
          </div>

          {/* Section: Contact & Social Coordinates */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-1.5 flex items-center gap-1.5">
              <Mail size={12} className={getAccentTextClass()} />
              <span>Communication Channels</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="thummalamani567@gmail.com"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">LinkedIn Profile Link</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-500"><Link size={14} /></span>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">GitHub Username Link</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-500"><Link size={14} /></span>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Biography Narrative */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-1.5 flex items-center gap-1.5">
              <Info size={12} className={getAccentTextClass()} />
              <span>Personal Narrative (Bio)</span>
            </h4>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Primary Biography</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="Brief personal intro..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-sans text-slate-300 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Sub-Biography (Detailed Details)</label>
              <textarea
                name="subBio"
                value={formData.subBio}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="More in-depth career details, technologies, goals..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-sans text-slate-300 leading-relaxed"
              />
            </div>
          </div>

          {/* Section: Profile Image URL Selector */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-1.5 flex items-center gap-1.5">
              <Link size={12} className={getAccentTextClass()} />
              <span>Custom Profile Picture URL (Optional)</span>
            </h4>
            
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Image URL (or Base64)</label>
              <input
                type="text"
                name="imagePlaceholder"
                value={formData.imagePlaceholder.startsWith('data:image/svg+xml;') ? '' : formData.imagePlaceholder}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setFormData(prev => ({ 
                    ...prev, 
                    imagePlaceholder: val || currentProfile.imagePlaceholder 
                  }));
                }}
                placeholder="Paste an online image URL (https://...) to permanently set your picture"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-slate-700 transition-all font-mono"
              />
              <span className="block text-[10px] text-slate-500 mt-1 font-mono">
                Tip: If empty, it defaults back to your gorgeous custom vector avatar representation.
              </span>
            </div>
          </div>

        </form>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4.5 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-900/25">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Restore Defaults</span>
          </button>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95 ${getAccentBtnClass()}`}
            >
              <Save size={14} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>

        {/* Success Save Toast Overlay */}
        {showToast && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30 animate-fade-in">
            <div className={`p-3 rounded-full bg-slate-900 border border-slate-800 ${getAccentTextClass()} mb-1 animate-bounce`}>
              <Save size={24} />
            </div>
            <span className="text-white font-sans font-bold text-base">Changes Saved Successfully!</span>
            <span className="text-slate-400 font-mono text-xs">Profile updated across all views.</span>
          </div>
        )}

      </div>
    </div>
  );
}
