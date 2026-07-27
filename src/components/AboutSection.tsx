import React from 'react';
import { User, Cpu, Target, LucideIcon, Sparkles, Code } from 'lucide-react';
import { personalData } from '../data';
import InteractiveGlowCard from './InteractiveGlowCard';

interface AboutProps {
  accentColor: string;
}

interface Pillar {
  title: string;
  desc: string;
  icon: LucideIcon;
  badge: string;
}

export default function AboutSection({ accentColor }: AboutProps) {

  const getAccentTextClass = () => {
    switch (accentColor) {
      case 'sky': return 'text-sky-400';
      case 'indigo': return 'text-indigo-400';
      case 'emerald': return 'text-emerald-400';
      case 'amber': return 'text-amber-400';
      default: return 'text-blue-400';
    }
  };

  const getAccentBorderClass = () => {
    switch (accentColor) {
      case 'sky': return 'border-sky-500/25';
      case 'indigo': return 'border-indigo-500/25';
      case 'emerald': return 'border-emerald-500/25';
      case 'amber': return 'border-amber-500/25';
      default: return 'border-blue-500/25';
    }
  };

  const pillars: Pillar[] = [
    {
      title: "Website & App Development",
      desc: "Building highly-polished, responsive web applications and interactive mobile-friendly solutions utilizing cutting-edge client-side and full-stack frameworks.",
      icon: Code,
      badge: "Development"
    },
    {
      title: "Modern Architectures",
      desc: "Decoupled component structures, robust full-stack state coordination, and secure APIs designed to scale seamlessly as your startup grows.",
      icon: User,
      badge: "Scalability"
    },
    {
      title: "Startup-Ready Iteration",
      desc: "High velocity without compromising on quality. Transforming complex business logic and abstract concepts into beautifully animated, intuitive MVP designs.",
      icon: Target,
      badge: "Velocity"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Light highlights */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <p className={`text-xs font-mono font-bold tracking-widest uppercase mb-2 ${getAccentTextClass()}`}>
            01 . Introduction
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              About Mani
            </h2>
            <p className="text-slate-500 font-mono text-sm max-w-sm md:text-right">
              / Architect. Platform Engineer. Startup Partner.
            </p>
          </div>
          <div className="h-[1px] w-full bg-slate-800/80 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
              <p className="font-semibold text-white">
                Hello, I'm <span className={getAccentTextClass()}>{personalData.name}</span>.
              </p>
              <p>
                {personalData.bio}
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {personalData.subBio}
              </p>
            </div>

            {/* Quick stats box table */}
            <InteractiveGlowCard className="p-6 mt-4">
              <h4 className="text-white text-xs font-mono font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles size={14} className={getAccentTextClass()} />
                <span>Immediate Core Details</span>
              </h4>
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-sm font-sans">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Based In</span>
                  <span className="text-slate-300 font-medium">India</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Degree</span>
                  <span className="text-slate-300 font-medium">B.Tech, CSE</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Current Phase</span>
                  <span className="text-slate-300 font-medium">Pre-Final Year</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Key Focus</span>
                  <span className="text-slate-300 font-medium">Data Structures</span>
                </div>
              </div>
            </InteractiveGlowCard>
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <InteractiveGlowCard
                  key={i}
                  className="p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon frame */}
                    <div className={`p-3 rounded-2xl bg-slate-950/50 border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ${getAccentTextClass()}`}>
                      <Icon size={20} />
                    </div>
                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-display font-bold text-lg select-none">
                          {pillar.title}
                        </h3>
                        <span className="bg-slate-950 border border-slate-800 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase">
                          {pillar.badge}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </InteractiveGlowCard>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
