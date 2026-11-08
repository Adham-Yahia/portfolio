import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Smartphone, Accessibility, Palette, GitBranch, Layers, Gauge } from 'lucide-react';

const TechIcon = ({ skill }) => {
  const iconMap = {
    'Python': '/images/skills/python.svg',
    'React': '/images/skills/react.svg',
    'JavaScript (ES6+)': '/images/skills/javascript.svg',
    'Bootstrap CSS': '/images/skills/bootstrap.svg',
    'HTML5 / CSS3': '/images/skills/html5.svg',
    'Django': '/images/skills/django.svg',
    'MySQL & Databases': '/images/skills/mysql.svg',
    'Git & GitHub': '/images/skills/github.svg',
    'Linux / Unix': '/images/skills/linux.svg',
    'Command Line (Bash)': '/images/skills/bash.svg',
  };

  const lucideIconMap = {
    'OOP': Code,
    'RESTful APIs': Zap,
    'Web Performance': Gauge,
    'Responsive Design': Smartphone,
    'Web Accessibility (WCAG)': Accessibility,
    'UI/UX Principles': Palette,
    'APIs Architecture': Layers,
    'Version Control': GitBranch,
  };

  const iconPath = iconMap[skill];
  const LucideIcon = lucideIconMap[skill];

  if (iconPath) {
    return <img src={iconPath} alt={skill} className="w-4 h-4 object-contain" />;
  }

  if (LucideIcon) {
    return <LucideIcon className="w-4 h-4 text-[var(--text-secondary)]" />;
  }

  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
};

export const About = () => {
  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="section-shell section-shell--muted transition-colors duration-300">
      <div className="section-container">
        <div className="section-heading">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {t('about.title')}
          </h2>
          <div className="section-rule" />
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="lg:col-span-8 space-y-8 order-1 lg:order-1">
            <motion.div variants={itemVariants} className="space-y-5">
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                {t('about.description1')}
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                {t('about.description2')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] whitespace-nowrap">
                  {t('about.skills', 'Technical Skills')}
                </h3>
                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {skillCategories.map((group, idx) => (
                  <motion.article
                    key={idx}
                    variants={itemVariants}
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
                          className="tag px-2.5 py-1.5 select-none cursor-default flex items-center gap-1.5"
                        >
                          <TechIcon skill={skill} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-6 order-2 lg:order-2">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
