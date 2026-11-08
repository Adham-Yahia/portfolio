import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import IntroScreen from './components/IntroScreen';

function AppContent() {
  const { i18n } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = direction;
  }, [i18n.language]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowIntro(false);
    }
  }, [prefersReducedMotion]);

  const handleStartIntro = () => {
    setShowIntro(false);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
  };

  return (
    <div className="site-shell min-h-screen transition-colors duration-300">
      {showIntro && !prefersReducedMotion && (
        <IntroScreen onStart={handleStartIntro} onSkip={handleSkipIntro} />
      )}
      <AnimatedBackground />
      <div className="relative z-20">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Certificates />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
