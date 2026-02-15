
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { COLORS } from '../constants';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-softzinc dark:bg-[#0c0c0e] transition-colors">
      <div className="container-fluid">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="p-12 lg:p-32 rounded-[5rem] relative overflow-hidden flex flex-col items-center text-center space-y-12 shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${COLORS.terracotta}, #8e4b30)` }}
        >
          <div className="absolute top-12 left-12 opacity-20 text-white animate-pulse"><Zap size={48} fill="currentColor" /></div>
          <div className="absolute bottom-12 right-12 opacity-20 text-white animate-bounce"><Zap size={72} fill="currentColor" /></div>
          
          <h2 className="text-[clamp(32px,6vw,72px)] font-heading font-bold text-white max-w-5xl leading-[1.05] tracking-tighter uppercase">
            Готовы работать <br /> в 3 раза быстрее?
          </h2>
          <p className="text-[22px] font-sans font-normal text-white/90 max-w-2xl leading-relaxed">
            Следующий поток стартует в понедельник. <br /> Успейте забронировать место по лучшей цене.
          </p>
          
          <div className="flex flex-col items-center gap-8 pt-6">
            <button className="px-16 py-8 bg-white text-terracotta text-[16px] font-heading font-bold rounded-full flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-widest">
              Записаться сейчас <ArrowRight size={24} />
            </button>
            <p className="text-[11px] text-white/70 uppercase tracking-[0.4em] font-heading font-bold leading-none">Доступна рассрочка • 0% переплат</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
