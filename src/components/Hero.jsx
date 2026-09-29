import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, itemVariants } from '../utils/animations';

export const Hero = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="min-h-[92vh] flex items-center justify-center bg-slate-50 dark:bg-[var(--bg-primary)] relative pt-20 pb-16 transition-colors duration-300"
    >
      {/* Subtle decorative dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Greeting badge with live indicator */}
          <motion.div variants={itemVariants} className="inline-flex">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50"
          >
            {t('hero.name')}
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.p 
            variants={itemVariants}
            className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 tracking-tight"
          >
            <span>{t('hero.title')}</span>
          </motion.p>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Calm, Professional Slate CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row gap-3.5 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3 rounded-lg font-medium text-sm bg-slate-900 text-white dark:bg-[var(--btn-primary-bg)] dark:text-[var(--btn-primary-text)] border border-slate-900 dark:border-[var(--btn-primary-border)] hover:bg-slate-800 dark:hover:bg-[var(--btn-primary-hover-bg)] dark:hover:border-[var(--btn-primary-hover-border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
              whileTap={{ scale: 0.98 }}
            >
              <span>{t('hero.cta')}</span>
              <span className="ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200">
                →
              </span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#portfolio"
              className="w-full sm:w-auto px-7 py-3 rounded-lg font-medium text-sm bg-white dark:bg-[var(--btn-secondary-bg)] border border-slate-200 dark:border-[var(--btn-secondary-border)] text-slate-800 dark:text-[var(--btn-secondary-text)] hover:border-slate-400 dark:hover:border-[var(--btn-secondary-hover-border)] hover:bg-slate-50 dark:hover:bg-[var(--btn-secondary-hover-bg)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
            >
              {t('portfolio.title')}
            </motion.a>
          </motion.div>

          {/* Clean minimal scroll indicator */}
          <motion.div 
            variants={itemVariants}
            className="pt-10 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {t('hero.scroll')}
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg 
                className="w-4 h-4 text-slate-400 dark:text-slate-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
