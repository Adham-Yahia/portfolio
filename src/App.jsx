import React, { useEffect } from 'react';
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

function AppContent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = direction;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Certificates />
      <Portfolio />
      <Contact />
      <Footer />
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
