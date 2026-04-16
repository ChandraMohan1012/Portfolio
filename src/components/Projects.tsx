'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  // Each project gets a space-mission colour identity
  const projects = [
    {
      title: 'Intelligent Trading System',
      slug: 'intelligent-trading-system',
      icon: 'fas fa-chart-line',
      status: 'Completed',
      mission: 'MISSION-01',
      planetClass: 'planet-purple',
      accentColor: '#e5e7eb',
      glowColor: 'rgba(255,255,255,0.18)',
      gradient: 'from-white to-gray-300',
      description: 'Python-based AI trading analysis using ML models and sentiment insights. Applied prompt engineering for signal explanation, decision reasoning, and automated reporting.',
      technologies: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
      github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System',
      demo: 'https://drive.google.com/file/d/1y5Auuq8v_Nz560W-cnyEG0VW8yWoAUX8/view?usp=drivesdk'
    },
    {
      title: 'SoilMate: Smart Crop System',
      slug: 'soilmate',
      icon: 'fas fa-seedling',
      status: 'Completed',
      mission: 'MISSION-02',
      planetClass: 'planet-blue',
      accentColor: '#6ee7b7',
      glowColor: 'rgba(110,231,183,0.2)',
      gradient: 'from-green-300 to-emerald-200',
      description: 'AI-based system for crop, fertilizer, and crop health recommendations using soil data. Implemented ANN, Random Forest, and CNN with explainable AI via Flask and CLI tools.',
      technologies: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
      github: 'https://github.com/ChandraMohan1012/SoilMate.git',
      demo: 'https://drive.google.com/file/d/1i69eUD6ultUnJ_sHWS0Vw8MM66Jrr9Xc/view?usp=drivesdk'
    },
    {
      title: 'AgroConnect',
      slug: 'agroconnect',
      icon: 'fas fa-users',
      status: 'Completed',
      mission: 'MISSION-03',
      planetClass: 'planet-orange',
      accentColor: '#fde68a',
      glowColor: 'rgba(253,230,138,0.18)',
      gradient: 'from-yellow-300 to-lime-200',
      description: 'Multi-role Flutter app connecting farmers, workers, equipment holders, shop owners, and buyers. Role-based dashboards with weather updates, rentals, crop sales, hiring, and offline support.',
      technologies: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
      github: 'https://github.com/ChandraMohan1012/Agro_connect',
      demo: 'https://drive.google.com/file/d/1jrKpNiruHplQyNjBdcW3CtztKFcdfPdp/view?usp=drivesdk'
    },
    {
      title: 'Bill-Urai',
      slug: 'bill-urai',
      icon: 'fas fa-shopping-cart',
      status: 'Completed',
      mission: 'MISSION-04',
      planetClass: 'planet-purple',
      accentColor: '#d8b4fe',
      glowColor: 'rgba(216,180,254,0.2)',
      gradient: 'from-purple-300 to-pink-200',
      description: 'Flutter-based billing app with barcode scanning and real-time product total calculation. Hive-powered offline storage for billing data and app state persistence.',
      technologies: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
      github: 'https://github.com/ChandraMohan1012/Bill-Urai',
      demo: 'https://drive.google.com/file/d/1wfm9KKvzxlU9bVrnMkYxle1nJ_3EIksJ/view?usp=drivesdk'
    },
    {
      title: 'Virundhu',
      slug: 'virundhu',
      icon: 'fas fa-utensils',
      status: 'Completed',
      mission: 'MISSION-05',
      planetClass: 'planet-orange',
      accentColor: '#fb923c',
      glowColor: 'rgba(251,146,60,0.2)',
      gradient: 'from-orange-300 to-red-200',
      description: 'Flutter-based food ordering & social dining app with Lottie animations, Supabase backend integration, and image upload. Designed for a premium restaurant experience with real-time order management.',
      technologies: ['Flutter', 'Dart', 'Supabase', 'Lottie', 'image_picker', 'Font Awesome'],
      github: 'https://github.com/ChandraMohan1012/Virundhu',
      demo: null
    },
    {
      title: 'Exports Portfolio',
      slug: 'exports-portfolio',
      icon: 'fas fa-globe',
      status: 'Live',
      mission: 'MISSION-06',
      planetClass: 'planet-blue',
      accentColor: '#93c5fd',
      glowColor: 'rgba(147,197,253,0.2)',
      gradient: 'from-blue-300 to-cyan-200',
      description: 'Professional business exports portfolio website built with pure HTML/CSS. Showcases product listings, IEC/GST details, WhatsApp inquiry integration, and multi-page navigation. Deployed live on Vercel.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'WhatsApp API'],
      github: 'https://github.com/ChandraMohan1012/exports-portfolio',
      demo: 'https://exports-portfolio.vercel.app'
    },
    {
      title: 'Suzhi — CPI Tracker',
      slug: 'suzhi-cpi-tracker',
      icon: 'fas fa-chart-bar',
      status: 'Completed',
      mission: 'MISSION-07',
      planetClass: 'planet-purple',
      accentColor: '#a5b4fc',
      glowColor: 'rgba(165,180,252,0.2)',
      gradient: 'from-indigo-300 to-blue-200',
      description: 'Flutter app for tracking Consumer Price Index (CPI) data with Supabase backend. Features data sharing, native splash screen, provider-based state management, and offline path storage.',
      technologies: ['Flutter', 'Dart', 'Supabase', 'Provider', 'share_plus', 'intl'],
      github: 'https://github.com/ChandraMohan1012/CPI',
      demo: null
    }
  ]

  // ── Scroll helpers ──────────────────────────────────────────────────────────
  const CARD_WIDTH = 380
  const GAP = 28

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return
    const clamped = Math.max(0, Math.min(index, projects.length - 1))
    setActiveIndex(clamped)
    scrollRef.current.scrollTo({ left: clamped * (CARD_WIDTH + GAP), behavior: 'smooth' })
  }, [projects.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP))
      setActiveIndex(Math.max(0, Math.min(idx, projects.length - 1)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [projects.length])

  // ── Drag to scroll ──────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setScrollStart(scrollRef.current?.scrollLeft ?? 0)
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    scrollRef.current.scrollLeft = scrollStart - (e.clientX - dragStart)
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* ── Space Background ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebula clouds */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), rgba(59,130,246,0.2), transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.3), rgba(236,72,153,0.15), transparent 70%)' }} />

        {/* Orbit rings (from Hero theme) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="orbit-ring w-[700px] h-[700px] absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{ animationDuration: '80s' }} />
          <div className="orbit-ring w-[950px] h-[950px] absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-40" style={{ animationDuration: '110s', animationDirection: 'reverse' }} />
        </div>

        {/* Floating micro-planets */}
        <div className="absolute top-10 right-20 w-12 h-12 planet-purple rounded-full opacity-60 animate-float" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 left-8 w-8 h-8 planet-blue rounded-full opacity-50 animate-float-reverse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-1/3 w-6 h-6 planet-orange rounded-full opacity-70 animate-float" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 planet-purple rounded-full opacity-40 animate-float-reverse" style={{ animationDuration: '7s' }} />
      </div>

      <div className="relative z-10">
        {/* ── Section Header ───────────────────────────────────────────────── */}
        <div className={`text-center mb-16 px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Mission control badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="text-gray-300 font-mono tracking-widest text-xs">MISSION CONTROL · PROJECTS</span>
          </span>

          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Launched{' '}
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Missions
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Each project is a mission — built, launched, and exploring new frontiers
          </p>

          {/* Scroll hint */}
          <span className={`inline-flex items-center gap-2 text-gray-500 text-sm font-mono transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <i className="fas fa-rocket text-xs" style={{ transform: 'rotate(90deg)' }} />
            NAVIGATE MISSIONS · DRAG OR USE THRUSTERS
            <i className="fas fa-chevron-right text-xs" />
            <i className="fas fa-chevron-right text-xs opacity-50" />
          </span>
        </div>

        {/* ── Carousel ─────────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Edge fades — deep space fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #000000, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #000000, transparent)' }} />

          {/* Thruster buttons (prev / next) */}
          <button
            id="projects-prev"
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 0 20px rgba(255,255,255,0.08)',
            }}
            aria-label="Previous mission"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>
          <button
            id="projects-next"
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 0 20px rgba(255,255,255,0.08)',
            }}
            aria-label="Next mission"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          {/* Scroll track */}
          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="flex gap-7 overflow-x-auto pb-8 px-[max(3rem,calc(50vw-190px))]"
            style={{
              scrollSnapType: 'x mandatory',
              cursor: isDragging ? 'grabbing' : 'grab',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative flex-none transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  width: `${CARD_WIDTH}px`,
                  scrollSnapAlign: 'center',
                  transitionDelay: isVisible ? `${120 + index * 70}ms` : '0ms',
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Nebula glow halo on hover */}
                <div
                  className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${project.glowColor}, transparent 70%)` }}
                />

                {/* Card shell */}
                <div
                  className="relative h-full rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-all duration-500 group-hover:translate-y-[-4px]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    border: hoveredProject === index
                      ? `1px solid ${project.accentColor}40`
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: hoveredProject === index
                      ? `0 0 30px ${project.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`
                      : '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                >
                  {/* Top star-map strip */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)`, opacity: hoveredProject === index ? 1 : 0.3, transition: 'opacity 0.4s' }}
                  />

                  {/* Card header */}
                  <div className="p-6 border-b border-white/5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        {/* Planet icon */}
                        <div className="relative">
                          <div
                            className={`w-14 h-14 ${project.planetClass} rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500`}
                            style={{ boxShadow: `0 0 20px ${project.glowColor}` }}
                          >
                            <i className={`${project.icon} text-xl`} style={{ color: project.accentColor }} />
                          </div>
                          {/* Tiny orbit ring around the icon */}
                          <div
                            className="absolute inset-0 rounded-full border animate-spin-slow pointer-events-none"
                            style={{ borderColor: `${project.accentColor}30`, width: '110%', height: '110%', top: '-5%', left: '-5%', animationDuration: '8s' }}
                          />
                        </div>

                        <div>
                          {/* Mission number */}
                          <span className="font-mono text-xs tracking-widest mb-1 block" style={{ color: project.accentColor, opacity: 0.7 }}>
                            {project.mission}
                          </span>
                          <h3 className="text-lg font-bold text-white group-hover:text-gray-100 transition-all duration-300 leading-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span
                        className="px-3 py-1 text-xs font-mono font-semibold rounded-full border flex-shrink-0"
                        style={project.status === 'Live'
                          ? { background: 'rgba(34,197,94,0.15)', color: '#86efac', borderColor: 'rgba(34,197,94,0.3)' }
                          : { background: 'rgba(255,255,255,0.07)', color: '#d1d5db', borderColor: 'rgba(255,255,255,0.12)' }
                        }
                      >
                        {project.status === 'Live' ? '● LIVE' : '✓ DONE'}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-400 mb-5 leading-relaxed text-sm flex-1">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 text-xs font-mono rounded-md transition-all duration-300"
                          style={hoveredProject === index
                            ? { background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }
                            : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.06)' }
                          }
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action row */}
                    <div className="flex gap-4 pt-4 border-t border-white/5">
                      <span className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors duration-300 text-sm font-mono">
                        <i className="fas fa-satellite-dish text-xs" />
                        Details
                      </span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 text-sm font-mono"
                      >
                        <i className="fab fa-github text-xs" />
                        Source
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 transition-colors duration-300 text-sm font-mono ml-auto"
                          style={{ color: project.accentColor }}
                        >
                          <i className="fas fa-rocket text-xs" />
                          Launch
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent glow line */}
                  <div
                    className="h-px w-full transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)`, opacity: hoveredProject === index ? 0.6 : 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators (star-style) ───────────────────────────────────── */}
        <div className={`flex justify-center items-center gap-3 mt-6 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {projects.map((project, idx) => (
            <button
              key={idx}
              id={`project-dot-${idx}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to ${project.title}`}
              className="transition-all duration-300 rounded-full"
              style={activeIndex === idx
                ? { width: '24px', height: '6px', background: projects[activeIndex].accentColor, boxShadow: `0 0 10px ${projects[activeIndex].glowColor}` }
                : { width: '6px', height: '6px', background: 'rgba(255,255,255,0.2)' }
              }
            />
          ))}
        </div>

        {/* Mission counter */}
        <p className={`text-center font-mono text-xs text-gray-600 mt-4 tracking-widest transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          MISSION {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  )
}

export default Projects
