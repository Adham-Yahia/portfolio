import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { containerVariants, itemVariants } from '../utils/animations';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'twitter', 
      label: 'Twitter', 
      url: 'https://x.com/adham_yahya1?s=11',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'linkedin', 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/adham-yahia-33826a3b8?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    { 
      name: 'github', 
      label: 'GitHub', 
      url: 'https://github.com/Adham-Yahia',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    }
  ];

  const footerLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience', 'Experience'), href: '#experience' },
    { label: t('nav.certificates', 'Certificates'), href: '#certificates' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const techBadges = [
    { name: 'React', icon: '⚛️' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Framer Motion', icon: '✨' },
    { name: 'Vite', icon: '⚡' }
  ];

  return (
    <footer className="relative bg-slate-50 dark:bg-[#0b0f17] text-slate-800 dark:text-slate-200 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span>{t('footer.brandTitle', 'Adham ')}</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t('footer.description', 'Engineering intelligent AI applications and modern full-stack web solutions.')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3.5">
              {t('footer.quickLinks', 'Quick Links')}
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center group py-0.5"
                  >
                    <span className="ltr:mr-1.5 rtl:ml-1.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3.5">
              {t('footer.follow', 'Follow')}
            </h4>
            <div className="flex gap-2.5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Clean subtle divider */}
        <div className="h-px w-full bg-slate-200/80 dark:bg-slate-800/80 mb-8" />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Copyright badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 shadow-sm"
          >
            <span>©</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Adham Yahia</span>
            <span>•</span>
            <span>{currentYear}</span>
            <span>•</span>
            <span>{t('footer.rights', 'All Rights Reserved')}</span>
          </motion.div>

          {/* Tech Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400"
          >
            <span>{t('footer.craftedWith', 'Crafted with')}</span>
            <span>☕</span>
            <span>{t('footer.using', 'using')}</span>
            
            <div className="flex flex-wrap gap-1.5 ltr:ml-1 rtl:mr-1">
              {techBadges.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 text-[11px] font-medium inline-flex items-center gap-1 shadow-sm"
                >
                  <span className="text-[10px]">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
