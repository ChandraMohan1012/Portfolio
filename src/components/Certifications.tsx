'use client'

import { useEffect, useRef, useState } from 'react'

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

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

  const certifications = [
    {
      title: 'Data Science Job Simulation',
      provider: 'Forage',
      description: 'Practical tasks in SQL, ML, and reporting',
      icon: 'fas fa-database',
      gradient: 'from-white to-gray-300'
    },
    {
      title: 'Machine Learning Professional',
      provider: 'Infosys Springboard',
      description: 'Comprehensive ML fundamentals and applications',
      icon: 'fas fa-brain',
      gradient: 'from-gray-200 to-white'
    },
    {
      title: 'Natural Language Processing',
      provider: 'Infosys Springboard',
      description: 'Text processing and language models',
      icon: 'fas fa-language',
      gradient: 'from-white to-gray-400'
    },
    {
      title: 'Python Programming',
      provider: 'Infosys Springboard',
      description: 'Advanced Python development skills',
      icon: 'fab fa-python',
      gradient: 'from-gray-300 to-white'
    },
    {
      title: 'Deep Learning Specialization',
      provider: 'Udemy',
      description: 'Neural networks and deep learning',
      icon: 'fas fa-network-wired',
      gradient: 'from-white to-gray-200'
    },
    {
      title: 'Advanced Programming',
      provider: 'NPTEL',
      description: 'Advanced programming concepts',
      icon: 'fas fa-code',
      gradient: 'from-gray-200 to-white'
    }
  ]

  return (
    <section 
      id="certifications" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimalist background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gray-300/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-award text-white"></i>
            <span className="text-gray-300">Achievements</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            My <span className="text-gray-300">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Credentials earned on my continuous learning journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${200 + (index * 100)}ms` : '0ms' 
              }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${cert.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <i className={`${cert.icon} text-xl text-black`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-all duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium">
                      {cert.provider}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
