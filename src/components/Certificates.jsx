import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { containerVariants, itemVariants } from '../utils/animations';
import useFeedback from '../hooks/useFeedback';

export const Certificates = () => {
  const { triggerClick, triggerHover } = useFeedback();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const certificatesData = [
        {
      id: 1,
      name: 'Introduction to Front-End',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development','Frontend'],
      credentialId: 'YXMRJARU2CJC',
      icon: '☁️',
      color: 'from-orange-500 via-red-500 to-pink-600',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/YXMRJARU2CJC',
      bgGlow: 'bg-orange-500/20',
      description: 'including HTML5, CSS3, Bootstrap, UI design, responsive web layouts, and an introduction to React and modern web development.'
    },
    {
      id: 2,
      name: 'JavaScript',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development','Frontend'],
      credentialId: 'M6ZYP1NTV55E',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/M6ZYP1NTV55E',
      icon: '⚡',
      color: 'from-yellow-400 via-orange-500 to-red-500',
      bgGlow: 'bg-yellow-500/20',
      description: 'Advanced JavaScript ES6+ concepts, DOM manipulation, unit testing with Jest, asynchronous programming, and OOP practices.'
    },
    {
      id: 3,
      name: 'Version Control',
      issuer: 'Meta',
      date: 'August 2026',
      category: 'Web Development',
      credentialId: 'GIFOP9BNV5HU',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/GIFOP9BNV5HU',
      icon: '🐙',
      color: 'from-purple-600 via-indigo-600 to-blue-600',
      bgGlow: 'bg-purple-500/20',
      description: 'Linux, Git, GitHub, branch management, and team collaboration workflows.'
    },
    {
      id: 4,
      name: 'HTML and CSS in Depth',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development','Frontend'],
      credentialId: 'YXMRJARU2CJC',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/YXMRJARU2CJC',
      icon: '⚛️',
      color: 'from-blue-500 via-cyan-500 to-blue-600',
      bgGlow: 'bg-blue-500/20',
      description: 'Advanced HTML5 & CSS3 layout techniques, Bootstrap framework, Flexbox, CSS Grid, responsive design, web accessibility (WCAG), and animations'
    },
    {
      id: 5,
      name: 'React Basics',
      issuer: 'Meta',
      date: 'August 2026',
      category: ['Web Development','Frontend'],
      credentialId: '3IFVIKW2LTK3',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/records/3IFVIKW2LTK3',
      icon: '⚛️',
      color: 'from-blue-500 via-cyan-500 to-blue-600',
      bgGlow: 'bg-blue-500/20',
      description: 'Completed comprehensive training on core React concepts, including building reusable components, managing data flow using props, designing dynamic user interfaces, and handling form interactions to create scalable and responsive web applications.'
    },
    {
      id: 6,
      name: 'Python Programming',
      issuer: 'Mahara-Tech',
      date: 'February 2026',
      category: ["Backend", "AI"],
      credentialId: '38tFyPlFV9',
      credentialUrl: 'https://maharatech.gov.eg/mod/customcert/verify_certificate.php?',
      icon: '🌐',
      color: 'from-green-500 via-emerald-500 to-teal-600',
      bgGlow: 'bg-green-500/20',
      description: 'Structure proggramming, OOP, algorithm and Data Structure'
    },
    {
      id: 7,
      name: 'IC-What is Innovation?',
      issuer: 'Arizona State University',
      date: 'March 2026',
      category: 'Innovation',
      credentialId: 'd1703266-747a-4352-bb08-435c5a1d0a5f',
      credentialUrl: 'https://poweredby.asu.edu/validate-credentials/?token=d1703266-747a-4352-bb08-435c5a1d0a5f&email=ayz304333@gu.edu.eg',
      icon: '🎨',
      color: 'from-purple-500 via-pink-500 to-rose-600',
      bgGlow: 'bg-purple-500/20',
      description: 'Innovation strategies, design thinking, problem-solving, and creative solution development.'
    },
    
  ];

  const categories = ['All', 'AI', 'Web Development', 'Frontend', 'Backend'];

const filteredCertificates = useMemo(() => {
  if (selectedCategory === 'All') return certificatesData;
  return certificatesData.filter(cert => {
    if (Array.isArray(cert.category)) {
      return cert.category.includes(selectedCategory);
    }
    return cert.category === selectedCategory;
  });
}, [selectedCategory]);

  return (
    <section 
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" 
      ref={ref}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
            <span className="text-2xl">🎓</span>
            <span className="text-primary-600 dark:text-primary-400 font-semibold">Professional Growth</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
              Certificates & Achievements
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Continuous learning and professional certifications that showcase my commitment to excellence
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="mb-14 flex flex-wrap gap-3 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((category, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                triggerClick();
                setSelectedCategory(category);
              }}
              onMouseEnter={triggerHover}
              className={`group relative px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-white shadow-2xl scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-xl'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  delay: index * 0.08,
                }}
                className="group relative perspective-1000"
                onMouseEnter={triggerHover}
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 ${cert.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Main Card */}
                <motion.div
                  className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer transform-gpu"
                  whileHover={{ 
                    y: -12,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: '0 25px 50px rgba(99, 102, 241, 0.25)'
                  }}
                  onClick={() => triggerClick()}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cert.color} opacity-10 rounded-full blur-3xl`}
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />

                  <div className="relative z-10 p-7 h-full flex flex-col">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} text-white text-3xl shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                        transition={{ duration: 0.5 }}
                      >
                        {cert.icon}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-white/20"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      <motion.div
                        className={`px-4 py-1.5 bg-gradient-to-r ${cert.color} text-white text-xs font-black rounded-full shadow-md uppercase tracking-wide`}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                      >
                        {cert.category}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {cert.name}
                    </h3>

                    {/* Issuer & ID */}
                    <div className="mb-4">
                      <p className="text-base font-bold text-primary-600 dark:text-primary-400 mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-500 tracking-wider">
                        ID: {cert.credentialId}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                      {cert.description}
                    </p>

                    {/* Date & Status */}
                    <div className="flex items-center justify-between mb-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          {cert.date}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                        ✓ Verified
                      </span>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className="relative w-full py-4 rounded-xl font-bold text-white overflow-hidden group/btn"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (cert.credentialUrl && cert.credentialUrl !== '#') {
                          window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${cert.color}`} />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View Credential
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredCertificates.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold">
              No certificates found in this category
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
