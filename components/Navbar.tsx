
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS } from '../constants';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Theme } from '../App';

interface NavbarProps {
  isScrolled: boolean;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, theme, setTheme }) => {
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeConfig = () => {
    switch (theme) {
      case 'light': return { Icon: Sun, label: 'Светлая' };
      case 'dark': return { Icon: Moon, label: 'Темная' };
      default: return { Icon: Monitor, label: 'Системная' };
    }
  };

  const { Icon } = getThemeConfig();

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl border-zinc-200 dark:border-white/10 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container-fluid flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="https://static.tildacdn.pro/tild6364-6662-4663-a639-363061656262/school_artevrika_new.svg" 
            alt="Артэврика" 
            className="h-6 md:h-7 w-auto transition-all duration-500 logo-themed"
          />
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {NAVIGATION_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="relative text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 hover:text-artevrika dark:hover:text-artevrika transition-colors font-heading group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-artevrika transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-white/5 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-zinc-600 dark:hover:text-artevrika transition-all active:scale-90 relative overflow-hidden group shadow-sm"
            title="Переключить тему"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 10, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -10, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Icon size={20} strokeWidth={2.5} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-artevrika/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <a 
            href="#pricing"
            className="px-8 py-4 md:px-10 md:py-4.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-2xl bg-terracotta font-heading"
          >
            Записаться
          </a>
        </div>
      </div>
    </nav>
  );
};
