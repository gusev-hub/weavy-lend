
import React from 'react';
import { Clapperboard, Calendar, Package, MessageCircle } from 'lucide-react';
import { COLORS } from '../constants';

const FORMATS = [
  { icon: <Clapperboard />, title: '40+ Видео-уроков', text: 'Короткие и емкие уроки по 15-20 минут с четким планом действий.' },
  { icon: <Calendar />, title: 'Гибкий график', text: 'Учитесь в своем темпе. Доступ к материалам открывается сразу.' },
  { icon: <Package />, title: 'Готовые шаблоны', text: 'Пакеты промптов и настроек для моментального старта в системе.' },
  { icon: <MessageCircle />, title: 'Поддержка', text: 'Закрытый чат в Telegram, где мы разбираем ваши реальные проекты.' },
];

export const Format: React.FC = () => {
  return (
    <section className="py-40 bg-softzinc dark:bg-[#0b0b0d] transition-colors duration-500 overflow-visible">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-4xl lg:text-7xl font-heading font-black mb-32 text-center italic tracking-tighter uppercase dark:text-white text-zinc-900">Как мы учим</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {FORMATS.map((f, i) => (
            <div 
              key={i} 
              className="relative group p-10 rounded-[3rem] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 hover:border-artevrika transition-all duration-300 hover:ring-[8px] hover:ring-artevrika/10 shadow-xl"
            >
              <div 
                className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 transition-all group-hover:rotate-12 group-hover:scale-110 bg-artevrika/10 text-artevrika"
              >
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <h4 className="text-xl font-heading font-black mb-6 tracking-tight leading-tight uppercase dark:text-white text-zinc-900">{f.title}</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans font-medium">{f.text}</p>
              
              <div className="absolute top-8 right-8 text-4xl font-heading font-black text-zinc-100 dark:text-white/5 select-none transition-colors group-hover:text-artevrika/10">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
