
import React from 'react';
import { 
  ClipboardCheck, 
  Palette, 
  FileText, 
  Wrench, 
  Image as ImageIcon, 
  Smartphone, 
  BookOpen, 
  Clapperboard 
} from 'lucide-react';
import { COLORS } from '../constants';

const ARTIFACTS = [
  { icon: <ClipboardCheck />, title: 'Чек-лист MJ' },
  { icon: <Palette />, title: '500+ промптов' },
  { icon: <FileText />, title: 'Шаблон договора' },
  { icon: <Wrench />, title: 'Custom LoRA' },
  { icon: <ImageIcon />, title: 'Портфолио' },
  { icon: <Smartphone />, title: 'Гайд по Reels' },
  { icon: <BookOpen />, title: 'Книга цвета' },
  { icon: <Clapperboard />, title: 'Пак видео-пресетов' },
];

export const Artifacts: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0c0c0e] transition-colors duration-300 overflow-visible">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl lg:text-5xl font-black mb-16 text-center tracking-tighter dark:text-white text-zinc-900 uppercase">
          Что ты <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">заберёшь</span>
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTIFACTS.map((a, i) => (
            <div 
              key={i} 
              className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 flex flex-col items-center text-center group hover:bg-white dark:hover:bg-zinc-800 hover:border-artevrika transition-all duration-300 hover:ring-[8px] hover:ring-artevrika/10 shadow-md"
            >
              <div 
                className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 bg-zinc-100 dark:bg-zinc-950 text-terracotta shadow-inner"
              >
                {React.cloneElement(a.icon as React.ReactElement<any>, { size: 28, strokeWidth: 2 })}
              </div>
              <p className="font-black text-base dark:text-zinc-100 text-zinc-900 tracking-tight leading-tight uppercase font-heading">{a.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
