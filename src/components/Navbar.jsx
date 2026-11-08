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
    { href: '#home', label: t('nav.home'), id: 'home', icon: 'home' },
    { href: '#about', label: t('nav.about'), id: 'about', icon: 'user' },
    { href: '#experience', label: t('nav.experience', 'Experience'), id: 'experience', icon: 'briefcase' },
    { href: '#certificates', label: t('nav.certificates', 'Certificates'), id: 'certificates', icon: 'award' },
    { href: '#portfolio', label: t('nav.portfolio'), id: 'portfolio', icon: 'code' },
    { href: '#contact', label: t('nav.contact'), id: 'contact', icon: 'mail' },
  ];

  const getNavIcon = (iconName) => {
    const icons = {
      home: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      user: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      briefcase: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      award: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 012.538 0 3.42 3.42 0 001.946.806 3.42 3.42 0 012.12 0 3.42 3.42 0 011.478 1.478 3.42 3.42 0 010 2.12 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 000 2.538 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 2.12 3.42 3.42 0 00-1.478 1.478 3.42 3.42 0 00-2.12 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-2.538 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 00-2.12 0 3.42 3.42 0 00-1.478-1.478 3.42 3.42 0 010-2.12 3.42 3.42 0 00.806-1.946 3.42 3.42 0 000-2.538 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-2.12 3.42 3.42 0 001.478-1.478 3.42 3.42 0 002.12 0z" />
        </svg>
      ),
      code: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      mail: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveLink(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isRTL = document.documentElement.dir === 'rtl';

  return (
    <>
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
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 z-50 w-80 max-w-[85vw] bg-[var(--bg-card)] border-r border-[var(--border-default)] shadow-2xl lg:hidden overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="control p-2"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        activeLink === link.id
                          ? 'bg-[var(--accent-subtle)] text-[var(--text-primary)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <span className={activeLink === link.id ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}>
                        {getNavIcon(link.icon)}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between gap-4">
                    <motion.button
                      onClick={toggleTheme}
                      className="control p-3 flex-1 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={t('nav.toggleTheme')}
                    >
                      {isDark ? (
                        <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l2.12 2.12a1 1 0 001.414 0l2.121-2.121a1 1 0 000-1.414l-.707-.707a1 1 0 00-1.414 0zM9 4a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm0 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4 9a1 1 0 100 2h1a1 1 0 100-2H4zm12 0a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      )}
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={toggleLanguage}
                      className="control px-4 py-3 font-medium text-xs tracking-wider flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('nav.toggleLanguage')}
                    </motion.button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    {t('footer.follow', 'Follow')}
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://github.com/Adham-Yahia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                      aria-label="GitHub Profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>{t('footer.social.github', 'GitHub')}</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/adham-yahia-33826a3b8/?isSelfProfile=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>{t('footer.social.linkedin', 'LinkedIn')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
