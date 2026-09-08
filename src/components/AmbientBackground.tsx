import React, { useMemo } from 'react';

interface AmbientBackgroundProps {
  isDayMode: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ isDayMode }) => {
  // Generate deterministic floating bokeh orbs and dust particles
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 17) % 100, // percentage
      y: (i * 23) % 100, // percentage
      size: 4 + ((i * 7) % 14), // px
      blur: 2 + ((i * 5) % 6), // px
      duration: 18 + ((i * 4) % 16), // seconds
      delay: -(i * 2.3), // seconds
      opacity: 0.12 + ((i * 3) % 15) / 100,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Large Floating Ambient Radial Glows */}
      <div
        className={`absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full blur-[160px] transition-all duration-1000 ${
          isDayMode
            ? 'bg-[#E6CA65]/15 opacity-80'
            : 'bg-[#D4AF37]/8 opacity-90'
        } animate-ambient-float-slow`}
      />

      <div
        className={`absolute top-1/2 -right-40 w-[700px] h-[700px] rounded-full blur-[180px] transition-all duration-1000 ${
          isDayMode
            ? 'bg-[#D4AF37]/10 opacity-70'
            : 'bg-[#996515]/10 opacity-80'
        } animate-ambient-float-reverse`}
      />

      <div
        className={`absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full blur-[170px] transition-all duration-1000 ${
          isDayMode
            ? 'bg-[#E6CA65]/12 opacity-60'
            : 'bg-[#D4AF37]/6 opacity-75'
        } animate-ambient-float-slow`}
      />

      {/* Subtle Floating Cinematic Dust & Bokeh Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: isDayMode ? '#C59B27' : '#E6CA65',
            opacity: isDayMode ? p.opacity * 0.9 : p.opacity,
            filter: `blur(${p.blur}px)`,
            boxShadow: isDayMode
              ? '0 0 12px rgba(197, 155, 39, 0.4)'
              : '0 0 16px rgba(212, 175, 55, 0.6)',
            animation: `ambientDrift ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
