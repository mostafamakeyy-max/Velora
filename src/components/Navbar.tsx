import React, { useState, useEffect } from 'react';
import { VeloraLogo } from './VeloraLogo';
import { soundEngine } from '../utils/audioEngine';
import { BRAND_INFO } from '../data/contentData';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isArabic: boolean;
  onToggleLanguage: () => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
  isDayMode: boolean;
  onToggleLighting: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isArabic,
  onToggleLanguage,
  audioPlaying,
  onToggleAudio,
  isDayMode,
  onToggleLighting,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', labelAr: 'معرض الأعمال', labelEn: 'Portfolio' },
    { href: '#services', labelAr: 'خدماتنا السينمائية', labelEn: 'Services' },
    { href: '#color-grading', labelAr: 'معمل الألوان', labelEn: 'Color Suite' },
    { href: '#booking', labelAr: 'طلب مشروع VIP', labelEn: 'VIP Inquiries' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    soundEngine.playMicroClick();
    if (mobileMenuOpen) setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="velora-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDayMode
            ? 'py-3.5 bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#D4AF37]/25 shadow-[0_10px_30px_rgba(212,175,55,0.12)]'
            : 'py-3.5 bg-[#050507]/85 backdrop-blur-2xl border-b border-[#D4AF37]/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : isDayMode
          ? 'py-6 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/40 to-transparent'
          : 'py-6 bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Insignia & Typographic Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group outline-none"
            aria-label="Velora Studio Home"
          >
            <VeloraLogo size="sm" />
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-1.5 lg:gap-3 backdrop-blur-xl border px-5 py-2 rounded-full transition-colors duration-500 ${
              isDayMode
                ? 'bg-white/80 border-[#D4AF37]/25 shadow-[0_4px_20px_rgba(212,175,55,0.15)] text-[#1A1A1E]'
                : 'bg-[#0F0F14]/70 border-[#D4AF37]/15 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-[#EDE8D0]/80'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-300 relative group rounded-full ${
                  isDayMode
                    ? 'text-[#2C2C32] hover:text-[#996515]'
                    : 'text-[#EDE8D0]/80 hover:text-[#FFF8DC]'
                }`}
              >
                <span className="relative z-10 font-['Cairo',_'Inter'] tracking-wide font-semibold">
                  {isArabic ? link.labelAr : link.labelEn}
                </span>
                <span className="absolute inset-0 rounded-full bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#E6CA65] to-transparent group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right: Lighting Mode Toggle + Audio Equalizer + Language Switcher + VIP WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Lighting Mode Switcher (Day / Night) */}
            <button
              id="lighting-mode-toggle"
              onClick={() => {
                soundEngine.playMicroClick();
                onToggleLighting();
              }}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
                isDayMode
                  ? 'border-[#D4AF37]/40 bg-white/90 text-[#996515] hover:bg-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'border-[#D4AF37]/30 bg-[#0F0F14]/80 text-[#E6CA65] hover:text-[#FFF8DC] hover:border-[#D4AF37]'
              }`}
              aria-label={
                isDayMode
                  ? isArabic ? 'التحويل للوضع الليلي السينمائي' : 'Switch to Night Cinema Mode'
                  : isArabic ? 'التحويل للوضع النهاري الفاخر' : 'Switch to Luxury Day Mode'
              }
              title={
                isDayMode
                  ? isArabic ? 'الوضع النهاري الفاخر (انقر للوضع الليلي)' : 'Luxury Day Mode (Click for Night)'
                  : isArabic ? 'الوضع الليلي السينمائي (انقر للوضع النهاري)' : 'Night Cinema Mode (Click for Day)'
              }
            >
              {isDayMode ? (
                <Sun className="w-4 h-4 animate-[spin_12s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 fill-current text-[#D4AF37]" />
              )}
            </button>

            {/* Audio Equalizer Widget */}
            <div className="relative group">
              <button
                id="audio-equalizer-toggle"
                onClick={() => {
                  soundEngine.playMicroClick();
                  onToggleAudio();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                  audioPlaying
                    ? 'border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : isDayMode
                    ? 'border-black/10 bg-white/70 text-[#2C2C32] hover:border-[#D4AF37]'
                    : 'border-white/10 bg-[#0F0F14]/60 text-white/60 hover:text-white/90 hover:border-white/20'
                }`}
                aria-label={isArabic ? 'تشغيل/كتم الصوت الهادئ' : 'Toggle calming sound'}
                title={isArabic ? 'صوت هادئ ومريح للأعصاب | Relaxing Sound' : 'Tranquil Ambient Experience'}
              >
                {/* 4-Bar Equalizer visualizer */}
                <div className="flex items-end gap-[3px] h-3.5 w-4" aria-hidden="true">
                  <span
                    className={`w-[2.5px] rounded-full bg-gradient-to-t from-[#D4AF37] to-[#E6CA65] transition-all duration-300 ${
                      audioPlaying ? 'animate-[soundWave_1.1s_ease-in-out_infinite]' : 'h-1.5 opacity-40'
                    }`}
                  />
                  <span
                    className={`w-[2.5px] rounded-full bg-gradient-to-t from-[#D4AF37] to-[#E6CA65] transition-all duration-300 ${
                      audioPlaying ? 'animate-[soundWave_0.9s_ease-in-out_0.2s_infinite]' : 'h-2.5 opacity-40'
                    }`}
                  />
                  <span
                    className={`w-[2.5px] rounded-full bg-gradient-to-t from-[#D4AF37] to-[#E6CA65] transition-all duration-300 ${
                      audioPlaying ? 'animate-[soundWave_1.3s_ease-in-out_0.4s_infinite]' : 'h-1 opacity-40'
                    }`}
                  />
                  <span
                    className={`w-[2.5px] rounded-full bg-gradient-to-t from-[#D4AF37] to-[#E6CA65] transition-all duration-300 ${
                      audioPlaying ? 'animate-[soundWave_0.8s_ease-in-out_0.1s_infinite]' : 'h-2 opacity-40'
                    }`}
                  />
                </div>

                <span className="hidden xl:inline text-[11px] font-mono uppercase tracking-wider font-bold">
                  {audioPlaying ? (isArabic ? 'بيانو هادئ' : 'CALM PIANO') : (isArabic ? 'مكتوم' : 'MUTED')}
                </span>
              </button>

              {/* Tooltip */}
              <div
                className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap border text-[10px] px-2.5 py-1 rounded shadow-xl ${
                  isDayMode
                    ? 'bg-white border-[#D4AF37]/30 text-[#18181B]'
                    : 'bg-[#0F0F14] border-[#D4AF37]/30 text-[#EDE8D0]'
                }`}
              >
                {isArabic ? 'موسيقى بيانو هادئة جداً ومريحة للأعصاب | Relaxing Piano' : 'Ultra-Calm Ambient Piano'}
              </div>
            </div>

            {/* Language Switcher Button */}
            <button
              id="language-switcher-btn"
              onClick={() => {
                soundEngine.playMicroClick();
                onToggleLanguage();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
                isDayMode
                  ? 'border-[#D4AF37]/30 bg-white/80 text-[#18181B] hover:bg-[#D4AF37]/15'
                  : 'border-[#D4AF37]/25 bg-[#0F0F14]/70 text-[#EDE8D0] hover:bg-[#D4AF37]/15 hover:text-[#FFF8DC]'
              }`}
              aria-label="Toggle language between Arabic and English"
            >
              <span className={isArabic ? 'text-[#D4AF37] font-bold' : isDayMode ? 'text-black/50' : 'text-white/60'}>عربي</span>
              <span className="text-[#D4AF37]/30 text-xs">/</span>
              <span className={!isArabic ? 'text-[#D4AF37] font-bold' : isDayMode ? 'text-black/50' : 'text-white/60'}>EN</span>
            </button>

            {/* Book VIP Project Button (Direct WhatsApp) */}
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
                isArabic
                  ? 'مرحباً ڤيلورا، أود حجز استشارة لإنتاج مشروع بصري سينمائي.'
                  : 'Hello Velora, I would like to book a VIP consultation for a cinematic production.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playHapticShutter()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#D4AF37] hover:from-[#FFF8DC] hover:to-[#E6CA65] text-[#050507] font-bold text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] group"
            >
              <span className="font-['Cairo',_'Inter'] font-bold">
                {isArabic ? 'احجز مشروعك VIP' : 'Book VIP Project'}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundEngine.playMicroClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`md:hidden p-2 rounded-lg border ${
                isDayMode
                  ? 'border-[#D4AF37]/30 text-[#18181B]'
                  : 'border-[#D4AF37]/20 text-[#EDE8D0]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-4 p-5 rounded-2xl border backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200 ${
              isDayMode
                ? 'bg-[#F9F8F3]/95 border-[#D4AF37]/35 text-[#18181B]'
                : 'bg-[#0B0B10]/95 border-[#D4AF37]/25 text-[#EDE8D0]'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2.5 text-sm font-medium hover:text-[#D4AF37] border-b border-black/5 dark:border-white/5 flex items-center justify-between"
              >
                <span>{isArabic ? link.labelAr : link.labelEn}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            ))}
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
                isArabic
                  ? 'مرحباً ڤيلورا، أود حجز استشارة لإنتاج مشروع بصري سينمائي.'
                  : 'Hello Velora, I would like to book a VIP consultation for a cinematic production.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] text-[#050507] font-bold text-center text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              {isArabic ? 'احجز استشارتك عبر واتساب' : 'Book VIP WhatsApp Consultation'}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
