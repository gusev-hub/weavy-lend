
import React from 'react';
import { Package, Target, Factory, Clapperboard, Banknote, Sparkles } from 'lucide-react';

const GRID_ITEMS = [
  { 
    icon: <Package />, 
    title: 'Повторяемый пайплайн', 
    text: 'Концепт → Варианты → Альбом за 3–5 дней. Собрали один раз — переиспользуете на каждом следующем проекте без настройки.' 
  },
  { 
    icon: <Target />, 
    title: 'Управляемые правки', 
    text: 'Замена материалов, света и деталей через маски или по одному промпту — без перегенерации всего кадра. «Поменяй пол» — готово за 2 минуты.' 
  },
  { 
    icon: <Factory />, 
    title: 'Дизайн-приложение для команды', 
    text: 'Упакуйте пайплайн в «приложение»: ассистент или стажёр генерирует варианты по вашим правилам, не ломая настройки.' 
  },
  { 
    icon: <Banknote />, 
    title: 'Понятная экономика', 
    text: 'AI-визуализация: 8 000–10 000 ₽/мес на студию. Дешевле одного фриланс-рендера — окупается с первого проекта.' 
  },
];

const WIDE_ITEM = {
  icon: <Clapperboard />,
  title: 'ВИДЕОКОНТЕНТ ДЛЯ СОЦСЕТЕЙ',
  text: 'Муд-ролики 15–30 сек рождаются прямо в пайплайне — готовый контент для Telegram, Рилс и портфолио без отдельного продакшна.'
};

