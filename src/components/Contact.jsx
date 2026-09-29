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
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

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
    w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0e1420] border 
    ${errors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700/80 focus:border-slate-400 dark:focus:border-[#475569]'}
    rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 
    focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:bg-white dark:focus:bg-[#0b0f17] transition-all duration-200
  `;

  return (
    <section id="contact" className="py-24 bg-slate-100/70 dark:bg-[#0f1523] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
          >
            {t('contact.title')}
          </motion.h2>
          <motion.div 
            variants={itemVariants} 
            className="w-12 h-1 bg-slate-900 dark:bg-slate-300 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Cards */}
          <motion.div 
            className="lg:col-span-5 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Email */}
            <motion.div 
              variants={itemVariants}
              className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#141b2b] border border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-[#475569] hover:shadow-sm transition-all duration-200 shadow-sm"
            >
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#1a2337] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t('contact.email')}
                </h3>
                <a href={`mailto:${t('contact.emailValue')}`} className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-white transition-colors mt-0.5 inline-block">
                  {t('contact.emailValue')}
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div 
              variants={itemVariants}
              className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#141b2b] border border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-[#475569] hover:shadow-sm transition-all duration-200 shadow-sm"
            >
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#1a2337] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.609l2.01 1.042a1 1 0 001.092-.217l1.71-1.71a1 1 0 011.414 0l2.83 2.83a1 1 0 010 1.414l-1.71 1.71a1 1 0 00-.217 1.092l1.042 2.01a1 1 0 00.609.502l4.493 1.498a1 1 0 00.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t('contact.phone')}
                </h3>
                <a href={`tel:${t('contact.phoneValue')}`} className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-white transition-colors mt-0.5 inline-block">
                  {t('contact.phoneValue')}
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              variants={itemVariants}
              className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#141b2b] border border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-[#475569] hover:shadow-sm transition-all duration-200 shadow-sm"
            >
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#1a2337] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t('contact.location')}
                </h3>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {t('contact.locationValue')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white dark:bg-[#141b2b] rounded-xl shadow-sm p-6 sm:p-8 space-y-5 border border-slate-200/90 dark:border-slate-800/90"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Name */}
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {t('contact.form.name')}
              </label>
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
                <span className="text-red-500 text-xs font-medium mt-1 block">
                  {errors.name}
                </span>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {t('contact.form.email')}
              </label>
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
                <span className="text-red-500 text-xs font-medium mt-1 block">
                  {errors.email}
                </span>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`${inputClasses('message')} resize-none`}
                placeholder={t('contact.form.message')}
              />
              {errors.message && (
                <span className="text-red-500 text-xs font-medium mt-1 block">
                  {errors.message}
                </span>
              )}
            </motion.div>

            {/* Submit Button - Styled with #334155 bg and #475569 border in dark mode */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-medium text-sm bg-slate-900 text-white dark:bg-[#334155] dark:text-slate-100 border border-slate-900 dark:border-[#475569] hover:bg-slate-800 dark:hover:bg-[#475569] dark:hover:border-slate-500 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block animate-spin">⟳</span>
                ) : (
                  <span>{t('contact.form.send')}</span>
                )}
              </button>
            </motion.div>

            {/* Status Alert */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`p-3.5 rounded-lg text-xs font-medium ${
                    messageType === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
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
