import React, { useState, useRef } from 'react';
import { PortfolioItem } from '../data/contentData';
import { saveCustomProject, registerObjectUrl } from '../utils/mediaStore';
import { soundEngine } from '../utils/audioEngine';
import {
  X,
  Upload,
  Film,
  Camera,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Play,
  Video
} from 'lucide-react';

interface UploadMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
  onProjectCreated: (newProject: PortfolioItem) => void;
}

export const UploadMediaModal: React.FC<UploadMediaModalProps> = ({
  isOpen,
  onClose,
  isArabic,
  onProjectCreated,
}) => {
  const [projectType, setProjectType] = useState<'video' | 'photo'>('video');
  const [category, setCategory] = useState<'cinematic' | 'photography' | 'real_estate' | 'food' | 'ai_art'>('cinematic');

  // Form Fields
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [clientAr, setClientAr] = useState('');
  const [clientEn, setClientEn] = useState('');
  const [locationAr, setLocationAr] = useState('الرياض، المملكة العربية السعودية');
  const [locationEn, setLocationEn] = useState('Riyadh, Saudi Arabia');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [cameraGear, setCameraGear] = useState('Sony FX6 / Cinema Line');
  const [colorScience, setColorScience] = useState('S-Log3 / S-Gamut3.Cine');

  // Media state
  const [videoFileUrl, setVideoFileUrl] = useState<string>('');
  const [videoExternalUrl, setVideoExternalUrl] = useState<string>('');
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Video File Upload
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundEngine.playMicroClick();
    const url = URL.createObjectURL(file);
    const tempId = `temp_${Date.now()}`;
    registerObjectUrl(tempId, url);
    setVideoFileUrl(url);
    setErrorMsg(null);
  };

  // Handle Poster / Single Image Select
  const handlePosterSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundEngine.playMicroClick();
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPosterUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Multi-Photo Upload for Gallery
  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    soundEngine.playMicroClick();
    const newPhotos: string[] = [];
    let loadedCount = 0;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          newPhotos.push(reader.result);
        }
        loadedCount++;
        if (loadedCount === files.length) {
          setGalleryImages((prev) => [...prev, ...newPhotos]);
          // Default poster to first photo if empty
          if (!posterUrl && newPhotos.length > 0) {
            setPosterUrl(newPhotos[0]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    soundEngine.playMicroClick();
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const activeTitleAr = titleAr.trim() || (projectType === 'video' ? 'عمل سينمائي جديد' : 'ألبوم فوتوغرافي جديد');
    const activeTitleEn = titleEn.trim() || (projectType === 'video' ? 'New Cinema Film' : 'New Photo Series');
    const activeClientAr = clientAr.trim() || 'ڤيلورا للإنتاج';
    const activeClientEn = clientEn.trim() || 'Velora Production';

    let finalPoster = posterUrl;
    let finalVideoUrl = videoFileUrl || videoExternalUrl.trim();

    if (projectType === 'video') {
      if (!finalVideoUrl) {
        setErrorMsg(
          isArabic
            ? 'يرجى اختيار ملف فيديو من جهازك أو وضع رابط فيديو مباشر.'
            : 'Please upload a video file or provide a direct video URL.'
        );
        return;
      }
      if (!finalPoster) {
        finalPoster = '/assets/coffee/IMG_9546.svg';
      }
    } else {
      if (galleryImages.length === 0 && !finalPoster) {
        setErrorMsg(
          isArabic
            ? 'يرجى رفع صورة واحدة على الأقل للألبوم.'
            : 'Please upload at least one photo for this gallery.'
        );
        return;
      }
      if (!finalPoster && galleryImages.length > 0) {
        finalPoster = galleryImages[0];
      }
    }

    setIsSubmitting(true);
    soundEngine.playMicroClick();

    const newId = `user_proj_${Date.now()}`;
    const categoryLabels: Record<string, { ar: string; en: string }> = {
      cinematic: { ar: 'فيديو سينمائي', en: 'Cinematic Films' },
      photography: { ar: 'فوتوغرافي فاخر', en: 'Luxury Photography' },
      real_estate: { ar: 'عقارات وقصور', en: 'Real Estate' },
      food: { ar: 'مطاعم وكافيهات', en: 'Food & Beverage' },
      ai_art: { ar: 'إبداع الذكاء الاصطناعي', en: 'AI Concept Art' },
    };

    const newProject: PortfolioItem = {
      id: newId,
      titleAr: activeTitleAr,
      titleEn: activeTitleEn,
      clientAr: activeClientAr,
      clientEn: activeClientEn,
      locationAr: locationAr || 'المملكة العربية السعودية',
      locationEn: locationEn || 'Saudi Arabia',
      category: category,
      categoryLabelAr: categoryLabels[category].ar,
      categoryLabelEn: categoryLabels[category].en,
      type: projectType,
      poster: finalPoster,
      videoUrl: projectType === 'video' ? finalVideoUrl : undefined,
      gallery: projectType === 'photo' ? (galleryImages.length > 0 ? galleryImages : [finalPoster]) : undefined,
      cameraGear: cameraGear || 'Sony FX6 Cinema Line',
      colorScience: colorScience || 'S-Log3 / 10-bit 4:2:2',
      descriptionAr: descriptionAr || 'عمل بصري حصري مضاف وموثّق ضمن سجلات أرشيف ڤيلورا الرقمي.',
      descriptionEn: 'Bespoke production verified and archived within the official Velora visual repertoire.',
      awards: ['User Verified Production 2026'],
      aspectRatio: 'landscape',
    };

    try {
      await saveCustomProject(newProject);
      onProjectCreated(newProject);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(isArabic ? 'حدث خطأ أثناء حفظ العمل، يرجى المحاولة ثانية.' : 'Failed to save project. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#09090E] border border-[#D4AF37]/35 shadow-[0_25px_90px_rgba(0,0,0,0.95)] p-5 sm:p-8 text-[#EDE8D0]">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playMicroClick();
            onClose();
          }}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E6CA65] text-xs font-semibold tracking-wider font-mono uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEDIA UPLOAD STUDIO // VELORA VAULT</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['IBM_Plex_Sans_Arabic',_'Syne']">
            {isArabic ? 'رفع عمل سينمائي أو صور وفيديوهات' : 'Upload Cinema Work & Media Assets'}
          </h3>

          <p className="text-xs sm:text-sm text-[#EDE8D0]/70 font-['Cairo',_'Inter']">
            {isArabic
              ? 'ارفع مقاطع الفيديو والصور مباشرة من جهازك لتظهر فوراً في المعرض السينمائي مع المشغّل عالي الدقة.'
              : 'Directly upload your video clips and high-res photography onto the website portfolio.'}
          </p>
        </div>

        {/* Type Toggle: Video vs Photography */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-black/50 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroClick();
              setProjectType('video');
            }}
            className={`flex items-center justify-center gap-2.5 py-3 rounded-xl font-medium text-sm transition-all ${
              projectType === 'video'
                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{isArabic ? 'فيديو سينمائي (Video)' : 'Cinematic Video'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMicroClick();
              setProjectType('photo');
            }}
            className={`flex items-center justify-center gap-2.5 py-3 rounded-xl font-medium text-sm transition-all ${
              projectType === 'photo'
                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{isArabic ? 'معرض صور فوتوغرافي (Photos)' : 'Photo Gallery'}</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/50 border border-rose-600/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= MEDIA DROP ZONE ================= */}
          {projectType === 'video' ? (
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                {isArabic ? '1. رفع ملف الفيديو (MP4 / WebM / MOV)' : '1. Upload Video File'}
              </label>

              {videoFileUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-black aspect-video max-h-64 flex items-center justify-center">
                  <video
                    src={videoFileUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMicroClick();
                      setVideoFileUrl('');
                      if (videoInputRef.current) videoInputRef.current.value = '';
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/80 hover:bg-rose-900 text-white transition-all shadow-lg"
                    title={isArabic ? 'إزالة الفيديو' : 'Remove Video'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => videoInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 sm:p-8 text-center bg-white/[0.02] hover:bg-[#D4AF37]/5 transition-all group"
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/*"
                    className="hidden"
                    onChange={handleVideoSelect}
                  />
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1 font-['IBM_Plex_Sans_Arabic',_'Syne']">
                    {isArabic ? 'اضغط هنا لاختيار ملف فيديو من جهازك' : 'Click to select a video file from your device'}
                  </p>
                  <p className="text-xs text-[#EDE8D0]/60">
                    {isArabic ? 'يدعم MP4 و WebM و MOV بدقة تصل إلى 4K' : 'Supports MP4, WebM, and MOV up to 4K resolution'}
                  </p>
                </div>
              )}

              {/* Or Direct URL */}
              <div className="pt-2">
                <span className="text-xs text-[#EDE8D0]/60 block mb-1">
                  {isArabic ? 'أو أدخل رابط فيديو خارجي مباشر:' : 'Or enter a direct external video URL:'}
                </span>
                <input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={videoExternalUrl}
                  onChange={(e) => setVideoExternalUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none transition-all"
                />
              </div>

              {/* Poster Image for Video */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-2">
                  {isArabic ? 'صورة غلاف الفيديو (Thumbnail / Poster) - اختياري:' : 'Video Thumbnail (Optional):'}
                </label>
                <div className="flex items-center gap-4">
                  {posterUrl && (
                    <img
                      src={posterUrl}
                      alt="Poster Preview"
                      className="w-20 h-14 object-cover rounded-lg border border-[#D4AF37]/40"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => posterInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#D4AF37]/20 border border-white/15 hover:border-[#D4AF37] text-xs text-white transition-all flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isArabic ? 'اختيار صورة غلاف' : 'Choose Cover Image'}</span>
                  </button>
                  <input
                    ref={posterInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePosterSelect}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                {isArabic ? '1. رفع صور الألبوم الفوتوغرافي (JPG / PNG / WebP)' : '1. Upload Photo Album Images'}
              </label>

              <div
                onClick={() => galleryInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 sm:p-8 text-center bg-white/[0.02] hover:bg-[#D4AF37]/5 transition-all group"
              >
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGallerySelect}
                />
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <p className="text-sm font-semibold text-white mb-1 font-['IBM_Plex_Sans_Arabic',_'Syne']">
                  {isArabic ? 'اضغط لاختيار صور متعددة من جهازك' : 'Click to select multiple photos from your device'}
                </p>
                <p className="text-xs text-[#EDE8D0]/60">
                  {isArabic ? 'يمكنك تحديد عدة صور دفعة واحدة' : 'You can choose multiple high-res photos at once'}
                </p>
              </div>

              {/* Gallery Thumbnails Preview */}
              {galleryImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#EDE8D0]/70">
                    <span>
                      {isArabic ? `تم رفع ${galleryImages.length} صور:` : `${galleryImages.length} photos selected:`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGalleryImages([])}
                      className="text-rose-400 hover:text-rose-300 text-[11px]"
                    >
                      {isArabic ? 'مسح الكل' : 'Clear all'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-52 overflow-y-auto p-2 bg-black/40 rounded-xl border border-white/10">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/15 aspect-square bg-black">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/80 hover:bg-rose-900 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[#D4AF37] text-black text-[9px] font-bold">
                            {isArabic ? 'الغلاف' : 'Cover'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= METADATA FIELDS ================= */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              {isArabic ? '2. تفاصيل العمل الفني والجهة' : '2. Project Information & Metadata'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                  {isArabic ? 'عنوان العمل (بالعربية) *' : 'Project Title (Arabic)'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'مثال: فيلم تدشين برج الرياض' : 'e.g. Riyadh Tower Launch Film'}
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                  {isArabic ? 'عنوان العمل (بالإنجليزية)' : 'Project Title (English)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Riyadh Tower Launch Film"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                  {isArabic ? 'اسم العميل / العلامة التجارية' : 'Client / Brand Name'}
                </label>
                <input
                  type="text"
                  placeholder={isArabic ? 'مثال: صندوق الاستثمارات العامة / مقهى مزاج' : 'e.g. PIF / Mazaj Cafe'}
                  value={clientAr}
                  onChange={(e) => {
                    setClientAr(e.target.value);
                    if (!clientEn) setClientEn(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                  {isArabic ? 'التصنيف' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0F0F14] border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none"
                >
                  <option value="cinematic">{isArabic ? 'فيديو سينمائي' : 'Cinematic Films'}</option>
                  <option value="photography">{isArabic ? 'فوتوغرافي فاخر' : 'Luxury Photography'}</option>
                  <option value="real_estate">{isArabic ? 'عقارات وقصور' : 'Real Estate'}</option>
                  <option value="food">{isArabic ? 'مطاعم وكافيهات' : 'Food & Beverage'}</option>
                  <option value="ai_art">{isArabic ? 'إبداع الذكاء الاصطناعي' : 'AI Concept Art'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                  {isArabic ? 'الموقع' : 'Location'}
                </label>
                <input
                  type="text"
                  value={locationAr}
                  onChange={(e) => setLocationAr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                  {isArabic ? 'الكاميرا والمعدات' : 'Camera Gear'}
                </label>
                <input
                  type="text"
                  value={cameraGear}
                  onChange={(e) => setCameraGear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#EDE8D0]/80 mb-1">
                {isArabic ? 'وصف العمل الفني' : 'Project Description'}
              </label>
              <textarea
                rows={2}
                placeholder={isArabic ? 'اكتب نبذة مختصرة عن فكرة العمل وجودة الإنتاج...' : 'Brief summary of the visual concept and execution...'}
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-xs outline-none resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#EDE8D0]/80 text-xs font-medium transition-all"
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] hover:brightness-110 text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? (isArabic ? 'جاري الحفظ والنشر...' : 'Publishing...')
                  : (isArabic ? 'حفظ ونشر العمل في المعرض' : 'Publish to Portfolio')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
