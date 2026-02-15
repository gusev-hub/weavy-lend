
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

export type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-softzinc dark:bg-darkzinc text-zinc-900 dark:text-zinc-100 selection:bg-artevrika selection:text-white transition-colors duration-500">
      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} />
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
