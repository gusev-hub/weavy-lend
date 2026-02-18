
import React from 'react';
import {
  ClipboardCheck,
  BookOpen,
  Sparkles,
  Wrench,
  Images,
  Smartphone,
  Bot,
  Clapperboard,
} from 'lucide-react';

type ArtifactItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
};

const MAIN_ARTIFACTS: ArtifactItem[] = [
  {
    icon: <ClipboardCheck size={24} />,
    title: 'Дизайн-бриф',
    description: 'Заполнил один раз - граф сам собирает промпты для всех помещений проекта.',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Книга промптов (500+)',
    description: 'Готовая библиотека промптов по помещениям, ракурсам, стилям и задачам.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Гайд по промптингу Nano Banana Pro',
    description: '14-пунктная формула промпта: правила и ошибки, чтобы писать точно, а не наугад.',
  },
  {
    icon: <Wrench size={24} />,
    title: '5+ рабочих графов',
    description: 'Генерация, меблировка, материалы/свет, маски, экспорт - открыл, подставил проект, запустил.',
  },
  {
    icon: <Images size={24} />,
    title: 'Портфолио-кейс (30+ изображений)',
    description: 'Готовый клиентский альбом: визуализации, серии материалов и света, презентация проекта.',
    featured: true,
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Дизайн-приложение',
    description: 'Упаковал пайплайн в приложение - передал стажёру, результат получается по вашим правилам.',
    featured: true,
  },
  {
    icon: <Bot size={24} />,
    title: 'GPT-агент по промптингу',
    description: 'Из фразы вроде "гостиная, джапанди, утренний свет" собирает профпромпт за секунды.',
  },
];

const BONUS_ARTIFACT: ArtifactItem = {
  icon: <Clapperboard size={26} />,
  title: 'Видеоролик (бонус)',
  description: 'Муд-ролик 15-30 сек рождается прямо в пайплайне - контент для соцсетей без отдельного продакшна.',
};

const getCardClass = (isFeatured: boolean): string =>
  isFeatured
    ? 'bg-gradient-to-br from-[#1d4a47] to-[#113337] border-artevrika/55 ring-1 ring-artevrika/30 shadow-[0_22px_55px_rgba(56,211,159,0.17)]'
    : 'bg-gradient-to-br from-[#173f44] to-[#112a31] border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.22)]';

export const Artifacts: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0c0c0e] transition-colors duration-300 overflow-visible">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl lg:text-5xl font-black mb-16 text-center tracking-tighter dark:text-white text-[#1c3e42] uppercase">
          Что ты <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">заберёшь</span> с курса
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MAIN_ARTIFACTS.map((item, idx) => (
            <article
              key={item.title}
              className={`group rounded-[2rem] p-7 md:p-8 border text-white transition-all duration-300 hover:ring-[8px] hover:ring-[#f25151]/15 hover:border-[#f25151]/35 ${getCardClass(Boolean(item.featured))} ${
                idx === 6 ? 'md:col-span-2 xl:col-span-3' : ''
              }`}
            >
              <div className="w-12 h-12 mb-4 rounded-xl bg-white/12 border border-white/20 flex items-center justify-center text-white">
                {item.icon}
              </div>
              <h3 className="text-[19px] md:text-[21px] font-heading font-black !text-white tracking-tight leading-tight mb-3 uppercase">
                {item.title}
              </h3>
              <p className="text-[15px] md:text-[16px] font-sans font-medium !text-white/88 leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <article className="mt-6 rounded-[2rem] p-7 md:p-9 border border-terracotta/35 bg-gradient-to-r from-[#2a3037] via-[#27383f] to-[#1e3640] text-white shadow-[0_24px_60px_rgba(242,81,81,0.18)] transition-all duration-300 hover:ring-[8px] hover:ring-[#f25151]/20 hover:border-[#f25151]/45">
          <div className="w-14 h-14 mb-4 rounded-xl bg-white/12 border border-white/20 flex items-center justify-center text-white">
            {BONUS_ARTIFACT.icon}
          </div>
          <h3 className="text-[22px] md:text-[26px] font-heading font-black !text-white tracking-tight leading-tight mb-3 uppercase">
            {BONUS_ARTIFACT.title}
          </h3>
          <p className="text-[16px] md:text-[17px] font-sans font-medium !text-white/90 leading-relaxed max-w-4xl">
            {BONUS_ARTIFACT.description}
          </p>
        </article>
      </div>
    </section>
  );
};
