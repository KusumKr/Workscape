'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiDownload, FiCode, FiPlayCircle, FiZap } from 'react-icons/fi'

const highlights = [
  {
    icon: FiCode,
    title: 'Full Stack Development',
    description: 'Building end-to-end web applications with modern technologies and best practices.'
  },
  {
    icon: FiPlayCircle,
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing user interfaces that enhance user experience.'
  },
  {
    icon: FiZap,
    title: 'Performance Optimization',
    description: 'Ensuring fast, responsive, and scalable applications for optimal user satisfaction.'
  }
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/50 dark:from-primary-900/10 dark:via-transparent dark:to-secondary-900/10" />
      
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
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                  Hello! I'm Kusum Kharayat, a passionate Full Stack Developer and UI/UX Designer based in India. I specialize in building digital experiences that are both functional and visually appealing.
                </p>
                <br></br>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                  My journey in tech began with a simple curiosity about how things work on the web. Since then, I’ve been dedicated to mastering modern technologies and frameworks. I believe in writing clean, maintainable code and designing with the end user in mind.
                </p>
                <br></br>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                  When I’m not coding, you’ll find me exploring new technologies, contributing to open-source projects, sketching creative ideas, or diving into books. Reading helps me to unwind and inspires fresh ideas for my work.
                </p>
              </div>

              {/* Download Resume Button
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-6"
              >
                <a
                  href="/Resume-Kusum-Kharayat.pdf"
                  download="Resume-Kusum-Kharayat.pdf"
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-glow transition-all duration-300"
                >
                  <FiDownload size={20} />
                  Download Resume
                </a>
              </motion.div> */}
            </motion.div>

            {/* Profile Image and Stats */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Profile Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 p-1 shadow-2xl"
                >
                  <div className="w-full h-full rounded-2xl bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 to-secondary-900 flex items-center justify-center w-48 h-48 rounded-xl">
                      <img
                        src="kusum image.png"
                        alt="KK"
                        className="w-100 h-100 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-6 top-1/4 bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4 border border-primary-100 dark:border-primary-800"
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">20+</div>
                  <div className="text-sm text-dark-600 dark:text-dark-300">Projects</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -right-6 bottom-1/4 bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4 border border-secondary-100 dark:border-secondary-800"
                >
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">1+</div>
                  <div className="text-sm text-dark-600 dark:text-dark-300">Years Exp</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm border border-white/20 dark:border-dark-700/50 shadow-lg hover:shadow-glow-purple transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl shadow-lg mb-4"
                >
                  <highlight.icon className="text-white" size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-dark-100 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}