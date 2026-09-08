export interface ServiceItem {
  id: string;
  number: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  gearBadgesAr: string[];
  gearBadgesEn: string[];
  image: string;
  sampleVideo?: string;
  whatsappPresetAr: string;
  whatsappPresetEn: string;
}

export interface PortfolioItem {
  id: string;
  titleAr: string;
  titleEn: string;
  clientAr: string;
  clientEn: string;
  locationAr: string;
  locationEn: string;
  category: 'cinematic' | 'photography' | 'real_estate' | 'food' | 'ai_art';
  categoryLabelAr: string;
  categoryLabelEn: string;
  type: 'video' | 'photo';
  poster: string;
  gallery?: string[];
  galleryDetails?: { titleAr: string; titleEn: string; fileTag: string }[];
  videoUrl?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'wide';
  cameraGear?: string;
  colorScience?: string;
  descriptionAr: string;
  descriptionEn: string;
  awards?: string[];
}

export interface ClientPartner {
  name: string;
  labelAr: string;
  labelEn: string;
  logoText: string;
}

export const BRAND_INFO = {
  nameAr: "ڤيلورا للإنتاج المرئي",
  nameEn: "Velora Cinematic Production",
  wordmarkAr: "ڤيلورا",
  wordmarkEn: "VELORA",
  taglineAr: "نبتكر بعداً بصرياً يُخلّد علامتك",
  taglineEn: "Architecting Cinematic Legacies",
  locationAr: "المملكة العربية السعودية",
  locationEn: "Kingdom of Saudi Arabia",
  email: "veloramedia40@gmail.com",
  crNumber: "7054945295",
  phone: "+966 58 043 0494",
  whatsappNumber: "966580430494",
  socials: {
    whatsapp: "https://wa.me/966580430494",
    email: "mailto:veloramedia40@gmail.com",
    instagram: "https://instagram.com/veloramedia40?igsi=dWN0ajUycHlmZ3ph&utm_source=qr",
    tiktok: "https://tiktok.com/@velora6074?_r=1&_t=ZS-99PIUHEkSSC",
    snapchat: "https://snapchat.com/t/6Gi3GaFZ",
  },
  positioningHook: {
    ar: "لا نصنع مجرد محتوى.. بل نبتكر بعداً بصرياً يُخلّد علامتك. شغف استثنائي وذكاء اصطناعي يعيد تعريف المستحيل.",
    en: "We don't just capture visuals; we architect cinematic legacies. Uncompromising passion, next-gen technology, and AI-driven precision crafted for those who demand the extraordinary."
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "luxury-real-estate",
    number: "01",
    titleAr: "تصوير القصور والمشاريع العقارية الفاخرة",
    titleEn: "Luxury Real Estate Videography & Photography",
    taglineAr: "توثيق معماري سينمائي يبرز فخامة التصميم والتفاصيل الملكية",
    taglineEn: "Architectural grandeur captured through high-fidelity cinematic lenses",
    descriptionAr: "تصوير احترافي للقصور، الأبراج، والمشاريع الأيقونية في المملكة مع إضاءة سينمائية ليلية ومسارات تصوير ديناميكية تمنح العقار بعداً ساحراً.",
    descriptionEn: "Elite cinematic documentation for royal palaces, luxury towers, and prime commercial developments featuring twilight lighting and dynamic camera tracks.",
    gearBadgesAr: ["Full-Frame Cinema", "Tilt-Shift Lenses", "4K HDR Master", "Gimbal 3-Axis Pro"],
    gearBadgesEn: ["Full-Frame Cinema", "Tilt-Shift Lenses", "4K HDR Master", "Gimbal 3-Axis Pro"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود حجز خدمة: تصوير القصور والمشاريع العقارية الفاخرة.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking the Luxury Real Estate Production service."
  },
  {
    id: "aerial-fpv",
    number: "02",
    titleAr: "تصوير جوي سينمائي ودرون FPV فائق السرعة",
    titleEn: "Cinematic Aerial & High-Speed FPV Cinematography",
    taglineAr: "مناورات جوية حابسة للأنفاس بزوايا مستحيلة وانسيابية مطلقة",
    taglineEn: "Breathtaking high-speed FPV maneuvers delivering impossible angles",
    descriptionAr: "تحليق احترافي وتصوير جوي سينمائي لتصوير المطاردات السريعة واللقطات الجوية الشاملة للفعاليات والمشاريع الكبرى بدقة 4K 120fps.",
    descriptionEn: "Elite drone pilots executing dynamic indoor/outdoor FPV flight paths, high-speed vehicle tracking, and master aerial cinematography in pristine 4K 120fps.",
    gearBadgesAr: ["Cinematic Aerial", "4K 120fps Raw", "High-Speed Chase", "Pro FPV Heavy Lifter"],
    gearBadgesEn: ["Cinematic Aerial", "4K 120fps Raw", "High-Speed Chase", "Pro FPV Heavy Lifter"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود حجز خدمة: تصوير جوي سينمائي ودرون FPV.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking the Cinematic Aerial & FPV Cinematography service."
  },
  {
    id: "executive-branding",
    number: "03",
    titleAr: "تصوير البورتريه التنفيذي والهوية القيادية",
    titleEn: "Executive & Personal Branding Photography",
    taglineAr: "بورتريه قيادي يجسد هيبة الحضور ومكانة صناع القرار",
    taglineEn: "Authoritative executive portraits capturing stature and refined leadership",
    descriptionAr: "جلسات تصوير مخصصة لكبار الرؤساء التنفيذيين، الوزراء، والشخصيات الرفيعة بالاستعانة بإضاءة بروفايل عالمية ولمسات هوليوودية تعكس الثقة والقوة.",
    descriptionEn: "Exclusive portraiture commissions for C-suite executives, diplomats, and founders utilizing medium format precision and tailored high-contrast studio illumination.",
    gearBadgesAr: ["Studio Master Lighting", "Medium Format Aesthetic", "Profoto Lighting Rigs", "8K Resolution"],
    gearBadgesEn: ["Studio Master Lighting", "Medium Format Aesthetic", "Profoto Lighting Rigs", "8K Resolution"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود حجز جلسة: تصوير البورتريه التنفيذي والهوية القيادية.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking an Executive & Personal Branding session."
  },
  {
    id: "post-color-grading",
    number: "04",
    titleAr: "مونتاج سينمائي وتصحيح ألوان احترافي",
    titleEn: "High-End Post-Production & Color Grading",
    taglineAr: "سحر تحويل اللقطات الخام إلى تحف سينمائية بألوان ملكية",
    taglineEn: "Transforming raw digital negatives into timeless cinematic masterworks",
    descriptionAr: "غرف تلوين احترافية مدعومة بنظام ACES العالمي وشاشات مرجعية لمعايرة الألوان على DaVinci Resolve Studio، مع تصميم صوتي مجسم متكامل (Sound Design & Dolby Atmos Mixing).",
    descriptionEn: "State-of-the-art DaVinci Resolve Studio color suite with ACES color science workflow, master reference monitoring, and immersive Dolby-level sound design.",
    gearBadgesAr: ["DaVinci Resolve Studio", "ACES Color Pipeline", "Dolby Atmos Design", "10-Bit 4:2:2 Rec.709/P3"],
    gearBadgesEn: ["DaVinci Resolve Studio", "ACES Color Pipeline", "Dolby Atmos Design", "10-Bit 4:2:2 Rec.709/P3"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود حجز خدمة: المونتاج وتصحيح الألوان السينمائي.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking the High-End Post-Production & Color Grading service."
  },
  {
    id: "ai-generative-media",
    number: "05",
    titleAr: "توليد بيئات ومؤثرات سينمائية بالذكاء الاصطناعي",
    titleEn: "AI-Powered Visuals & Generative Media",
    taglineAr: "دمج الذكاء الاصطناعي مع الواقع السينمائي لتجاوز حدود الخيال",
    taglineEn: "Merging generative AI frontiers with photo-realistic cinematic fidelity",
    descriptionAr: "توليد بيئات افتراضية خيالية ومحاكاة بصرية فائقة الدقة للإعلانات المستقبلية ومشاريع رؤية المملكة، بالاعتماد على أحدث نماذج التوليد البصري ودمجها مع لقطات الواقع.",
    descriptionEn: "Futuristic set extensions, concept environments, and synthetic cinema sequences engineered with state-of-the-art generative neural models and real-time CGI integration.",
    gearBadgesAr: ["Hyper-Realistic AI", "Custom LoRA Pipelines", "Unreal Engine 5", "Neural Upscaling"],
    gearBadgesEn: ["Hyper-Realistic AI", "Custom LoRA Pipelines", "Unreal Engine 5", "Neural Upscaling"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود الاستفسار عن خدمة: المؤثرات والإنتاج بالذكاء الاصطناعي.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking the AI-Powered Visuals & Generative Media service."
  },
  {
    id: "food-beverage-commercial",
    number: "06",
    titleAr: "تصوير الإعلانات التجارية للمطاعم والكافيهات الفاخرة",
    titleEn: "Commercial Cinematography for Cafes & Fine Dining",
    taglineAr: "تجسيد الشغف الحسي بالنكهات من خلال تصوير ماكرو عالي السرعة",
    taglineEn: "Sensory culinary storytelling highlighted by high-speed liquid dynamics",
    descriptionAr: "أفلام إعلانية مصممة لتحريك الحواس واستعراض تفاصيل المأكولات والمشروبات الفاخرة، باستخدام عدسات ماكرو متخصصة ومعدات تصوير الحركة البطيئة وتطاير السوائل.",
    descriptionEn: "Mouth-watering commercial spots featuring specialized macro cinema optics, motion-controlled splash rigs, and ultra high-speed slow-motion capturing sensory textures.",
    gearBadgesAr: ["Macro Cinema Primes", "High-Speed Splash Rig", "Phantom Slow-Mo", "Precision Food Styling"],
    gearBadgesEn: ["Macro Cinema Primes", "High-Speed Splash Rig", "Phantom Slow-Mo", "Precision Food Styling"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود حجز خدمة: تصوير الإعلانات التجارية للمطاعم والكافيهات.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking Commercial Cinematography for Cafes & Restaurants."
  },
  {
    id: "mega-events-coverage",
    number: "07",
    titleAr: "التغطيات التوثيقية للمعارض والمؤتمرات والفعاليات الكبرى",
    titleEn: "Exhibitions, Expos & Mega Events Coverage",
    taglineAr: "توثيق شامل وحي للقمم الوطنية والمهرجانات الثقافية الكبرى",
    taglineEn: "Flawless multi-camera coverage for national summits, expos, and festivals",
    descriptionAr: "طواقم تصوير متكاملة ومجهزة بوحدات بث مباشر لاسلكي، مع تسليم مونتاج ملخص يومي وتغطية شاملة للمشاركين والمنصات الرئيسية بدقة وجودة سينمائية متطورة.",
    descriptionEn: "Comprehensive production crews with wireless low-latency live feeds, dedicated fast-turnaround same-day editors, and cinematic highlight films for flagship Saudi forums.",
    gearBadgesAr: ["Multi-Cam Cinema", "Wireless Live Feed", "Same-Day Delivery", "Crew Coordination Hub"],
    gearBadgesEn: ["Multi-Cam Cinema", "Wireless Live Feed", "Same-Day Delivery", "Crew Coordination Hub"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85",
    whatsappPresetAr: "مرحباً ڤيلورا، أود حجز خدمة: التغطيات التوثيقية للفعاليات والمؤتمرات الكبرى.",
    whatsappPresetEn: "Hello Velora, I would like to inquire about booking Mega Events & Expo Coverage."
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "proj-1",
    titleAr: "حملة موسم الرياض - الإعلان السينمائي الرسمي",
    titleEn: "Riyadh Season Flagship - Official Cinematic Commercial",
    clientAr: "الهيئة العامة للترفيه",
    clientEn: "General Entertainment Authority",
    locationAr: "الرياض، بوليفارد وورلد",
    locationEn: "Riyadh, Boulevard World",
    category: "cinematic",
    categoryLabelAr: "إعلان سينمائي",
    categoryLabelEn: "Cinematic Film",
    type: "video",
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-traffic-interchange-in-a-city-at-night-42294-large.mp4",
    aspectRatio: "wide",
    cameraGear: "ARRI Alexa Mini LF + Cooke Anamorphic /i",
    colorScience: "ACEScct / DaVinci Resolve Golden Film Emulation",
    descriptionAr: "فيلم دعائي ملحمي يوثق زخم الليالي الاحتفالية في الرياض مع إضاءات ليلية ديناميكية ومسارات درون FPV سريعة تخطف الأنظار.",
    descriptionEn: "An epic high-energy cinematic commercial celebrating Riyadh's vibrant nightlife, combining dramatic lighting with high-velocity FPV drone choreography.",
    awards: ["Best Commercial Direction", "Golden Lens Honor"]
  },
  {
    id: "proj-2",
    titleAr: "جلسة تصوير مزاج القهوة",
    titleEn: "Mazaj Al Qahwa - Artisan Cafe & Product Photography",
    clientAr: "مقهى مزاج القهوة",
    clientEn: "Mazaj Al Qahwa Specialty Cafe",
    locationAr: "الرياض، المملكة العربية السعودية",
    locationEn: "Riyadh, Saudi Arabia",
    category: "photography",
    categoryLabelAr: "فوتوغرافي فاخر",
    categoryLabelEn: "Luxury Photography",
    type: "photo",
    poster: "/assets/coffee/IMG_9546.svg",
    gallery: [
      "/assets/coffee/IMG_9546.svg",
      "/assets/coffee/IMG_9558.svg",
      "/assets/coffee/Latte_art_and_chocolate_drizzle_202608201133.svg",
      "/assets/coffee/Three_reusable_coffee_cups_display_202608201142.svg",
      "/assets/coffee/Professional_product_photography_2K_202608201142.svg"
    ],
    galleryDetails: [
      { fileTag: "IMG_9546.JPG", titleAr: "كوب القهوة المختصة مع الكريما الذهبية الحريرية", titleEn: "Signature Specialty Coffee Cup & Silky Crema" },
      { fileTag: "IMG_9558.JPG", titleAr: "جلسة تحضير القهوة المقطرة V60 الحرفية", titleEn: "Artisan V60 Specialty Drip Extraction Session" },
      { fileTag: "Latte_art_and_chocolate_drizzle_202608201133.jpeg", titleAr: "فن اللاتيه آرت مع خطوط الشوكولاتة الفاخرة", titleEn: "Artisan Rosetta Latte Art & Chocolate Drizzle" },
      { fileTag: "Three_reusable_coffee_cups_display_202608201142.jpeg", titleAr: "المجموعة الثلاثية للأكواب العصرية الصديقة للبيئة", titleEn: "Three Contemporary Reusable Artisan Eco-Cups" },
      { fileTag: "Professional_product_photography_2K_202608201142.jpeg", titleAr: "تصوير تجاري فائق الجودة 2K لحبوب البن المحمصة", titleEn: "2K Commercial Packaging & Specialty Coffee Beans" }
    ],
    aspectRatio: "portrait",
    cameraGear: "Sony A7R V + FE 90mm f/2.8 Macro G OSS & 50mm f/1.2 GM",
    colorScience: "Warm Roasted Amber & Rich Crema Master Curve + Golden Coffee Highlights",
    descriptionAr: "جلسة تصوير فوتوغرافي تجاري فاخر لمقهى مزاج القهوة، ركزت على إبراز تفاصيل حبوب البن المختصة، وفنون اللاتيه آرت الدقيقة، وحرارة المشروبات وأناقة الأكواب بألوان دافئة تحاكي شغف القهوة.",
    descriptionEn: "Commercial fine-art photography session for Mazaj Al Qahwa Cafe, capturing artisan coffee notes, intricate latte art crafts, and specialty product textures with warm cinematic grading.",
    awards: ["Commercial Feature", "Artisan Cafe Identity"]
  },
  {
    id: "proj-3",
    titleAr: "جولة FPV سينمائية داخل قصر مودرن بحي حطين",
    titleEn: "Continuous FPV Architectural Flight - Hittin Palace",
    clientAr: "دار معمارية راقية",
    clientEn: "Exclusive Architectural Studio",
    locationAr: "الرياض، حي حطين الراقي",
    locationEn: "Riyadh, Hittin District",
    category: "real_estate",
    categoryLabelAr: "عقارات وقصور",
    categoryLabelEn: "Luxury Real Estate",
    type: "video",
    poster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    aspectRatio: "landscape",
    cameraGear: "Custom CineWhoop FPV + Naked BMPCC 4K Raw",
    colorScience: "Custom Warm Marble & Sunset LUT",
    descriptionAr: "لقطة واحدة مستمرة (One-Shot) تبدأ من الفناء الخارجي والشلالات الجدارية وتخترق الصالات الرخامية الشاهقة بانسيابية فائقة.",
    descriptionEn: "A seamless single-take FPV flight moving through water features and soaring marble atriums, demonstrating architectural scale and luxurious textures.",
    awards: ["Architectural Showcase"]
  },
  {
    id: "proj-4",
    titleAr: "الفيلم الدعائي الفاخر لكافيه مختص بالبوليفارد",
    titleEn: "Sensory Essence Spot - Luxury Specialty Cafe",
    clientAr: "سلسلة كافيهات نُخبوية",
    clientEn: "Elite Artisan Roastery",
    locationAr: "الرياض، البوليفارد",
    locationEn: "Riyadh, The Boulevard",
    category: "food",
    categoryLabelAr: "مطاعم وكافيهات",
    categoryLabelEn: "Food & Beverage",
    type: "video",
    poster: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-steaming-cup-of-coffee-43405-large.mp4",
    aspectRatio: "landscape",
    cameraGear: "RED V-Raptor 8K VV + Laowa 24mm Pro2be Macro",
    colorScience: "Warm Amber & Roasted Cocoa Palette",
    descriptionAr: "استعراض حسي لتقطير القهوة وتصاعد البخار وتطاير حبوب البن بسرعة 240 إطاراً في الثانية لإبراز الرقي والجودة الاستثنائية.",
    descriptionEn: "A tactile, macro-level showcase capturing steam ribbons, velvety crema pours, and cascading coffee beans at 240fps slow-motion.",
    awards: ["Commercial Excellence"]
  },
  {
    id: "proj-5",
    titleAr: "رؤية رقمية لمدن المستقبل بالذكاء الاصطناعي",
    titleEn: "Digital Vision of Future Cities - Neural AI Concept",
    clientAr: "مختبر الابتكار المعماري",
    clientEn: "Metropolitan Future Lab",
    locationAr: "نيوم / الرياض المستقبلية",
    locationEn: "NEOM / Riyadh 2030 Horizon",
    category: "ai_art",
    categoryLabelAr: "ذكاء اصطناعي",
    categoryLabelEn: "AI Cinema",
    type: "video",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-with-skyscrapers-41584-large.mp4",
    aspectRatio: "wide",
    cameraGear: "ComfyUI Neural Synthesis + Unreal Engine 5 Nanite Pass",
    colorScience: "Cybernetic Obsidian & Specular Gold Lighting",
    descriptionAr: "سلسلة لقطات مفهومية تجمع بين الذكاء الاصطناعي التوليدي والواقعية السينمائية لتصور العمارة المستدامة في مدن الغد السعودية.",
    descriptionEn: "A visionary AI-directed conceptual film exploring bioluminescent desert habitats, vertical megastructures, and futuristic Saudi skylines.",
    awards: ["Future Tech Recognition"]
  },
  {
    id: "proj-6",
    titleAr: "الفيلم الوثائقي لإطلاق منتجع صحراوي بالعلا",
    titleEn: "Desert Sanctuary Documentary - AlUla Luxury Resort",
    clientAr: "مجموعة ضيافة عالمية",
    clientEn: "Global Luxury Hospitality",
    locationAr: "العلا، جبال وادي عِشار",
    locationEn: "AlUla, Ashar Valley",
    category: "cinematic",
    categoryLabelAr: "سينمائي وثائقي",
    categoryLabelEn: "Cinematic Doc",
    type: "video",
    poster: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-sun-setting-behind-a-mountain-range-26068-large.mp4",
    aspectRatio: "wide",
    cameraGear: "Sony FX9 Full-Frame Cinema + Angenieux EZ Zooms",
    colorScience: "Warm Sandstone & Sunset Bronze Grade",
    descriptionAr: "توثيق جمالي لامتزاج الهندسة المعمارية الحديثة مع صخور العلا وتدرجات الرمال الذهبية في ساعة الغروب الساحرة.",
    descriptionEn: "Harmonizing contemporary brutalist architecture with the mystical rock canyons and golden dunes of AlUla at golden hour.",
    awards: ["Tourism Film Laureate"]
  }
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: "Boulevard Riyadh", labelAr: "بوليفارد سيتي", labelEn: "Boulevard Riyadh", logoText: "BOULEVARD" },
  { name: "Diriyah Gate", labelAr: "بوابة الدرعية", labelEn: "Diriyah Company", logoText: "DIRIYAH" },
  { name: "AlUla Oasis", labelAr: "لحظات العلا", labelEn: "AlUla Moments", logoText: "ALULA" },
  { name: "NEOM Horizon", labelAr: "نيوم", labelEn: "NEOM", logoText: "NEOM" },
  { name: "Kingdom Holding", labelAr: "المملكة القابضة", labelEn: "Kingdom Holding", logoText: "KINGDOM" },
  { name: "Roshn Group", labelAr: "مجموعة روشن", labelEn: "ROSHN", logoText: "ROSHN" }
];

export const COLOR_GRADING_COMPARISON = {
  titleAr: "مختبر الألوان السينمائي | The Color Suite",
  subtitleAr: "شوف كيف تتحوّل اللقطة الخام (RAW Log) إلى صورة سينمائية متكاملة بمعالجة لونية متقدمة عبر (DaVinci Resolve).",
  titleEn: "Cinematic Color Suite | Studio Signature Grade",
  subtitleEn: "Witness how flat RAW Log sensor data transforms into a cinematic masterpiece through advanced color grading in DaVinci Resolve.",
  badgeRawAr: "خام LOG غير معالج",
  badgeRawEn: "RAW LOG FLAT",
  badgeGradeAr: "تلوين ڤيلورا الذهبي ACES",
  badgeGradeEn: "VELORA SIGNATURE GOLD GRADE",
  // High quality representative comparison images
  // We can also apply dynamic CSS filters to raw log to make it perfectly flat desaturated desaturated/lifted blacks vs high-contrast golden punch
  imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
  cameraLabel: "Shot on ARRI Alexa Mini LF | LogC3 RAW | 4.5K Open Gate",
  gradingSpecsAr: "ACEScct Gamut • Kodak 2383 Print Density • 14-Stop Dynamic Range Recovery • Film Halation & 35mm Grain",
  gradingSpecsEn: "ACEScct Gamut • Kodak 2383 Print Density • 14-Stop Dynamic Range Recovery • Film Halation & 35mm Grain"
};

export const CITIES_LIST = [
  { id: "riyadh", ar: "الرياض", en: "Riyadh" },
  { id: "jeddah", ar: "جدة والساحل الغربي", en: "Jeddah & Western Coast" },
  { id: "eastern", ar: "المنطقة الشرقية (الخبر، الدمام)", en: "Eastern Province (Khobar, Dammam)" },
  { id: "alula", ar: "العلا", en: "AlUla" },
  { id: "neom", ar: "نيوم والمشاريع الكبرى", en: "NEOM & Megaprojects" },
  { id: "other", ar: "موقع آخر بالمملكة / دول الخليج", en: "Other KSA Location / GCC" }
];
