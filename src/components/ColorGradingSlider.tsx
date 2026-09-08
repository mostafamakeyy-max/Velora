import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLOR_GRADING_COMPARISON } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { Sliders, Sparkles, Eye, Film } from 'lucide-react';

interface ColorGradingSliderProps {
  isArabic: boolean;
}

export const ColorGradingSlider: React.FC<ColorGradingSliderProps> = ({ isArabic }) => {
  const [sliderPos, setSliderPos] = useState(50); // Percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    soundEngine.playMicroClick();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="color-grading" className="relative py-28 bg-[#0B0B10] overflow-hidden border-t border-b border-white/5">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#E6CA65] text-xs font-semibold tracking-widest uppercase font-mono">
            <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>DAVINCI RESOLVE STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['IBM_Plex_Sans_Arabic',_'Syne']">
            {isArabic ? COLOR_GRADING_COMPARISON.titleAr : COLOR_GRADING_COMPARISON.titleEn}
          </h2>

          <p className="text-sm sm:text-base text-[#EDE8D0]/75 font-['Cairo',_'Inter'] leading-relaxed max-w-2xl mx-auto">
            {isArabic ? COLOR_GRADING_COMPARISON.subtitleAr : COLOR_GRADING_COMPARISON.subtitleEn}
          </p>
        </div>

        {/* Interactive Split-Screen Stage */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            data-cursor="slider"
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="relative h-[360px] sm:h-[500px] md:h-[580px] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] select-none cursor-ew-resize bg-[#050507]"
          >
            {/* UNDER LAYER: Right Side (Velora Signature Gold Color Grade) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={COLOR_GRADING_COMPARISON.imageSrc}
                alt="Velora Golden Master Color Grade"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (!el.src.includes('1518709268805')) {
                    el.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85';
                  }
                }}
                className="w-full h-full object-cover filter contrast-125 saturate-125 brightness-95"
                style={{
                  filter: 'contrast(1.22) saturate(1.28) brightness(1.02) sepia(0.12) hue-rotate(-5deg)',
                }}
              />

              {/* Gold Grade Watermark Badge */}
              <div className="absolute top-6 right-6 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-[#050507]/85 border border-[#D4AF37]/60 text-[#FFF8DC] text-xs font-bold font-mono tracking-wider shadow-xl flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
                  <span>{isArabic ? COLOR_GRADING_COMPARISON.badgeGradeAr : COLOR_GRADING_COMPARISON.badgeGradeEn}</span>
                </div>
              </div>
            </div>

            {/* OVER LAYER: Left Side (RAW Log Flat Sensor Data) clipped by slider percentage */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden z-10"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="relative h-full"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw',
                }}
              >
                <img
                  src={COLOR_GRADING_COMPARISON.imageSrc}
                  alt="Raw Log Sensor Footage"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    if (!el.src.includes('1518709268805')) {
                      el.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85';
                    }
                  }}
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'contrast(0.68) saturate(0.55) brightness(1.18) grayscale(0.2)',
                  }}
                />

                {/* RAW LOG Watermark Badge */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#050507]/85 border border-white/20 text-[#EDE8D0]/80 text-xs font-bold font-mono tracking-wider shadow-xl flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-white/50" />
                    <span>{isArabic ? COLOR_GRADING_COMPARISON.badgeRawAr : COLOR_GRADING_COMPARISON.badgeRawEn}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider Line & Golden Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none -translate-x-1/2 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical Laser Divider */}
              <div className="w-[2px] h-full bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#FFF8DC] shadow-[0_0_12px_#D4AF37]" />

              {/* Central Metallic Controller Disc */}
              <div className="absolute w-11 h-11 rounded-full bg-[#0F0F14] border-2 border-[#FFF8DC] shadow-[0_0_20px_rgba(212,175,55,0.8)] flex items-center justify-center text-[#D4AF37] pointer-events-auto">
                <div className="flex items-center gap-0.5 text-xs font-bold">
                  <span>◀</span>
                  <span>▶</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Legend / Tip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-1.5 rounded-full bg-[#050507]/80 backdrop-blur-md border border-white/10 text-[11px] text-[#EDE8D0]/70 font-mono tracking-wider flex items-center gap-2">
                <Eye className="w-3 h-3 text-[#D4AF37]" />
                <span>{isArabic ? 'اسحب المقبض يميناً ويساراً لمشاهدة التحول' : 'Drag slider left/right to reveal the grade'}</span>
              </div>
            </div>
          </div>

          {/* Technical Specs Footer Strip */}
          <div className="mt-5 p-4 rounded-xl bg-[#0F0F14]/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EDE8D0]/60 font-mono">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Film className="w-4 h-4" />
              <span>{COLOR_GRADING_COMPARISON.cameraLabel}</span>
            </div>
            <div className="text-center sm:text-right">
              {isArabic ? COLOR_GRADING_COMPARISON.gradingSpecsAr : COLOR_GRADING_COMPARISON.gradingSpecsEn}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
