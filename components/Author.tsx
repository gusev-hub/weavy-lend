
import React from 'react';
import { Instagram, Send } from 'lucide-react';

const AUTHOR_PHOTO_PRIMARY = 'https://optim.tildacdn.com/tild3335-6130-4166-b162-643831633864/-/cover/522x736/center/center/-/format/webp/OBA_9808_1.jpg.webp';
const AUTHOR_PHOTO_FALLBACK = 'https://thb.tildacdn.pro/tild3833-3663-4633-b433-613162616563/-/empty/P145524222.jpg';

const WeavyMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 43 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11.745 3H1v23.885h10.745zM19.558 26.89H8.813V39.5h10.745zM35.186 26.89H24.442V39.5h10.744zM27.373 3H16.63v23.885h10.744zM43 3H32.256v23.885H43z"
    />
  </svg>
);

export const Author: React.FC = () => {
  return (
    <section className="py-40 bg-darkgreen transition-colors">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="group relative rounded-[5rem]">
          <div className="pointer-events-none absolute -inset-2 rounded-[calc(5rem+8px)] opacity-0 group-hover:opacity-70 transition-opacity duration-500 bg-gradient-to-r from-artevrika/80 via-[#ffbb00]/80 via-terracotta/80 via-[#ffbb00]/80 to-artevrika/80" />
          <div className="relative p-16 lg:p-24 rounded-[5rem] bg-[#0f1f24]/95 dark:bg-[#0d171b]/95 border-2 border-white/10 flex flex-col md:flex-row items-center gap-16 shadow-2xl backdrop-blur-xl">
          <div className="relative group">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-[4rem] overflow-hidden border-8 border-zinc-50 dark:border-darkgreen shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <img
                src={AUTHOR_PHOTO_PRIMARY}
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.src !== AUTHOR_PHOTO_FALLBACK) image.src = AUTHOR_PHOTO_FALLBACK;
                }}
                className="w-full h-full object-cover"
                alt="Алексей Гусев — автор курса AI-дизайн интерьера, архитектор"
                loading="lazy"
              />
            </div>
            <div 
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-4xl shadow-2xl rotate-12 bg-terracotta"
            >
              <WeavyMark className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div>
              <h3 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter text-white">Алексей Гусев</h3>
              <p className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px] inline-flex items-center gap-2">
                <WeavyMark className="w-4 h-4 text-terracotta" />
                Автор курса • AI-Архитектор
              </p>
            </div>
            <p className="text-zinc-300 italic text-xl lg:text-2xl leading-relaxed font-medium">
              «Моя миссия — освободить дизайнера от технического шума. Я потратил 2 года на создание системы, чтобы вы получили результат за 6 недель.»
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6 pt-6">
              <a href="#" className="p-4 rounded-full bg-white/5 text-zinc-200 hover:bg-artevrika hover:text-white transition-all shadow-lg"><Instagram size={28} /></a>
              <a href="#" className="p-4 rounded-full bg-white/5 text-zinc-200 hover:bg-artevrika hover:text-white transition-all shadow-lg"><Send size={28} /></a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
