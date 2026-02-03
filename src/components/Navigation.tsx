'use client'

import { useState, useEffect } from 'react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home', icon: 'fas fa-home' },
    { href: '#about', label: 'About', icon: 'fas fa-user-astronaut' },
    { href: '#skills', label: 'Skills', icon: 'fas fa-meteor' },
    { href: '#projects', label: 'Projects', icon: 'fas fa-rocket' },
    { href: '#contact', label: 'Contact', icon: 'fas fa-satellite' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-xl flex items-center justify-center font-display font-bold text-black text-lg group-hover:scale-110 transition-transform duration-300">
                CM
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="hidden sm:block font-display font-semibold text-white">Chandru</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive 
                        ? 'text-white bg-white/10 border border-white/20' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <i className={`${link.icon} text-xs ${isActive ? 'text-white' : ''}`}></i>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-white to-gray-300 text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-briefcase text-xs"></i>
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/10 text-white border border-white/20' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className={`${link.icon} w-5 ${isActive ? 'text-white' : ''}`}></i>
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
