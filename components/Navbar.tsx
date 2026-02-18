
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS } from '../constants';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Theme } from '../App';

interface NavbarProps {
  scrollY: number;
  viewportWidth: number;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

export const Navbar: React.FC<NavbarProps> = ({ scrollY, viewportWidth, theme, setTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const Icon = theme === 'light' ? Sun : Moon;
  const isDesktop = viewportWidth >= 1024;
  const shapeProgress = clamp(scrollY / 90, 0, 1);
  const contentProgress = clamp((scrollY - 110) / 140, 0, 1);
  const compactVisualMode = shapeProgress > 0.58;
  const fluidPadding = isDesktop ? Math.max(16, viewportWidth * 0.05) : Math.max(10, viewportWidth * 0.028);
  const mobileCompactInset = 12.5;

  useEffect(() => {
    if (isDesktop) setIsMobileMenuOpen(false);
  }, [isDesktop]);

  const shellStyles: React.CSSProperties = {
    marginTop: `${lerp(0, 8, shapeProgress)}px`,
    marginLeft: `${lerp(0, 8, shapeProgress)}px`,
    marginRight: `${lerp(0, 8, shapeProgress)}px`,
    height: `${lerp(104, 65, shapeProgress)}px`,
    borderRadius: `${lerp(0, 33, shapeProgress)}px`,
    borderColor: `rgba(53, 95, 98, ${shapeProgress.toFixed(3)})`,
    backgroundColor: `rgba(31, 63, 65, ${(0.9 * shapeProgress).toFixed(3)})`,
    boxShadow: `0 10px 26px rgba(10, 23, 27, ${(0.38 * shapeProgress).toFixed(3)})`,
    backdropFilter: `blur(${lerp(0, 20, shapeProgress)}px) saturate(${lerp(100, 150, shapeProgress)}%)`,
    WebkitBackdropFilter: `blur(${lerp(0, 20, shapeProgress)}px) saturate(${lerp(100, 150, shapeProgress)}%)`,
  };

  const contentStyles: React.CSSProperties = {
    paddingLeft: `${lerp(fluidPadding, isDesktop ? 18 : mobileCompactInset, contentProgress)}px`,
    paddingRight: `${lerp(fluidPadding, 8, contentProgress)}px`,
  };

  const isWideMobile = viewportWidth >= 390;
  const isNarrowMobile = viewportWidth < 430;

  const rightControlsStyles: React.CSSProperties = {
    gap: `${lerp(24, isNarrowMobile ? 6 : 8, contentProgress)}px`,
  };
  const ctaStyles: React.CSSProperties = {
    height: `${lerp(isDesktop ? 56 : 46, isDesktop ? 49 : 40, contentProgress)}px`,
    paddingInline: `${lerp(
      isDesktop ? 40 : isWideMobile ? 18 : 14,
      isDesktop ? 40 : isWideMobile ? 14 : 10,
      contentProgress
    )}px`,
    maxWidth: isDesktop ? 'none' : '46vw',
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] pointer-events-none">
      <div
        style={shellStyles}
        className="pointer-events-auto relative flex items-center justify-between border will-change-[margin,height,border-radius,background-color,backdrop-filter]"
      >
        <div style={contentStyles} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              title={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                compactVisualMode
                  ? 'bg-white/12 border-white/25 text-white/90 hover:bg-white/20'
                  : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-300 hover:text-terracotta'
              }`}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <img 
                src="https://static.tildacdn.pro/tild6364-6662-4663-a639-363061656262/school_artevrika_new.svg" 
                alt="Школа Артэврика — логотип" 
                className={`h-5 sm:h-6 md:h-7 max-w-[140px] sm:max-w-none w-auto transition-all duration-500 ${compactVisualMode ? 'filter-none' : 'logo-themed'}`}
                loading="eager"
              />
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {NAVIGATION_LINKS.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className={`relative text-[10px] font-black uppercase tracking-[0.25em] transition-colors font-heading group ${
                  compactVisualMode
                    ? 'text-white/90 hover:text-white'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-artevrika dark:hover:text-artevrika'
                }`}
              >
                {link.label}
                <span className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${compactVisualMode ? 'bg-white/80' : 'bg-artevrika'}`} />
              </a>
            ))}
          </div>

          <div style={rightControlsStyles} className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`hidden lg:flex w-12 h-12 items-center justify-center rounded-full border transition-all active:scale-90 relative overflow-hidden group shadow-sm ${
                compactVisualMode
                  ? 'bg-white/12 border-white/25 text-white/85 hover:text-white'
                  : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-zinc-600 dark:hover:text-artevrika'
              }`}
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
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${compactVisualMode ? 'bg-white/10' : 'bg-artevrika/5'}`} />
            </button>

            <a 
              href="#pricing"
              style={ctaStyles}
              className="rounded-full text-[8px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.08em] sm:tracking-[0.14em] lg:tracking-widest text-white transition-colors shadow-2xl bg-terracotta hover:bg-[#ff5d5d] active:bg-[#df4747] font-heading inline-flex items-center justify-center whitespace-nowrap"
            >
              Записаться
            </a>
          </div>
        </div>

        <AnimatePresence>
          {!isDesktop && isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute left-2 right-2 top-[calc(100%+10px)] rounded-3xl border border-zinc-200/90 dark:border-white/16 bg-white dark:bg-[#0c1118] backdrop-blur-[36px] backdrop-saturate-[145%] shadow-[0_24px_70px_rgba(0,0,0,0.42)] overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_16%_14%,rgba(255,255,255,0.1),transparent_52%),radial-gradient(circle_at_86%_82%,rgba(56,211,159,0.04),transparent_54%)] dark:bg-[radial-gradient(circle_at_16%_14%,rgba(255,255,255,0.06),transparent_52%),radial-gradient(circle_at_86%_82%,rgba(56,211,159,0.06),transparent_54%)]" />
              <div className="pointer-events-none absolute inset-[1px] rounded-[22px] border border-zinc-200/70 dark:border-white/10" />
              <div className="flex flex-col divide-y divide-zinc-300/50 dark:divide-white/10">
                {NAVIGATION_LINKS.map((link) => (
                  <a
                    key={`mobile-${link.label}`}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-4 text-[12px] font-black uppercase tracking-[0.18em] font-heading text-[#1c3e42] dark:text-zinc-100/90 hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="px-5 py-4 flex items-center justify-between bg-zinc-100 dark:bg-[#0a0f14] backdrop-blur-xl border-t border-zinc-200/80 dark:border-white/10">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-300/80 font-heading">
                  Тема
                </span>
                <button
                  onClick={toggleTheme}
                  className="h-10 px-4 rounded-full border border-zinc-300/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.06] text-[#1c3e42] dark:text-zinc-100 hover:text-terracotta transition-colors inline-flex items-center gap-2"
                  title="Переключить тему"
                >
                  <Icon size={16} strokeWidth={2.5} />
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] font-heading">
                    {theme === 'light' ? 'День' : 'Ночь'}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
