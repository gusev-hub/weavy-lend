
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, Sparkles } from 'lucide-react';

interface CaseItemProps {
  before: string;
  after: string;
  title: string;
  description: string;
  badge: string;
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
        <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
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

        {/* Info Badge */}
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden md:block">
          <div className="bg-white/10 backdrop-blur-2xl px-5 py-2.5 rounded-2xl border border-white/10 text-[11px] font-bold text-white flex items-center gap-2.5">
             <Sparkles size={14} className="text-artevrika" />
             {badge}
          </div>
        </div>
      </div>

      <div className="px-2">
        <h4 className="text-[18px] md:text-[22px] font-heading font-bold dark:text-white text-zinc-900 uppercase tracking-tight mb-3 leading-none transition-colors group-hover:text-terracotta">
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
    badge: "Virtual Staging",
    title: "Виртуальная меблировка",
    description: "Из «коробки» в готовый интерьер за 3 минуты. Идеально для показа потенциала пустых помещений.",
    before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80",
    after: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
  },
  {
    id: 2,
    badge: "2D to 3D Pipeline",
    title: "Из плана в 3D",
    description: "Трансформация технического чертежа в объемную визуализацию для быстрого согласования концепта.",
    before: "https://images.unsplash.com/photo-1503387762-592dea58ef21?w=1600&q=80",
    after: "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?w=1600&q=80",
  },
  {
    id: 3,
    badge: "Light Scenarios",
    title: "Смена освещения",
    description: "4 сценария света за один запуск. Мгновенная проверка атмосферы: от утреннего солнца до вечернего уюта.",
    before: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    after: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=1600&q=80",
  },
  {
    id: 4,
    badge: "Material Swap",
    title: "Замена материалов",
    description: "«Мрамор или дерево?» — решайте за 5 минут. Локальная замена текстур без перегенерации всего кадра.",
    before: "https://images.unsplash.com/photo-1536376074432-cd2025170ad0?w=1600&q=80",
    after: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=1600&q=80",
  }
];

export const BeforeAfterCases: React.FC = () => {
  return (
    <section id="cases" className="py-24 md:py-32 bg-softzinc dark:bg-[#08080a] transition-colors duration-500 overflow-hidden">
      <div className="container-fluid">
        <div className="max-w-4xl mb-20">
          <span className="text-artevrika text-[10px] font-black uppercase tracking-[0.5em] mb-6 block font-heading">Кейсы до / после</span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-heading font-bold mb-10 tracking-tighter dark:text-white text-zinc-900 leading-[0.95] uppercase">
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
              <BeforeAfterSlider {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
