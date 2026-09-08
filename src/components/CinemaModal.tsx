import React, { useState, useRef, useEffect } from 'react';
import { PortfolioItem, BRAND_INFO } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { registerObjectUrl } from '../utils/mediaStore';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Camera,
  Film,
  Layers,
  MapPin,
  MessageCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Video
} from 'lucide-react';

const FALLBACK_PHOTO = "/assets/coffee/IMG_9546.svg";

interface CinemaModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  isArabic: boolean;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({ item, onClose, isArabic }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [customPhotos, setCustomPhotos] = useState<string[]>([]);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Load any user-uploaded photos for this project from localStorage
  useEffect(() => {
    setCurrentPhotoIndex(0);
    setCustomVideoUrl(null);
    if (item?.id) {
      try {
        const stored = localStorage.getItem(`velora_custom_gallery_${item.id}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCustomPhotos(parsed);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not read custom photos from localStorage', e);
      }
      setCustomPhotos([]);
    }
  }, [item?.id]);

  const defaultPhotos = item?.gallery && item.gallery.length > 0 ? item.gallery : (item ? [item.poster] : [FALLBACK_PHOTO]);
  const photos = customPhotos.length > 0 ? customPhotos : defaultPhotos;
  const isCustom = customPhotos.length > 0;

  const currentDetail = item?.galleryDetails && !isCustom ? item.galleryDetails[currentPhotoIndex] : null;

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    soundEngine.playMicroClick();
    const uploadedUrls: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && typeof ev.target.result === 'string') {
          uploadedUrls.push(ev.target.result);
        }
        processed++;
        if (processed === files.length) {
          setCustomPhotos(uploadedUrls);
          setCurrentPhotoIndex(0);
          if (item?.id) {
            try {
              localStorage.setItem(`velora_custom_gallery_${item.id}`, JSON.stringify(uploadedUrls));
            } catch (err) {
              console.warn('LocalStorage limit for custom photos reached', err);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCustomVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundEngine.playMicroClick();
    const objectUrl = URL.createObjectURL(file);
    if (item?.id) {
      registerObjectUrl(item.id, objectUrl);
    }
    setCustomVideoUrl(objectUrl);
    setIsPlaying(true);
  };

  const handleResetVideo = () => {
    soundEngine.playMicroClick();
    setCustomVideoUrl(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleResetPhotos = () => {
    soundEngine.playMicroClick();
    setCustomPhotos([]);
    setCurrentPhotoIndex(0);
    if (item?.id) {
      try {
        localStorage.removeItem(`velora_custom_gallery_${item.id}`);
      } catch (e) {}
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
      if (!isVideo && photos.length > 1) {
        if (e.key === 'ArrowRight') {
          soundEngine.playMicroClick();
          setCurrentPhotoIndex((prev) => (isArabic ? (prev > 0 ? prev - 1 : photos.length - 1) : (prev < photos.length - 1 ? prev + 1 : 0)));
        } else if (e.key === 'ArrowLeft') {
          soundEngine.playMicroClick();
          setCurrentPhotoIndex((prev) => (isArabic ? (prev < photos.length - 1 ? prev + 1 : 0) : (prev > 0 ? prev - 1 : photos.length - 1)));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isArabic, photos.length]);

  if (!item) return null;

  const isVideo = item.type === 'video';

  const togglePlay = () => {
    soundEngine.playMicroClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    soundEngine.playMicroClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const whatsappInquireUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
    isArabic
      ? `مرحباً، أود الاستفسار عن تنفيذ مشروع سينمائي مماثل لـ: "${item.titleAr}".`
      : `Hello, I would like to inquire about producing a project similar to: "${item.titleEn}".`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#050507]/95 backdrop-blur-3xl animate-in fade-in duration-300"
    >
      {/* Background Ambient Cinema Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-5xl h-[70vh] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={() => {
          soundEngine.playMicroClick();
          onClose();
        }}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 p-3 rounded-full bg-[#0F0F14]/90 border border-[#D4AF37]/30 text-[#EDE8D0] hover:text-[#FFF8DC] hover:border-[#D4AF37] hover:scale-110 transition-all shadow-xl"
        aria-label="Close Cinema Theater"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Theater Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0B0B10] border border-[#D4AF37]/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col">
        {/* Media Player Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {isVideo && (customVideoUrl || item.videoUrl) ? (
            <div className="relative w-full h-full flex items-center justify-center group/video bg-black">
              <video
                ref={videoRef}
                src={customVideoUrl || item.videoUrl}
                autoPlay
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
              />

              {/* Video Header Controls: Custom video upload button */}
              <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFF8DC] text-xs font-mono flex items-center gap-1.5 shadow-lg">
                    <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{customVideoUrl ? (isArabic ? 'فيديو مخصص' : 'Custom Video') : (isArabic ? 'عرض 4K سينمائي' : '4K Cinema Playback')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <label
                    onClick={() => soundEngine.playMicroClick()}
                    className="cursor-pointer px-3 py-1.5 rounded-full bg-[#050507]/80 hover:bg-[#D4AF37] text-[#FFF8DC] hover:text-[#050507] backdrop-blur-md border border-[#D4AF37]/40 text-xs font-medium flex items-center gap-1.5 shadow-lg transition-all"
                    title={isArabic ? "رفع فيديو تجريبي من جهازك" : "Upload custom video from device"}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isArabic ? "رفع فيديو من جهازك" : "Upload Video"}</span>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/*"
                      className="hidden"
                      onChange={handleCustomVideoUpload}
                    />
                  </label>

                  {customVideoUrl && (
                    <button
                      onClick={handleResetVideo}
                      className="p-1.5 rounded-full bg-black/80 hover:bg-rose-900/60 text-white/80 hover:text-white border border-white/20 transition-all backdrop-blur-md shadow-lg"
                      title={isArabic ? "استعادة الفيديو الأصلي" : "Reset to Original Video"}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center group/photo bg-black">
              <img
                key={photos[currentPhotoIndex] || item.poster}
                src={photos[currentPhotoIndex] || item.poster}
                alt={`${isArabic ? item.titleAr : item.titleEn} - ${currentPhotoIndex + 1}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (el.src !== FALLBACK_PHOTO) {
                    el.src = FALLBACK_PHOTO;
                  }
                }}
                className="w-full h-full object-contain select-none transition-all duration-300"
              />

              {/* Photo Header Tools: Counter + Upload Button */}
              <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFF8DC] text-xs font-mono flex items-center gap-1.5 shadow-lg">
                    <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>
                      {isArabic
                        ? `صورة ${currentPhotoIndex + 1} من ${photos.length}`
                        : `${currentPhotoIndex + 1} of ${photos.length}`}
                    </span>
                    {isCustom && (
                      <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFF8DC] text-[10px] ml-1">
                        {isArabic ? 'مخصصة' : 'Custom'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Upload / Custom Photos Action */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  <label
                    onClick={() => soundEngine.playMicroClick()}
                    className="cursor-pointer px-3 py-1.5 rounded-full bg-[#050507]/80 hover:bg-[#D4AF37] text-[#FFF8DC] hover:text-[#050507] backdrop-blur-md border border-[#D4AF37]/40 text-xs font-medium flex items-center gap-1.5 shadow-lg transition-all"
                    title={isArabic ? "رفع صور إضافية من جهازك" : "Upload photos from your device"}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isArabic ? "رفع صور الجلسة" : "Upload Photos"}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleCustomUpload}
                    />
                  </label>

                  {isCustom && (
                    <button
                      onClick={handleResetPhotos}
                      className="p-1.5 rounded-full bg-black/80 hover:bg-rose-900/60 text-white/80 hover:text-white border border-white/20 transition-all backdrop-blur-md shadow-lg"
                      title={isArabic ? "استعادة صور الاستوديو" : "Reset to Studio Photos"}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Photo Title & Tag Badge */}
              {currentDetail && (
                <div className="absolute bottom-16 sm:bottom-20 inset-x-4 flex justify-center pointer-events-none z-20">
                  <div className="px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-[#D4AF37]/50 text-center max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#E6CA65] text-[11px] font-mono font-bold mb-0.5 border border-[#D4AF37]/30">
                      {currentDetail.fileTag}
                    </span>
                    <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                      {isArabic ? currentDetail.titleAr : currentDetail.titleEn}
                    </p>
                  </div>
                </div>
              )}

              {/* Carousel Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      soundEngine.playMicroClick();
                      setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#050507]/85 hover:bg-[#D4AF37] text-white hover:text-[#050507] border border-[#D4AF37]/50 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md group-hover/photo:opacity-100 opacity-80"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playMicroClick();
                      setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#050507]/85 hover:bg-[#D4AF37] text-white hover:text-[#050507] border border-[#D4AF37]/50 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md group-hover/photo:opacity-100 opacity-80"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Bottom Thumbnails Strip */}
                  <div className="absolute bottom-2 inset-x-0 z-20 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    {photos.map((photoUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          soundEngine.playMicroClick();
                          setCurrentPhotoIndex(idx);
                        }}
                        className={`relative w-12 h-8 sm:w-16 sm:h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          currentPhotoIndex === idx
                            ? 'border-[#D4AF37] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.7)]'
                            : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/60'
                        }`}
                      >
                        <img
                          src={photoUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_PHOTO;
                          }}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Cinema Overlay Controls (for videos) */}
          {isVideo && (
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
              {/* Scrubber Range */}
              <input
                type="range"
                min="0"
                max="100"
                value={isNaN(progress) ? 0 : progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />

              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#D4AF37] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#D4AF37] transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-white/70">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px] text-[#D4AF37]">
                  <span>4K MASTER</span>
                  <button
                    onClick={() => {
                      if (videoRef.current?.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }}
                    className="p-1.5 hover:text-[#FFF8DC]"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Metadata Drawer */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#0B0B10]">
          {/* Header & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                <span>{item.categoryLabelEn}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {isArabic ? item.locationAr : item.locationEn}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['IBM_Plex_Sans_Arabic',_'Syne']">
                {isArabic ? item.titleAr : item.titleEn}
              </h2>
              <div className="text-xs text-[#EDE8D0]/60 font-mono">
                {isArabic ? `العميل: ${item.clientAr}` : `Commissioned by: ${item.clientEn}`}
              </div>
            </div>

            {/* Direct WhatsApp Project Inquiry */}
            <a
              href={whatsappInquireUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playHapticShutter()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] text-[#050507] font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#050507]" />
              <span>{isArabic ? 'طلب مشروع سينمائي مماثل' : 'Commission Similar Project'}</span>
            </a>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#EDE8D0]/80 leading-relaxed font-['Cairo',_'Inter']">
            {isArabic ? item.descriptionAr : item.descriptionEn}
          </p>

          {/* Technical Specs Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {item.cameraGear && (
              <div className="p-4 rounded-xl bg-[#0F0F14] border border-[#D4AF37]/15 flex items-start gap-3">
                <Camera className="w-5 h-5 text-[#E6CA65] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#D4AF37]/75 font-mono">
                    {isArabic ? 'منظومة الكاميرا والعدسات' : 'CAMERA & OPTICS RIG'}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-mono mt-0.5">
                    {item.cameraGear}
                  </div>
                </div>
              </div>
            )}

            {item.colorScience && (
              <div className="p-4 rounded-xl bg-[#0F0F14] border border-[#D4AF37]/15 flex items-start gap-3">
                <Layers className="w-5 h-5 text-[#E6CA65] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#D4AF37]/75 font-mono">
                    {isArabic ? 'المعالجة والتلوين السينمائي' : 'COLOR PIPELINE & SCIENCE'}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-mono mt-0.5">
                    {item.colorScience}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Awards or Accolades if available */}
          {item.awards && item.awards.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#E6CA65] bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3 rounded-lg">
              <Award className="w-4 h-4" />
              <span>{isArabic ? 'التقديرات والجوائز:' : 'Recognition:'} {item.awards.join(' • ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
