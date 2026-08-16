import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animations';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'twitter', icon: 'twitter', url: 'https://x.com/adham_yahya1?s=11', color: 'from-blue-400 to-blue-600' },
    { name: 'linkedin', icon: 'linkedin', url: 'https://www.linkedin.com/in/adham-yahia-33826a3b8?utm_source=share_via&utm_content=profile&utm_medium=member_ios', color: 'from-blue-600 to-blue-800' },
    { name: 'github', icon: 'github', url: 'https://github.com/Adham-Yahia', color: 'from-gray-700 to-gray-900' }
  ];

  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white transition-colors duration-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
              Portfolio
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Engineering intelligent AI applications and modern full-stack web solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  className={`p-3 rounded-lg bg-gradient-to-br ${link.color} text-white backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all`}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {link.name === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 5-5 8-10-2-10-2" />
                    </svg>
                  )}
                  {link.name === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )}
                  {link.name === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom Section - Premium Copyright */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Copyright with animated icon */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-primary-400"
            >
              ©
            </motion.div>
            <p className="text-gray-300 font-semibold">
              {currentYear} <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent font-bold">Adham Yahia</span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-400">All Rights Reserved</span>
            </p>
          </motion.div>

          {/* Made with section - Premium style */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 text-sm"
          >
            <span className="text-gray-400 font-medium">Crafted with</span>
            <motion.span 
              className="text-red-500 text-lg"
              animate={{ 
                scale: [1, 1.3, 1],
              }} 
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ❤️
            </motion.span>
            <span className="text-gray-400 font-medium">using</span>
            
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'React', color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
                { name: 'Tailwind', color: 'from-sky-400 to-cyan-500', icon: '🎨' },
                { name: 'Framer', color: 'from-pink-500 to-purple-600', icon: '✨' },
                { name: 'Vite', color: 'from-yellow-400 to-orange-500', icon: '⚡' }
              ].map((tech, idx) => (
                <motion.span
                  key={tech.name}
                  className={`px-3 py-1 rounded-full bg-gradient-to-r ${tech.color} text-white text-xs font-bold shadow-lg flex items-center gap-1`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span>{tech.icon}</span>
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Legal Links (Optional) */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-800/50 flex flex-wrap justify-center gap-6 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, idx) => (
            <motion.a
              key={link}
              href="#"
              className="text-gray-500 hover:text-primary-400 transition-colors duration-300 relative group"
              whileHover={{ x: 3 }}
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
