import React, { useState } from 'react';
import { SERVICES_DATA, CITIES_LIST, BRAND_INFO } from '../data/contentData';
import { soundEngine } from '../utils/audioEngine';
import { MessageCircle, Sparkles, Calendar, MapPin, Check, Send, User, Building, FileText } from 'lucide-react';

interface BookingSectionProps {
  isArabic: boolean;
  preselectedService?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  isArabic,
  preselectedService,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : []
  );
  const [selectedCity, setSelectedCity] = useState(CITIES_LIST[0].id);
  const [targetDate, setTargetDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [organization, setOrganization] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const toggleService = (title: string) => {
    soundEngine.playMicroClick();
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleCityChange = (cityId: string) => {
    soundEngine.playMicroClick();
    setSelectedCity(cityId);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playHapticShutter();

    const cityName =
      CITIES_LIST.find((c) => c.id === selectedCity)?.[isArabic ? 'ar' : 'en'] || selectedCity;
    const servicesList =
      selectedServices.length > 0
        ? selectedServices.join(' + ')
        : isArabic
        ? 'استشارة إنتاج سينمائي شاملة'
        : 'Comprehensive Cinema Production';

    let message = '';
    if (isArabic) {
      message = `✨ *طلب حجز استشارة إنتاج سينمائي VIP - ڤيلورا*\n\n` +
        `👤 *الاسم الكريم:* ${clientName || 'غير محدد'}\n` +
        `🏢 *الجهة / العلامة التجارية:* ${organization || 'غير محدد'}\n` +
        `🎬 *الخدمات المطلوبة:* ${servicesList}\n` +
        `📍 *المدينة المستهدفة:* ${cityName}\n` +
        `📅 *الموعد المقترح:* ${targetDate || 'مرن / يتم التنسيق'}\n` +
        (projectBrief ? `📝 *نبذة عن الفكرة:* ${projectBrief}\n` : '') +
        `\n_أرجو التواصل لتحديد موعد الجلسة الاستشارية ومراجعة متطلبات المشروع._`;
    } else {
      message = `✨ *Velora VIP Cinema Production Inquiry*\n\n` +
        `👤 *Name:* ${clientName || 'Not specified'}\n` +
        `🏢 *Brand / Entity:* ${organization || 'Not specified'}\n` +
        `🎬 *Required Services:* ${servicesList}\n` +
        `📍 *Target City:* ${cityName}\n` +
        `📅 *Target Date:* ${targetDate || 'Flexible'}\n` +
        (projectBrief ? `📝 *Vision Brief:* ${projectBrief}\n` : '') +
        `\n_Requesting a direct consultation session._`;
    }

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 5000);

    const url = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="booking" className="relative py-28 transition-colors duration-500 overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#D4AF37]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP COMMISSIONS // CONCIERGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-['IBM_Plex_Sans_Arabic',_'Syne']">
            {isArabic ? (
              <span>
                احجز استشارتك مع نخبة{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent">
                  صناع Velora
                </span>
              </span>
            ) : (
              <span className="uppercase">
                Commission Your{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#D4AF37] bg-clip-text text-transparent">
                  Velora Landmark
                </span>
              </span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-inherit opacity-80 font-['Cairo',_'Inter']">
            {isArabic
              ? 'حدد معالم مشروعك ونوع الخدمات المطلوبة وسيتواصل معك مستشار الإنتاج التنفيذي لتنسيق خطة العمل والجدول الزمني.'
              : 'Select your cinematic services and production parameters. Our executive producer will follow up promptly to align schedules and logistics.'}
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleWhatsAppSubmit}
          className="rounded-3xl bg-[#0F0F14]/90 border border-[#D4AF37]/25 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.9)] space-y-8"
        >
          {/* 1. Multi-Select Services */}
          <div className="space-y-3">
            <label className="block text-xs uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isArabic ? '١. اختر الخدمات السينمائية المطلوبة:' : '1. SELECT REQUIRED CINEMATIC SERVICES:'}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {SERVICES_DATA.map((srv) => {
                const title = isArabic ? srv.titleAr : srv.titleEn;
                const isSelected = selectedServices.includes(title);
                return (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => toggleService(title)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border font-['Cairo',_'Inter'] ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#050507] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] font-bold'
                        : 'bg-[#050507]/60 text-[#EDE8D0]/70 border-white/10 hover:border-[#D4AF37]/40 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? 'border-[#050507] bg-[#050507] text-[#D4AF37]'
                          : 'border-white/20'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. City & Target Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Target City */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isArabic ? '٢. موقع التصوير بالمملكة:' : '2. TARGET PRODUCTION LOCATION:'}</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#050507] border border-[#D4AF37]/25 text-[#FFF8DC] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              >
                {CITIES_LIST.map((city) => (
                  <option key={city.id} value={city.id} className="bg-[#0B0B10] text-white">
                    {isArabic ? city.ar : city.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Date */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isArabic ? '٣. التاريخ المستهدف لبدء التصوير:' : '3. TARGET PRODUCTION DATE:'}</span>
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#050507] border border-[#D4AF37]/25 text-[#FFF8DC] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
          </div>

          {/* 3. Client & Project Details */}
          <div className="space-y-3">
            <label className="block text-xs uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{isArabic ? '٤. بيانات العميل والمشروع:' : '4. CLIENT & PROJECT DETAILS:'}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={isArabic ? 'الاسم الكريم' : 'Your Full Name'}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050507] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={isArabic ? 'اسم الشركة / العلامة التجارية' : 'Company / Brand Name'}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050507] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Project Brief */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>{isArabic ? '٥. نبذة عن فكرة المشروع والرسالة البصرية:' : '5. PROJECT VISION & BRIEF:'}</span>
            </label>
            <textarea
              rows={3}
              placeholder={
                isArabic
                  ? 'نبذة موجزة عن فكرة المشروع والرسالة البصرية المستهدفة أو أي تفاصيل خاصة...'
                  : 'Brief overview of your project vision, target audience, or special production requirements...'
              }
              value={projectBrief}
              onChange={(e) => setProjectBrief(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050507] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none resize-none"
            />
          </div>

          {/* Glowing Golden WhatsApp Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              data-cursor="pointer"
              className="w-full relative group inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#D4AF37] hover:from-[#FFF8DC] hover:to-[#E6CA65] text-[#050507] font-black text-base sm:text-lg tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_60px_rgba(212,175,55,0.8)] hover:scale-[1.01] active:scale-[0.99]"
            >
              {/* Pulse Indicator Ring */}
              <span className="absolute -inset-1 rounded-2xl bg-[#D4AF37] opacity-30 group-hover:opacity-60 blur-md transition duration-500 animate-pulse pointer-events-none" />

              <MessageCircle className="w-6 h-6 text-[#050507] group-hover:scale-110 transition-transform relative z-10" />
              <span className="font-['Cairo',_'Inter'] relative z-10">
                {isArabic
                  ? 'إرسال طلب الحجز الفوري عبر واتساب (+966 58 043 0494)'
                  : 'Submit VIP Commission via WhatsApp (+966 58 043 0494)'}
              </span>
              <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {sentSuccess && (
              <div className="mt-4 text-xs font-mono text-emerald-400 animate-in fade-in">
                {isArabic
                  ? 'تم تجهيز الرسالة وفتح محادثة واتساب الرسمية بنجاح!'
                  : 'WhatsApp concierge session initiated successfully!'}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
