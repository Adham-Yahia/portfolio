import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Portfolio = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const projects = t('portfolio.projects', { returnObjects: true });

  const categories = ['all', 'ai', 'frontend', 'backend', 'fullstack'];

  const getCategoryLabel = (category) => {
    return t(`portfolio.categories.${category}`, category);
  };

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    let filtered = selectedCategory === 'all'
      ? projects
      : projects.filter(p => {
          if (Array.isArray(p.categories)) {
            return p.categories.includes(selectedCategory);
          }
          return false;
        });

    if (sortBy === 'newest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'oldest') {
      filtered = [...filtered];
    }

    return filtered;
  }, [projects, selectedCategory, sortBy]);

  return (
    <section id="portfolio" className="section-shell bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="section-container">
        <div className="section-heading mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {t('portfolio.title')}
          </h2>
          <div className="section-rule" />
        </div>

        <div className="mb-12 space-y-5">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`filter-chip ${selectedCategory === category ? 'is-active' : ''}`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="control px-4 py-2 text-xs font-medium cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <a
              key={project.id}
              href={project.link || "https://github.com/Adham-Yahia"}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group flex flex-col overflow-hidden rounded-xl hover:border-[var(--border-strong)]"
            >
              <div className="relative overflow-hidden bg-[var(--bg-subtle)] aspect-[16/10]">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold tracking-wide">View</span>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-muted)]">
                    No image available
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {Array.isArray(project.tags) && project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag px-2 py-0.5 text-xs">{tag}</span>
                  ))}
                </div>

                <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] leading-tight">
                  {project.name}
                </h3>
                
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
                  <span>{t('portfolio.viewProject', 'View Project')}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)] text-sm">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
