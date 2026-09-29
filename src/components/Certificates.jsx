import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';
import useFeedback from '../hooks/useFeedback';

export const Certificates = () => {
  const { t } = useTranslation();
  const { triggerClick, triggerHover } = useFeedback();
  // Default active state set to 'Featured'
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

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
      featured: true,
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
      featured: false,
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

  return (
    <section
      id="certificates"
      className="py-24 bg-slate-100/70 dark:bg-[var(--bg-primary)] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[var(--btn-secondary-bg)] border border-[var(--btn-secondary-border)] rounded-full mb-4 shadow-sm">
            <span className="text-sm">🎓</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('certificates.badge', 'Professional Growth')}
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
          >
            {t('certificates.title', 'Certificates & Achievements')}
          </motion.h2>
          <motion.div 
            variants={itemVariants} 
            className="w-12 h-1 bg-slate-900 dark:bg-slate-300 mx-auto rounded-full mb-3"
          />
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            {t('certificates.subtitle', 'Continuous learning and professional certifications demonstrating software engineering excellence')}
          </motion.p>
        </motion.div>

        {/* Category Filter Buttons - "Featured" is default active, styled with #334155 bg and #475569 border in dark mode */}
        <motion.div 
          className="mb-12 flex flex-wrap gap-2.5 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                triggerClick();
                setSelectedCategory(category);
              }}
              onMouseEnter={triggerHover}
              className={`px-4 py-2 rounded-lg font-medium text-xs tracking-wide transition-all duration-200 select-none flex items-center gap-1.5 ${
                selectedCategory === category
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--btn-primary-border)] shadow-sm'
                  : 'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] hover:border-[var(--btn-secondary-hover-border)] hover:bg-[var(--btn-secondary-hover-bg)]'
              }`}
            >
              {category === 'Featured' && (
                <span className="text-amber-400">★</span>
              )}
              <span>{getCategoryLabel(category)}</span>
            </button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group relative flex flex-col justify-between bg-white dark:bg-[var(--bg-card)] rounded-xl border border-slate-200/90 dark:border-[var(--border-default)] shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Certificate Image Frame - Properly sized & object-contain to prevent cutting off */}
                  {cert.image && (
                    <div className="w-full aspect-[4/3] bg-slate-100/90 dark:bg-[#0c121e] border-b border-slate-100 dark:border-[var(--border-subtle)] p-3 flex items-center justify-center relative overflow-hidden group/img">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {cert.featured && (
                        <div className="absolute top-2.5 right-2.5 bg-slate-900/90 dark:bg-[#334155]/95 text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-700 dark:border-[var(--border-strong)] shadow-sm">
                          <span>★</span>
                          <span className="text-white text-[10px] uppercase tracking-wider">{t('certificates.featured', 'Featured')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-5">
                    {/* Header: Category Badge + Issuer */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-[#1a2337] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[var(--border-subtle)]">
                        {Array.isArray(cert.category) ? cert.category[0] : cert.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {cert.issuer}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                      {cert.name}
                    </h3>

                    {/* ID */}
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3">
                      ID: {cert.credentialId}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Section with Calm Slate Button */}
                <div className="p-5 pt-0 mt-auto">
                  <div className="pt-3 border-t border-slate-100 dark:border-[var(--border-subtle)] flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {cert.date}
                    </span>

                    <button
                      onClick={() => {
                        triggerClick();
                        if (cert.credentialUrl && cert.credentialUrl !== '#') {
                          window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--btn-primary-border)] hover:bg-[var(--btn-primary-hover-bg)] hover:border-[var(--btn-primary-hover-border)] transition-all duration-200 inline-flex items-center gap-1.5 shadow-sm group/btn"
                    >
                      <span>{t('certificates.viewCredential', 'View Credential')}</span>
                      <span className="ltr:group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No certificates found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;