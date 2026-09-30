import React from 'react';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      category: t('about.skillCategories.ai', 'AI & Data Engineering'),
      tone: 'ai',
      skills: ['Python', 'OOP'],
    },
    {
      category: t('about.skillCategories.frontend', 'Frontend Development'),
      tone: 'frontend',
      skills: ['React', 'JavaScript (ES6+)', 'Bootstrap CSS', 'HTML5 / CSS3', 'Responsive Design', 'Web Accessibility (WCAG)'],
    },
    {
      category: t('about.skillCategories.backend', 'Backend & Systems'),
      tone: 'backend',
      skills: ['Python', 'Django', 'RESTful APIs', 'MySQL & Databases', 'APIs Architecture'],
    },
    {
      category: t('about.skillCategories.tools', 'Workflow & Tools'),
      tone: 'tools',
      skills: ['Git & GitHub', 'Version Control', 'Linux / Unix', 'Command Line (Bash)', 'UI/UX Principles', 'Web Performance'],
    },
  ];

  return (
    <section id="about" className="section-shell section-shell--muted transition-colors duration-300">
      <div className="section-container">
        <div className="section-heading">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {t('about.title')}
          </h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8 space-y-8 order-1 lg:order-1">
            <div className="space-y-5">
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                {t('about.description1')}
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                {t('about.description2')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] whitespace-nowrap">
                  {t('about.skills', 'Technical Skills')}
                </h3>
                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {skillCategories.map((group, idx) => (
                  <article
                    key={idx}
                    className={`surface-card skill-card skill-card--${group.tone}`}
                  >
                    <h4 className="skill-card__title">
                      <span className="skill-card__mark" aria-hidden="true" />
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="tag px-2.5 py-1.5 select-none cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-6 order-2 lg:order-2">
            <div className="surface-card w-full max-w-xs lg:max-w-full rounded-2xl p-3 group">
              <div className="aspect-square overflow-hidden rounded-xl bg-[var(--bg-subtle)]">
                <img
                  src="/image.jpg"
                  alt="Adham Yahia"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-4 py-4 text-center">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Adham Yahia</h3>
                <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">AI Engineer & Full-Stack Web Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
