import React from 'react';

interface VeloraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showWordmark?: boolean;
}

export const VeloraLogo: React.FC<VeloraLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    hero: 'w-20 h-20 md:w-28 md:h-28'
  }[size];

  const textSizes = {
    sm: 'text-sm tracking-[0.25em]',
    md: 'text-base tracking-[0.28em]',
    lg: 'text-xl tracking-[0.3em]',
    hero: 'text-2xl md:text-3xl tracking-[0.35em]'
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* <!-- REPLACE WITH SVG / BRAND LOGO HERE --> */}
      <div className={`relative ${iconDimensions} shrink-0 aspect-square flex items-center justify-center`}>
        {/* Ambient golden glow behind insignia */}
        <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
        
        {/* Luxury Gold Aperture Emblem SVG (Matching Official Brand Identity) */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="30%" stopColor="#E6CA65" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            <linearGradient id="goldVGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="25%" stopColor="#E6CA65" />
              <stop offset="80%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#8A5A12" />
            </linearGradient>

            <linearGradient id="goldVGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5DC88" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#996515" />
              <stop offset="100%" stopColor="#5E3B09" />
            </linearGradient>

            <linearGradient id="shutterGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#784E10" />
            </linearGradient>
          </defs>

          {/* Outer Thin Metallic Ring */}
          <circle
            cx="60"
            cy="60"
            r="57"
            stroke="url(#goldRimGrad)"
            strokeWidth="2.5"
            className="drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]"
          />

          {/* Inner Depth Rim */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Camera Aperture / Shutter Iris in lower intersection */}
          <g transform="translate(60, 71) scale(0.65)" className="transition-transform duration-700 group-hover:rotate-45">
            <circle cx="0" cy="0" r="21" fill="#09090D" stroke="url(#goldRimGrad)" strokeWidth="1.5" />
            {/* Shutter blades */}
            <path d="M -18 0 A 18 18 0 0 1 0 -18 L 0 -8 A 8 8 0 0 0 -8 0 Z" fill="url(#shutterGold)" opacity="0.9" />
            <path d="M 0 -18 A 18 18 0 0 1 18 0 L 8 0 A 8 8 0 0 0 0 -8 Z" fill="url(#shutterGold)" opacity="0.85" />
            <path d="M 18 0 A 18 18 0 0 1 0 18 L 0 8 A 8 8 0 0 0 8 0 Z" fill="url(#shutterGold)" opacity="0.9" />
            <path d="M 0 18 A 18 18 0 0 1 -18 0 L -8 0 A 8 8 0 0 0 0 8 Z" fill="url(#shutterGold)" opacity="0.8" />
            {/* Central aperture hole */}
            <circle cx="0" cy="0" r="7" fill="#050507" />
          </g>

          {/* Bold Architectural 'V' Left Wing */}
          <polygon
            points="23,32 37,32 57,86 49,86"
            fill="url(#goldVGradLeft)"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />

          {/* Bold Architectural 'V' Right Wing */}
          <polygon
            points="97,32 83,32 55,86 63,86"
            fill="url(#goldVGradRight)"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />

          {/* Sharp Bevel highlight line on Left V */}
          <line
            x1="36"
            y1="33"
            x2="56"
            y2="85"
            stroke="#FFF8DC"
            strokeWidth="0.75"
            strokeOpacity="0.8"
          />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          {/* Main Metallic Wordmark */}
          <div className="flex items-center gap-2">
            <span
              className={`font-['Syne'] font-extrabold uppercase bg-gradient-to-r from-[#FFF8DC] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)] ${textSizes}`}
            >
              VELORA
            </span>
            <span className="text-[#D4AF37]/40 font-light text-sm">|</span>
            <span
              className="font-['IBM_Plex_Sans_Arabic'] font-bold text-transparent bg-gradient-to-l from-[#FFF8DC] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-base md:text-lg tracking-wider"
              dir="rtl"
            >
              ڤيلورا
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]/75 mt-1 font-['Inter']">
            Cinematic Production
          </span>
        </div>
      )}
    </div>
  );
};
