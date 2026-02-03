'use client'

import { useEffect, useRef, useState } from 'react'

const Education = () => {
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

  const courses = [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Machine Learning',
    'Software Engineering',
    'Object-Oriented Programming',
    'Web Technologies'
  ]

  return (
    <section 
      id="education" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimalist background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gray-300/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-graduation-cap text-white"></i>
            <span className="text-gray-300">Academic Journey</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            My <span className="text-gray-300">Education</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className={`group relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-200 to-gray-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
            
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
              {/* Header with gradient */}
              <div className="p-8 bg-gradient-to-r from-white/5 via-gray-200/5 to-white/5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-university text-2xl text-black"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-all duration-300">
                        Bachelor of Engineering - Computer Science
                      </h3>
                      <p className="text-gray-400 text-lg flex items-center gap-2">
                        <i className="fas fa-map-marker-alt text-white"></i>
                        Velalar College of Engineering and Technology, Erode
                      </p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-white/10 border border-white/20 text-white font-medium rounded-full flex items-center gap-2 whitespace-nowrap">
                    <i className="fas fa-calendar-alt"></i>
                    2022 - 2026
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <i className="fas fa-book text-white"></i>
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-3">
                  {courses.map((course, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/5 text-gray-300 text-sm rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
