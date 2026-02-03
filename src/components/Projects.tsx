'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const projects = [
    {
      title: 'Intelligent Trading System',
      slug: 'intelligent-trading-system',
      icon: 'fas fa-chart-line',
      status: 'Completed',
      gradient: 'from-white to-gray-300',
      description: 'Python-based AI trading analysis using ML models and sentiment insights. Applied prompt engineering for signal explanation, decision reasoning, and automated reporting.',
      technologies: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
      github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System'
    },
    {
      title: 'SoilMate: Smart Crop System',
      slug: 'soilmate',
      icon: 'fas fa-seedling',
      status: 'Completed',
      gradient: 'from-gray-200 to-white',
      description: 'AI-based system for crop, fertilizer, and crop health recommendations using soil data. Implemented ANN, Random Forest, and CNN with explainable AI via Flask and CLI tools.',
      technologies: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
      github: 'https://github.com/ChandraMohan1012/SoilMate.git'
    },
    {
      title: 'AgroConnect',
      slug: 'agroconnect',
      icon: 'fas fa-users',
      status: 'Completed',
      gradient: 'from-white to-gray-400',
      description: 'Multi-role Flutter app connecting farmers, workers, equipment holders, shop owners, and buyers. Role-based dashboards with weather updates, rentals, crop sales, hiring, and offline support.',
      technologies: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
      github: 'https://github.com/ChandraMohan1012/Agro_connect'
    },
    {
      title: 'Bill-Urai',
      slug: 'bill-urai',
      icon: 'fas fa-shopping-cart',
      status: 'Completed',
      gradient: 'from-gray-300 to-white',
      description: 'Flutter-based billing app with barcode scanning and real-time product total calculation. Hive-powered offline storage for billing data and app state persistence.',
      technologies: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
      github: 'https://github.com/ChandraMohan1012/Bill-Urai'
    }
  ]

  return (
    <section 
      id="projects" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimalist background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-folder-open text-white"></i>
            <span className="text-gray-300">My Projects</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Featured <span className="text-gray-300">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the projects I&apos;ve built across various domains
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${200 + (index * 150)}ms` : '0ms' 
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Card glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
              
              <div 
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
                onClick={() => router.push(`/projects/${project.slug}`)}
              >
                {/* Header */}
                <div className="p-6 bg-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <i className={`${project.icon} text-2xl text-black`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-all duration-300">
                          {project.title}
                        </h3>
                        <span className="text-gray-400 text-sm">Completed</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/20">
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                          hoveredProject === index 
                            ? 'bg-white/10 text-white border border-white/20' 
                            : 'bg-white/5 text-gray-400 border border-white/5'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                      <i className="fas fa-arrow-right"></i>
                      View Details
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                    >
                      <i className="fab fa-github"></i>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
