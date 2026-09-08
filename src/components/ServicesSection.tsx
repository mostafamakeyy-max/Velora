import React, { useState } from 'react';
import { SERVICES_DATA, BRAND_INFO, ServiceItem } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { ArrowUpRight, Camera, Film, Sparkles, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  isArabic: boolean;
  onSelectServiceForBooking?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ isArabic, onSelectServiceForBooking }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="services" className="relative py-28 bg-[#050507] overflow-hidden">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#996515]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#E6CA65] text-xs font-semibold tracking-widest uppercase font-['Inter',_'Cairo']">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'منظومة الإنتاج المتكاملة' : 'Integrated Production Ecosystem'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {isArabic ? (
              <span className="font-['IBM_Plex_Sans_Arabic']">
                ٧ ركائز سينمائية لصناعة{' '}
                <span className="bg-gradient-to-r from-[#FFF8DC] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent">
                  حضور بصري استثنائي
                </span>
              </span>
            ) : (
              <span className="font-['Syne'] uppercase">
                7 Pillars for Exceptional{' '}
                <span className="bg-gradient-to-r from-[#FFF8DC] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent">
                  Visual Distinction
                </span>
              </span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#EDE8D0]/70 font-['Cairo',_'Inter'] leading-relaxed">
            {isArabic
              ? 'حلول إخراجية وتقنية متكاملة، تُنفّذ وفق أعلى المعايير العالمية من قلب الرياض، لصناعة محتوى بصري يليق بالعلامات والمشاريع الطموحة.'
              : 'End-to-end directorial and technical mastery executed to global standards from Riyadh, crafting cinematic narratives worthy of ambitious brands and monumental projects.'}
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const isWide = index === 0 || index === 3;
            const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
              isArabic ? service.whatsappPresetAr : service.whatsappPresetEn
            )}`;

            return (
              <div
                key={service.id}
                data-cursor="pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onMouseEnter={() => {
                  soundEngine.playMicroClick();
                  setActiveCardId(service.id);
                }}
                className={`group relative rounded-2xl overflow-hidden bg-[#0F0F14]/75 backdrop-blur-2xl border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s ease-out, border-color 0.3s ease',
                }}
              >
                {/* Specular Glint Spotlight on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl"
                  style={{
                    background:
                      'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 202, 101, 0.12), transparent 40%)',
                  }}
                />

                {/* Top Card Bar: Number & Category Emblem */}
                <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#D4AF37]/60 tracking-widest">
                    SPECTRUM // {service.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#E6CA65] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#050507] transition-all duration-300">
                    <Film className="w-4 h-4" />
                  </div>
                </div>

                {/* Background Image Preview with Silky Fade */}
                <div className="relative z-10 my-6 h-48 rounded-xl overflow-hidden border border-white/5">
                  <img
                    src={service.image}
                    alt={isArabic ? service.titleAr : service.titleEn}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      if (!el.src.includes('unsplash')) {
                        el.src = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85';
                      }
                    }}
                    className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-[#0F0F14]/40 to-transparent" />
                  
                  {/* Subtle tagline overlay on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs text-[#FFF8DC] font-medium font-['Cairo',_'Inter'] truncate drop-shadow">
                      {isArabic ? service.taglineAr : service.taglineEn}
                    </p>
                  </div>
                </div>

                {/* Service Title & Detailed Description */}
                <div className="relative z-10 space-y-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFF8DC] transition-colors font-['IBM_Plex_Sans_Arabic',_'Syne'] leading-snug">
                    {isArabic ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EDE8D0]/70 font-['Cairo',_'Inter'] leading-relaxed">
                    {isArabic ? service.descriptionAr : service.descriptionEn}
                  </p>
                </div>

                {/* Gear Badges */}
                <div className="relative z-10 mb-8">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37]/75 mb-2">
                    {isArabic ? 'عتاد ومواصفات الإنتاج:' : 'PRODUCTION SPECS & GEAR:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(isArabic ? service.gearBadgesAr : service.gearBadgesEn).map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2.5 py-1 rounded-md bg-[#050507] border border-[#D4AF37]/20 text-[11px] font-medium text-[#FFF8DC]/90 whitespace-nowrap"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA: Direct WhatsApp Pre-filled Hook */}
                <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playHapticShutter()}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#FFF8DC] hover:text-[#050507] border border-[#D4AF37]/35 hover:border-[#D4AF37] font-bold text-xs sm:text-sm transition-all duration-300 shadow-md group/btn"
                  >
                    <span className="font-['Cairo',_'Inter']">
                      {isArabic ? 'طلب هذه الخدمة عبر واتساب' : 'Book via WhatsApp'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>

                  {onSelectServiceForBooking && (
                    <button
                      onClick={() => {
                        soundEngine.playMicroClick();
                        onSelectServiceForBooking(isArabic ? service.titleAr : service.titleEn);
                        const bookingEl = document.querySelector('#booking');
                        if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-3 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 text-white/70 hover:text-white bg-[#050507]/60 transition-colors"
                      title={isArabic ? 'تضمين في نموذج الحجز' : 'Add to VIP Booking Form'}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
