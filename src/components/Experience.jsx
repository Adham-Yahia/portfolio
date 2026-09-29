import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';

export const Experience = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const experiences = [
    {
      id: 1,
      title: 'Independent Web Developer',
      company: 'Personal Projects & Client Solutions',
      duration: '2024 - Present',
      description: 'Designing and engineering modern, responsive full-stack applications with React, modern JavaScript, Tailwind CSS, and scalable RESTful backends.',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js'],
      icon: '🚀',
    },
    {
      id: 2,
      title: 'Computer Science & AI Major',
      company: 'Galala University',
      duration: '2024 - Present',
      description: 'Strengthening academic and practical foundations in Artificial Intelligence, Object-Oriented Programming (OOP) in Python, Algorithms, Data Structures, and Database Management.',
      skills: ['Python', 'AI/ML', 'OOP', 'Data Structures'],
      icon: '⚙️',
    },
    {
      id: 3,
      title: 'Certified Frontend Specialization',
      company: 'Meta & Coursera Professional Tracks',
      duration: '2025 - 2026',
      description: 'Completed in-depth professional engineering tracks focusing on Advanced React, JavaScript ES6+, UI/UX architecture, responsive layouts, and Git version control workflows.',
      skills: ['React', 'HTML5/CSS3', 'Git & GitHub', 'UI/UX'],
      icon: '💻',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-[var(--bg-primary)] transition-colors duration-300" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t('experience.title', 'Experience')}
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-12 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3"
          >
            {t('experience.subtitle', 'My professional journey and achievements')}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-[var(--border-subtle)] -translate-x-1/2" />

          {/* Experience items */}
          <motion.div
            className="space-y-10 md:space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Content Card */}
                <div className="md:w-1/2 md:px-8">
                  <div className="bg-white dark:bg-[#121824] rounded-xl p-6 border border-slate-200/80 dark:border-[var(--border-default)] hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 shadow-sm group">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60 whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-[#162032] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[var(--border-subtle)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline center indicator */}
                <div className="hidden md:flex md:w-auto md:items-center md:justify-center">
                  <div className="w-4 h-4 rounded-full bg-white dark:bg-[#0b0f17] border-2 border-blue-600 dark:border-blue-400 shadow-sm z-10" />
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block md:w-1/2 md:px-8" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
