'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ─── Constants ────────────────────────────────────────────────────────────────
const SYSTEM_SIZE = 780   // px – the square canvas
const SUN_SIZE    = 80    // px
const PLANET_SIZE = 46    // px
// 7 orbit radii (all fit within SYSTEM_SIZE/2 = 390px, outermost = 358+23=381)
const ORBITS      = [90, 130, 173, 218, 266, 313, 358]
const SPEEDS      = [22,  30,  40,  52,  65,  80,  96]  // seconds / revolution
const START_DEG   = [0,  58, 135, 225,  40, 285, 165]   // staggered start angles

const projects = [
  {
    title: 'Intelligent Trading System',
    slug: 'intelligent-trading-system',
    icon: 'fas fa-chart-line',
    status: 'Completed', mission: 'MISSION-01',
    color: '#e2e8f0', glow: 'rgba(226,232,240,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #f8fafc, #94a3b8, #1e293b)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.7), 0 0 22px rgba(226,232,240,0.6)',
    },
    description: 'Python-based AI trading analysis using ML models and sentiment insights. Applied prompt engineering for signal explanation, decision reasoning, and automated reporting.',
    technologies: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
    github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System',
    demo: 'https://drive.google.com/file/d/1y5Auuq8v_Nz560W-cnyEG0VW8yWoAUX8/view?usp=drivesdk',
  },
  {
    title: 'SoilMate: Smart Crop System',
    slug: 'soilmate',
    icon: 'fas fa-seedling',
    status: 'Completed', mission: 'MISSION-02',
    color: '#6ee7b7', glow: 'rgba(110,231,183,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #d1fae5, #34d399, #064e3b)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.6), 0 0 22px rgba(110,231,183,0.6)',
    },
    description: 'AI-based system for crop, fertilizer, and health recommendations using soil data. Implemented ANN, Random Forest, and CNN with explainable AI via Flask and CLI tools.',
    technologies: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
    github: 'https://github.com/ChandraMohan1012/SoilMate.git',
    demo: 'https://drive.google.com/file/d/1i69eUD6ultUnJ_sHWS0Vw8MM66Jrr9Xc/view?usp=drivesdk',
  },
  {
    title: 'AgroConnect',
    slug: 'agroconnect',
    icon: 'fas fa-users',
    status: 'Completed', mission: 'MISSION-03',
    color: '#fde68a', glow: 'rgba(253,230,138,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #fefce8, #fbbf24, #78350f)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.6), 0 0 22px rgba(253,230,138,0.6)',
    },
    description: 'Multi-role Flutter app connecting farmers, workers, equipment holders, shop owners, and buyers. Role-based dashboards with weather, rentals, crop sales, and offline support.',
    technologies: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
    github: 'https://github.com/ChandraMohan1012/Agro_connect',
    demo: 'https://drive.google.com/file/d/1jrKpNiruHplQyNjBdcW3CtztKFcdfPdp/view?usp=drivesdk',
  },
  {
    title: 'Bill-Urai',
    slug: 'bill-urai',
    icon: 'fas fa-shopping-cart',
    status: 'Completed', mission: 'MISSION-04',
    color: '#d8b4fe', glow: 'rgba(216,180,254,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #f5f3ff, #a78bfa, #4c1d95)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.6), 0 0 22px rgba(216,180,254,0.6)',
    },
    description: 'Flutter billing app with barcode scanning and real-time product total calculation. Hive-powered offline storage for billing data and persistent app state.',
    technologies: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
    github: 'https://github.com/ChandraMohan1012/Bill-Urai',
    demo: 'https://drive.google.com/file/d/1wfm9KKvzxlU9bVrnMkYxle1nJ_3EIksJ/view?usp=drivesdk',
  },
  {
    title: 'Virundhu',
    slug: 'virundhu',
    icon: 'fas fa-utensils',
    status: 'Completed', mission: 'MISSION-05',
    color: '#fb923c', glow: 'rgba(251,146,60,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #fff7ed, #f97316, #7c2d12)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.6), 0 0 22px rgba(251,146,60,0.6)',
    },
    description: 'Flutter food ordering & social dining app with Lottie animations, Supabase backend, and image upload. Designed for a premium restaurant experience with real-time order management.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'Lottie', 'image_picker', 'Font Awesome'],
    github: 'https://github.com/ChandraMohan1012/Virundhu',
    demo: null,
  },
  {
    title: 'Exports Portfolio',
    slug: 'exports-portfolio',
    icon: 'fas fa-globe',
    status: 'Live', mission: 'MISSION-06',
    color: '#7dd3fc', glow: 'rgba(125,211,252,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #f0f9ff, #38bdf8, #0c4a6e)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.6), 0 0 22px rgba(125,211,252,0.6)',
    },
    description: 'Professional business exports website with product listings, IEC/GST details, WhatsApp inquiry integration, and multi-page navigation. Deployed live on Vercel.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'WhatsApp API'],
    github: 'https://github.com/ChandraMohan1012/exports-portfolio',
    demo: 'https://exports-portfolio.vercel.app',
  },
  {
    title: 'Suzhi — CPI Tracker',
    slug: 'suzhi-cpi-tracker',
    icon: 'fas fa-chart-bar',
    status: 'Completed', mission: 'MISSION-07',
    color: '#a5b4fc', glow: 'rgba(165,180,252,0.7)',
    planet: {
      bg: 'radial-gradient(circle at 32% 30%, #eef2ff, #818cf8, #312e81)',
      shadow: 'inset -6px -6px 14px rgba(0,0,0,0.6), 0 0 22px rgba(165,180,252,0.6)',
    },
    description: 'Flutter app for tracking Consumer Price Index data with Supabase backend. Features data sharing, native splash screen, and clean provider-based state management.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'Provider', 'share_plus', 'intl'],
    github: 'https://github.com/ChandraMohan1012/CPI',
    demo: null,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [isVisible,       setIsVisible]       = useState(false)
  const [selected,        setSelected]        = useState(0)
  const [hovered,         setHovered]         = useState<number | null>(null)
  const [paused,          setPaused]          = useState(false)
  const [scale,           setScale]           = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router     = useRouter()

  // Intersection observer
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => { if (sectionRef.current) io.unobserve(sectionRef.current) }
  }, [])

  // Responsive scale — fits the solar system into the available section width
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      // On lg+ screens solar system sits beside the card (≈55 % of viewport)
      const available = vw >= 1024
        ? Math.min(vw * 0.52, SYSTEM_SIZE)
        : Math.min(vw - 32, SYSTEM_SIZE)
      setScale(available / SYSTEM_SIZE)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cur = projects[selected]

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={sectionRef}>

      {/* ── Keyframes (injected once) ─────────────────────────────────────── */}
      <style>{`
        @keyframes sol-orbit   { from { transform: rotate(0deg); }   to { transform: rotate(360deg);  } }
        @keyframes sol-counter { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes sun-breathe {
          0%,100% {
            box-shadow:
              0 0 0  8px rgba(255,210,50,0.18),
              0 0 0 22px rgba(255,150,0,0.10),
              0 0  55px 10px rgba(255,200,50,0.60),
              0 0 110px 22px rgba(255,120,0,0.35),
              0 0 200px 50px rgba(255,80,0,0.18);
          }
          50% {
            box-shadow:
              0 0 0 14px rgba(255,220,50,0.25),
              0 0 0 36px rgba(255,150,0,0.12),
              0 0  80px 18px rgba(255,220,50,0.80),
              0 0 160px 36px rgba(255,120,0,0.50),
              0 0 280px 80px rgba(255,80,0,0.25);
          }
        }
        @keyframes sun-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes orbit-ring-spin { from { transform:translate(-50%,-50%) rotate(0deg); } to { transform:translate(-50%,-50%) rotate(360deg); } }
        @keyframes twinkle-star {
          0%,100% { opacity: 0.8; transform: scale(1); }
          50%      { opacity: 0.2; transform: scale(0.6); }
        }
        @keyframes info-in {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Deep-space background nebulae ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full blur-[130px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5), rgba(59,130,246,0.2), transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.4), rgba(236,72,153,0.15), transparent 70%)' }} />
        {/* Random tiny stars */}
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width:  Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top:    Math.random() * 100 + '%',
              left:   Math.random() * 100 + '%',
              animation: `twinkle-star ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 4 + 's',
              opacity: 0.6,
            }} />
        ))}
      </div>

      {/* ── Section header ────────────────────────────────────────────────── */}
      <div className={`text-center mb-10 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
          </span>
          <span className="text-gray-300 font-mono tracking-widest text-xs">SOLAR SYSTEM · {projects.length} MISSIONS IN ORBIT</span>
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-3">
          My{' '}
          <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent">
            Solar System
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Click any orbiting planet to explore the mission
        </p>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 px-4">

        {/* ════════════ SOLAR SYSTEM CANVAS ════════════ */}
        <div
          className={`relative flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ width: SYSTEM_SIZE * scale, height: SYSTEM_SIZE * scale }}
        >
          {/* Inner fixed-size div that gets CSS-scaled */}
          <div style={{
            width: SYSTEM_SIZE, height: SYSTEM_SIZE,
            transform: `scale(${scale})`, transformOrigin: 'top left',
            position: 'absolute', top: 0, left: 0,
          }}>

            {/* ── Orbit path rings ────────────────────────────────────────── */}
            {ORBITS.map((r, i) => (
              <div key={i}
                className="absolute top-1/2 left-1/2 rounded-full pointer-events-none transition-all duration-500"
                style={{
                  width:  r * 2, height: r * 2,
                  transform: 'translate(-50%,-50%)',
                  border: selected === i
                    ? `1px dashed ${projects[i].color}55`
                    : '1px dashed rgba(255,255,255,0.06)',
                  boxShadow: selected === i
                    ? `0 0 12px ${projects[i].glow.replace('0.7','0.12')}, inset 0 0 12px ${projects[i].glow.replace('0.7','0.04')}`
                    : 'none',
                }}
              />
            ))}

            {/* ── THE SUN ─────────────────────────────────────────────────── */}
            <div className="absolute top-1/2 left-1/2"
              style={{ width: SUN_SIZE, height: SUN_SIZE, transform: 'translate(-50%,-50%)' }}>

              {/* Corona aura */}
              <div className="absolute inset-0 rounded-full"
                style={{ animation: 'sun-breathe 4s ease-in-out infinite' }} />

              {/* Sun body with conic surface texture */}
              <div
                className="w-full h-full rounded-full overflow-hidden relative cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at 35% 28%, #fff9c4, #fbbf24, #f97316, #dc2626)',
                  boxShadow: '0 0 30px rgba(251,191,36,0.5)',
                }}
                onClick={() => setPaused(p => !p)}
                title={paused ? 'Resume orbits' : 'Pause orbits'}
              >
                {/* Rotating surface bands */}
                <div className="absolute inset-0 opacity-25"
                  style={{ animation: 'sun-spin 18s linear infinite' }}>
                  <div className="w-full h-full" style={{
                    background: `conic-gradient(
                      from 0deg,
                      transparent 0deg, rgba(255,220,80,0.8) 18deg, transparent 36deg,
                      transparent 72deg, rgba(255,180,40,0.6) 90deg, transparent 108deg,
                      transparent 150deg, rgba(255,240,100,0.7) 168deg, transparent 186deg,
                      transparent 220deg, rgba(255,200,60,0.5) 238deg, transparent 256deg,
                      transparent 300deg, rgba(255,220,80,0.6) 318deg, transparent 336deg
                    )`,
                  }} />
                </div>

                {/* Sun icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className={`fas ${paused ? 'fa-pause' : 'fa-sun'} text-yellow-100 text-2xl`}
                    style={{ opacity: 0.85, textShadow: '0 0 10px rgba(255,255,200,0.8)' }} />
                </div>
              </div>

              {/* Sun label */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-yellow-300/60 tracking-widest">
                {paused ? '⏸ PAUSED' : '☀ CORE'}
              </div>
            </div>

            {/* ── PLANETS ─────────────────────────────────────────────────── */}
            {projects.map((p, i) => {
              const orbitR  = ORBITS[i]
              const speed   = SPEEDS[i]
              const startDeg = START_DEG[i]
              const delay   = -(startDeg / 360) * speed   // negative = offset start
              const isSel   = selected === i
              const isHov   = hovered  === i

              return (
                <div key={i}
                  /* Arm: rotates around center (0×0 square at 50%/50%) */
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: 0, height: 0,
                    animation: `sol-orbit ${speed}s linear infinite`,
                    animationDelay: `${delay}s`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                >
                  {/* Body: offset by orbit radius, counter-rotates to stay upright */}
                  <div
                    style={{
                      position: 'absolute',
                      left: orbitR - PLANET_SIZE / 2,
                      top:  -PLANET_SIZE / 2,
                      animation: `sol-counter ${speed}s linear infinite`,
                      animationDelay: `${delay}s`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  >
                    {/* ── Planet orb ────────────────────────────────────── */}
                    <div
                      className="relative cursor-pointer"
                      style={{ width: PLANET_SIZE, height: PLANET_SIZE }}
                      onClick={() => setSelected(i)}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Selected orbit ring (spins around the planet) */}
                      {isSel && (
                        <div className="absolute rounded-full pointer-events-none"
                          style={{
                            width: PLANET_SIZE + 20, height: PLANET_SIZE + 20,
                            top: -10, left: -10,
                            border: `1.5px solid ${p.color}70`,
                            animation: 'orbit-ring-spin 3s linear infinite',
                          }} />
                      )}

                      {/* Glow halo */}
                      <div className="absolute inset-0 rounded-full transition-all duration-400 pointer-events-none"
                        style={{
                          boxShadow: isSel
                            ? `0 0 28px 8px ${p.glow}`
                            : isHov
                            ? `0 0 16px 4px ${p.glow.replace('0.7','0.5')}`
                            : 'none',
                          borderRadius: '50%',
                        }} />

                      {/* Planet body */}
                      <div className="w-full h-full rounded-full transition-transform duration-300 flex items-center justify-center overflow-hidden"
                        style={{
                          background: p.planet.bg,
                          boxShadow: isSel
                            ? `inset -6px -6px 14px rgba(0,0,0,0.7), 0 0 36px ${p.glow}`
                            : p.planet.shadow,
                          transform: isSel ? 'scale(1.35)' : isHov ? 'scale(1.18)' : 'scale(1)',
                        }}
                      >
                        <i className={`${p.icon} text-sm`} style={{ color: p.color, opacity: 0.9 }} />
                      </div>

                      {/* Hover tooltip — planet name */}
                      {(isSel || isHov) && (
                        <div className="absolute left-1/2 pointer-events-none"
                          style={{
                            top: PLANET_SIZE + 8,
                            transform: 'translateX(-50%)',
                            animation: 'info-in 0.2s ease-out forwards',
                            whiteSpace: 'nowrap',
                            background: 'rgba(0,0,0,0.85)',
                            border: `1px solid ${p.color}40`,
                            color: p.color,
                            fontSize: '10px',
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontFamily: 'monospace',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {p.mission}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>{/* /inner scaled div */}
        </div>{/* /solar system canvas */}

        {/* ════════════ PROJECT INFO CARD ════════════ */}
        <div className={`w-full max-w-sm flex-shrink-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div key={selected}        /* key forces re-mount → re-triggers animation */
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${cur.color}30`,
              boxShadow: `0 0 50px ${cur.glow.replace('0.7','0.08')}, 0 20px 60px rgba(0,0,0,0.5)`,
              animation: 'info-in 0.35s ease-out forwards',
            }}
          >
            {/* Top accent line */}
            <div className="h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${cur.color}, transparent)` }} />

            <div className="p-7">
              {/* Mission + status */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] tracking-widest" style={{ color: cur.color, opacity: 0.65 }}>
                  {cur.mission}
                </span>
                <span className="px-3 py-1 text-[11px] font-mono rounded-full"
                  style={cur.status === 'Live'
                    ? { background: 'rgba(34,197,94,0.15)', color: '#86efac', border: '1px solid rgba(34,197,94,0.3)' }
                    : { background: 'rgba(255,255,255,0.06)', color: '#d1d5db', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {cur.status === 'Live' ? '● LIVE' : '✓ DONE'}
                </span>
              </div>

              {/* Planet + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ width: 56, height: 56, background: cur.planet.bg, boxShadow: cur.planet.shadow }}>
                  <i className={`${cur.icon} text-xl`} style={{ color: cur.color }} />
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">{cur.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {cur.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cur.technologies.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 text-[11px] font-mono rounded-lg"
                    style={{ background: `${cur.color}12`, color: cur.color, border: `1px solid ${cur.color}25` }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-5 border-t border-white/5">
                <button
                  onClick={() => router.push(`/projects/${cur.slug}`)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-mono font-semibold hover:opacity-80 transition-opacity"
                  style={{ background: `${cur.color}18`, color: cur.color, border: `1px solid ${cur.color}30` }}
                >
                  <i className="fas fa-satellite-dish mr-2 text-xs" />View Mission
                </button>
                <a href={cur.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fab fa-github" />
                </a>
                {cur.demo && (
                  <a href={cur.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2.5 rounded-xl font-mono hover:opacity-80 transition-opacity"
                    style={{ background: `${cur.color}18`, color: cur.color, border: `1px solid ${cur.color}30` }}>
                    <i className="fas fa-rocket text-sm" />
                  </a>
                )}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px"
              style={{ background: `linear-gradient(to right, transparent, ${cur.color}60, transparent)` }} />
          </div>

          {/* Planet dot-picker */}
          <div className="flex justify-center items-center gap-2.5 mt-5">
            {projects.map((p, i) => (
              <button key={i}
                id={`planet-dot-${i}`}
                onClick={() => setSelected(i)}
                aria-label={p.title}
                className="rounded-full transition-all duration-300"
                style={selected === i
                  ? { width: 22, height: 7, background: projects[selected].color, boxShadow: `0 0 10px ${projects[selected].glow}` }
                  : { width: 7, height: 7, background: p.color, opacity: 0.3 }
                }
              />
            ))}
          </div>

          {/* Mission counter */}
          <p className="text-center font-mono text-[10px] text-gray-600 mt-3 tracking-widest">
            {cur.mission} / {String(projects.length).padStart(2,'0')} · CLICK SUN TO {paused ? 'RESUME' : 'PAUSE'}
          </p>
        </div>

      </div>{/* /main layout */}
    </section>
  )
}
