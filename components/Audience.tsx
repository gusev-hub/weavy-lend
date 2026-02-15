
import React from 'react';
import { motion } from 'framer-motion';
import { House, Building2, Ruler, Monitor, Trees, Library } from 'lucide-react';
import { COLORS } from '../constants';

const PERSONAS = [
  {
    icon: <House />,
    title: 'Дизайнер интерьера',
    desc: 'Делаете проекты для частных заказчиков. Устали тратить дни на визуализации и правки. Хотите ускориться и давать клиенту больше вариантов.',
    result: 'Повторяемый пайплайн + библиотека шаблонов',
    hoverGradient: 'hover:from-white hover:to-artevrika/[0.04] dark:hover:from-zinc-900/60 dark:hover:to-artevrika/10'
  },
  {
    icon: <Building2 />,
    title: 'Студия дизайна',
    desc: 'Ищете способ стандартизировать AI-процесс в команде. Хотите дать инструмент стажёрам и ассистентам, не теряя контроль качества.',
    result: 'Дизайн-приложение + регламент + командная работа',
    hoverGradient: 'hover:from-white hover:to-terracotta/[0.03] dark:hover:from-zinc-900/60 dark:hover:to-terracotta/10'
  },
  {
    icon: <Ruler />,
    title: 'Архитектор',
    desc: 'Работаете с 3D (Revit/SketchUp/ArchiCAD) и хотите ускориться и концептуальную фазу. Интересует связка 3D viewport → AI-рендер.',
    result: 'Пайплайны по типам входа: 3D-вид, план, скетч, фото',
    hoverGradient: 'hover:from-white hover:to-artevrika/[0.04] dark:hover:from-zinc-900/60 dark:hover:to-artevrika/10'
  },
  {
    icon: <Monitor />,
    title: 'Визуализатор',
    desc: 'Работаете в 3ds Max / Corona / V-Ray и хотите ускориться концептуальную стадию. AI-рендер за минуты вместо часов на просчёт.',
    result: 'Быстрые концепты + серии материалов/света + презентационные борды',
    hoverGradient: 'hover:from-white hover:to-terracotta/[0.03] dark:hover:from-zinc-900/60 dark:hover:to-terracotta/10'
  },
  {
    icon: <Trees />,
    title: 'Ландшафтный дизайнер',
    desc: 'Проектируете сады, террасы и придомовые территории. Хотите показывать реалистичные визуализации без долгого 3D-моделирования.',
    result: 'Пайплайн фото/план → концепт + серии сезонов',
    hoverGradient: 'hover:from-white hover:to-artevrika/[0.04] dark:hover:from-zinc-900/60 dark:hover:to-artevrika/10'
  },
  {
    icon: <Library />,
    title: 'Мебельная компания',
    desc: 'Производите или продаёте мебель и нужно быстро показать заказчику, как изделие выглядит в реальном интерьере. Фотосъёмка каждой позиции — дорого и долго.',
    result: 'Пайплайн виртуальной расстановки + серии интерьеров с вашей мебелью для каталога и соцсетей',
    hoverGradient: 'hover:from-white hover:to-terracotta/[0.03] dark:hover:from-zinc-900/60 dark:hover:to-terracotta/10'
  }
];

export const Audience: React.FC = () => {
  return (
    <section id="audience" className="py-32 md:py-48 bg-softzinc dark:bg-[#0b0b0d] transition-colors relative overflow-hidden">
      <div className="container-fluid relative z-10">
        <div className="text-center mb-32 md:mb-40">
          <span className="font-heading text-[11px] uppercase tracking-[0.6em] text-artevrika font-black mb-8 block">Целевая аудитория</span>
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-heading font-bold mb-10 tracking-tighter dark:text-white text-zinc-900 leading-[0.9] uppercase">
            Для кого <br/><span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">этот курс</span>
          </h2>
          <p className="text-[18px] md:text-[20px] font-sans font-medium text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Программа создана для профессионалов, которые ценят свое время и хотят быть на острие технологий.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-24 md:gap-x-10 md:gap-y-32">
          {PERSONAS.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`lg:col-span-2 px-8 pb-8 pt-16 md:px-10 md:pb-10 md:pt-20 xl:px-14 xl:pb-14 xl:pt-24 rounded-[3.5rem] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 hover:ring-[8px] hover:ring-artevrika/10 transition-all duration-500 group shadow-2xl flex flex-col h-full bg-gradient-to-br from-transparent to-transparent ${p.hoverGradient} relative overflow-visible`}
            >
              {/* Floating Icon: Pops out of the card limits */}
              <div className="absolute -top-8 left-8 md:-top-10 md:left-10 lg:left-14 w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 bg-white dark:bg-zinc-800 text-artevrika shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] border border-zinc-100 dark:border-white/10 z-20">
                {React.cloneElement(p.icon as React.ReactElement<any>, { size: 28, className: 'md:w-9 md:h-9', strokeWidth: 1.5 })}
              </div>
              
              <div className="mb-6 md:mb-8 relative z-10">
                <h3 className="text-[clamp(16px,2vw,24px)] font-heading font-bold dark:text-white text-zinc-900 tracking-tight uppercase leading-[1.1] break-words hyphens-auto" style={{ wordBreak: 'break-word', hyphens: 'auto' } as any}>
                  {p.title}
                </h3>
              </div>
              
              <p className="text-[13px] md:text-[15px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 md:mb-10 flex-grow relative z-10">
                {p.desc}
              </p>
              
              <div className="pt-6 md:pt-8 border-t border-zinc-100 dark:border-white/5 relative z-10">
                <div className="flex items-center gap-2 md:gap-3 text-artevrika mb-2">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] font-heading">Результат:</span>
                </div>
                <p className="text-[12px] md:text-[14px] font-bold dark:text-white text-zinc-800 font-sans tracking-tight leading-tight">
                  {p.result}
                </p>
              </div>

              {/* Decorative subtle light pulse on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-artevrika/5 blur-[60px] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Ambience */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.03] dark:opacity-[0.07] blur-[150px] pointer-events-none rounded-full"
        style={{ background: `radial-gradient(circle, ${COLORS.green} 0%, transparent 70%)` }}
      ></div>
    </section>
  );
};
