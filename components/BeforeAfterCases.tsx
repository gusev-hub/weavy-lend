
import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

interface CaseItemProps {
  id: number;
  before: string;
  after: string;
  title: string;
  description: string;
  badge: string;
  thumbnailImage?: string;
  slides?: string[];
}

interface PlanTo3DCardProps {
  planImage: string;
  renderImage: string;
  thumbnailImage?: string;
  caption: string;
  planAlt: string;
  renderAlt: string;
  title: string;
  description: string;
}

const BeforeAfterSlider: React.FC<CaseItemProps> = ({ before, after, title, description, badge }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const newPos = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPos)));
  };

  return (
    <div className="flex flex-col gap-6 group">
      <div 
        ref={containerRef}
        className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 cursor-ew-resize select-none transition-all duration-500 hover:ring-[12px] hover:ring-terracotta/10 hover:border-terracotta/30"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image */}
        <img src={after} className="absolute inset-0 w-full h-full object-cover" alt={`Результат AI-дизайна: ${title}`} loading="lazy" />
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={before} className="absolute inset-0 w-full h-full object-cover" alt={`Исходное изображение: ${title}`} loading="lazy" />
          <div className="absolute inset-0 bg-black/20" /> 
        </div>
        
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white/40 backdrop-blur-md z-30 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-2xl border-2 border-black/10 group-active:scale-110 transition-transform">
            <MoveHorizontal size={20} />
          </div>
        </div>

        {/* Labels - Slightly smaller badges */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.25em] text-white/80 font-heading">
            До
          </div>
        </div>
        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <div className="bg-terracotta/90 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-[0.25em] text-white font-heading shadow-xl">
            После AI
          </div>
        </div>
      </div>

      <div className="px-2">
        <h4 className="text-[18px] md:text-[22px] font-heading font-bold dark:text-white text-[#1c3e42] uppercase tracking-tight mb-3 leading-none transition-colors group-hover:text-terracotta">
          {title}
        </h4>
        <p className="text-[14px] md:text-[16px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

const PlanTo3DCard: React.FC<PlanTo3DCardProps> = ({
  planImage,
  renderImage,
  thumbnailImage,
  caption,
  planAlt,
  renderAlt,
  title,
  description,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [perspective, setPerspective] = useState(2200);
  const [maxRotateX, setMaxRotateX] = useState(22);

  useEffect(() => {
    const updateForViewport = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setPerspective(1400);
        setMaxRotateX(22);
        return;
      }
      if (width < 1024) {
        setPerspective(1800);
        setMaxRotateX(22);
        return;
      }
      setPerspective(2200);
      setMaxRotateX(22);
    };

    updateForViewport();
    window.addEventListener('resize', updateForViewport);
    return () => window.removeEventListener('resize', updateForViewport);
  }, []);

  useEffect(() => {
    if (!shouldReduceMotion || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['end end', 'center center'],
  });

  const planRotateXRaw = useTransform(scrollYProgress, [0, 0.25, 0.58, 1], [0, 0, maxRotateX, maxRotateX]);
  const planScaleRaw = useTransform(scrollYProgress, [0, 0.25, 0.58, 1], [1, 1, 0.97, 0.97]);
  const planOpacityRaw = useTransform(scrollYProgress, [0, 0.75, 0.9, 1], [1, 1, 0, 0]);
  const renderOpacityRaw = useTransform(scrollYProgress, [0, 0.9, 1], [0, 0, 1]);
  const renderScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const planRotateX = useSpring(planRotateXRaw, { stiffness: 110, damping: 22, mass: 0.6 });
  const planScale = useSpring(planScaleRaw, { stiffness: 110, damping: 22, mass: 0.6 });
  const planOpacity = useSpring(planOpacityRaw, { stiffness: 120, damping: 24, mass: 0.55 });
  const renderOpacity = useSpring(renderOpacityRaw, { stiffness: 120, damping: 24, mass: 0.55 });
  const renderScale = useSpring(renderScaleRaw, { stiffness: 110, damping: 22, mass: 0.6 });
  const thumbnailOpacityRaw = useTransform(scrollYProgress, [0, 0.88, 0.95, 1], [0, 0, 1, 1]);
  const thumbnailOpacity = useSpring(thumbnailOpacityRaw, { stiffness: 120, damping: 24, mass: 0.55 });

  return (
    <div className="flex flex-col gap-6 group">
      <div
        ref={cardRef}
        className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 transition-all duration-500 hover:ring-[12px] hover:ring-terracotta/10 hover:border-terracotta/30"
        style={{ perspective: `${perspective}px` }}
      >
        <motion.div
          className="absolute inset-0 z-10"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: renderOpacity,
                  scale: renderScale,
                  rotateX: 0,
                }
          }
          initial={shouldReduceMotion ? { opacity: 0 } : false}
          animate={shouldReduceMotion ? { opacity: isVisible ? 1 : 0 } : undefined}
          transition={shouldReduceMotion ? { duration: 0.3, ease: 'easeInOut' } : undefined}
        >
          <img src={renderImage} className="absolute inset-0 h-full w-full object-cover" alt={renderAlt} loading="lazy" />
        </motion.div>

        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 z-20"
            style={{
              rotateX: planRotateX,
              scale: planScale,
              opacity: planOpacity,
              transformOrigin: 'center bottom',
              transformStyle: 'preserve-3d',
            }}
          >
            <img src={planImage} className="absolute inset-0 h-full w-full object-cover" alt={planAlt} loading="lazy" />
          </motion.div>
        )}

        <motion.div
          className="absolute right-6 bottom-6 z-30 pointer-events-none"
          style={{ opacity: shouldReduceMotion ? 1 : thumbnailOpacity }}
        >
          <div className="h-20 w-28 md:h-24 md:w-36 overflow-hidden rounded-2xl border border-white/35 bg-white/35 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <img src={thumbnailImage || planImage} className="h-full w-full object-contain opacity-85" alt="Миниатюра плана" loading="lazy" />
          </div>
        </motion.div>
      </div>

      <div className="px-2">
        <h4 className="text-[18px] md:text-[22px] font-heading font-bold dark:text-white text-[#1c3e42] uppercase tracking-tight mb-3 leading-none transition-colors group-hover:text-terracotta">
          {title}
        </h4>
        <p className="text-[14px] md:text-[16px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

