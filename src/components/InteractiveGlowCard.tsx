import React, { useState, useEffect, useRef } from 'react';

interface InteractiveGlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
}

export default function InteractiveGlowCard({
  children,
  className = '',
  id,
  ...props
}: InteractiveGlowCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [pulse, setPulse] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Generate click ripple
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Handle pulse on initial click
    if (!isActive) {
      setPulse(true);
      setTimeout(() => {
        setPulse(false);
      }, 500);
    }

    setIsActive(true);
  };

  // Toggle active state when clicked
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && cardRef.current.contains(e.target as Node)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
    };
  }, []);

  const handleRippleEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onClick={handleClick}
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer select-none border group ${
        isActive
          ? 'bg-[#030712]/95 -translate-y-[6px] border-[#00BFFF]/90 shadow-[0_20px_50px_rgba(0,191,255,0.35),0_0_15px_rgba(0,191,255,0.4),inset_0_0_10px_rgba(0,229,255,0.25)]'
          : 'bg-[#0f172a]/40 hover:bg-[#0f172a]/60 border-white/5 hover:border-white/10 hover:-translate-y-0.5 shadow-xl shadow-black/40'
      } ${className}`}
      {...props}
    >
      {/* 1. Spread-upwards blue/cyan glow background */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#00BFFF]/15 via-[#00E5FF]/04 to-transparent transition-all duration-[500ms] ease-out pointer-events-none z-0 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30%]'
        }`}
      />

      {/* 2. Soft bottom neon bloom background helper */}
      <div
        className={`absolute inset-x-4 bottom-0 h-12 bg-[#00BFFF] filter blur-[25px] transition-opacity duration-500 pointer-events-none z-0 ${
          isActive ? 'opacity-35' : 'opacity-0'
        }`}
      />

      {/* 3. Emerging light from bottom edge (electric blue line) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent transition-all duration-500 ease-out pointer-events-none z-20 ${
          isActive
            ? 'opacity-100 scale-x-100 shadow-[0_-4px_15px_#00BFFF]'
            : 'opacity-0 scale-x-50'
        } ${pulse ? 'scale-y-[2.5] brightness-150 animate-pulse' : ''}`}
      />

      {/* 4. Subtle Specular Reflection/Sheen Sheen */}
      <div
        className={`absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent translate-x-[-100%] transition-transform duration-[800ms] ease-out group-hover:translate-x-[100%] ${
          isActive ? 'duration-[1200ms] translate-x-[100%] opacity-50' : ''
        }`}
      />

      {/* 5. Interactive Ripple Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            onAnimationEnd={() => handleRippleEnd(ripple.id)}
            className="absolute bg-gradient-to-r from-[#00BFFF]/45 to-[#00E5FF]/20 rounded-full pointer-events-none animate-card-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
            }}
          />
        ))}
      </div>

      {/* 6. Main content layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
