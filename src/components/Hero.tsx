'use client'

import { useState, useEffect, useMemo } from 'react'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const roles = [
    'Prompt Engineer',
    'AI Developer',
    'Mobile App Developer',
    'Full Stack Developer',
    'Problem Solver'
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const typeWriter = () => {
      const currentRoleText = roles[roleIndex]
      
      if (isDeleting) {
        setCurrentRole(currentRoleText.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      } else {
        setCurrentRole(currentRoleText.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }
      
      if (!isDeleting && charIndex === currentRoleText.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    const typingSpeed = isDeleting ? 100 : 150
    const timer = setTimeout(typeWriter, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large purple planet */}
        <div 
          className="absolute -top-32 -right-32 w-[500px] h-[500px] planet-purple rounded-full opacity-80 animate-float"
          style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}
        />
        
        {/* Medium blue planet */}
        <div 
          className="absolute top-1/3 -left-20 w-48 h-48 planet-blue rounded-full opacity-70 animate-float-reverse"
          style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        />
        
        {/* Small orange moon */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-16 h-16 planet-orange rounded-full opacity-90"
          style={{ transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)` }}
        />

        {/* Orbit rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] orbit-ring absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{ animationDuration: '60s' }} />
          <div className="w-[800px] h-[800px] orbit-ring absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{ animationDuration: '90s', animationDirection: 'reverse' }} />
          <div className="w-[1000px] h-[1000px] orbit-ring absolute -translate-x-1/2 -translate-y-1/2 opacity-50 animate-spin-slow" style={{ animationDuration: '120s' }} />
        </div>

        {/* Subtle glow effects */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gray-300/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Astronaut badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 opacity-0 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-gray-300 text-sm font-medium">Available for new opportunities</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-white">Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Chandru
          </span>
        </h1>
        
        <div className="text-xl md:text-2xl lg:text-3xl mb-8 h-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span className="text-gray-400">I&apos;m a </span>
          <span className="text-white font-semibold">
            {currentRole}
          </span>
          <span className="border-r-2 border-white animate-pulse ml-1 inline-block h-7"></span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#projects"
            className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] animate-pulse-glow transition-all duration-500 group-hover:bg-[position:100%_0]"></span>
            <span className="relative flex items-center gap-2 text-black font-semibold">
              <i className="fas fa-rocket"></i>
              Explore My Work
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            <i className="fas fa-envelope mr-2 group-hover:animate-pulse"></i>
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