const LightScenariosCard: React.FC<CaseItemProps> = ({ slides = [], title, description, badge }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<number | null>(null);
  const safeSlides = slides.length > 0 ? slides : [];

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % safeSlides.length);
    }, 2800);
  };

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    resetTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [safeSlides.length]);

  const handleSlideClick = (index: number) => {
    setActiveSlide(index);
    resetTimer();
  };

  if (safeSlides.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 group">
      <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 transition-all duration-500 hover:ring-[12px] hover:ring-terracotta/10 hover:border-terracotta/30">
        {safeSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`${title} — вариант ${index + 1}`}
            loading="lazy"
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <div className="bg-black/55 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/15 text-[10px] font-black uppercase tracking-[0.2em] text-white/85 font-heading">
            Сцена {activeSlide + 1} / {safeSlides.length}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {safeSlides.map((slide, index) => (
            <button
              key={slide}
              onClick={() => handleSlideClick(index)}
              className={`relative h-9 w-14 md:h-11 md:w-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === activeSlide
                  ? 'border-terracotta shadow-lg shadow-terracotta/40 scale-105'
                  : 'border-white/25 opacity-60 hover:opacity-90 hover:border-white/50'
              }`}
            >
              <img src={slide} className="h-full w-full object-cover" alt={`Миниатюра ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-2">
        <h4 className="text-[18px] md:text-[22px] font-heading font-bold dark:text-white text-[#1c3e42] uppercase tracking-tight mb-3 leading-none transition-colors group-hover:text-terracotta">
          {title}
        </h4>
        <p className="text-[14px] md:text-[16px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

const MaterialSwapCard: React.FC<CaseItemProps> = ({ slides = [], title, description, badge }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<number | null>(null);
  const safeSlides = slides.length > 0 ? slides : [];

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % safeSlides.length);
    }, 3500);
  };

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    resetTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [safeSlides.length]);

  const handleSlideClick = (index: number) => {
    setActiveSlide(index);
    resetTimer();
  };

  if (safeSlides.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 group">
      <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 transition-all duration-500 hover:ring-[12px] hover:ring-terracotta/10 hover:border-terracotta/30">
        {safeSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`${title} — вариант материала ${index + 1}`}
            loading="lazy"
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <div className="bg-black/55 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/15 text-[10px] font-black uppercase tracking-[0.2em] text-white/85 font-heading">
            Вариант {activeSlide + 1} / {safeSlides.length}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {safeSlides.map((slide, index) => (
            <button
              key={slide}
              onClick={() => handleSlideClick(index)}
              className={`relative h-10 w-16 md:h-12 md:w-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === activeSlide
                  ? 'border-terracotta shadow-lg shadow-terracotta/40 scale-105'
                  : 'border-white/25 opacity-60 hover:opacity-90 hover:border-white/50'
              }`}
            >
              <img src={slide} className="h-full w-full object-cover" alt={`Миниатюра материала ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-2">
        <h4 className="text-[18px] md:text-[22px] font-heading font-bold dark:text-white text-[#1c3e42] uppercase tracking-tight mb-3 leading-none transition-colors group-hover:text-terracotta">
          {title}
        </h4>
        <p className="text-[14px] md:text-[16px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

const CASES = [
  {
    id: 1,
    badge: "Build to Design",
    title: "Дизайн поверх стройки",
    description: "Показал клиенту финал прямо на фото объекта — фотореалистичная визуализация того же ракурса поверх черновой отделки.",
    before: "/cases/01-build-to-design/1.webp",
    after: "/cases/01-build-to-design/2.webp",
  },
  {
    id: 2,
    badge: "Virtual Staging",
    title: "Виртуальная меблировка",
    description: "Из «коробки» в готовый интерьер за 3 минуты. Идеально для показа потенциала пустых помещений.",
    before: "/cases/03-furtiture-virtual/before.webp",
    after: "/cases/03-furtiture-virtual/after.webp",
  },
  {
    id: 3,
    badge: "2D to 3D Pipeline",
    title: "Из плана в 3D",
    description: "Трансформация технического чертежа в объемную визуализацию для быстрого согласования концепта.",
    before: "/cases/02-2d-to-3d/2d.webp",
    after: "/cases/02-2d-to-3d/3d.webp",
    thumbnailImage: "/cases/02-2d-to-3d/tmbl.webp",
  },
  {
    id: 4,
    badge: "Light Scenarios",
    title: "Смена освещения",
    description: "4 сценария света за один запуск. Мгновенная проверка атмосферы: от утреннего солнца до вечернего уюта.",
    before: "/cases/04-light/1.webp",
    after: "/cases/04-light/2.webp",
    slides: [
      "/cases/04-light/1.webp",
      "/cases/04-light/2.webp",
      "/cases/04-light/3.webp",
      "/cases/04-light/4.webp",
      "/cases/04-light/5.webp",
    ],
  },
  {
    id: 5,
    badge: "Material Swap",
    title: "Замена материалов",
    description: "«Мрамор или дерево?» — решайте за 5 минут. Локальная замена текстур без перегенерации всего кадра.",
    before: "/cases/05-replace/1.webp",
    after: "/cases/05-replace/2.webp",
    slides: [
      "/cases/05-replace/1.webp",
      "/cases/05-replace/2.webp",
      "/cases/05-replace/3.webp",
      "/cases/05-replace/4.webp",
    ],
  }
];

export const BeforeAfterCases: React.FC = () => {
  return (
    <section id="cases" className="py-24 md:py-32 bg-softzinc dark:bg-[#08080a] transition-colors duration-500 overflow-hidden">
      <div className="container-fluid">
        <div className="max-w-4xl mb-20">
          <span className="text-artevrika text-[10px] font-black uppercase tracking-[0.5em] mb-6 block font-heading">Кейсы до / после</span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-heading font-bold mb-10 tracking-tighter dark:text-white text-[#1c3e42] leading-[0.95] uppercase">
            Результаты за <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">минуты</span>, <br />
            не за недели
          </h2>
          <p className="text-[16px] md:text-[18px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Посмотрите, как weavy.ai превращает базовые вводные данные в профессиональные визуализации.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {CASES.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {item.id === 3 ? (
                <PlanTo3DCard
                  planImage={item.before}
                  renderImage={item.after}
                  thumbnailImage={item.thumbnailImage}
                  caption={item.badge}
                  planAlt="2D-план помещения"
                  renderAlt="3D-рендер интерьера"
                  title={item.title}
                  description={item.description}
                />
              ) : item.id === 4 ? (
                <LightScenariosCard {...item} />
              ) : item.id === 5 ? (
                <MaterialSwapCard {...item} />
              ) : (
                <BeforeAfterSlider {...item} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
