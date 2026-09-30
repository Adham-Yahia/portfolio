import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [scrolling, setScrolling] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 20);

      const sections = ['home', 'about', 'experience', 'certificates', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveLink(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navLinks = [
    { href: '#home', label: t('nav.home'), id: 'home' },
    { href: '#about', label: t('nav.about'), id: 'about' },
    { href: '#experience', label: t('nav.experience', 'Experience'), id: 'experience' },
    { href: '#certificates', label: t('nav.certificates', 'Certificates'), id: 'certificates' },
    { href: '#portfolio', label: t('nav.portfolio'), id: 'portfolio' },
    { href: '#contact', label: t('nav.contact'), id: 'contact' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveLink(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolling
          ? 'bg-[var(--bg-primary)]/95 border-b border-[var(--border-default)]'
          : 'bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)]'
      }`}
      style={{ boxShadow: scrolling ? 'var(--shadow-header)' : 'none' }}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-container">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Portfolio</span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-6 rtl:flex-row-reverse">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeLink === link.id ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <motion.button
              onClick={toggleTheme}
              className="control p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t('nav.toggleTheme')}
            >
              {isDark ? (
                <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l2.12 2.12a1 1 0 001.414 0l2.121-2.121a1 1 0 000-1.414l-.707-.707a1 1 0 00-1.414 0zM9 4a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm0 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4 9a1 1 0 100 2h1a1 1 0 100-2H4zm12 0a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            <motion.button
              onClick={toggleLanguage}
              className="control px-3 py-1.5 font-medium text-xs tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('nav.toggleLanguage')}
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="control lg:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-[var(--border-subtle)] py-3 bg-[var(--bg-primary)]"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      activeLink === link.id
                        ? 'bg-[var(--accent-subtle)] text-[var(--text-primary)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
