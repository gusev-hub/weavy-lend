
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { Solution } from './components/Solution';
import { TryIt } from './components/TryIt';
import { BeforeAfterCases } from './components/BeforeAfterCases';
import { Audience } from './components/Audience';
import { CourseProgram } from './components/CourseProgram';
import { Artifacts } from './components/Artifacts';
import { Author } from './components/Author';
import { Pricing } from './components/Pricing';
import { Format } from './components/Format';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export type Theme = 'light' | 'dark';

const isStoredTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return isStoredTheme(storedTheme) ? storedTheme : getSystemTheme();
  });
  const [isThemeOverridden, setIsThemeOverridden] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme');
    return isStoredTheme(storedTheme);
  });

  useEffect(() => {
    let isTicking = false;

    const updateViewportState = () => {
      setScrollY(window.scrollY);
      setViewportWidth(window.innerWidth);
      isTicking = false;
    };

    const handleScroll = () => {
      if (isTicking) return;
      isTicking = true;
      window.requestAnimationFrame(updateViewportState);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isThemeOverridden) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applySystemTheme = () => setTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', applySystemTheme);
    return () => media.removeEventListener('change', applySystemTheme);
  }, [isThemeOverridden]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    setIsThemeOverridden(true);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <div className="min-h-screen bg-softzinc dark:bg-darkzinc text-zinc-900 dark:text-zinc-100 selection:bg-artevrika selection:text-white transition-colors duration-500">
      <Navbar
        scrollY={scrollY}
        viewportWidth={viewportWidth}
        theme={theme}
        setTheme={handleThemeChange}
      />
      <main className="flex flex-col">
        <Hero />
        <PainPoints />
        <Solution />
        <TryIt />
        <BeforeAfterCases />
        <Audience />
        <CourseProgram />
        <Artifacts />
        <Author />
        <Pricing />
        <Format />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
