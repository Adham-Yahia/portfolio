import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useFeedback from '../hooks/useFeedback';

export const Certificates = () => {
  const { t } = useTranslation();
  const { triggerClick, triggerHover } = useFeedback();
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [preview, setPreview] = useState(null);

  const certificatesData = [
    {
      id: 1,
      name: 'Advanced React',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development', 'Frontend'],
      credentialId: 'NFFQOHQHW4RX',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/NFFQOHQHW4RX',
      description: 'Advanced React hooks, custom state handlers, render optimization, memoization, and scalable production architecture.',
      image: '/images/certificates/advanced-react.jpg',
      featured: true,
    },
    {
      id: 2,
      name: 'Programming in Python',
      issuer: 'Meta',
      date: 'March 2026',
      category: ['Backend', 'AI'],
      credentialId: 'V9379NM7Q58P',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/V9379NM7Q58P',
      description: 'Python core programming, object-oriented programming (OOP), data structures, robust error handling, and clean script automation.',
      image: '/images/certificates/Python-Programming.jpg',
      featured: true,
    },
    {
      id: 3,
      name: 'Introduction to Databases',
      issuer: 'Meta',
      date: 'March 2026',
      category: ['Backend', 'Web Development'],
      credentialId: 'S17UQ96LAFUL',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/S17UQ96LAFUL',
      description: 'Relational database schema modeling, optimized SQL queries, normalization, and CRUD operations for robust backend services.',
      image: '/images/certificates/Introduction-to-Databases.jpg',
      featured: true,
    },
    {
      id: 4,
      name: 'Introduction to Front-End',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development', 'Frontend'],
      credentialId: 'YXMRJARU2CJC',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/YXMRJARU2CJC',
      description: 'Mastery of HTML5, CSS3, Bootstrap, UI design principles, responsive layouts, and modern web application foundations.',
      image: '/images/certificates/frontend-intro.jpg',
      featured: false,
    },
    {
      id: 5,
      name: 'JavaScript',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development', 'Frontend'],
      credentialId: 'M6ZYP1NTV55E',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/M6ZYP1NTV55E',
      description: 'Advanced JavaScript ES6+ concepts, DOM manipulation, unit testing with Jest, asynchronous programming, and OOP practices.',
      image: '/images/certificates/javascript.jpg',
      featured: true,
    },
    {
      id: 6,
      name: 'HTML and CSS in Depth',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development', 'Frontend'],
      credentialId: 'YXMRJARU2CJC',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/YXMRJARU2CJC',
      description: 'Advanced CSS3 layout architectures, Bootstrap framework, Flexbox, CSS Grid, responsive design, WCAG accessibility, and micro-interactions.',
      image: '/images/certificates/html-css.jpg',
      featured: true,
    },
    {
      id: 7,
      name: 'React Basics',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development', 'Frontend'],
      credentialId: '3IFVIKW2LTK3',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/3IFVIKW2LTK3',
      description: 'Building modular reusable components, state and props architecture, dynamic event-driven UI, and clean responsive web forms.',
      image: '/images/certificates/react.jpg',
      featured: false,
    },
    {
      id: 8,
      name: 'Version Control',
      issuer: 'Meta',
      date: 'August 2026',
      category: 'Web Development',
      credentialId: 'GIFOP9BNV5HU',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/GIFOP9BNV5HU',
      description: 'Linux command line, Git workflows, GitHub repository collaboration, branch management, and team CI/CD best practices.',
      image: '/images/certificates/version-control.jpg',
      featured: true,
    },
    {
      id: 9,
      name: 'Python Programming',
      issuer: 'Mahara-Tech',
      date: 'February 2026',
      category: ['Backend', 'AI'],
      credentialId: '38tFyPlFV9',
      credentialUrl: 'https://maharatech.gov.eg/mod/customcert/verify_certificate.php?',
      description: 'Structured programming, OOP patterns, core algorithms, and foundational computer science data structures.',
      image: '/images/certificates/python.jpg',
      featured: false,
    },
    {
      id: 10,
      name: 'IC-What is Innovation?',
      issuer: 'Arizona State University',
      date: 'March 2026',
      category: 'Innovation',
      credentialId: 'd1703266-747a-4352-bb08-435c5a1d0a5f',
      credentialUrl: 'https://poweredby.asu.edu/validate-credentials/?token=d1703266-747a-4352-bb08-435c5a1d0a5f&email=ayz304333@gu.edu.eg',
      description: 'Innovation engineering, strategic design thinking, agile problem-solving, and creative software solution development.',
      image: '/images/certificates/innovation.jpg',
      featured: false,
    },
  ];

  const categories = ['Featured', 'All', 'AI', 'Web Development', 'Frontend', 'Backend'];

  const getCategoryLabel = (category) => {
    if (category === 'Featured') return t('certificates.featured', 'Featured');
    if (category === 'All') return t('certificates.all', 'All');
    return category;
  };

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'Featured') {
      return certificatesData.filter(cert => cert.featured);
    }
    if (selectedCategory === 'All') {
      return certificatesData;
    }
    return certificatesData.filter(cert => {
      if (Array.isArray(cert.category)) {
        return cert.category.includes(selectedCategory);
      }
      return cert.category === selectedCategory;
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (!preview) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setPreview(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [preview]);

  const openCredential = (cert) => {
    triggerClick();
    if (cert.credentialUrl && cert.credentialUrl !== '#') {
      window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="certificates"
      className="section-shell section-shell--muted transition-colors duration-300"
    >
      <div className="section-container">
        <div className="section-heading">
          <div className="eyebrow mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              {t('certificates.badge', 'Professional Growth')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {t('certificates.title', 'Certificates & Achievements')}
          </h2>
          <div className="section-rule mb-3" />
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto">
            {t('certificates.subtitle', 'Continuous learning and professional certifications demonstrating software engineering excellence')}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-2.5 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                triggerClick();
                setSelectedCategory(category);
              }}
              onMouseEnter={triggerHover}
              className={`filter-chip ${selectedCategory === category ? 'is-active' : ''}`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filteredCertificates.map((cert) => (
            <article
              key={cert.id}
              className="surface-card group relative flex flex-col overflow-hidden rounded-lg"
            >
              {cert.image && (
                <button
                  type="button"
                  className="media-frame aspect-[16/9] w-full border-b border-[var(--border-subtle)] overflow-hidden"
                  onClick={() => {
                    triggerClick();
                    setPreview(cert);
                  }}
                  onMouseEnter={triggerHover}
                  aria-label={`${cert.name} preview`}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {cert.featured && (
                    <span className="absolute top-1.5 end-1.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-card)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--accent)] shadow-sm">
                      {t('certificates.featured', 'Featured')}
                    </span>
                  )}
                </button>
              )}

              <div className="flex flex-1 flex-col p-2">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="tag px-1.5 py-0.5 text-[10px]">
                    {Array.isArray(cert.category) ? cert.category[0] : cert.category}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--accent)]">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="mb-1 text-sm font-bold text-[var(--text-primary)] leading-tight">
                  {cert.name}
                </h3>

                <p className="mb-1.5 font-mono text-[11px] text-[var(--text-secondary)] font-medium">
                  ID: {cert.credentialId}
                </p>

                <p className="mb-3 flex-1 text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-2">
                  {cert.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-2">
                  <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                    {cert.date}
                  </span>
                  <button
                    type="button"
                    onClick={() => openCredential(cert)}
                    className="flat-button px-3 py-1.5 text-[10px] gap-1"
                  >
                    <span>{t('certificates.viewCredential', 'View Credential')}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)] text-sm">
              No certificates found in this category.
            </p>
          </div>
        )}
      </div>

      {createPortal(
      <AnimatePresence>
        {preview && (
          <motion.div
            className="preview-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              className="preview-modal__panel"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-preview-title"
            >
              <div className="media-frame bg-[var(--bg-subtle)] p-4 sm:p-6">
                <div className="w-full h-full flex items-center justify-center">
                  <img src={preview.image} alt={preview.name} className="w-full h-full object-contain rounded-lg" />
                </div>
              </div>
              <div className="space-y-3 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                      {preview.issuer}
                    </p>
                    <h3 id="certificate-preview-title" className="mt-1 text-xl font-bold text-[var(--text-primary)]">
                      {preview.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="control px-3 py-1.5 text-xs"
                    onClick={() => setPreview(null)}
                  >
                    Close
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {preview.description}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] font-medium">
                    ID: {preview.credentialId}
                  </span>
                  <button
                    type="button"
                    className="flat-button px-4 py-2.5 text-xs gap-1.5"
                    onClick={() => openCredential(preview)}
                  >
                    <span>{t('certificates.viewCredential', 'View Credential')}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </section>
  );
};

export default Certificates;
