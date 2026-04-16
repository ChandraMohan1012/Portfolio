'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'

/* ── System geometry ─────────────────────────────────────────────────────── */
const SYSTEM_SIZE = 900
const SUN_SIZE    = 120

const PROJECTS = [
  {
    title: 'Intelligent Trading System', 
    shortName: 'Trading AI',
    mission: 'MISSION-01',
    orbit: 140, speed: 40, size: 40,
    color: '#94a3b8',
    icon: 'fas fa-chart-line',
    pBg: 'radial-gradient(circle at 30% 30%, #f8fafc, #94a3b8, #1e293b)',
    description: 'Python-based AI trading analysis using ML models and sentiment insights.',
    tech: ['Python', 'ML', 'NLP'],
    github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System'
  },
  {
    title: 'SoilMate: Smart Crop System', 
    shortName: 'SoilMate',
    mission: 'MISSION-02',
    orbit: 200, speed: 55, size: 55,
    color: '#fbbf24',
    icon: 'fas fa-seedling',
    pBg: 'radial-gradient(circle at 30% 30%, #fef3c7, #fbbf24, #92400e)',
    description: 'AI-based system for crop, fertilizer, and health recommendations using soil data.',
    tech: ['Python', 'CNN', 'Flask'],
    github: 'https://github.com/ChandraMohan1012/SoilMate.git'
  },
  {
    title: 'AgroConnect', 
    shortName: 'AgroConnect',
    mission: 'MISSION-03',
    orbit: 280, speed: 70, size: 65,
    color: '#38bdf8',
    icon: 'fas fa-users',
    pBg: 'radial-gradient(circle at 30% 30%, #e0f2fe, #38bdf8, #1e40af)',
    description: 'Multi-role Flutter app connecting farmers, workers, and equipment holders.',
    tech: ['Flutter', 'Hive', 'Dart'],
    github: 'https://github.com/ChandraMohan1012/Agro_connect'
  },
  {
    title: 'Bill-Urai', 
    shortName: 'Bill-Urai',
    mission: 'MISSION-04',
    orbit: 360, speed: 85, size: 50,
    color: '#f87171',
    icon: 'fas fa-shopping-cart',
    pBg: 'radial-gradient(circle at 30% 30%, #fecaca, #f87171, #991b1b)',
    description: 'Flutter billing app with barcode scanning and persistent app state.',
    tech: ['Flutter', 'Hive', 'Barcode'],
    github: 'https://github.com/ChandraMohan1012/Bill-Urai'
  },
  {
    title: 'Virundhu', 
    shortName: 'Virundhu',
    mission: 'MISSION-05',
    orbit: 460, speed: 100, size: 85,
    color: '#fb923c',
    icon: 'fas fa-utensils',
    pBg: 'radial-gradient(circle at 30% 30%, #ffedd5, #fb923c, #9a3412)',
    description: 'Premium restaurant food ordering & social dining experience.',
    tech: ['Supabase', 'Lottie', 'Dart'],
    github: 'https://github.com/ChandraMohan1012/Virundhu'
  },
  {
    title: 'Exports Portfolio', 
    shortName: 'Exports',
    mission: 'MISSION-06',
    orbit: 560, speed: 120, size: 68,
    color: '#facc15',
    icon: 'fas fa-globe',
    pBg: 'radial-gradient(circle at 30% 30%, #fef9c3, #facc15, #854d0e)',
    description: 'Professional business exports website with product listings and inquiries.',
    tech: ['Next.js', 'Vercel', 'JS'],
    github: 'https://github.com/ChandraMohan1012/exports-portfolio'
  },
  {
    title: 'Suzhi CPI Tracker', 
    shortName: 'Suzhi',
    mission: 'MISSION-07',
    orbit: 650, speed: 140, size: 60,
    color: '#60a5fa',
    icon: 'fas fa-chart-bar',
    pBg: 'radial-gradient(circle at 30% 30%, #dbeafe, #60a5fa, #1e3a8a)',
    description: 'Flutter app for tracking Consumer Price Index data with a clean UI.',
    tech: ['Provider', 'Dart', 'Supabase'],
    github: 'https://github.com/ChandraMohan1012/CPI'
  }
]

