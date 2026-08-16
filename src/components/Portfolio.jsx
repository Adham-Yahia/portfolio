import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';

export const Portfolio = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const projects = t('portfolio.projects', { returnObjects: true });

  const uniqueTags = useMemo(() => {
    if (!Array.isArray(projects)) return ['All'];
    const tags = new Set(['All']);
    projects.forEach(project => {
      if (Array.isArray(project.tags)) {
        project.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    
    let filtered = selectedFilter === 'All'
      ? projects
      : projects.filter(p => Array.isArray(p.tags) && p.tags.includes(selectedFilter));

    // Sort
    if (sortBy === 'newest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'oldest') {
      filtered = [...filtered];
    }

    return filtered;
  }, [projects, selectedFilter, sortBy]);

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {t('portfolio.title')}
            </span>
          </motion.h2>
        </motion.div>

        {/* Filter and Sort Controls */}
        <motion.div 
          className="mb-12 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {uniqueTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedFilter === tag
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-center gap-4">
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 cursor-pointer focus:outline-none focus:border-primary-500"
              whileHover={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </motion.select>
          </div>
        </motion.div>

        {/* Projects Grid with Stagger Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.05,
                }}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col"
              >
                {/* Project Image Placeholder */}
                <motion.div 
                  className="relative w-full h-48 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-white text-center"
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="text-5xl mb-2">
                        {index === 0 ? '📊' : index === 1 ? '🛒' : '🤖'}
                      </div>
                      <div className="text-sm font-semibold">Project {project.id}</div>
                    </motion.div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-black/0 flex items-center justify-center"
                    whileHover={{ background: 'rgba(0,0,0,0.4)' }}
                  >
                    <motion.button
                      className="opacity-0 group-hover:opacity-100 px-6 py-2 bg-white text-primary-500 font-bold rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View →
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors duration-300 line-clamp-2">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags with animation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(project.tags) && project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full whitespace-nowrap"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tagIndex * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold group/link transition-colors duration-300 mt-auto"
                    whileHover={{ x: 5 }}
                  >
                    {t('portfolio.viewProject')}
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.1,
                      }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 -z-10 rounded-xl blur-xl"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
