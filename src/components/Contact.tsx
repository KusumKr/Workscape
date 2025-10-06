'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const socialLinks = [
  {
    icon: FiGithub,
    name: 'GitHub',
    href: 'https://github.com/KusumKr',
    color: 'hover:text-gray-800 dark:hover:text-gray-200'
  },
  {
    icon: FiLinkedin,
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/kusumkr',
    color: 'hover:text-blue-600'
  },
  {
    icon: FiTwitter,
    name: 'Twitter',
    href: 'https://twitter.com/kusumkr',
    color: 'hover:text-blue-400'
  }
]

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/50 via-transparent to-primary-50/50 dark:from-secondary-900/20 dark:via-transparent dark:to-primary-900/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-800 dark:text-dark-100 mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-8">
              I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </motion.div>

          {/* Connect with me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-white/20 dark:border-dark-700/50"
          >
            <h4 className="text-xl font-semibold text-dark-800 dark:text-dark-100 mb-3">
              Connect with me
            </h4>
            <p className="text-dark-600 dark:text-dark-300 mb-4">
              Feel free to reach out through any of these platforms.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white dark:bg-dark-800 rounded-lg shadow-lg hover:shadow-xl text-dark-600 dark:text-dark-300 ${social.color} transition-all duration-300 border border-white/20 dark:border-dark-700/50`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-white/20 dark:border-dark-700/50">
                <h3 className="text-2xl font-semibold text-dark-800 dark:text-dark-100 mb-6">
                  Send me a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-dark-800 dark:text-dark-100"
                        placeholder="Your Name"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-dark-800 dark:text-dark-100"
                        placeholder="Your Email"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-dark-800 dark:text-dark-100"
                      placeholder="Subject"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-dark-800 dark:text-dark-100 resize-none"
                      placeholder="Your Message"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : submitStatus === 'success'
                        ? 'bg-green-500 hover:bg-green-600'
                        : submitStatus === 'error'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-gradient-primary hover:shadow-glow'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      'Message Sent Successfully!'
                    ) : submitStatus === 'error' ? (
                      'Failed to Send Message'
                    ) : (
                      <>
                        <FiSend size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"
                  >
                    <p className="text-green-800 dark:text-green-300 text-sm">
                      Thank you for your message! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg"
                  >
                    <p className="text-red-800 dark:text-red-300 text-sm">
                      Sorry, there was an error sending your message. Please try again.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
    </section>
  )
}