'use client'

import { useEffect, useRef, useState } from 'react'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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

  const skillCategories = [
    {
      title: 'Programming & Development',
      icon: 'fas fa-code',
      gradient: 'from-white via-gray-200 to-gray-400',
      orb: 'bg-white',
      skills: ['Python', 'SQL', 'Flutter', 'Hive', 'Supabase', 'Dart']
    },
    {
      title: 'Tools & Platforms',
      icon: 'fas fa-cog',
      gradient: 'from-gray-200 via-white to-gray-300',
      orb: 'bg-gray-200',
      skills: ['VS Code', 'Google Colab', 'GitHub', 'Canva', 'Flask', 'CLI Tools']
    },
    {
      title: 'AI & Generative AI',
      icon: 'fas fa-brain',
      gradient: 'from-white via-gray-300 to-gray-400',
      orb: 'bg-gray-100',
      skills: ['NLP', 'Generative AI', 'Sentiment Analysis', 'Model Fine-tuning', 'LLM Optimization']
    },
    {
      title: 'Prompt Engineering',
      icon: 'fas fa-robot',
      gradient: 'from-gray-300 via-white to-gray-200',
      orb: 'bg-gray-300',
      skills: ['Prompt Optimization', 'Structured Reasoning', 'AI Code Generation', 'AI Debugging', 'Self-Correction']
    }
  ]

  return (
    <section 
      id="skills" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gray-300/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-tools text-white"></i>
            <span className="text-gray-300">Technical Arsenal</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Skills & <span className="text-gray-300">Technologies</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A constellation of tools and technologies I use to navigate the universe of development
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms' 
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
              
              {/* Card content */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full overflow-hidden">
                {/* Floating orb */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${category.orb} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Card header */}
                <div className="flex items-center gap-4 mb-8 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <i className={`${category.icon} text-2xl text-black`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-all duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{category.skills.length} technologies</p>
                  </div>
                </div>
                
                {/* Skills tags */}
                <div className="flex flex-wrap gap-3 relative">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium cursor-default transition-all duration-300 ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      } ${
                        hoveredCard === index 
                          ? 'bg-white/10 text-white border border-white/20' 
                          : 'bg-white/5 text-gray-400 border border-white/5 hover:text-white hover:border-white/20'
                      }`}
                      style={{ 
                        transitionDelay: isVisible ? `${(index * 150) + (skillIndex * 50)}ms` : '0ms' 
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats - matrix themed */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}>
          {[
            { value: '20+', label: 'Technologies', icon: 'fas fa-code' },
            { value: '3+', label: 'Years Exploring', icon: 'fas fa-clock' },
            { value: '10+', label: 'Projects Complete', icon: 'fas fa-check-circle' },
            { value: '∞', label: 'Curiosity', icon: 'fas fa-infinity' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <i className={`${stat.icon} text-2xl text-white mb-4 block group-hover:scale-110 transition-transform duration-300`}></i>
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
