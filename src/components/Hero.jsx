import React from 'react';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-[var(--bg-primary)] relative pt-40 pb-32 sm:pt-48 sm:pb-40 transition-colors duration-300"
    >
      <div className="section-container relative z-10 max-w-4xl">
        <div className="space-y-8 text-center fade-rise">
          <div className="flex justify-center">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {t('hero.greeting')}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.02]">
            {t('hero.name')}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
            <span>{t('hero.title')}</span>
          </p>

          <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="flat-button w-full sm:w-auto px-8 py-3.5 gap-2 text-sm"
            >
              <span>{t('hero.cta')}</span>
              <span>→</span>
            </a>

            <a
              href="#portfolio"
              className="flat-button flat-button--secondary w-full sm:w-auto px-8 py-3.5 text-sm"
            >
              {t('portfolio.title')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
