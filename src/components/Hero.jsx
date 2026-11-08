import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-[var(--bg-primary)] relative pt-40 pb-32 sm:pt-48 sm:pb-40 transition-colors duration-300"
    >
      <div className="section-container relative z-10 max-w-4xl">
        <motion.div
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {t('hero.greeting')}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.name')}
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{t('hero.title')}</span>
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="#contact"
              className="flat-button w-full sm:w-auto px-8 py-3.5 gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t('hero.cta')}</span>
              <span>→</span>
            </motion.a>

            <motion.a
              href="#portfolio"
              className="flat-button flat-button--secondary w-full sm:w-auto px-8 py-3.5 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('portfolio.title')}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
