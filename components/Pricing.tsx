
import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

const TIERS = [
  {
    name: 'Базовый',
    price: '14 900₽',
    sub: 'Самостоятельно',
    popular: false,
    color: COLORS.terracotta,
    features: [
      { text: 'Все видеоуроки (41 урок)', active: true },
      { text: 'Шаблоны графов weavy', active: true },
      { text: 'Книга промптов + чек-листы', active: true },
      { text: 'Доступ к Telegram-чату', active: true },
      { text: 'Проверка ДЗ куратором', active: false },
    ]
  },
  {
    name: 'Стандарт',
    price: '29 900₽',
    sub: 'С куратором',
    popular: true,
    color: COLORS.green,
    features: [
      { text: 'Всё из "Базового"', active: true },
      { text: '6 live-созвонов', active: true },
      { text: 'Проверка ключевых ДЗ', active: true },
      { text: 'Разбор ошибок', active: true },
      { text: 'Приоритет в чате', active: true },
    ]
  },
  {
    name: 'Премиум',
    price: '59 900₽',
    sub: 'Для студий',
    popular: false,
    color: COLORS.terracotta,
    features: [
      { text: 'Всё из "Стандарта"', active: true },
      { text: 'Мини-сессии внедрения', active: true },
      { text: 'Аудит workflow студии', active: true },
      { text: 'Индивидуальные сессии', active: true },
      { text: 'Контроль от автора', active: true },
    ]
  }
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="relative py-24 bg-[#e8f1ec] dark:bg-[#0e181b] transition-colors overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, -40, 0], y: [0, -90, 40, 0], rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-terracotta/12 dark:bg-terracotta/10 blur-[220px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -140, 60, 0], y: [0, 80, -80, 0], rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-artevrika/10 dark:bg-artevrika/12 blur-[240px] rounded-full"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,211,159,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,211,159,0.05)_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="container-fluid relative z-10">
        <h2 className="text-[32px] md:text-[52px] font-heading font-bold mb-20 text-center tracking-tighter leading-none uppercase">
          <span className="text-[#1c3e42] dark:text-white">Формат</span>{' '}
          <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">участия</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, i) => {
            const isPopular = tier.popular;
            const cardClass = isPopular
              ? 'bg-[#e2f1ea] dark:bg-[linear-gradient(145deg,#153b42_0%,#113137_100%)] border-2 lg:scale-105 shadow-2xl z-10 border-[#88cfb4] dark:border-[#56d0a2]/35 hover:ring-[8px] hover:ring-artevrika/25 dark:hover:ring-artevrika/14 hover:border-artevrika dark:hover:border-artevrika/55'
              : 'bg-[#f7fbf9] dark:bg-[linear-gradient(145deg,#122d34_0%,#0f252b_100%)] border border-[#d0e2db] dark:border-white/5 hover:ring-[8px] hover:ring-[#f25151]/25 dark:hover:ring-[#f25151]/14 hover:border-[#f25151]/45 dark:hover:border-[#f25151]/24';
            const titleClass = 'text-[#173d42] dark:text-white';
            const subClass = 'text-[#4f6f69] dark:text-white/68';
            const activeFeatureClass = 'text-[#1d4246] dark:text-white/90 font-semibold';
            const inactiveFeatureClass = 'text-[#7d9891] dark:text-white/40';

            return (
              <div
                key={i}
                className={`p-8 md:p-10 rounded-[3rem] flex flex-col transition-all duration-300 relative ${cardClass}`}
              >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-white flex items-center gap-2 bg-artevrika shadow-md">
                  <Star size={12} fill="currentColor" />
                  Популярный
                </div>
              )}
              
              <div className="mb-10">
                <h3 className={`text-[24px] font-heading font-bold mb-1 tracking-tight uppercase leading-none ${titleClass}`}>{tier.name}</h3>
                <p className={`text-[10px] font-heading font-bold uppercase tracking-widest mb-8 ${subClass}`}>{tier.sub}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-[32px] md:text-[42px] font-heading font-bold tracking-tighter leading-none ${titleClass}`}>{tier.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {tier.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${f.active ? 'bg-artevrika text-white' : 'bg-zinc-200 dark:bg-white/14 text-zinc-500 dark:text-white/42'}`}>
                      {f.active ? <Check size={10} strokeWidth={4} /> : <X size={10} />}
                    </div>
                    <span className={`text-[14px] font-sans leading-relaxed ${f.active ? activeFeatureClass : inactiveFeatureClass}`}>{f.text}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-4 rounded-full font-heading font-bold text-[12px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg text-white`}
                style={{ backgroundColor: tier.color }}
              >
                Выбрать тариф
              </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
