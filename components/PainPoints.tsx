
import React from 'react';
import { motion } from 'framer-motion';
import { Hourglass, Dices, RefreshCw, Sofa } from 'lucide-react';

const POINTS = [
  {
    icon: <Hourglass />,
    title: 'Недели на концепты',
    text: 'Тратите 2–3 недели на визуализации, а клиент просит "ещё 3 варианта" — и всё сначала.',
  },
  {
    icon: <Dices />,
    title: 'AI-картинки без контроля',
    text: 'Генерируете в Midjourney красивые, но неповторяемые картинки. Каждый новый кадр — лотерея.',
  },
  {
    icon: <RefreshCw />,
    title: 'Каждый проект — с нуля',
    text: 'Нет системы. Нет шаблонов. Нет стандарта. Каждый новый объект — заново изобретаете процесс.',
  },
  {
    icon: <Sofa />,
    title: 'Точечные правки — кошмар',
    text: 'Клиент просит сменить диван или плитку — перегенерируете весь кадр целиком, теряя остальное.',
  }
];

export const PainPoints: React.FC = () => {
  return (
    <section id="pain-points" className="py-32 bg-white dark:bg-[#0c0c0e] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 overflow-visible">
      <div className="container-fluid">
        <div className="text-center mb-24">
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-heading font-bold mb-4 tracking-tighter dark:text-white text-zinc-900 uppercase leading-none">Знакомо?</h2>
          <p className="text-[15px] md:text-[17px] font-sans font-normal text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Дизайн-индустрия меняется. Старые методы становятся слишком медленными.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 max-w-5xl mx-auto">
          {POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative px-8 pb-8 pt-14 md:px-10 md:pb-10 md:pt-16 rounded-[2.5rem] bg-[#1b4b4a] dark:bg-[#121214] border border-artevrika/35 dark:border-white/5 hover:ring-[6px] hover:ring-artevrika/25 transition-all duration-300 group shadow-xl flex flex-col items-start h-full overflow-visible"
            >
              {/* Floating Icon */}
              <div className="absolute -top-7 left-8 w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 dark:bg-zinc-800 text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 border border-white/20 dark:border-white/5">
                {React.cloneElement(point.icon as React.ReactElement<any>, { size: 22, strokeWidth: 2.5 })}
              </div>

              <h3 className="text-[14px] sm:text-[15px] md:text-[17px] font-heading font-bold mb-3 tracking-tight text-white leading-tight uppercase">{point.title}</h3>
              <p className="text-[13px] md:text-[14px] font-sans font-medium text-white/90 leading-relaxed">
                {point.text}
              </p>
              
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-artevrika/[0.08] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
