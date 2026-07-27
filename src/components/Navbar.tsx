import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Palette } from 'lucide-react';
import { personalData } from '../data';

interface NavbarProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const accents = [
  { id: 'blue', name: 'Cyber Blue', class: 'bg-blue-500', glow: 'shadow-blue-500/50' },
  { id: 'sky', name: 'Electric Sky', class: 'bg-sky-400', glow: 'shadow-sky-400/50' },
  { id: 'indigo', name: 'Royal Indigo', class: 'bg-indigo-500', glow: 'shadow-indigo-500/50' },
  { id: 'emerald', name: 'Emerald', class: 'bg-emerald-500', glow: 'shadow-emerald-500/50' },
  { id: 'amber', name: 'Solar Amber', class: 'bg-amber-500', glow: 'shadow-amber-500/50' },
];

export default function Navbar({ accentColor, setAccentColor }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlighters
      const sections = navLinks.map(link => document.getElementById(link.href.replace('#', '')));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAccentTextClass = (active: boolean) => {
    if (!active) return 'text-slate-400 hover:text-white transition-colors duration-200';
    switch (accentColor) {
      case 'sky': return 'text-sky-400 font-semibold';
      case 'indigo': return 'text-indigo-400 font-semibold';
      case 'emerald': return 'text-emerald-400 font-semibold';
      case 'amber': return 'text-amber-400 font-semibold';
      default: return 'text-blue-400 font-semibold';
    }
  };

  const getAccentDotClass = () => {
    switch (accentColor) {
      case 'sky': return 'bg-sky-400';
      case 'indigo': return 'bg-indigo-400';
      case 'emerald': return 'bg-emerald-400';
      case 'amber': return 'bg-amber-400';
      default: return 'bg-blue-400';
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  const getScrolledClass = () => {
    if (!isScrolled) return 'bg-transparent border-b border-transparent';
    switch (accentColor) {
      case 'sky':
        return 'bg-slate-950/40 backdrop-blur-md border-b border-sky-500/10 shadow-[0_4px_30px_rgba(56,189,248,0.08)]';
      case 'indigo':
        return 'bg-slate-950/40 backdrop-blur-md border-b border-indigo-500/10 shadow-[0_4px_30px_rgba(99,102,241,0.08)]';
      case 'emerald':
        return 'bg-slate-950/40 backdrop-blur-md border-b border-emerald-500/10 shadow-[0_4px_30px_rgba(16,185,129,0.08)]';
      case 'amber':
        return 'bg-slate-950/40 backdrop-blur-md border-b border-amber-500/10 shadow-[0_4px_30px_rgba(245,158,11,0.08)]';
      default:
        return 'bg-slate-950/40 backdrop-blur-md border-b border-blue-500/10 shadow-[0_4px_30px_rgba(59,130,246,0.08)]';
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getScrolledClass()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo Brand */}
          <a
            href="#home"
            id="nav-brand"
            className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white group"
            onClick={(e) => handleLinkClick(e, '#home')}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700 shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src={personalData.imagePlaceholder}
                alt={personalData.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span>
              mani<span className="text-slate-500 font-normal">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" id="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm py-1 relative ${getAccentTextClass(activeSection === link.href.replace('#', ''))}`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${getAccentDotClass()}`}
                    style={{ viewTransitionName: 'active-dot' }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Area: Accent Switcher & CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {/* Color Palette Menu */}
            <div className="relative">
              <button
                id="palette-btn"
                onClick={() => setShowColorPalette(!showColorPalette)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all flex items-center justify-center"
                title="Change UI accent highlight"
              >
                <Palette size={18} />
              </button>
              
              {showColorPalette && (
                <div className="absolute right-0 mt-3 w-48 p-3 rounded-2xl border border-slate-800 bg-[#090d16]/95 backdrop-blur-xl shadow-xl text-xs z-50 animate-fade-in">
                  <span className="text-slate-400 block mb-2 font-semibold">Accent Theme</span>
                  <div className="grid grid-cols-2 gap-2">
                    {accents.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => {
                          setAccentColor(acc.id);
                          setShowColorPalette(false);
                        }}
                        className={`flex items-center gap-1.5 p-1.5 rounded-md hover:bg-slate-800 border transition-all text-left ${
                          accentColor === acc.id ? 'border-slate-600 bg-slate-800/50' : 'border-transparent'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${acc.class} ${acc.glow} shadow-sm`} />
                        <span className={accentColor === acc.id ? 'text-white' : 'text-slate-300'}>{acc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Micro Quick Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available to Intern</span>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Theme switcher on mobile */}
            <button
              id="mobile-palette-btn"
              onClick={() => setShowColorPalette(!showColorPalette)}
              className="p-1.5 text-slate-400 hover:text-white rounded-md bg-slate-900 border border-slate-800"
            >
              <Palette size={16} />
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Theme Palette Indicator */}
      {showColorPalette && (
        <div className="md:hidden fixed top-16 right-4 left-4 p-3 rounded-lg border border-slate-800 bg-[#090d16] shadow-xl text-xs z-50 flex flex-wrap gap-2 items-center justify-around">
          <span className="text-slate-400 font-semibold w-full mb-1">Pick Color:</span>
          {accents.map((acc) => (
            <button
              key={acc.id}
              onClick={() => {
                setAccentColor(acc.id);
                setShowColorPalette(false);
              }}
              className={`flex items-center gap-1 p-1.5 rounded-md hover:bg-slate-800 border transition-all ${
                accentColor === acc.id ? 'border-slate-600 bg-slate-800' : 'border-transparent'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${acc.class}`} />
              <span className="text-slate-200">{acc.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#030712]/95 backdrop-blur-lg border-b border-slate-800" id="nav-mobile-drawer">
          <div className="px-3 pt-3 pb-4 space-y-3">
            {/* Sidebar Profile Card Header */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 shrink-0">
                <img
                  src={personalData.imagePlaceholder}
                  alt={personalData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white font-display truncate">{personalData.name}</p>
                <p className="text-xs text-slate-400 font-mono truncate">{personalData.title}</p>
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-3 py-2.5 rounded-md text-base ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-slate-900/80 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="px-3 pt-3 flex items-center gap-2 border-t border-slate-800/60 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for CSE Internships & Projects</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
