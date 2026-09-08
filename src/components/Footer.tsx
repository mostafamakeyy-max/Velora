import React from 'react';
import { VeloraLogo } from './VeloraLogo';
import { BRAND_INFO } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { ArrowUp, ShieldCheck, Mail, Phone, MessageCircle, Instagram } from 'lucide-react';

interface FooterProps {
  isArabic: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isArabic }) => {
  const scrollToTop = () => {
    soundEngine.playHapticShutter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] dark:bg-[#050507] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Giant Typographic Backdrop Watermark "VELORA" */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[18vw] font-black uppercase text-white/[0.02] select-none pointer-events-none tracking-[0.25em] font-['Syne'] whitespace-nowrap"
        aria-hidden="true"
      >
        VELORA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-4 lg:col-span-1">
            <VeloraLogo size="md" />
            <p className="text-xs sm:text-sm text-[#EDE8D0]/60 leading-relaxed font-['Cairo',_'Inter']">
              {isArabic
                ? 'دار إنتاج بصري سينمائي نُخبوي، متخصصة في الإعلانات الفاخرة، عقارات القصور، ودرون FPV في كافة أنحاء المملكة.'
                : 'Prestigious cinematic visual production powerhouse, specialized in luxury commercials, architectural estates, and FPV aerials across the Kingdom.'}
            </p>

            {/* Official KSA Commercial Registration Display */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F0F14] border border-[#D4AF37]/30 text-xs text-[#FFF8DC]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="font-mono">
                  <div className="text-[10px] text-[#D4AF37]/75">
                    {isArabic ? 'منشأة سعودية موثقة' : 'Verified Saudi Enterprise'}
                  </div>
                  <div className="font-bold text-xs">
                    {isArabic ? `السجل التجاري: ${BRAND_INFO.crNumber}` : `CR: ${BRAND_INFO.crNumber}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              {isArabic ? 'الملاحة السريعة' : 'NAVIGATION'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#EDE8D0]/70 font-['Cairo',_'Inter']">
              <li>
                <a
                  href="#portfolio"
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-[#FFF8DC] hover:translate-x-1 inline-block transition-transform"
                >
                  {isArabic ? 'معرض الأعمال السينمائية' : 'Cinematic Portfolio'}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-[#FFF8DC] hover:translate-x-1 inline-block transition-transform"
                >
                  {isArabic ? 'خدمات الإنتاج والعتاد' : 'Production Spectrum'}
                </a>
              </li>
              <li>
                <a
                  href="#color-grading"
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-[#FFF8DC] hover:translate-x-1 inline-block transition-transform"
                >
                  {isArabic ? 'مختبر الألوان DaVinci' : 'Color Grading Suite'}
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-[#FFF8DC] hover:translate-x-1 inline-block transition-transform"
                >
                  {isArabic ? 'طلب استشارة VIP' : 'VIP Consultation'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              {isArabic ? 'التواصل المباشر' : 'DIRECT INQUIRIES'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#EDE8D0]/70 font-['Cairo',_'Inter']">
              <div className="flex items-center gap-2 font-mono">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-[#FFF8DC] text-xs transition-colors"
                  dir="ltr"
                >
                  {BRAND_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-white"
                  dir="ltr"
                >
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={BRAND_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playMicroClick()}
                  className="hover:text-emerald-400 font-mono"
                  dir="ltr"
                >
                  WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Back to Top & Social Links */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
                {isArabic ? 'القنوات الرسمية' : 'OFFICIAL CHANNELS'}
              </h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  onClick={() => soundEngine.playMicroClick()}
                  className="p-2.5 rounded-lg bg-[#0F0F14] border border-white/10 text-white/70 hover:text-[#FFF8DC] hover:border-[#D4AF37] transition-all"
                  aria-label="Email"
                  title={BRAND_INFO.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playMicroClick()}
                  className="p-2.5 rounded-lg bg-[#0F0F14] border border-white/10 text-white/70 hover:text-[#FFF8DC] hover:border-[#D4AF37] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playMicroClick()}
                  className="p-2.5 rounded-lg bg-[#0F0F14] border border-white/10 text-white/70 hover:text-emerald-400 hover:border-emerald-400 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Magnetic Back to Top Button */}
            <div>
              <button
                onClick={scrollToTop}
                data-cursor="pointer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F0F14] border border-[#D4AF37]/30 text-xs font-bold text-[#FFF8DC] hover:bg-[#D4AF37] hover:text-[#050507] hover:border-[#D4AF37] transition-all shadow-md group"
              >
                <span>{isArabic ? 'العودة للأعلى' : 'Back to Top'}</span>
                <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE8D0]/40 font-mono">
          <div>
            © {new Date().getFullYear()} {isArabic ? BRAND_INFO.nameAr : BRAND_INFO.nameEn}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Kingdom of Saudi Arabia</span>
            <span>•</span>
            <span>DaVinci Resolve Studio & ACES Color</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
