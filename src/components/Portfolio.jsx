import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';

export const Portfolio = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

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

    if (sortBy === 'newest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'oldest') {
      filtered = [...filtered];
    }

    return filtered;
  }, [projects, selectedFilter, sortBy]);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-[var(--bg-primary)] transition-colors duration-300" ref={ref}>
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
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
          >
            {t('portfolio.title')}
          </motion.h2>
          <motion.div 
            variants={itemVariants} 
            className="w-12 h-1 bg-slate-900 dark:bg-slate-300 mx-auto rounded-full"
          />
        </motion.div>

        {/* Filter and Sort Controls */}
        <motion.div 
          className="mb-12 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Filter Pills - Using #334155 bg and #475569 border for active state in dark mode */}
          <div className="flex flex-wrap gap-2 justify-center">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 select-none ${
                  selectedFilter === tag
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--btn-primary-border)] shadow-sm'
                    : 'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] hover:border-[var(--btn-secondary-hover-border)] hover:bg-[var(--btn-secondary-hover-bg)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-[var(--btn-secondary-bg)] border border-[var(--btn-secondary-border)] rounded-lg text-xs font-medium text-[var(--btn-secondary-text)] cursor-pointer focus:outline-none focus:border-[var(--btn-secondary-hover-border)] transition-colors shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-[var(--bg-card)] rounded-xl border border-slate-200/90 dark:border-[var(--border-default)] shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Project Image Frame */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#0c121e] border-b border-slate-100 dark:border-[var(--border-subtle)]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <span className="text-3xl">💻</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {Array.isArray(project.tags) && project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-0.5 bg-slate-100 dark:bg-[#162032] text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md border border-slate-200/60 dark:border-[var(--border-subtle)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button: Clear "View Project" button */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="pt-4 border-t border-slate-100 dark:border-[var(--border-subtle)] flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      Project #{project.id}
                    </span>

                    <a
                      href={project.link || "https://github.com/Adham-Yahia"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--btn-primary-border)] hover:bg-[var(--btn-primary-hover-bg)] hover:border-[var(--btn-primary-hover-border)] transition-all duration-200 inline-flex items-center gap-1.5 shadow-sm group/btn"
                    >
                      <span>{t('portfolio.viewProject', 'View Project')}</span>
                      <span className="ltr:group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
