
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { COLORS } from '../constants';

const FAQS = [
  {
    q: 'Нужен ли опыт работы с нейросетями?',
    a: 'Нет. Курс рассчитан «с нуля» в части weavy.ai. Но нужен опыт в интерьерном дизайне — минимум 2 реализованных проекта, иначе будет сложно собрать выпускной проект.'
  },
  {
    q: 'Что такое weavy.ai и чем отличается от Midjourney?',
    a: 'weavy.ai — это node-based платформа для AI-дизайна, купленная компанией Figma. В отличие от Midjourney, здесь вы строите повторяемые пайплайны из узлов: генерация → маски → правки → экспорт. Результат управляемый и масштабируемый.'
  },
  {
    q: 'Сколько стоит подписка на weavy.ai?',
    a: 'Professional Plan — $36/мес (~3 600 ₽). Хватает на 2–3 проекта. Курс учит экономно расходовать кредиты и выбирать правильные режимы генерации.'
  },
  {
    q: 'Я работаю в 3ds Max / Corona Render. Зачем мне AI?',
    a: 'AI не заменяет 3D-визуализацию. Он ускоряет концептуальную фазу: быстрые варианты для клиента, серии материалов/света, презентационные борды. Это дополнение к вашему стеку.'
  },
  {
    q: 'Будет ли доступ к записям после окончания?',
    a: 'Да, доступ к видеоурокам и всем шаблонам графов сохраняется в течение 6 месяцев после окончания обучения.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-[#0c0c0e] transition-colors duration-300">
      <div className="container-fluid max-w-[900px]">
        <h2 className="text-[32px] md:text-[52px] font-heading font-bold mb-16 text-center tracking-tighter dark:text-white text-zinc-900 uppercase">Частые вопросы</h2>
        
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-sm transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 md:p-10 flex items-center justify-between text-left hover:bg-white dark:hover:bg-zinc-800/30 transition-colors"
              >
                <span className="font-heading font-bold text-[18px] md:text-[22px] pr-8 dark:text-white text-zinc-900 tracking-tight leading-tight font-sans">{faq.q}</span>
                <div 
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-500 ${
                    openIndex === i 
                      ? 'bg-terracotta border-terracotta text-white rotate-180' 
                      : 'border-zinc-200 dark:border-zinc-700 dark:text-white text-zinc-900'
                  }`}
                >
                  {openIndex === i ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="p-8 md:p-10 pt-0 text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed text-[16px] border-t border-zinc-100 dark:border-zinc-800/50 mt-4 font-sans">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
