'use client'

import { useEffect, useRef, useState } from 'react'

const CurrentlyLearning = () => {
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

  const learningItems = [
    {
      icon: 'fab fa-docker',
      title: 'Docker & Containerization',
      description: 'Learning containerization and DevOps practices for scalable application deployment',
      gradient: 'from-white to-gray-300',
      progress: 65
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud Computing (AWS)',
      description: 'Exploring cloud services and infrastructure for modern application development',
      gradient: 'from-gray-200 to-white',
      progress: 45
    },
    {
      icon: 'fas fa-keyboard',
      title: 'Advanced AI/ML',
      description: 'Diving deeper into transformer models, computer vision, and reinforcement learning',
      gradient: 'from-white to-gray-400',
      progress: 70
    },
    {
      icon: 'fab fa-react',
      title: 'React & Node.js',
      description: 'Expanding web development skills with modern JavaScript frameworks',
      gradient: 'from-gray-300 to-white',
      progress: 55
    }
  ]

  return (
    <section 
      id="learning" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimalist background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gray-300/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-spinner text-white animate-pulse"></i>
            <span className="text-gray-300">In Progress</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Currently <span className="text-gray-300">Learning</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            New technologies I&apos;m exploring right now
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningItems.map((item, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${200 + (index * 150)}ms` : '0ms' 
              }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-5 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <i className={`${item.icon} text-2xl text-black`}></i>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gray-200 transition-all duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                
                {/* Progress bar */}
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs text-white font-medium">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${item.progress}%` : '0%',
                        transitionDelay: `${400 + (index * 150)}ms`
                      }}
                    ></div>
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

export default CurrentlyLearning
