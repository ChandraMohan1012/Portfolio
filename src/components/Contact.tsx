'use client'

import { useEffect, useRef, useState } from 'react'

const Contact = () => {
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

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      label: 'Email',
      value: 'chandruselvam1012@gmail.com',
      link: 'mailto:chandruselvam1012@gmail.com',
      gradient: 'from-white to-gray-300',
      description: 'Send me a message'
    },
    {
      icon: 'fas fa-phone',
      label: 'Phone',
      value: '+91 6369431485',
      link: 'tel:+916369431485',
      gradient: 'from-gray-200 to-white',
      description: 'Available for calls'
    },
    {
      icon: 'fas fa-globe-asia',
      label: 'Location',
      value: 'Gobichettipalayam, Erode, Tamil Nadu, India',
      link: null,
      gradient: 'from-white to-gray-400',
      description: 'Based in India'
    }
  ]

  const socialLinks = [
    {
      icon: 'fab fa-linkedin-in',
      url: 'https://www.linkedin.com/in/info-chandramohan/',
      title: 'LinkedIn',
      gradient: 'from-white to-gray-300'
    },
    {
      icon: 'fab fa-github',
      url: 'https://github.com/ChandraMohan1012',
      title: 'GitHub',
      gradient: 'from-gray-200 to-white'
    },
    {
      icon: 'fab fa-telegram',
      url: 'https://t.me/+916369431485',
      title: 'Telegram',
      gradient: 'from-white to-gray-400'
    }
  ]

  return (
    <section 
      id="contact" 
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Minimalist background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gray-300/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-1/4 w-6 h-6 planet-purple rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 planet-blue rounded-full opacity-50 animate-float-reverse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-satellite text-white"></i>
            <span className="text-gray-300">Get In Touch</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Make <span className="text-gray-300">Contact</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to launch your next project? I&apos;m always open to exploring new opportunities and collaboration.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - CTA Card */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="relative group">
              {/* Glow */}
              <div className="absolute -inset-1 sm:-inset-4 bg-gradient-to-r from-white/20 via-gray-300/20 to-white/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-50 transition-all duration-700"></div>
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden">
                {/* Background orb */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                
                <a href="https://mail.google.com/mail/?view=cm&to=chandruselvam1012@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 mb-8 relative group/header cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-2xl flex items-center justify-center group-hover/header:scale-110 transition-transform duration-300">
                    <i className="fas fa-envelope text-2xl text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white group-hover/header:text-gray-200 transition-colors duration-300">Let&apos;s Connect</h3>
                    <p className="text-gray-400 text-sm">Ready to start a conversation</p>
                  </div>
                </a>

                <p className="text-gray-400 mb-8 leading-relaxed relative">
                  Whether you have a project in mind, questions about AI/ML explorations, or just want to say hello — my communication channels are always open. Let&apos;s create something amazing together!
                </p>

                <a
                  href="https://mail.google.com/mail/?view=cm&to=chandruselvam1012@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] transition-all duration-500 group-hover/btn:bg-[position:100%_0]"></span>
                  <span className="relative flex items-center gap-3 text-black font-semibold">
                    <i className="fas fa-envelope text-lg"></i>
                    <span>Send Message</span>
                    <i className="fas fa-arrow-right group-hover/btn:translate-x-2 transition-transform duration-300"></i>
                  </span>
                </a>

                {/* Status indicator */}
                <div className="mt-8 flex items-center gap-3 text-gray-400 relative">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span className="text-sm">Available • Response within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card glow */}
                <div className={`absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r ${info.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-5">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <i className={`${info.icon} text-xl text-black`}></i>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500 text-sm font-medium">{info.label}</span>
                      <span className="text-xs text-gray-600">• {info.description}</span>
                    </div>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-white font-semibold hover:text-gray-300 transition-colors duration-300 truncate block"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold truncate">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className={`mt-20 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '700ms' }}>
          <p className="text-gray-500 mb-8 text-sm font-medium uppercase tracking-widest">Connect across the cosmos</p>
          
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                title={social.title}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${social.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="relative w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-white hover:border-white/20 hover:-translate-y-2">
                  <i className={`${social.icon} text-lg`}></i>
                </div>
                
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                  {social.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className={`mt-20 flex items-center justify-center gap-6 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: '900ms' }}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <i className="fas fa-rocket text-white text-sm"></i>
            <span className="text-gray-400 text-sm">Ready for new opportunities</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default Contact
