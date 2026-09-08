import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, PortfolioItem } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { getCustomProjects, deleteCustomProject } from '../utils/mediaStore';
import { UploadMediaModal } from './UploadMediaModal';
import { Play, Eye, Film, Camera, Sparkles, MapPin, Award, Layers, Plus, Upload, Trash2 } from 'lucide-react';

const FALLBACK_IMAGE = "/assets/coffee/IMG_9546.svg";

interface PortfolioSectionProps {
  isArabic: boolean;
  onOpenProject: (item: PortfolioItem) => void;
}

type FilterCategory = 'all' | 'cinematic' | 'photography' | 'real_estate' | 'food' | 'ai_art';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ isArabic, onOpenProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [customProjects, setCustomProjects] = useState<PortfolioItem[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Load custom user-created projects from IndexedDB / localStorage
  const loadCustomProjects = async () => {
    try {
      const items = await getCustomProjects();
      setCustomProjects(items);
    } catch (e) {
      console.warn('Failed loading custom projects:', e);
    }
  };

  useEffect(() => {
    loadCustomProjects();
  }, []);

  const handleProjectCreated = (newProject: PortfolioItem) => {
    setCustomProjects((prev) => [newProject, ...prev]);
    soundEngine.playHapticShutter();
  };

  const handleDeleteCustomProject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEngine.playMicroClick();
    if (window.confirm(isArabic ? 'هل تريد بالتأكيد حذف هذا العمل المرفوع؟' : 'Are you sure you want to delete this custom project?')) {
      await deleteCustomProject(id);
      setCustomProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const getPoster = (item: PortfolioItem): string => {
    try {
      const stored = localStorage.getItem(`velora_custom_gallery_${item.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
          return parsed[0];
        }
      }
    } catch (e) {}
    return item.poster || FALLBACK_IMAGE;
  };

  const getGalleryCount = (item: PortfolioItem): number => {
    try {
      const stored = localStorage.getItem(`velora_custom_gallery_${item.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.length;
        }
      }
    } catch (e) {}
    return item.gallery ? item.gallery.length : 1;
  };

  const filters = [
    { id: 'all' as FilterCategory, labelAr: 'الكل', labelEn: 'All Projects' },
    { id: 'cinematic' as FilterCategory, labelAr: 'فيديو سينمائي', labelEn: 'Cinematic Films' },
    { id: 'photography' as FilterCategory, labelAr: 'فوتوغرافي فاخر', labelEn: 'Luxury Photography' },
    { id: 'real_estate' as FilterCategory, labelAr: 'عقارات وقصور', labelEn: 'Real Estate & Architecture' },
    { id: 'food' as FilterCategory, labelAr: 'مطاعم وكافيهات', labelEn: 'Food & Beverage' },
    { id: 'ai_art' as FilterCategory, labelAr: 'إبداع الذكاء الاصطناعي', labelEn: 'AI Concept Art' },
  ];

  // Merge custom user projects at the top of the portfolio data
  const combinedProjects = [...customProjects, ...PORTFOLIO_DATA];

  const filteredProjects = combinedProjects.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="portfolio" className="relative py-28 bg-[#050507]">
      {/* Background Radial Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#E6CA65] text-xs font-semibold tracking-widest uppercase font-mono">
            <Film className="w-3.5 h-3.5" />
            <span>THE CINEMA ARCHIVE // RIYADH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['IBM_Plex_Sans_Arabic',_'Syne']">
            {isArabic ? (
              <span>
                معرض الأعمال{' '}
                <span className="bg-gradient-to-r from-[#FFF8DC] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent">
                  الاستثنائية
                </span>
              </span>
            ) : (
              <span className="uppercase">
                Selected Works &{' '}
                <span className="bg-gradient-to-r from-[#FFF8DC] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent">
                  Cinematography
                </span>
              </span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#EDE8D0]/70 font-['Cairo',_'Inter']">
            {isArabic
              ? 'مجموعة مختارة من الإنتاجات البصرية الرائدة لعملائنا في القطاعين الحكومي والخاص بالمملكة، مع إمكانية رفع وسائط جديدة مباشرة.'
              : 'Curated archive of flagship productions across the Kingdom, with real-time media uploading capabilities.'}
          </p>
        </div>

        {/* Upload Action Bar + Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    soundEngine.playMicroClick();
                    setActiveFilter(f.id);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 font-['Cairo',_'Inter'] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] text-[#050507] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                      : 'bg-[#0F0F14]/70 border border-[#D4AF37]/20 text-[#EDE8D0]/80 hover:text-white hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                  }`}
                >
                  {isArabic ? f.labelAr : f.labelEn}
                </button>
              );
            })}
          </div>

          {/* Upload Button */}
          <button
            onClick={() => {
              soundEngine.playMicroClick();
              setIsUploadModalOpen(true);
            }}
            className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            <Upload className="w-4 h-4" />
            <span>{isArabic ? 'رفع عمل أو وسائط جديدة' : 'Upload Cinema Work'}</span>
          </button>
        </div>

        {/* Masonry / Grid Portfolio Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((item) => {
            const isVideo = item.type === 'video';
            const isUserProject = customProjects.some((p) => p.id === item.id);

            return (
              <div
                key={item.id}
                data-cursor={isVideo ? 'video' : 'photo'}
                onClick={() => {
                  soundEngine.playHapticShutter();
                  onOpenProject(item);
                }}
                onMouseEnter={() => {
                  soundEngine.playMicroClick();
                  if (isVideo) setHoveredVideoId(item.id);
                }}
                onMouseLeave={() => {
                  if (isVideo) setHoveredVideoId(null);
                }}
                className="group relative rounded-2xl overflow-hidden bg-[#0F0F14]/80 border border-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-500 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                {/* Media Stage */}
                <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-[#000]">
                  {/* Poster Image */}
                  <img
                    src={getPoster(item)}
                    alt={isArabic ? item.titleAr : item.titleEn}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.src !== FALLBACK_IMAGE) {
                        el.src = FALLBACK_IMAGE;
                      }
                    }}
                    className={`w-full h-full object-cover filter brightness-85 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ${
                      hoveredVideoId === item.id && item.videoUrl ? 'opacity-0' : 'opacity-100'
                    }`}
                  />

                  {/* Looping Muted Preview Video on Hover */}
                  {isVideo && item.videoUrl && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        hoveredVideoId === item.id ? 'opacity-100 scale-105' : 'opacity-0'
                      }`}
                      src={item.videoUrl}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#050507]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] font-medium text-[#FFF8DC] tracking-wide">
                        {isArabic ? item.categoryLabelAr : item.categoryLabelEn}
                      </span>
                      {isUserProject && (
                        <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/30 backdrop-blur-md border border-[#D4AF37]/60 text-[#FFF8DC] text-[10px] font-bold">
                          {isArabic ? 'مرفوع مخصصاً' : 'Custom Upload'}
                        </span>
                      )}
                      {getGalleryCount(item) > 1 && (
                        <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFF8DC] text-[10px] font-mono flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#D4AF37]" />
                          <span>{getGalleryCount(item)} {isArabic ? 'صور' : 'Photos'}</span>
                        </span>
                      )}
                    </div>

                    {/* Media Type Icon & Delete Button if User Upload */}
                    <div className="flex items-center gap-2">
                      {isUserProject && (
                        <button
                          onClick={(e) => handleDeleteCustomProject(e, item.id)}
                          className="w-8 h-8 rounded-full bg-black/80 hover:bg-rose-900 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all shadow-md"
                          title={isArabic ? 'حذف العمل المرفوع' : 'Delete Uploaded Work'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="w-8 h-8 rounded-full bg-[#050507]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050507] transition-all">
                        {isVideo ? <Play className="w-3.5 h-3.5 fill-current ml-0.5" /> : <Camera className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#EDE8D0]/80">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="truncate">{isArabic ? item.locationAr : item.locationEn}</span>
                    </div>
                    {item.awards && item.awards.length > 0 && (
                      <div className="flex items-center gap-1 text-[#E6CA65] text-[10px] font-mono">
                        <Award className="w-3 h-3" />
                        <span>{item.awards[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Description Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="text-[11px] text-[#D4AF37]/80 font-mono uppercase tracking-wider">
                    {isArabic ? item.clientAr : item.clientEn}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFF8DC] transition-colors font-['IBM_Plex_Sans_Arabic',_'Syne'] leading-snug">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-xs text-[#EDE8D0]/65 line-clamp-2 font-['Cairo',_'Inter']">
                    {isArabic ? item.descriptionAr : item.descriptionEn}
                  </p>

                  {/* Technical Gear / Color Specs */}
                  {item.cameraGear && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#EDE8D0]/50 font-mono">
                      <span className="truncate">{item.cameraGear}</span>
                      <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                        {isVideo ? (isArabic ? 'مشاهدة' : 'WATCH') : (isArabic ? 'تكبير' : 'VIEW')}
                        <span>→</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Media Modal */}
      <UploadMediaModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        isArabic={isArabic}
        onProjectCreated={handleProjectCreated}
      />
    </section>
  );
};

