
import React, { useState } from 'react';
import { Instagram, Youtube, Send, Mail, Phone, MapPin, ExternalLink, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const footerLinkClass =
    'hover:text-[#f25151] hover:underline decoration-[#f25151] underline-offset-4 transition-colors';

  return (
    <footer className="py-24 bg-[#204042] text-white/85">
      <div className="max-w-[1200px] mx-auto px-6">
        {isAboutOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <button
              aria-label="Закрыть окно о школе"
              onClick={() => setIsAboutOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />
            <div className="relative w-full max-w-[760px] rounded-[2rem] border border-white/12 bg-[#132b2f]/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl p-8 md:p-10">
              <button
                aria-label="Закрыть"
                onClick={() => setIsAboutOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-[#f25151] transition-colors flex items-center justify-center"
              >
                <X size={18} />
              </button>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-artevrika mb-4">О нас</p>
              <h3 className="font-heading text-[30px] leading-[1] font-bold text-white uppercase tracking-tight mb-6">
                Школа Артэврика
              </h3>
              <p className="text-white/80 leading-relaxed text-[16px] mb-5">
                Школа АРТэврика обучает интерьерному дизайну и современным digital-инструментам, включая AI-пайплайны для практикующих дизайнеров.
                Мы соединяем прикладную методику студии, реальную проектную дисциплину и обучение, ориентированное на результат в работе с клиентами.
              </p>
              <p className="text-white/80 leading-relaxed text-[16px] mb-6">
                Наша экспертиза: <span className="font-bold text-white">9 лет школы</span> и{' '}
                <span className="font-bold text-white">19 лет студии</span>.
                Студия АРТэврика основана в 2006 году и передаёт в обучение проверенные практики интерьерных проектов.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://school.artevrika.ru/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[12px] font-black uppercase tracking-[0.14em] text-white/85 hover:text-[#f25151] transition-colors"
                >
                  Сайт школы <ExternalLink size={14} />
                </a>
                <a
                  href="https://artevrika.ru/about"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[12px] font-black uppercase tracking-[0.14em] text-white/85 hover:text-[#f25151] transition-colors"
                >
                  О студии <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://static.tildacdn.pro/tild6364-6662-4663-a639-363061656262/school_artevrika_new.svg" 
                alt="Школа Артэврика — логотип" 
                className="h-6 w-auto brightness-0 invert opacity-90"
                loading="lazy"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-medium">
              Школа Артэврика: системное обучение интерьерному дизайну и современным AI-инструментам.
            </p>
            <div className="flex gap-6">
              <a href="https://instagram.com/artevrika" target="_blank" rel="noreferrer" className={`text-white/60 ${footerLinkClass}`}><Instagram size={24} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={`text-white/60 ${footerLinkClass}`}><Youtube size={24} /></a>
              <a href="https://t.me/artevrika" target="_blank" rel="noreferrer" className={`text-white/60 ${footerLinkClass}`}><Send size={24} /></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-white/45">Навигация</h5>
            <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/75">
              <li><a href="#programma" className={footerLinkClass}>Программа</a></li>
              <li><a href="#cases" className={footerLinkClass}>Кейсы</a></li>
              <li><a href="#pricing" className={footerLinkClass}>Тарифы</a></li>
              <li><a href="#faq" className={footerLinkClass}>Вопросы</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-white/45">Школа</h5>
            <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/75">
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className={footerLinkClass}
                >
                  О нас
                </button>
              </li>
            </ul>

            <p className="font-black mt-10 mb-4 uppercase text-[10px] tracking-[0.35em] text-white/45">Другие курсы</p>
            <ul className="space-y-3 text-xs font-black uppercase tracking-[0.08em] text-white/75">
              <li>
                <a href="https://school.artevrika.ru/basic" target="_blank" rel="noreferrer" className={footerLinkClass}>
                  1. Базовый курс по дизайну интерьера
                </a>
              </li>
              <li>
                <a href="https://school.artevrika.ru/advanced" target="_blank" rel="noreferrer" className={footerLinkClass}>
                  2. ПРО курс по дизайну интерьера
                </a>
              </li>
              <li>
                <a href="https://school.artevrika.ru/page113445986.html" target="_blank" rel="noreferrer" className={footerLinkClass}>
                  3. Онлайн курс — Сам себе дизайнер
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-white/45">Контакты</h5>
            <div className="space-y-4">
              <a href="tel:+79221089511" className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/75 ${footerLinkClass}`}>
                <Phone size={16} /> +7 922 108 95 11
              </a>
              <a href="tel:+79226002180" className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/75 ${footerLinkClass}`}>
                <Phone size={16} /> +7 922 600 21 80
              </a>
              <a href="mailto:course@school.artevrika.ru" className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/75 ${footerLinkClass}`}>
                <Mail size={16} /> course@school.artevrika.ru
              </a>
              <p className="flex items-start gap-3 text-[12px] text-white/70 leading-relaxed font-medium">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                Екатеринбург, Малышева 8, Интерьерный центр ARCHITECTOR.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/8">
          <div className="flex flex-wrap gap-4 md:gap-8 text-[13px] md:text-[14px] font-sans font-normal tracking-normal text-white/70 mb-8">
            <a href="https://school.artevrika.ru/oferta" target="_blank" rel="noreferrer" className={`font-sans font-normal normal-case tracking-normal ${footerLinkClass}`}>
              Договор оферты
            </a>
            <a href="https://school.artevrika.ru/soglasie" target="_blank" rel="noreferrer" className={`font-sans font-normal normal-case tracking-normal ${footerLinkClass}`}>
              Согласие на обработку данных
            </a>
            <a href="https://school.artevrika.ru/politika" target="_blank" rel="noreferrer" className={`font-sans font-normal normal-case tracking-normal ${footerLinkClass}`}>
              Политика конфиденциальности
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[13px] font-sans font-normal normal-case tracking-normal text-white/55">
            <p className="font-sans font-normal normal-case tracking-normal">© 2026 Школа Артэврика — Все права защищены</p>
            <a
              href="https://t.me/artevrika"
              target="_blank"
              rel="noreferrer"
              className={`font-sans font-normal normal-case tracking-normal ${footerLinkClass}`}
            >
              Создано с ✨ и AI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
