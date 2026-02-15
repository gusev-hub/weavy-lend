
import React from 'react';
import { Instagram, Youtube, Send, Mail } from 'lucide-react';
import { COLORS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 bg-softzinc dark:bg-darkgreen border-t border-zinc-200 dark:border-white/10 transition-colors">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://static.tildacdn.pro/tild6364-6662-4663-a639-363061656262/school_artevrika_new.svg" 
                alt="Артэврика" 
                className="h-6 w-auto dark:invert dark:brightness-200"
              />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
              Первая в СНГ академия <br /> профессионального AI-дизайна.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 hover:text-artevrika transition-all"><Instagram size={24} /></a>
              <a href="#" className="text-zinc-500 hover:text-artevrika transition-all"><Youtube size={24} /></a>
              <a href="#" className="text-zinc-500 hover:text-artevrika transition-all"><Send size={24} /></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-zinc-400 dark:text-zinc-600">Навигация</h5>
            <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <li><a href="#programma" className="hover:text-artevrika transition-colors">Программа</a></li>
              <li><a href="#cases" className="hover:text-artevrika transition-colors">Кейсы</a></li>
              <li><a href="#pricing" className="hover:text-artevrika transition-colors">Тарифы</a></li>
              <li><a href="#faq" className="hover:text-artevrika transition-colors">Вопросы</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-zinc-400 dark:text-zinc-600">Академия</h5>
            <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <li><a href="#" className="hover:text-artevrika transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-artevrika transition-colors">Договор оферты</a></li>
              <li><a href="#" className="hover:text-artevrika transition-colors">Приватность</a></li>
              <li><a href="#" className="hover:text-artevrika transition-colors">Вакансии</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-zinc-400 dark:text-zinc-600">Контакты</h5>
            <div className="space-y-6">
              <a href="mailto:hello@artevrika.school" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-artevrika transition-colors">
                <Mail size={18} /> hello@artevrika.school
              </a>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-600 font-medium leading-loose">
                ООО "АРТЭВРИКА" <br />
                ОГРН: 1234567890123 <br />
                ИНН: 1234567890
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-zinc-200 dark:border-white/10 gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          <p>© 2024 Артэврика — Все права защищены</p>
          <div className="flex gap-12">
            <span>Создано с ✨ и AI</span>
            <span>Академия Будущего</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
