import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  layer: number; // 0, 1, 2, 3
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  maxOpacity: number;
  vx: number;
  vy: number;
  hasSpikes?: boolean;
}

interface CosmicDust {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  phase: number;
  pulseSpeed: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  targetRadius: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  color: string;
  thickness: number;
}

export default function ParticleBackground({ accentColor = 'blue' }: { accentColor?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Simulation Entities
    let stars: Star[] = [];
    let dustParticles: CosmicDust[] = [];
    let nebulae: Nebula[] = [];
    let shootingStars: ShootingStar[] = [];

    // Interactive Coordinates
    const targetMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let targetScrollY = 0;
    let smoothScrollY = 0;

    // Flag to track mouse interaction
    let hasMovedMouse = false;

    // Get colors based on global accentColor
    let primaryRgb = '59, 130, 246';   // blue-500
    let secondaryRgb = '96, 165, 250'; // blue-400
    let tertiaryRgb = '6, 182, 212';   // cyan-500
    let nebula1Color = 'rgba(29, 78, 216, 0.035)'; // blue
    let nebula2Color = 'rgba(6, 182, 212, 0.02)'; // cyan
    let nebula3Color = 'rgba(147, 51, 234, 0.035)'; // purple

    if (accentColor === 'indigo') {
      primaryRgb = '99, 102, 241'; // indigo-500
      secondaryRgb = '129, 140, 248'; // indigo-400
      tertiaryRgb = '168, 85, 247'; // purple-500
      nebula1Color = 'rgba(79, 70, 229, 0.03)';
      nebula2Color = 'rgba(168, 85, 247, 0.02)';
      nebula3Color = 'rgba(99, 102, 241, 0.035)';
    } else if (accentColor === 'sky') {
      primaryRgb = '14, 165, 233'; // sky-600
      secondaryRgb = '56, 189, 248'; // sky-500
      tertiaryRgb = '6, 182, 212'; // cyan-500
      nebula1Color = 'rgba(14, 165, 233, 0.035)';
      nebula2Color = 'rgba(6, 182, 212, 0.02)';
      nebula3Color = 'rgba(56, 189, 248, 0.025)';
    } else if (accentColor === 'emerald') {
      primaryRgb = '16, 185, 129'; // emerald-500
      secondaryRgb = '52, 211, 153'; // emerald-400
      tertiaryRgb = '6, 182, 212'; // cyan-500
      nebula1Color = 'rgba(4, 120, 87, 0.03)';
      nebula2Color = 'rgba(52, 211, 153, 0.02)';
      nebula3Color = 'rgba(6, 182, 212, 0.025)';
    } else if (accentColor === 'amber') {
      primaryRgb = '245, 158, 11'; // amber-500
      secondaryRgb = '251, 191, 36'; // amber-400
      tertiaryRgb = '239, 68, 68'; // red-500
      nebula1Color = 'rgba(180, 83, 9, 0.03)';
      nebula2Color = 'rgba(251, 191, 36, 0.02)';
      nebula3Color = 'rgba(239, 68, 68, 0.025)';
    }

    // Colors list for cool and warm celestial bodies
    const starColors = {
      blueWhite: [`rgba(${secondaryRgb}, `, `rgba(${primaryRgb}, `, 'rgba(191, 219, 254, '],
      warmGold: ['rgba(254, 243, 199, ', 'rgba(253, 230, 138, ', 'rgba(252, 211, 77, '],
      pureWhite: ['rgba(255, 255, 255, ', 'rgba(248, 250, 252, ', 'rgba(241, 245, 249, '],
      nebulaPurple: nebula3Color,
      nebulaBlue: nebula1Color,
      nebulaCyan: nebula2Color,
      dustColors: [`rgba(${primaryRgb}, `, `rgba(${secondaryRgb}, `, `rgba(${tertiaryRgb}, `]
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeUniverse();
    };

    const handleMouseMove = (e: MouseEvent) => {
      hasMovedMouse = true;
      // Convert coordinates to offsets from viewport center for parallax displacement
      const clientX = typeof e.clientX === 'number' ? e.clientX : 0;
      const clientY = typeof e.clientY === 'number' ? e.clientY : 0;
      const innerWidth = typeof window.innerWidth === 'number' && window.innerWidth > 0 ? window.innerWidth : 1024;
      const innerHeight = typeof window.innerHeight === 'number' && window.innerHeight > 0 ? window.innerHeight : 768;
      targetMouse.x = clientX - innerWidth / 2;
      targetMouse.y = clientY - innerHeight / 2;
    };

    const handleScroll = () => {
      targetScrollY = typeof window.scrollY === 'number' ? window.scrollY : (window.pageYOffset || 0);
    };

    // Initialize the starry universe
    const initializeUniverse = () => {
      stars = [];
      dustParticles = [];
      nebulae = [];
      shootingStars = [];

      const width = canvas.width;
      const height = canvas.height;

      // 1. Generate dense multi-layered stars (~1400 stars)
      // Layer 0 (Ultra distant, micro-stars, very dense, minimal parallax)
      const count0 = Math.floor((width * height) / 1800); 
      for (let i = 0; i < count0; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.5 + 0.2,
          layer: 0,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors.pureWhite[Math.floor(Math.random() * starColors.pureWhite.length)],
          maxOpacity: Math.random() * 0.4 + 0.2,
          vx: (Math.random() * 0.02 + 0.005), // very slow general drift to the right/down
          vy: (Math.random() * 0.01 + 0.005),
        });
      }

      // Layer 1 (Mid distance background stars, moderate density)
      const count1 = Math.floor((width * height) / 3200);
      for (let i = 0; i < count1; i++) {
        const isWarm = Math.random() > 0.85;
        const colorPalette = isWarm ? starColors.warmGold : starColors.pureWhite;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.6 + 0.6,
          layer: 1,
          twinkleSpeed: Math.random() * 0.04 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          maxOpacity: Math.random() * 0.6 + 0.3,
          vx: (Math.random() * 0.04 + 0.01),
          vy: (Math.random() * 0.02 + 0.01),
        });
      }

      // Layer 2 (Foreground stars, responsive and crisp)
      const count2 = Math.floor((width * height) / 8000);
      for (let i = 0; i < count2; i++) {
        const isBlue = Math.random() > 0.7;
        const colorPalette = isBlue ? starColors.blueWhite : starColors.pureWhite;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.8 + 1.1,
          layer: 2,
          twinkleSpeed: Math.random() * 0.06 + 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          maxOpacity: Math.random() * 0.8 + 0.4,
          vx: (Math.random() * 0.08 + 0.02),
          vy: (Math.random() * 0.04 + 0.02),
        });
      }

      // Layer 3 (Ultra-crisp accent stars with subtle diffraction lens flares)
      const count3 = Math.floor((width * height) / 32000) + 12;
      for (let i = 0; i < count3; i++) {
        const colorPalette = Math.random() > 0.5 ? starColors.blueWhite : starColors.warmGold;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.0 + 1.8,
          layer: 3,
          twinkleSpeed: Math.random() * 0.08 + 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          maxOpacity: Math.random() * 0.9 + 0.6,
          vx: (Math.random() * 0.12 + 0.04),
          vy: (Math.random() * 0.06 + 0.03),
          hasSpikes: true,
        });
      }

      // 2. Generate Floating Cosmic Dust Particles (~45 items)
      const dustCount = Math.floor((width * height) / 40000) + 15;
      for (let i = 0; i < dustCount; i++) {
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 1.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.15 + 0.05,
          color: starColors.dustColors[Math.floor(Math.random() * starColors.dustColors.length)],
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
        });
      }

      // 3. Generate Large Nebula Space Clouds (4 organic clouds)
      nebulae = [
        {
          x: width * 0.2,
          y: height * 0.35,
          radius: Math.min(width, height) * 0.45,
          targetRadius: Math.min(width, height) * 0.45,
          color: starColors.nebulaPurple,
          vx: 0.02,
          vy: -0.01,
          phase: 0,
        },
        {
          x: width * 0.8,
          y: height * 0.2,
          radius: Math.min(width, height) * 0.5,
          targetRadius: Math.min(width, height) * 0.5,
          color: starColors.nebulaBlue,
          vx: -0.01,
          vy: 0.015,
          phase: Math.PI / 3,
        },
        {
          x: width * 0.5,
          y: height * 0.75,
          radius: Math.min(width, height) * 0.6,
          targetRadius: Math.min(width, height) * 0.6,
          color: starColors.nebulaCyan,
          vx: 0.008,
          vy: -0.008,
          phase: Math.PI * (2 / 3),
        },
        {
          x: width * 0.85,
          y: height * 0.8,
          radius: Math.min(width, height) * 0.4,
          targetRadius: Math.min(width, height) * 0.4,
          color: starColors.nebulaPurple,
          vx: -0.015,
          vy: -0.01,
          phase: Math.PI,
        }
      ];
    };

    // Spawn a shooting star periodically
    const spawnShootingStar = () => {
      if (shootingStars.filter(s => s.active).length >= 2) return;

      const width = canvas.width;
      const height = canvas.height;

      // Start from top-left boundary or right boundary
      const startFromLeft = Math.random() > 0.4;
      const startX = startFromLeft ? Math.random() * (width * 0.6) : width + 50;
      const startY = startFromLeft ? -50 : Math.random() * (height * 0.4);

      // Trajectory angle (mostly downwards, diagonally left or right)
      const angle = startFromLeft 
        ? Math.random() * (Math.PI / 6) + (Math.PI / 6)  // 30 to 60 deg
        : Math.random() * (Math.PI / 6) + (Math.PI * 5 / 6); // 150 to 180 deg

      const colors = [
        'rgba(147, 197, 253, ', // Light blue
        'rgba(196, 181, 253, ', // Violet
        'rgba(255, 255, 255, ', // White
      ];

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 12 + 10,
        angle: angle,
        opacity: 1.0,
        active: true,
        color: colors[Math.floor(Math.random() * colors.length)],
        thickness: Math.random() * 1.5 + 0.8,
      });
    };

    // Attach interaction events
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial configurations
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeUniverse();

    // Spawn looping timer for shooting stars (every 4-7 seconds)
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnShootingStar();
      }
    }, 4500);

    // Parallax displacements based on star depth layers
    const parallaxFactors = [0.03, 0.08, 0.16, 0.28];

    // Main 60 FPS animation tick
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // If the canvas doesn't have a valid size, skip rendering this frame
      if (width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Draw absolute space dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate mouse parallax and scroll position
      if (!hasMovedMouse) {
        // Subtle idle micro-sway if mouse is not moved yet
        const time = Date.now() * 0.0005;
        targetMouse.x = Math.sin(time) * 20;
        targetMouse.y = Math.cos(time * 1.3) * 15;
      }

      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.04;
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.06;

      // Force variables to be finite to avoid canvas crash
      if (isNaN(smoothMouse.x) || !isFinite(smoothMouse.x)) smoothMouse.x = 0;
      if (isNaN(smoothMouse.y) || !isFinite(smoothMouse.y)) smoothMouse.y = 0;
      if (isNaN(smoothScrollY) || !isFinite(smoothScrollY)) smoothScrollY = 0;

      // 1. Render Nebula Clouds
      for (const nebula of nebulae) {
        // Physics drift
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        // Bounce from outer padding
        if (nebula.x < -nebula.radius || nebula.x > width + nebula.radius) nebula.vx *= -1;
        if (nebula.y < -nebula.radius || nebula.y > height + nebula.radius) nebula.vy *= -1;

        // Pulse the nebula radius slowly
        nebula.phase += 0.001;
        nebula.radius = Math.max(1, nebula.targetRadius + Math.sin(nebula.phase) * 35);

        // Parallax offset for nebula (very faint background level)
        const offsetNebulaX = smoothMouse.x * 0.02;
        const offsetNebulaY = smoothMouse.y * 0.02 + smoothScrollY * 0.05;

        const renderNebulaX = nebula.x + offsetNebulaX;
        const renderNebulaY = nebula.y + offsetNebulaY;

        // Draw radial cosmic gas cloud
        const cloudGradient = ctx.createRadialGradient(
          renderNebulaX, renderNebulaY, 0,
          renderNebulaX, renderNebulaY, nebula.radius
        );
        cloudGradient.addColorStop(0, nebula.color);
        cloudGradient.addColorStop(0.5, nebula.color.replace('0.035', '0.015').replace('0.02', '0.008'));
        cloudGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = cloudGradient;
        ctx.beginPath();
        ctx.arc(renderNebulaX, renderNebulaY, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Stars with Twinkles & Parallax
      for (const star of stars) {
        // Universe Drift Physics
        star.x += star.vx;
        star.y += star.vy;

        // Wrap boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Parallax Displacement Matrix
        const pFactor = parallaxFactors[star.layer];
        const parallaxX = smoothMouse.x * pFactor;
        const parallaxY = smoothMouse.y * pFactor + smoothScrollY * pFactor * 0.75;

        let renderX = star.x + parallaxX;
        let renderY = star.y + parallaxY;

        // Keep coordinates within bounds after displacement
        renderX = (renderX + width) % width;
        renderY = (renderY + height) % height;

        // Dynamic Twinkling calculation (frequency & phase offset)
        star.twinklePhase += star.twinkleSpeed;
        const opacityModifier = (Math.sin(star.twinklePhase) + 1.0) / 2.0; // range 0 to 1
        const activeOpacity = star.maxOpacity * (0.35 + opacityModifier * 0.65);

        // Drawing stars using highly optimized pixel rendering or precise arcs
        ctx.beginPath();
        ctx.fillStyle = star.color + activeOpacity.toFixed(3) + ')';
        
        if (star.size < 0.9) {
          // Micro stars draw super fast as 1x1 rects
          ctx.fillRect(renderX, renderY, star.size, star.size);
        } else {
          ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Render optional elegant high-end diffraction spikes (diffraction lens flare)
          if (star.hasSpikes && activeOpacity > 0.6) {
            const spikeAlpha = (activeOpacity - 0.4) * 0.25;
            ctx.strokeStyle = star.color.substring(0, star.color.lastIndexOf(',') + 1) + ' ' + spikeAlpha.toFixed(3) + ')';
            ctx.lineWidth = 0.5;

            // Horizontal crosshair spike
            ctx.beginPath();
            ctx.moveTo(renderX - star.size * 3.5, renderY);
            ctx.lineTo(renderX + star.size * 3.5, renderY);
            ctx.stroke();

            // Vertical crosshair spike
            ctx.beginPath();
            ctx.moveTo(renderX, renderY - star.size * 3.5);
            ctx.lineTo(renderX, renderY + star.size * 3.5);
            ctx.stroke();
          }
        }
      }

      // 3. Render Floating Cosmic Dust & Constellation Links
      const maxDistance = 160;
      const actualMouseX = smoothMouse.x + width / 2;
      const actualMouseY = smoothMouse.y + height / 2;

      // Draw connection lines between nearby dust particles (Constellation plex)
      for (let i = 0; i < dustParticles.length; i++) {
        const dustA = dustParticles[i];
        const dustParallaxXA = smoothMouse.x * 0.12;
        const dustParallaxYA = smoothMouse.y * 0.12 + smoothScrollY * 0.12;
        const renderXA = (dustA.x + dustParallaxXA + width) % width;
        const renderYA = (dustA.y + dustParallaxYA + height) % height;

        for (let j = i + 1; j < dustParticles.length; j++) {
          const dustB = dustParticles[j];
          const dustParallaxXB = smoothMouse.x * 0.12;
          const dustParallaxYB = smoothMouse.y * 0.12 + smoothScrollY * 0.12;
          const renderXB = (dustB.x + dustParallaxXB + width) % width;
          const renderYB = (dustB.y + dustParallaxYB + height) % height;

          const dx = renderXA - renderXB;
          const dy = renderYA - renderYB;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Faint, elegant neon glowing connection links based on selected theme
            const alpha = (1 - dist / maxDistance) * 0.22;
            const linkColor = i % 2 === 0 ? primaryRgb : secondaryRgb;
            ctx.strokeStyle = `rgba(${linkColor}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(renderXA, renderYA);
            ctx.lineTo(renderXB, renderYB);
            ctx.stroke();
          }
        }

        // Draw interactive connection line to the mouse cursor
        if (hasMovedMouse) {
          const mdx = renderXA - actualMouseX;
          const mdy = renderYA - actualMouseY;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < 200) {
            const mAlpha = (1 - mouseDist / 200) * 0.35;
            const mouseLinkColor = secondaryRgb;
            ctx.strokeStyle = `rgba(${mouseLinkColor}, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(renderXA, renderYA);
            ctx.lineTo(actualMouseX, actualMouseY);
            ctx.stroke();
          }
        }
      }

      // Draw the actual dust node glowing points
      for (const dust of dustParticles) {
        dust.x += dust.vx;
        dust.y += dust.vy;

        // Wrap boundary
        if (dust.x < -10) dust.x = width + 10;
        if (dust.x > width + 10) dust.x = -10;
        if (dust.y < -10) dust.y = height + 10;
        if (dust.y > height + 10) dust.y = -10;

        dust.phase += dust.pulseSpeed;
        const dynamicOpacity = dust.opacity * (0.7 + Math.sin(dust.phase) * 0.3);

        // 3D Parallax offset for floating dust
        const dustParallaxX = smoothMouse.x * 0.12;
        const dustParallaxY = smoothMouse.y * 0.12 + smoothScrollY * 0.12;

        const renderX = (dust.x + dustParallaxX + width) % width;
        const renderY = (dust.y + dustParallaxY + height) % height;

        // Draw soft glowing electric neon node matching selected theme
        const dustGradient = ctx.createRadialGradient(
          renderX, renderY, 0,
          renderX, renderY, Math.max(0.1, dust.size * 1.5)
        );
        const nodeColor = dust.size > 2.5 ? `${secondaryRgb}, ` : `${primaryRgb}, `;
        dustGradient.addColorStop(0, `rgba(${nodeColor}${dynamicOpacity.toFixed(3)})`);
        dustGradient.addColorStop(0.5, `rgba(${nodeColor}${(dynamicOpacity * 0.4).toFixed(3)})`);
        dustGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = dustGradient;
        ctx.beginPath();
        ctx.arc(renderX, renderY, Math.max(0.1, dust.size * 3), 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Render Shooting Stars with beautiful fading tails
      for (const ss of shootingStars) {
        if (!ss.active) continue;

        // Move shooting star coordinates along diagonal velocity vector
        const prevX = ss.x;
        const prevY = ss.y;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        // Decay opacity as it streaks across space
        ss.opacity -= 0.012;

        if (ss.opacity <= 0 || ss.x < -100 || ss.x > width + 100 || ss.y < -100 || ss.y > height + 100) {
          ss.active = false;
          continue;
        }

        // Draw streak tail using linear gradient to look seamless
        const tailGradient = ctx.createLinearGradient(
          ss.x, ss.y,
          prevX - Math.cos(ss.angle) * ss.length,
          prevY - Math.sin(ss.angle) * ss.length
        );
        tailGradient.addColorStop(0, ss.color + ss.opacity.toFixed(3) + ')');
        tailGradient.addColorStop(0.3, ss.color + (ss.opacity * 0.6).toFixed(3) + ')');
        tailGradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = tailGradient;
        ctx.lineWidth = ss.thickness;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(prevX - Math.cos(ss.angle) * ss.length, prevY - Math.sin(ss.angle) * ss.length);
        ctx.stroke();
      }

      // 5. Draw a soft dark vignette/center overlay so that text remains ultra-legible
      const outerRadius = Math.max(10, Math.max(width, height) * 0.75);
      const centerOverlay = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, outerRadius
      );
      // Faint dark shade in the center to boost readability of white text, and clean dark edges
      centerOverlay.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      centerOverlay.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
      centerOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.45)');

      ctx.fillStyle = centerOverlay;
      ctx.fillRect(0, 0, width, height);

      // Loop frame
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(shootingStarInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor]);

  return (
    <canvas
      id="particles-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-black z-0 pointer-events-none"
    />
  );
}