export default function Projects() {
  const [selected, setSelected] = useState(2)
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mouse Parallax for that "Infinite Depth" feel
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width/2) / 25)
    mouseY.set((e.clientY - rect.top - rect.height/2) / 25)
  }

  const screenRotateX = useTransform(mouseY, (v) => 65 - v)
  const screenRotateY = useTransform(mouseX, (v) => v)

  const stars = useMemo(() => Array.from({ length: 60 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 1,
    o: Math.random() * 0.5 + 0.2
  })), [])

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="min-h-screen py-24 relative overflow-hidden bg-[#020617]"
      onMouseMove={handleMouseMove}
    >
      {/* 🌌 Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full" />
        
        {stars.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-pulse"
            style={{ 
              top: `${s.y}%`, left: `${s.x}%`, 
              width: s.s, height: s.s, opacity: s.o,
              animationDuration: `${Math.random() * 3 + 2}s`
            }} 
          />
        ))}
      </div>

      <div className="relative z-10 text-center mb-12 px-6">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white/40 font-mono text-xs tracking-widest uppercase mb-4 block"
        >
          Exploration Center
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Project <span className="text-white/20">Galaxy</span>
        </motion.h2>
      </div>

      {/* 🪐 The Solar System */}
      <div className="relative w-full aspect-square max-w-[900px] mx-auto flex items-center justify-center perspective-[2000px]">
        
        <motion.div 
          style={{ 
            width: SYSTEM_SIZE, height: SYSTEM_SIZE, 
            rotateX: screenRotateX, 
            rotateY: screenRotateY,
            transformStyle: 'preserve-3d'
          }}
          className="relative flex items-center justify-center transition-all duration-300"
        >
          {/* Orbits & Planets */}
          {PROJECTS.map((p, i) => {
            const isSel = selected === i
            return (
              <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Orbit Path (SVG for sharpness) */}
                <svg className="absolute w-full h-full pointer-events-none" style={{ transform: 'translateZ(-1px)' }}>
                  <circle 
                    cx={SYSTEM_SIZE/2} cy={SYSTEM_SIZE/2} r={p.orbit}
                    fill="none" stroke={isSel ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth={isSel ? 2 : 1}
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Orbit Animation Container */}
                <motion.div
                  initial={{ rotate: Math.random() * 360 }}
                  animate={{ rotate: 360 + (Math.random() * 360) }}
                  transition={{ 
                    duration: p.speed, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute"
                  style={{ width: p.orbit * 2, height: p.orbit * 2, transformStyle: 'preserve-3d' }}
                >
                  {/* The Planet */}
                  <motion.div 
                    className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => setSelected(i)}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                  >
                    {/* Counter-Rotation to keep planet upright */}
                    <motion.div 
                      style={{ 
                        width: p.size, height: p.size, 
                        rotateX: useTransform(screenRotateX, v => -v),
                        rotateY: useTransform(screenRotateY, v => -v),
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Planet Globe */}
                      <motion.div 
                        className="w-full h-full rounded-full relative"
                        style={{ 
                          background: p.pBg,
                          boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 ${isSel ? '40px' : '0px'} ${p.color}80`,
                          border: isSel ? `2px solid white` : 'none'
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className={`${p.icon} text-white/80`} style={{ fontSize: p.size * 0.4 }} />
                        </div>
                      </motion.div>

                      {/* Floating Label */}
                      <AnimatePresence>
                        {(isSel || hovered === i) && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 24 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 whitespace-nowrap"
                          >
                            <span className="text-white text-[11px] font-bold tracking-tight">{p.shortName}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            )
          })}

          {/* Core (The Sun) */}
          <motion.div 
            style={{ 
              width: SUN_SIZE, height: SUN_SIZE,
              rotateX: useTransform(screenRotateX, v => -v),
              rotateY: useTransform(screenRotateY, v => -v),
              transformStyle: 'preserve-3d'
            }}
            className="relative"
          >
            <div 
              className="w-full h-full rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #fff, #fbbf24, #b45309)',
                boxShadow: '0 0 80px rgba(251, 191, 36, 0.4)'
              }} 
            />
            <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse" />
          </motion.div>
        </motion.div>
      </div>

      {/* 💳 Project Detail Card */}
      <div className="max-w-4xl mx-auto px-6 mt-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col md:flex-row gap-8 items-center bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
          >
            <div 
              className="w-32 h-32 rounded-full flex-shrink-0" 
              style={{ background: PROJECTS[selected].pBg, boxShadow: `0 0 50px ${PROJECTS[selected].color}40` }} 
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <span className="text-white/30 font-mono text-xs tracking-widest uppercase">{PROJECTS[selected].mission}</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">{PROJECTS[selected].title}</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl">{PROJECTS[selected].description}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href={PROJECTS[selected].github} 
                  target="_blank"
                  className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center gap-2"
                >
                  <i className="fab fa-github text-xl" /> Explorer Repository
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
