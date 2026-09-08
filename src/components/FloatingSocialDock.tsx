import React from 'react';
import { BRAND_INFO } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { MessageCircle, Instagram, Sparkles, Mail } from 'lucide-react';

interface FloatingSocialDockProps {
  isArabic: boolean;
}

// Custom SVG icon for TikTok & Snapchat to guarantee exact luxury styling
const TikTokIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const SnapchatIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.89 15.35c-.44.25-.97.35-1.52.35-.49 0-.96-.08-1.37-.23-.27-.1-.58-.1-.85 0-.41.15-.88.23-1.37.23-.55 0-1.08-.1-1.52-.35-.37-.21-.83-.24-1.23-.09-.32.12-.66.24-1.03.24-.65 0-1.25-.43-1.46-1.04-.15-.43-.07-.91.22-1.26.17-.2.38-.36.6-.48.4-.22.68-.6.76-1.05.08-.45-.04-.91-.32-1.27-.64-.81-.97-1.81-.97-2.88 0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.07-.33 2.07-.97 2.88-.28.36-.4.82-.32 1.27.08.45.36.83.76 1.05.22.12.43.28.6.48.29.35.37.83.22 1.26-.21.61-.81 1.04-1.46 1.04-.37 0-.71-.12-1.03-.24-.4-.15-.86-.12-1.23.09z" />
  </svg>
);

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = ({ isArabic }) => {
  const socials = [
    {
      name: 'WhatsApp VIP Concierge',
      url: BRAND_INFO.socials.whatsapp,
      icon: MessageCircle,
      highlight: true,
      label: '+966 58 043 0494',
    },
    {
      name: 'Email Inquiries',
      url: `mailto:${BRAND_INFO.email}`,
      icon: Mail,
      highlight: false,
      label: BRAND_INFO.email,
    },
    {
      name: 'Instagram',
      url: BRAND_INFO.socials.instagram,
      icon: Instagram,
      highlight: false,
      label: '@veloramedia40',
    },
    {
      name: 'TikTok',
      url: BRAND_INFO.socials.tiktok,
      icon: TikTokIcon,
      highlight: false,
      label: '@velora6074',
    },
    {
      name: 'Snapchat',
      url: BRAND_INFO.socials.snapchat,
      icon: SnapchatIcon,
      highlight: false,
      label: 'Velora Production',
    },
  ];

  return (
    <aside
      id="floating-social-dock"
      aria-label="Social Media & Direct VIP Access"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-6 md:translate-x-0 z-40"
    >
      <div className="relative group">
        {/* Dock Container */}
        <div className="flex md:flex-col items-center gap-2 p-2 rounded-full bg-[#0F0F14]/85 backdrop-blur-2xl border border-[#D4AF37]/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playMicroClick()}
                className={`relative p-3 rounded-full transition-all duration-300 flex items-center justify-center group/btn ${
                  item.highlight
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] text-[#050507] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-110'
                    : 'text-[#EDE8D0]/80 hover:text-[#FFF8DC] hover:bg-[#D4AF37]/15 hover:scale-110'
                }`}
                aria-label={item.name}
              >
                <Icon className="w-4 h-4" />

                {/* Micro tooltip on desktop hover */}
                <span className="hidden md:group-hover/btn:block absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#0F0F14] border border-[#D4AF37]/40 text-xs text-[#FFF8DC] whitespace-nowrap shadow-2xl z-50 pointer-events-none animate-in fade-in slide-in-from-left-2">
                  <div className="font-semibold flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.highlight && <Sparkles className="w-3 h-3 text-[#E6CA65]" />}
                  </div>
                  <div className="text-[10px] text-[#EDE8D0]/60">{item.label}</div>
                </span>
              </a>
            );
          })}
        </div>

        {/* Global Production Journey Tooltip on Hover */}
        <div className="hidden lg:block absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="px-3 py-1 rounded-md bg-[#050507]/90 border border-[#D4AF37]/20 text-[10px] text-[#D4AF37]">
            {isArabic ? 'شاهد الكواليس والإنتاج الحي' : 'Follow Our Production Journey'}
          </div>
        </div>
      </div>
    </aside>
  );
};
