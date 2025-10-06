'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, SiFirebase, SiThreedotjs, SiChartdotjs, SiHtml5, SiCss3, SiPython } from 'react-icons/si'

const projects = [
  {
    id: 1,
    title: 'Orderbook Depth 3D Visualizer',
    description: 'A real-time 3D visualization of cryptocurrency orderbook data with advanced trading insights, pressure zone analysis, and multi-venue support.',
    image:'/project1-img.png',
    technologies: [
      { name: 'Typescript', icon: SiTypescript, color: 'text-blue-500' },
      { name: 'Three.js', icon: SiThreedotjs, color: 'text-green-500' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'text-green-600' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' }
    ],
    github: 'https://github.com/KusumKr/Orderbook-Depth-3D-Visualizer',
    live: 'https://orderbook-depth-3-d-visualizer-chi.vercel.app/',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 2,
    title: 'Workscape',
    description: 'WorkScape is a platform designed to help remote workers discover the perfect destinations for workations. It connects productivity with exploration by offering curated information on cities & towns around the world.',
    image: '/project2-img.png',
    technologies: [
      { name: 'React.js', icon: SiReact, color: 'text-black dark:text-white' },
      { name: 'Typescript', icon: SiTypescript, color: 'text-blue-500' },
      { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
      { name: 'Firebase', icon: SiFirebase, color: 'text-cyan-500' }
    ],
    github: 'https://github.com/KusumKr/Workscape',
    live: 'https://workscape-three.vercel.app/',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 3,
    title: 'Curren Swift',
    description: 'A modern, responsive web application for converting between global currencies with real-time exchange rates and historical trends.',
    image: '/project3-img.png',
    technologies: [
      { name: 'Chart.js', icon: SiChartdotjs, color: 'text-blue-500' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
      { name: 'Rest APIs', icon: SiHtml5, color: 'text-green-500' }
    ],
    github: 'https://github.com/KusumKr/CurrenSwift',
    live: 'https://curren-swift.vercel.app/',
    featured: false,
    category: 'Frontend'
  },
  {
    id: 4,
    title: 'Job Matchmakers',
    description: 'Designed to streamline the job search process by matching candidates with job opportunities that best fit their profiles. It is an AI powered platform connecting job seekers with ideal opportunities.',
    image: '/project4-img.png',
    technologies: [
      { name: 'HTML', icon: SiHtml5, color: 'text-black dark:text-white' },
      { name: 'CSS', icon: SiCss3, color: 'text-green-500' },
      { name: 'Javascript', icon: SiJavascript, color: 'text-green-600' }
    ],
    github: 'https://github.com/KusumKr/Job-Matchmakers-Pro',
    live: 'https://job-matchmakers.vercel.app/',
    featured: false,
    category: 'Frontend'
  },
  {
    id: 5,
    title: 'To Do App',
    description: 'A modern, responsive To Do application with features like task management, user authentication, and real-time updates.',
    image: '/project5-img.png',
    technologies: [
      { name: 'HTML', icon: SiHtml5, color: 'text-black dark:text-white' },
      { name: 'React', icon: SiReact, color: 'text-blue-500' },
      { name: 'CSS', icon: SiCss3, color: 'text-cyan-500' }
    ],
    github: 'https://github.com/KusumKr/To-Do-App',
    live: 'https://to-do-app-roan-theta.vercel.app/',
    featured: false,
    category: 'Frontend'
  },
  {
    id: 6,
    title: 'WeatherPy',
    description: 'WeatherPy is a simple Python application that fetches the current weather information for any city using the OpenWeatherMap API.',
    image:'/project6-img.png',
    technologies: [
      { name: 'Python', icon: SiPython, color: 'text-blue-500' },
    ],
    github: 'https://github.com/KusumKr/WeatherPy',
    featured: false,
    category: 'Python Projects'
  },
  {
    id: 7,
    title: 'Chatbot',
    description: 'Chatbot is a Python application that uses natural language processing to engage in conversations and answer questions.',
    image:'/project7-img.png',
    technologies: [
      { name: 'Python', icon: SiPython, color: 'text-blue-500' },
    ],
    github: 'https://github.com/KusumKr/Chatbot',
    featured: false,
    category: 'Python Projects'
  },
  {
    id: 8,
    title: 'Robo-Speaker',
    description: 'Robo Speaker is a simple Python-based text-to-speech (TTS) application that converts text into spoken words. It uses the `pyttsx3` library to provide offline TTS functionality. You can use this tool to make your computer speak any text you input.',
    image:'/project8-img.png',
    technologies: [
      { name: 'Python', icon: SiPython, color: 'text-blue-500' },
    ],
    github: 'https://github.com/KusumKr/Robo-speaker',
    featured: false,
    category: 'Python Projects'
  }
]

const categories = ['All', 'Full Stack', 'Frontend', 'Python Projects']

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)
  const gridProjects = selectedCategory === 'All'
  ? projects.filter(p => !p.featured)
  : projects.filter(p => p.category === selectedCategory)

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
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/30 via-transparent to-primary-50/30 dark:from-secondary-900/10 dark:via-transparent dark:to-primary-900/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-800 dark:text-dark-100 mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-8">
              A showcase of my recent work, demonstrating my skills in full-stack development,
              UI/UX design, and modern web technologies.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 to-secondary-900 overflow-hidden">
                    {/* Placeholder for project image */}
                    <img
  src={project.image}
  alt={project.title}
  className="w-full h-full object-cover"
/>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Project Links */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <FiGithub size={18} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                        aria-label="View live demo"
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <tech.icon key={tech.name} className={`${tech.color} text-lg`} />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-dark-800 dark:text-dark-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiGithub size={18} />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiExternalLink size={18} />
                        </motion.a>
                      </div>
                      
                      <motion.a
  href={project.live}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ x: 5 }}
  className="flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
>
  Learn More <FiArrowRight size={14} />
</motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-2 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-lg border border-white/20 dark:border-dark-700/50">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* All Projects Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 to-secondary-900 overflow-hidden">
                    <img src={project.image} alt={project.title} className={`w-auto h-32 mx-auto ${project.category === 'Python Projects' ? 'object-contain p-4' : 'w-full h-full object-cover'}`} />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <FiGithub size={16} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                        aria-label="View live demo"
                      >
                        <FiExternalLink size={16} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <tech.icon key={tech.name} className={`${tech.color} text-sm`} />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-dark-800 dark:text-dark-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiGithub size={16} />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiExternalLink size={16} />
                        </motion.a>
                      </div>
                      
                      <motion.a
  href={project.live}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ x: 3 }}
  className="flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
>
  View <FiArrowRight size={12} />
</motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View More Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/KusumKr"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(217, 70, 239, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FiGithub size={20} />
              View More on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl" />
    </section>
  )
}