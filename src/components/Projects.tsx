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
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  const projects = [
    {
      title: 'Intelligent Trading System',
      slug: 'intelligent-trading-system',
      icon: 'fas fa-chart-line',
      status: 'Completed',
      gradient: 'from-white to-gray-300',
      glowColor: 'rgba(255,255,255,0.15)',
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
      gradient: 'from-green-300 to-emerald-200',
      glowColor: 'rgba(110,231,183,0.18)',
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
      gradient: 'from-yellow-300 to-lime-200',
      glowColor: 'rgba(253,224,71,0.15)',
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
      gradient: 'from-purple-300 to-pink-200',
      glowColor: 'rgba(216,180,254,0.18)',
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
      gradient: 'from-orange-300 to-red-200',
      glowColor: 'rgba(251,146,60,0.18)',
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
      gradient: 'from-blue-300 to-cyan-200',
      glowColor: 'rgba(147,197,253,0.18)',
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
      gradient: 'from-indigo-300 to-blue-200',
      glowColor: 'rgba(165,180,252,0.18)',
      description: 'Flutter app for tracking Consumer Price Index (CPI) data with Supabase backend. Features data sharing, native splash screen, provider-based state management, and offline path storage.',
      technologies: ['Flutter', 'Dart', 'Supabase', 'Provider', 'share_plus', 'intl'],
      github: 'https://github.com/ChandraMohan1012/CPI',
      demo: null
    }
  ]

  // ── Scroll helpers ──────────────────────────────────────────────────────────
  const CARD_WIDTH = 380
  const GAP = 24

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return
    const clamped = Math.max(0, Math.min(index, projects.length - 1))
    setActiveIndex(clamped)
    scrollRef.current.scrollTo({
      left: clamped * (CARD_WIDTH + GAP),
      behavior: 'smooth'
    })
  }, [projects.length])

  // Sync dot indicator when user manually scrolls
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
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full" />
      </div>

      <div className="relative z-10">
        {/* ── Section Header ───────────────────────────────────────────────── */}
        <div className={`text-center mb-16 px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-folder-open text-white" />
            <span className="text-gray-300">My Projects</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Featured <span className="text-gray-300">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-3">
            Explore the projects I&apos;ve built across various domains
          </p>
          {/* Scroll hint */}
          <span className={`inline-flex items-center gap-2 text-gray-500 text-sm transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <i className="fas fa-hand-pointer text-xs" />
            Drag or use arrows to explore
            <i className="fas fa-arrow-right text-xs animate-bounce-x" />
          </span>
        </div>

        {/* ── Carousel Wrapper ─────────────────────────────────────────────── */}
        <div className="relative">
          {/* Left fade edge */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          {/* Right fade edge */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* ── Prev / Next buttons ───────────────────────────────────────── */}
          <button
            id="projects-prev"
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Previous project"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>
          <button
            id="projects-next"
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Next project"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          {/* ── Scroll track ─────────────────────────────────────────────── */}
          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="flex gap-6 overflow-x-auto pb-6 px-[max(2rem,calc(50vw-190px))] scroll-smooth"
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
                  transitionDelay: isVisible ? `${150 + index * 80}ms` : '0ms',
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Glow halo */}
                <div
                  className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${project.glowColor}, transparent 70%)` }}
                />

                <div
                  className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/25 transition-all duration-500 cursor-pointer flex flex-col"
                  onClick={() => router.push(`/projects/${project.slug}`)}
                >
                  {/* Card header */}
                  <div className="p-6 bg-white/5 border-b border-white/10">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          <i className={`${project.icon} text-2xl text-black`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-all duration-300">
                            {project.title}
                          </h3>
                          <span className="text-gray-400 text-sm">{project.status}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        project.status === 'Live'
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-white/10 text-white border-white/20'
                      }`}>
                        {project.status === 'Live' ? '● Live' : project.status}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-1">
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
                        <i className="fas fa-arrow-right" />
                        View Details
                      </span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                      >
                        <i className="fab fa-github" />
                        GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                        >
                          <i className="fas fa-play" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators ───────────────────────────────────────────────── */}
        <div className={`flex justify-center gap-2 mt-8 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {projects.map((_, idx) => (
            <button
              key={idx}
              id={`project-dot-${idx}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
