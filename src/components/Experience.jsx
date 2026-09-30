import React from 'react';
import { useTranslation } from 'react-i18next';

export const Experience = () => {
  const { t } = useTranslation();

  const experiences = t('experience.items', { returnObjects: true }).map((exp, index) => ({
    ...exp,
    id: index + 1
  }));

  return (
    <section id="experience" className="section-shell bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="section-container">
        <div className="section-heading">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {t('experience.title', 'Experience')}
          </h2>
          <div className="section-rule" />
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto mt-3">
            {t('experience.subtitle', 'My professional journey and achievements')}
          </p>
        </div>

        <div className="max-w-[1600px] mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border-subtle)] -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative md:grid md:grid-cols-2 md:gap-8 mb-8 last:mb-0">
              <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}`} />

              <div className={`absolute left-1/2 top-6 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-primary)] -translate-x-1/2 hidden md:block`} />

              <article className={`surface-card rounded-2xl p-6 relative ${index % 2 === 0 ? 'md:col-start-1 md:mr-8' : 'md:col-start-2 md:ml-8'}`}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">
                      {exp.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-semibold text-[var(--text-muted)]">
                      {exp.company}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-[var(--border-default)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]">
                    {exp.duration}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-4">
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="tag px-2.5 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
