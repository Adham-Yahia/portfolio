import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';

export const About = () => {
  const { t } = useTranslation();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const skillCategories = [
        {
      category: 'AI',
      skills: ['Python/OOP', 'Machine Learning'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      category: 'Frontend',
      skills: ['HTML5/CSS3', 'JavaScript', 'React', 'Bootstrap CSS', 'Responsive Design', 'Web Accessibility (WCAG)'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Tools & Workflow',
      skills: ['Linux / Unix', 'Command Line (Bash)', 'Git & GitHub', 'Version Control', 'UI/UX Principles', 'Web Performance'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Backend',
      skills: ['Python', 'Django', 'RESTful APIs', 'SQL & Databases', 'APIs Architecture'],
      color: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300" ref={ref}>
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
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {t('about.title')}
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {t('about.description1')}
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {t('about.description2')}
            </motion.p>

            {/* Skills by Category */}
            <motion.div className="mt-12 space-y-6">
              {skillCategories.map((skillGroup, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <motion.div 
                      className={`w-1 h-6 mr-3 rounded bg-gradient-to-b ${skillGroup.color}`}
                      whileHover={{ height: 32 }}
                    />
                    {skillGroup.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {skillGroup.skills.map((skill, sidx) => (
                      <motion.div
                        key={sidx}
                        className={`px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer group relative overflow-hidden`}
                        whileHover={{ scale: 1.08, borderColor: 'rgb(99, 102, 241)' }}
                        onHoverStart={() => setSelectedSkill(`${skillGroup.category}-${skill}`)}
                        onHoverEnd={() => setSelectedSkill(null)}
                      >
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-r ${skillGroup.color} opacity-0 group-hover:opacity-10`}
                          initial={{ x: -100 }}
                          whileHover={{ x: 0 }}
                        />
                        <span className="relative z-10 font-semibold text-gray-700 dark:text-gray-200">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Container with Floating Animation */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm">
              {/* Rotating border frame */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl opacity-25 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                }}
              />
              
              {/* Main Image Container */}
              <motion.div
                className="relative w-full aspect-square bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl overflow-hidden shadow-2xl"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="image.jpg" 
                  alt="Adham Yahia" 
                  className="w-full h-full object-cover relative z-10"
                />

                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20 z-0"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}
                />
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-300 rounded-lg opacity-30 blur-xl"
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-300 rounded-full opacity-30 blur-xl"
                animate={{
                  y: [0, 30, 0],
                  x: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;