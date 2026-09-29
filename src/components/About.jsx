import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';

export const About = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const skillCategories = [
    {
      category: 'AI & Data Engineering',
      skills: ['Python', 'OOP'],
    },
    {
      category: 'Frontend Development',
      skills: ['React', 'JavaScript (ES6+)', 'Bootstrap CSS', 'HTML5 / CSS3', 'Responsive Design', 'Web Accessibility (WCAG)'],
    },
    {
      category: 'Backend & Systems',
      skills: ['Python', 'Django', 'RESTful APIs', 'MySQL & Databases', 'APIs Architecture'],
    },
    {
      category: 'Workflow & Tools',
      skills: ['Git & GitHub', 'Version Control', 'Linux / Unix', 'Command Line (Bash)', 'UI/UX Principles', 'Web Performance'],
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-100/70 dark:bg-[var(--bg-primary)] border-y border-slate-200/80 dark:border-[var(--border-subtle)] transition-colors duration-300" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
          >
            {t('about.title')}
          </motion.h2>
          <motion.div 
            variants={itemVariants} 
            className="w-12 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Text Content & Skills */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
            >
              {t('about.description1')}
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
            >
              {t('about.description2')}
            </motion.p>

            {/* Skills Categorized with Enhanced Interactive Pills */}
            <motion.div variants={itemVariants} className="pt-6 space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('about.skills', 'Technical Skills')}
              </h3>

              <div className="space-y-5">
                {skillCategories.map((group, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#162032] text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-[var(--border-subtle)] shadow-sm hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 hover:shadow transition-all duration-200 select-none cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Card Frame */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#141c2c] border border-slate-200 dark:border-[var(--border-default)] p-3 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img 
                    src="image.jpg" 
                    alt="Adham Yahia" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-4 pb-2 text-center">
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Adham Yahia
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    AI Engineer & Full-Stack Web Developer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;