export const Solution: React.FC = () => {
  return (
    <section id="solution" className="relative py-24 bg-[#f7f8f8] dark:bg-[#0c0c0e] transition-colors duration-300 overflow-visible">
      {/* Background Atmospheric Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-12%] left-[-12%] w-[62%] h-[62%] bg-terracotta/22 dark:bg-terracotta/[0.14] blur-[185px] rounded-full" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[62%] h-[62%] bg-artevrika/24 dark:bg-artevrika/[0.14] blur-[190px] rounded-full" />
        <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[52%] h-[52%] bg-[radial-gradient(circle,rgba(56,211,159,0.2)_0%,rgba(242,81,81,0.12)_45%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(56,211,159,0.08)_0%,rgba(242,81,81,0.06)_45%,transparent_72%)] blur-[115px] rounded-full" />
      </div>

      <div className="container-fluid relative z-10">
        <div className="mb-20">
          <h2 className="text-[clamp(28px,4vw,48px)] font-heading font-bold mb-4 tracking-tighter leading-[0.9] dark:text-white text-zinc-900 uppercase">
            После курса ваш процесс <br />
            <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">выглядит так</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-start">
          {/* Left Side: Benefits */}
          <div className="xl:col-span-7 space-y-16">
            {/* 2x2 Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 md:gap-y-16">
              {GRID_ITEMS.map((item, i) => (
                <div 
                  key={i} 
                  className="relative px-8 pb-8 pt-14 rounded-[2.5rem] bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 backdrop-blur-sm hover:ring-[6px] hover:ring-terracotta/20 hover:border-terracotta/35 hover:-translate-y-1 transition-all duration-300 group shadow-lg hover:shadow-2xl flex flex-col gap-5 overflow-visible"
                >
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-artevrika/12 via-transparent to-terracotta/14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Floating Icon */}
                  <div className="absolute -top-7 left-8 w-14 h-14 rounded-2xl flex items-center justify-center bg-white dark:bg-zinc-800 text-terracotta border border-zinc-100 dark:border-zinc-700 shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110 flex-shrink-0 z-20">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 22, strokeWidth: 2.5 })}
                  </div>
                  
                  <h4 className="relative z-10 text-[clamp(13px,1.5vw,16px)] font-heading font-bold tracking-tight dark:text-white text-zinc-900 uppercase leading-tight break-words hyphens-auto">
                    {item.title}
                  </h4>
                  
                  <p className="relative z-10 text-[13px] md:text-[14px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Wide Compact Video Card */}
            <div 
              className="p-8 md:p-10 rounded-[3rem] bg-white/40 dark:bg-[#0e1210]/60 border border-zinc-200 dark:border-artevrika/20 backdrop-blur-md hover:ring-[6px] hover:ring-artevrika/20 hover:border-artevrika/40 hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
            >
              <div className="relative z-10 w-16 h-16 rounded-[1.25rem] flex items-center justify-center bg-zinc-50 dark:bg-artevrika/10 text-artevrika border border-zinc-100 dark:border-artevrika/30 shadow-lg flex-shrink-0">
                {React.cloneElement(WIDE_ITEM.icon as React.ReactElement<any>, { size: 32, strokeWidth: 2 })}
              </div>
              
              <div className="relative z-10 space-y-3 flex-1 text-center md:text-left">
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                   <h4 className="text-[clamp(14px,1.8vw,18px)] font-heading font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none break-words">
                     {WIDE_ITEM.title}
                   </h4>
                 </div>
                 <p className="text-[13px] md:text-[14px] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                   {WIDE_ITEM.text}
                 </p>
              </div>

              {/* Internal green card glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-artevrika/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none opacity-40" />
            </div>
          </div>

          {/* Right Side: Comparison Table */}
          <div className="xl:col-span-5 w-full rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-200 dark:border-white/5 overflow-hidden bg-white/40 dark:bg-[#08080a]/60 backdrop-blur-xl p-2 md:p-3 shadow-2xl transition-all duration-300 hover:ring-[6px] hover:ring-terracotta/10">
            <div className="bg-white/80 dark:bg-[#0c0c0e]/80 rounded-[2.2rem] md:rounded-[3rem] overflow-x-auto border border-zinc-100 dark:border-zinc-800 flex-grow shadow-inner scrollbar-hide">
              <table className="w-full text-left border-collapse table-fixed min-w-[320px]">
                <colgroup>
                  <col className="w-[30%]" />
                  <col className="w-[30%]" />
                  <col className="w-[40%]" />
                </colgroup>
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-black/20 font-heading">
                    <th className="p-3 md:p-7 text-[8px] md:text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.08em] md:tracking-[0.2em] leading-none whitespace-normal break-words">Этап</th>
                    <th className="p-3 md:p-7 text-[8px] md:text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.08em] md:tracking-[0.2em] leading-none text-center whitespace-normal break-words">Без AI</th>
                    <th className="p-3 md:p-7 text-[8px] md:text-[9px] font-black uppercase tracking-[0.08em] md:tracking-[0.2em] text-terracotta leading-tight text-center bg-terracotta/[0.03] whitespace-normal break-words">
                      <span className="hidden md:inline">C weavy-пайплайном</span>
                      <span className="md:hidden">C weavy.ai</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="font-sans">
                  {[
                    { stage: 'Концепты', traditional: '10–14 дн.', ai: '1 день' },
                    { stage: 'Правки', traditional: '5–7 дн.', ai: '0.5 дня' },
                    { stage: 'Финалы', traditional: '5–7 дн.', ai: '0.5–1 дн.' },
                    { stage: 'Видео', traditional: 'Отдельный продакшн', ai: 'Сразу в вашем пайплайне' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800/50 group transition-colors">
                      <td className="p-3 md:p-7 font-bold dark:text-white text-zinc-800 text-[11px] md:text-[13px] leading-tight whitespace-normal break-words">{row.stage}</td>
                      <td className="p-3 md:p-7 font-medium text-zinc-500 dark:text-zinc-400 text-[11px] md:text-[13px] text-center whitespace-normal break-words">{row.traditional}</td>
                      <td className="p-3 md:p-7 font-bold text-terracotta text-[11px] md:text-[13px] text-center bg-terracotta/[0.03] group-hover:bg-terracotta/[0.06] transition-colors whitespace-normal break-words">{row.ai}</td>
                    </tr>
                  ))}
                  {/* Summary Row */}
                  <tr className="bg-terracotta/[0.06] dark:bg-[#150f0f] border-t-2 border-terracotta/20">
                    <td className="p-5 md:p-8 font-heading font-black uppercase text-terracotta text-[11px] md:text-[13px] tracking-tight">ИТОГО</td>
                    <td className="p-5 md:p-8 font-sans font-bold text-zinc-500 dark:text-zinc-400 text-[12px] md:text-[14px] text-center whitespace-normal break-words">20–28 дн.</td>
                    <td className="p-5 md:p-8 font-heading font-black text-terracotta text-[14px] md:text-[24px] tracking-tighter text-center whitespace-normal break-words">2–3 дня</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-4 md:py-6 flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-terracotta" fill="currentColor" />
              <span className="text-[9px] md:text-[10px] font-heading font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.15em] md:tracking-[0.3em]">УСКОРЕНИЕ В 8–10 РАЗ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
