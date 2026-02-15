
import React from 'react';
import { Instagram, Linkedin, Send } from 'lucide-react';
import { COLORS } from '../constants';

export const Author: React.FC = () => {
  return (
    <section className="py-40 bg-softzinc dark:bg-darkgreen transition-colors">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="p-16 lg:p-24 rounded-[5rem] bg-white dark:bg-white/5 border-2 border-zinc-100 dark:border-white/10 flex flex-col md:flex-row items-center gap-16 shadow-2xl backdrop-blur-xl">
          <div className="relative group">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-[4rem] overflow-hidden border-8 border-zinc-50 dark:border-darkgreen shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <img src="https://picsum.photos/seed/author/600/600" className="w-full h-full object-cover" alt="Алексей Гусев" />
            </div>
            <div 
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-4xl shadow-2xl rotate-12 bg-terracotta"
            >
              w
            </div>
          </div>
          
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div>
              <h3 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter dark:text-white text-zinc-900">Алексей Гусев</h3>
              <p className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Автор курса • AI-Архитектор</p>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 italic text-xl lg:text-2xl leading-relaxed font-medium">
              «Моя миссия — освободить дизайнера от технического шума. Я потратил 2 года на создание системы, чтобы вы получили результат за 6 недель.»
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6 pt-6">
              <a href="#" className="p-4 rounded-full bg-zinc-50 dark:bg-white/5 hover:bg-artevrika hover:text-white transition-all shadow-lg"><Instagram size={28} /></a>
              <a href="#" className="p-4 rounded-full bg-zinc-50 dark:bg-white/5 hover:bg-artevrika hover:text-white transition-all shadow-lg"><Linkedin size={28} /></a>
              <a href="#" className="p-4 rounded-full bg-zinc-50 dark:bg-white/5 hover:bg-artevrika hover:text-white transition-all shadow-lg"><Send size={28} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
