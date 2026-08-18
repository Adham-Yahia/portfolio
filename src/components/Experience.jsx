import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants, scaleInUp } from '../utils/animations';

export const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const experiences = [
      {
        id: 1,
        title: 'Independent Web Developer',
        company: 'Personal Projects & Portfolios',
        duration: '2024 - Present',
        description: 'Designed and deployed modern, responsive web applications using React, modern JavaScript, and advanced CSS frameworks.',
        skills: ['React', 'JavaScript', 'Tailwind CSS'],
        color: 'from-blue-500 to-cyan-500',
        icon: '🚀',
      },
      {
        id: 2,
        title: 'Software Engineering Student',
        company: 'Galala University',
        duration: '2024 - 2026',
        description: 'Building academic and practical backend foundations, applying Object-Oriented Programming (OOP) in Python, and integrating Node.js servers.',
        skills: ['Python', 'Node.js', 'OOP'],
        color: 'from-green-500 to-emerald-500',
        icon: '⚙️',
      },
      {
        id: 3,
        title: 'Certified Frontend Track',
        company: 'Coursera & Meta Professional Tracks',
        duration: '2025 - 2026',
        description: 'Completed professional certification paths focusing on HTML/CSS in depth, UI principles, and Version Control workflows.',
        skills: ['HTML/CSS', 'Git', 'UI/UX'],
        color: 'from-purple-500 to-pink-500',
        icon: '💻',
      },
    ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300" ref={ref}>
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
              Experience
            </span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            My professional journey and achievements
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500 transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Experience items */}
          <motion.div 
            className="space-y-8 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`md:flex md:gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="md:w-1/2">
                  <motion.div
                    className="relative bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Glassmorphism shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-xl opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {exp.company}
                          </p>
                        </div>
                        <motion.div 
                          className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${exp.color} text-white`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          {exp.icon}
                        </motion.div>
                      </div>

                      {/* Duration */}
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 tracking-widest uppercase">
                        {exp.duration}
                      </p>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            className={`px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-xs font-semibold rounded-full`}
                            whileHover={{ scale: 1.1 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.05 + index * 0.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex md:w-auto md:items-center md:justify-center">
                  <motion.div
                    className="relative w-6 h-6"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(99, 102, 241, 0.7)',
                          '0 0 0 10px rgba(99, 102, 241, 0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
                  </motion.div>
                </div>

                {/* Mobile spacer */}
                <div className="md:hidden w-1/2" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
