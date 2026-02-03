'use client'

import { useEffect, useRef, useState } from 'react'

const About = () => {
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

  const highlights = [
    { icon: 'fas fa-brain', label: 'AI/ML Expert', value: 'Deep Learning' },
    { icon: 'fas fa-mobile-alt', label: 'Mobile Dev', value: 'Flutter' },
    { icon: 'fas fa-code', label: 'Languages', value: 'Python, Dart' },
    { icon: 'fas fa-rocket', label: 'Projects', value: '10+ Shipped' },
  ]

  return (
    <section 
      id="about" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimalist background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 -left-40 w-[400px] h-[400px] bg-gray-300/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-user text-white"></i>
            <span className="text-gray-300">Who Am I</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            About <span className="text-gray-300">Me</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Profile visual */}
          <div className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="relative flex justify-center">
              {/* Outer glow ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 border border-white/5 rounded-full animate-spin-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
              </div>
              
              {/* Main avatar */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/30 via-gray-300/30 to-white/30 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-72 h-72 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-3xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500">
                  <span className="text-8xl font-display font-bold text-black/90">CM</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center animate-float shadow-lg shadow-white/10">
                <i className="fas fa-code text-2xl text-black"></i>
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-gray-200 to-white rounded-2xl flex items-center justify-center animate-float-reverse shadow-lg shadow-white/10">
                <i className="fas fa-brain text-xl text-black"></i>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex justify-center gap-4 mt-12">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"
                >
                  <i className={`${item.icon} text-white text-lg mb-2`}></i>
                  <span className="text-white font-semibold text-sm">{item.value}</span>
                  <span className="text-gray-500 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className={`space-y-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="space-y-6">
              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                    <i className="fas fa-crosshairs text-black"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Mission Statement</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  I&apos;m a <span className="text-white font-semibold">Prompt Engineer and AI Developer</span> navigating the cosmos of Python, NLP, Generative AI, and AI-assisted application development. I specialize in creating structured prompts, optimizing LLM reasoning, and using AI tools to design, debug, and build stellar applications.
                </p>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-white rounded-xl flex items-center justify-center">
                    <i className="fas fa-database text-black"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Exploration Log</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  I&apos;ve developed multiple real-world systems in agriculture, billing automation, and trading analytics. My expertise spans across Python, SQL, and Flutter with Hive and Supabase for building data-driven and mobile applications. Strong foundation in NLP, sentiment analysis, data analysis, and model fine-tuning.
                </p>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                    <i className="fas fa-briefcase text-black"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Experience</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Professional experience at <span className="text-white">ScableIndia Pvt. Ltd.</span> as a Software Developer and <span className="text-white">GU DataLogic</span> as a Generative AI Intern. Worked on AI-assisted development workflows, prompt optimization, and LLM accuracy improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
