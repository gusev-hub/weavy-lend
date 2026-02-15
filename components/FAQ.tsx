
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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
        <h2 className="text-[32px] md:text-[52px] font-heading font-bold mb-16 text-center tracking-tighter dark:text-white text-[#1c3e42] uppercase">Частые вопросы</h2>
        
        <div className="space-y-6">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="rounded-[2rem] overflow-hidden border border-[#7fa398]/70 dark:border-[#2b5a50]/80 bg-[#d9e9e2] dark:bg-[#0f2420]/85 shadow-[0_12px_28px_rgba(14,46,38,0.08)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.38)] transition-all duration-300 hover:ring-[8px] hover:ring-[#f25151]/30 hover:border-[#f25151]/40 hover:shadow-[0_0_28px_rgba(242,81,81,0.26)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group w-full p-8 md:p-10 flex items-center justify-between text-left bg-[linear-gradient(115deg,#245458_0%,#1a3f42_55%,#143735_100%)] dark:bg-[linear-gradient(115deg,#183e41_0%,#113235_55%,#0d2728_100%)] hover:brightness-105 transition-[filter] duration-300"
                >
                  <span className="font-heading font-bold text-[18px] md:text-[22px] pr-8 text-white tracking-tight leading-tight font-sans">
                    {faq.q}
                  </span>
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-artevrika border-artevrika text-white'
                        : 'border-white/45 bg-white/10 text-white group-hover:bg-white/16'
                    }`}
                  >
                    {isOpen ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#9ec2b7]/75 dark:border-[#355f56]/90 bg-[linear-gradient(160deg,#eaf4ef_0%,#dceae4_100%)] dark:bg-[linear-gradient(160deg,#4c6059_0%,#566b63_100%)] p-8 md:p-10 text-[#30504a] dark:text-[#d2e2da] font-normal leading-relaxed text-[16px] font-sans">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
