import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function App() {
  // Global Accent Color State: blue, indigo, emerald, amber
  const [accentColor, setAccentColor] = useState<string>('blue');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll height to show/hide the back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getScrollTopBgClass = () => {
    switch (accentColor) {
      case 'sky': return 'bg-sky-600 hover:bg-sky-500 shadow-sky-500/20';
      case 'indigo': return 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20';
      case 'amber': return 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20';
      default: return 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20';
    }
  };

  // Dynamically yield proper theme accent rings or back glow gradients
  const getAccentGradientClass = () => {
    switch (accentColor) {
      case 'sky':
        return 'from-sky-950/20 via-black to-slate-950';
      case 'indigo':
        return 'from-indigo-950/20 via-black to-slate-950';
      case 'emerald':
        return 'from-emerald-950/20 via-black to-slate-950';
      case 'amber':
        return 'from-amber-950/20 via-black to-slate-950';
      default:
        return 'from-blue-950/20 via-black to-slate-950';
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-black">
      
      {/* Dynamic Animated Particles background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ParticleBackground accentColor={accentColor} />
      </div>

      {/* Main sticky navigation header */}
      <Navbar accentColor={accentColor} setAccentColor={setAccentColor} />

      {/* Main Structural Framework */}
      <main className="relative z-10 w-full" id="root-main-body">
        
        {/* Section 1: Hero Cover */}
        <HeroSection accentColor={accentColor} />

        {/* Section 2: Personal Narrative About */}
        <AboutSection accentColor={accentColor} />

        {/* Section 3: Interaction Contact info */}
        <ContactSection accentColor={accentColor} />

      </main>

      {/* Floating back-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-xl text-white shadow-lg transition-all z-50 duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 ${getScrollTopBgClass()} glow-${accentColor}`}
          title="Back to Top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
