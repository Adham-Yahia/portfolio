import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { containerVariants, itemVariants } from '../utils/animations';

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // هُنا المكان اللي بنحط فيه الرمز (Access Key) 
      const response = await axios.post('https://api.web3forms.com/submit', {
        access_key: '22d9219d-5903-4012-813a-971986c5a9ec', 
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      
      if (response.data.success) {
        setMessageType('success');
        setMessage(t('contact.form.success'));
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setMessageType('error');
      setMessage(t('contact.form.error'));
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
    rounded-lg text-gray-900 dark:text-white placeholder-gray-500 
    dark:placeholder-gray-400 focus:outline-none focus:border-primary-500 
    dark:focus:border-primary-400 transition-colors duration-300
  `;

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300" ref={ref}>
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
              {t('contact.title')}
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Email */}
            <motion.div 
              variants={itemVariants}
              className="flex items-start space-x-4 group p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex-shrink-0">
                <motion.div 
                  className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('contact.email')}
                </h3>
                <a href={`mailto:${t('contact.emailValue')}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                  {t('contact.emailValue')}
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div 
              variants={itemVariants}
              className="flex items-start space-x-4 group p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex-shrink-0">
                <motion.div 
                  className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.609l2.01 1.042a1 1 0 001.092-.217l1.71-1.71a1 1 0 011.414 0l2.83 2.83a1 1 0 010 1.414l-1.71 1.71a1 1 0 00-.217 1.092l1.042 2.01a1 1 0 00.609.502l4.493 1.498a1 1 0 00.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('contact.phone')}
                </h3>
                <a href={`tel:${t('contact.phoneValue')}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                  {t('contact.phoneValue')}
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              variants={itemVariants}
              className="flex items-start space-x-4 group p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex-shrink-0">
                <motion.div 
                  className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('contact.location')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('contact.locationValue')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Name Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('contact.form.name')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses('name')}
                  placeholder={t('contact.form.name')}
                />
                {errors.name && (
                  <motion.span 
                    className="absolute -bottom-6 left-0 text-red-500 text-sm font-semibold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.name}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants} className="pt-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('contact.form.email')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses('email')}
                  placeholder={t('contact.form.email')}
                />
                {errors.email && (
                  <motion.span 
                    className="absolute -bottom-6 left-0 text-red-500 text-sm font-semibold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Message Textarea */}
            <motion.div variants={itemVariants} className="pt-4">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('contact.form.message')}
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`${inputClasses('message')} resize-none`}
                  placeholder={t('contact.form.message')}
                />
                {errors.message && (
                  <motion.span 
                    className="absolute -bottom-6 left-0 text-red-500 text-sm font-semibold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.message}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="relative z-10"
                  animate={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      ⟳
                    </motion.span>
                  ) : (
                    t('contact.form.send')
                  )}
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Status Message */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    messageType === 'success'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
