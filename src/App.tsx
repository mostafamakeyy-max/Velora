import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ColorGradingSlider } from './components/ColorGradingSlider';
import { PortfolioSection } from './components/PortfolioSection';
import { CinemaModal } from './components/CinemaModal';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { FloatingSocialDock } from './components/FloatingSocialDock';
import { CustomCursor } from './components/CustomCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { PortfolioItem, PORTFOLIO_DATA } from './data/contentData';
import { soundEngine } from './utils/audioEngine';

export default function App() {
  const [isArabic, setIsArabic] = useState(true);
  const [isDayMode, setIsDayMode] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch {
      // safe fallback if Lenis fails in headless
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  // Update HTML document dir and lang attributes on language change
  useEffect(() => {
    const root = document.documentElement;
    if (isArabic) {
      root.setAttribute('lang', 'ar');
      root.setAttribute('dir', 'rtl');
      document.title = 'Velora | ڤيلورا للإنتاج المرئي السينمائي';
    } else {
      root.setAttribute('lang', 'en');
      root.setAttribute('dir', 'ltr');
      document.title = 'Velora | Luxury Cinematic Production';
    }
  }, [isArabic]);

  // Update HTML class for Day Mode vs Night Mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDayMode) {
      root.classList.add('day-mode');
    } else {
      root.classList.remove('day-mode');
    }
  }, [isDayMode]);

  // Subscribe to audio engine state
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setAudioPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleAudio = async () => {
    await soundEngine.toggleAudio();
  };

  const handleToggleLanguage = () => {
    setIsArabic((prev) => !prev);
  };

  const handleToggleLighting = () => {
    setIsDayMode((prev) => !prev);
  };

  // Open 2026 Showreel modal
  const handleOpenShowreel = () => {
    // Open project 1 (official commercial showreel)
    const showreel = PORTFOLIO_DATA[0];
    setActiveModalItem(showreel);
  };

  const handleOpenProject = (item: PortfolioItem) => {
    setActiveModalItem(item);
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`relative min-h-screen transition-colors duration-500 ${
        isDayMode
          ? 'bg-[#F8F6F0] text-[#1A1A1E] selection:bg-[#D4AF37]/40 selection:text-[#050507]'
          : 'bg-[#050507] text-[#EDE8D0] selection:bg-[#D4AF37]/30 selection:text-[#FFF8DC]'
      }`}
    >
      {/* 35mm Analog Cinema Film Grain Overlay */}
      <div className="cinema-grain-overlay" aria-hidden="true" />

      {/* Subtle Ambient Background Animation (Floating Light Bokeh & Cinematic Dust) */}
      <AmbientBackground isDayMode={isDayMode} />

      {/* Custom Dynamic Magnetic Cursor */}
      <CustomCursor isArabic={isArabic} />

      {/* Floating Glass Navigation Bar with Lighting Mode & Sound Controls */}
      <Navbar
        isArabic={isArabic}
        onToggleLanguage={handleToggleLanguage}
        audioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
        isDayMode={isDayMode}
        onToggleLighting={handleToggleLighting}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section B: Hero Section */}
        <HeroSection
          isArabic={isArabic}
          onOpenShowreel={handleOpenShowreel}
          isDayMode={isDayMode}
        />

        {/* Section D: The 7 Core Production Spectrum */}
        <ServicesSection
          isArabic={isArabic}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Section E: Interactive Color Grading Slider */}
        <ColorGradingSlider isArabic={isArabic} />

        {/* Section F: The Media Portfolio */}
        <PortfolioSection
          isArabic={isArabic}
          onOpenProject={handleOpenProject}
        />

        {/* Section G: VIP Project Inquiry & Booking Form (Service Booking Only, No Price List) */}
        <BookingSection
          isArabic={isArabic}
          preselectedService={preselectedService}
        />
      </main>

      {/* Section C: Floating Social & VIP External Dock */}
      <FloatingSocialDock isArabic={isArabic} />

      {/* Section H: Luxury Minimalist Footer with Verified CR */}
      <Footer isArabic={isArabic} />

      {/* Cinema Modal & Lightbox */}
      <CinemaModal
        item={activeModalItem}
        onClose={handleCloseModal}
        isArabic={isArabic}
      />
    </div>
  );
}
