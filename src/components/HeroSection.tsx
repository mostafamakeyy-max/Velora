import React from 'react';
import { Play, MessageCircle, Sparkles, ChevronDown, Award } from 'lucide-react';
import { BRAND_INFO, CLIENT_PARTNERS } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';

interface HeroSectionProps {
  isArabic: boolean;
  onOpenShowreel: () => void;
  isDayMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isArabic, onOpenShowreel, isDayMode = false }) => {
  const whatsappHeroUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
    isArabic
      ? 'مرحباً، أود بدء محادثة فورية مع فريق إنتاج ڤيلورا لبحث تفاصيل مشروع سينمائي جديد.'
      : 'Hello Velora team, I would like to initiate an inquiry regarding a new cinematic production.'
  )}`;

  return (
    <section className={`relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden transition-colors duration-500 ${
      isDayMode ? 'bg-[#F8F6F0] text-[#18181B]' : 'bg-[#050507] text-[#EDE8D0]'
    }`}>
      {/* Background Video Reel with Silky Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80"
          className={`w-full h-full object-cover scale-105 filter brightness-75 contrast-125 transition-all duration-1000 ${
            isDayMode ? 'opacity-20 mix-blend-multiply' : 'opacity-35'
          }`}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-traffic-interchange-in-a-city-at-night-42294-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Golden Ambient Radial Glow behind central headline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-[#D4AF37]/18 via-[#996515]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Silky Vignette & Matrix Gradients */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDayMode
              ? 'bg-gradient-to-t from-[#F8F6F0] via-[#F8F6F0]/65 to-[#F8F6F0]/85'
              : 'bg-gradient-to-t from-[#050507] via-[#050507]/60 to-[#050507]/90'
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDayMode
              ? 'radial-gradient(circle at center, transparent 30%, #F8F6F0 85%)'
              : 'radial-gradient(circle at center, transparent 30%, #050507 85%)',
          }}
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center flex flex-col items-center">
        
        {/* Live Floating Status Pill */}
        <div
          data-cursor="pointer"
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-xl border shadow-lg mb-8 transition-transform hover:scale-105 ${
            isDayMode
              ? 'bg-white/85 border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
              : 'bg-[#0F0F14]/80 border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]"></span>
          </span>
          <span className={`text-xs sm:text-sm font-medium tracking-wide font-['Cairo',_'Inter'] ${
            isDayMode ? 'text-[#18181B]' : 'text-[#EDE8D0]/90'
          }`}>
            {isArabic
              ? 'متاحون لحجوزات المشاريع الكبرى في المملكة'
              : 'Available for KSA Flagship Commissions'}
          </span>
        </div>

        {/* Central Display Headline with Metallic Shimmer */}
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] ${
            isDayMode ? 'text-[#18181B]' : 'text-white'
          }`}>
            {isArabic ? (
              <span className="font-['IBM_Plex_Sans_Arabic'] block">
                نبتكر بعداً بصرياً{' '}
                <span className="bg-gradient-to-r from-[#B38F28] via-[#D4AF37] to-[#996515] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
                  يُخلّد علامتك
                </span>
              </span>
            ) : (
              <span className="font-['Syne'] uppercase block">
                We Architect{' '}
                <span className="bg-gradient-to-r from-[#B38F28] via-[#D4AF37] to-[#996515] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
                  Cinematic Legacies
                </span>
              </span>
            )}
          </h1>

          {/* High-Status Positioning Hook Statement */}
          <p className={`max-w-3xl mx-auto text-base sm:text-lg lg:text-xl font-normal leading-relaxed font-['Cairo',_'Inter'] pt-2 ${
            isDayMode ? 'text-[#3F3F46]' : 'text-[#EDE8D0]/80'
          }`}>
            {isArabic ? BRAND_INFO.positioningHook.ar : BRAND_INFO.positioningHook.en}
          </p>
        </div>

        {/* Primary Magnetic CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
          {/* Primary CTA: Watch Showreel */}
          <button
            id="watch-showreel-cta"
            data-cursor="video"
            onClick={() => {
              soundEngine.playHapticShutter();
              onOpenShowreel();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#C59B27] text-[#050507] font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-full bg-[#050507] text-[#D4AF37] flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span className="font-['Cairo',_'Inter'] font-extrabold">
              {isArabic ? 'مشاهدة الشوريل السينمائي' : 'Watch Official Showreel'}
            </span>
          </button>

          {/* Secondary CTA: Fast WhatsApp Inquiry */}
          <a
            id="fast-whatsapp-cta"
            data-cursor="pointer"
            href={whatsappHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playMicroClick()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0F0F14]/80 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#FFF8DC] font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 backdrop-blur-xl hover:border-[#D4AF37]/70 hover:scale-105 active:scale-95 group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-['Cairo',_'Inter']">
              {isArabic ? 'ابدأ محادثة واتساب فورية' : 'Fast WhatsApp Inquiry'}
            </span>
          </a>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs tracking-wider text-[#D4AF37]/70 font-mono uppercase">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>{isArabic ? 'إنتاج سينمائي بدقة FHD / 4K / HDR' : 'FHD / 4K / HDR CINEMA'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>{isArabic ? 'سجل تجاري سعودي موثق' : 'VERIFIED SAUDI CR: 7054945295'}</span>
          </div>
        </div>
      </div>

      {/* Client Partners Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#EDE8D0]/40 font-['Cairo',_'Inter']">
            {isArabic ? 'ثقة كبرى العلامات والجهات الاستثنائية' : 'Trusted by Prominent National & Luxury Brands'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-65 hover:opacity-100 transition-opacity">
            {CLIENT_PARTNERS.map((client) => (
              <span
                key={client.name}
                className="text-xs sm:text-sm font-['Syne',_'Cairo'] font-bold tracking-widest text-[#EDE8D0]/60 hover:text-[#D4AF37] transition-colors cursor-default"
              >
                {client.logoText}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center pointer-events-none opacity-40 animate-bounce">
        <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
      </div>
    </section>
  );
};
