import React, { useEffect, useState, useRef } from 'react';

export type CursorMode = 'default' | 'video' | 'photo' | 'slider' | 'pointer';

interface CustomCursorProps {
  isArabic: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isArabic }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if touch device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Contextual detection from data attributes or classes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        setCursorMode(mode || 'default');
      } else if (target.closest('button, a, input, select, textarea')) {
        setCursorMode('pointer');
      } else {
        setCursorMode('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  // Smooth lerp trailing outer ring
  useEffect(() => {
    if (isTouch) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const followLoop = () => {
      setCursorPos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.22),
        y: lerp(prev.y, targetPos.y, 0.22),
      }));
      animFrameRef.current = requestAnimationFrame(followLoop);
    };

    animFrameRef.current = requestAnimationFrame(followLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetPos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Inner sharp golden pinpoint */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FFF8DC] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_8px_#D4AF37]"
        style={{
          transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Dynamic Contextual Outer Shell */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center text-center select-none"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorMode === 'default' && (
          <div className="w-9 h-9 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/5 backdrop-blur-[1px] shadow-[0_0_15px_rgba(212,175,55,0.15)]" />
        )}

        {cursorMode === 'pointer' && (
          <div className="w-12 h-12 rounded-full border border-[#FFF8DC]/70 bg-[#D4AF37]/15 scale-110 shadow-[0_0_20px_rgba(212,175,55,0.35)]" />
        )}

        {cursorMode === 'video' && (
          <div className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#050507] font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.6)] flex items-center gap-1.5 whitespace-nowrap animate-pulse">
            <span>{isArabic ? 'تشغيل الشوريل' : 'PLAY REEL'}</span>
            <span className="text-[10px]">▶</span>
          </div>
        )}

        {cursorMode === 'photo' && (
          <div className="px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-[#050507] font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.6)] flex items-center gap-1 whitespace-nowrap">
            <span>{isArabic ? 'تكبير' : 'ZOOM'}</span>
            <span className="text-xs">🔍</span>
          </div>
        )}

        {cursorMode === 'slider' && (
          <div className="px-3 py-1.5 rounded-full bg-[#E6CA65] text-[#050507] font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(230,202,101,0.7)] flex items-center gap-1 whitespace-nowrap">
            <span>{isArabic ? 'اسحب للمقارنة' : 'DRAG'}</span>
            <span className="text-xs">↔</span>
          </div>
        )}
      </div>
    </>
  );
};
