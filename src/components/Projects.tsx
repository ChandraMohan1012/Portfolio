'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ─── Layout constants ─────────────────────────────────────────────────────────
const SYSTEM_SIZE = 820   // canvas px (scaled to fit viewport)
const SUN_SIZE    = 90    // px
const PLANET_SIZE = 68    // px — intentionally large for visibility
const HALF_P      = PLANET_SIZE / 2

// 7 orbit radii — evenly spaced so planets breathe & don't crowd
// Outer edge: 412 + 34 = 446 < 410 (half of 820). Fits ✓
const ORBITS = [108, 156, 207, 260, 316, 374, 412]
const SPEEDS = [ 22,  30,  40,  52,  66,  82, 100]   // seconds / revolution
const START  = [  0,  58, 135, 220,  34, 280, 155]   // staggered initial angles

// ─── Planets: strictly monochromatic (white / silver / gray / charcoal) ───────
// Each uses a different shade of the Black-White spectrum.  No colours.
const PLANETS = [
  {
    name: 'Silver White',
    bg:   'radial-gradient(circle at 32% 28%, #ffffff, #e2e8f0, #64748b)',
    glow: 'rgba(255,255,255,0.55)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.55), 0 0 32px rgba(255,255,255,0.50)',
  },
  {
    name: 'Pearl Gray',
    bg:   'radial-gradient(circle at 30% 30%, #f1f5f9, #cbd5e1, #334155)',
    glow: 'rgba(241,245,249,0.45)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.6), 0 0 28px rgba(203,213,225,0.45)',
  },
  {
    name: 'Warm Silver',
    bg:   'radial-gradient(circle at 35% 28%, #fafaf9, #d6d3d1, #44403c)',
    glow: 'rgba(250,250,249,0.40)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.6), 0 0 28px rgba(214,211,209,0.40)',
  },
  {
    name: 'Steel Gray',
    bg:   'radial-gradient(circle at 30% 30%, #e2e8f0, #94a3b8, #1e293b)',
    glow: 'rgba(148,163,184,0.45)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.65), 0 0 28px rgba(148,163,184,0.40)',
  },
  {
    name: 'Slate',
    bg:   'radial-gradient(circle at 28% 30%, #cbd5e1, #475569, #0f172a)',
    glow: 'rgba(203,213,225,0.40)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.7), 0 0 28px rgba(71,85,105,0.45)',
  },
  {
    name: 'Dark Charcoal',
    bg:   'radial-gradient(circle at 30% 26%, #94a3b8, #334155, #020617)',
    glow: 'rgba(148,163,184,0.40)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.75), 0 0 28px rgba(51,65,85,0.50)',
  },
  {
    name: 'Ghost',
    bg:   'radial-gradient(circle at 38% 28%, #f8fafc, #94a3b8, #0f172a)',
    glow: 'rgba(248,250,252,0.45)',
    shadow: 'inset -10px -10px 22px rgba(0,0,0,0.6), 0 0 30px rgba(248,250,252,0.40)',
  },
]

// ─── Projects — same data, now with monochromatic planet indices ──────────────
const PROJECTS = [
  {
    title:        'Intelligent Trading System',
    slug:         'intelligent-trading-system',
    icon:         'fas fa-chart-line',
    status:       'Completed',
    mission:      'MISSION-01',
    planet:       PLANETS[0],
    gradient:     'from-white to-gray-300',
    description:  'Python-based AI trading analysis using ML models and sentiment insights. Applied prompt engineering for signal explanation, decision reasoning, and automated reporting.',
    technologies: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
    github:       'https://github.com/ChandraMohan1012/Intelligent-Trading-System',
    demo:         'https://drive.google.com/file/d/1y5Auuq8v_Nz560W-cnyEG0VW8yWoAUX8/view?usp=drivesdk',
  },
  {
    title:        'SoilMate: Smart Crop System',
    slug:         'soilmate',
    icon:         'fas fa-seedling',
    status:       'Completed',
    mission:      'MISSION-02',
    planet:       PLANETS[1],
    gradient:     'from-gray-200 to-white',
    description:  'AI-based system for crop, fertilizer, and health recommendations using soil data. Implemented ANN, Random Forest, and CNN with explainable AI via Flask and CLI tools.',
    technologies: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
    github:       'https://github.com/ChandraMohan1012/SoilMate.git',
    demo:         'https://drive.google.com/file/d/1i69eUD6ultUnJ_sHWS0Vw8MM66Jrr9Xc/view?usp=drivesdk',
  },
  {
    title:        'AgroConnect',
    slug:         'agroconnect',
    icon:         'fas fa-users',
    status:       'Completed',
    mission:      'MISSION-03',
    planet:       PLANETS[2],
    gradient:     'from-white to-gray-400',
    description:  'Multi-role Flutter app connecting farmers, workers, equipment holders, shop owners, and buyers. Role-based dashboards with weather, rentals, crop sales, and offline support.',
    technologies: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
    github:       'https://github.com/ChandraMohan1012/Agro_connect',
    demo:         'https://drive.google.com/file/d/1jrKpNiruHplQyNjBdcW3CtztKFcdfPdp/view?usp=drivesdk',
  },
  {
    title:        'Bill-Urai',
    slug:         'bill-urai',
    icon:         'fas fa-shopping-cart',
    status:       'Completed',
    mission:      'MISSION-04',
    planet:       PLANETS[3],
    gradient:     'from-gray-300 to-white',
    description:  'Flutter billing app with barcode scanning and real-time total calculation. Hive-powered offline storage for billing data and persistent app state.',
    technologies: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
    github:       'https://github.com/ChandraMohan1012/Bill-Urai',
    demo:         'https://drive.google.com/file/d/1wfm9KKvzxlU9bVrnMkYxle1nJ_3EIksJ/view?usp=drivesdk',
  },
  {
    title:        'Virundhu',
    slug:         'virundhu',
    icon:         'fas fa-utensils',
    status:       'Completed',
    mission:      'MISSION-05',
    planet:       PLANETS[4],
    gradient:     'from-gray-200 to-gray-400',
    description:  'Flutter food ordering & social dining app with Lottie animations, Supabase backend, and image upload — built for a premium restaurant experience with real-time order management.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'Lottie', 'image_picker', 'Font Awesome'],
    github:       'https://github.com/ChandraMohan1012/Virundhu',
    demo:         null,
  },
  {
    title:        'Exports Portfolio',
    slug:         'exports-portfolio',
    icon:         'fas fa-globe',
    status:       'Live',
    mission:      'MISSION-06',
    planet:       PLANETS[5],
    gradient:     'from-white to-gray-300',
    description:  'Professional business exports website with product listings, IEC/GST details, WhatsApp inquiry integration, and multi-page navigation. Deployed live on Vercel.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'WhatsApp API'],
    github:       'https://github.com/ChandraMohan1012/exports-portfolio',
    demo:         'https://exports-portfolio.vercel.app',
  },
  {
    title:        'Suzhi — CPI Tracker',
    slug:         'suzhi-cpi-tracker',
    icon:         'fas fa-chart-bar',
    status:       'Completed',
    mission:      'MISSION-07',
    planet:       PLANETS[6],
    gradient:     'from-gray-300 to-gray-200',
    description:  'Flutter app for tracking Consumer Price Index data with Supabase backend. Features data sharing, native splash screen, and clean provider-based state management.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'Provider', 'share_plus', 'intl'],
    github:       'https://github.com/ChandraMohan1012/CPI',
    demo:         null,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [visible,  setVisible]  = useState(false)
  const [selected, setSelected] = useState(0)
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [paused,   setPaused]   = useState(false)
  const [scale,    setScale]    = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router     = useRouter()

  // Visibility
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => { if (sectionRef.current) io.unobserve(sectionRef.current) }
  }, [])

  // Responsive scale: solar system fits the section width
  useEffect(() => {
    const update = () => {
      const available = Math.min(window.innerWidth - 32, SYSTEM_SIZE)
      setScale(available / SYSTEM_SIZE)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cur = PROJECTS[selected]

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={sectionRef}>

      {/* ── Keyframes ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes sol-cw  { to { transform: rotate( 360deg); } }
        @keyframes sol-ccw { to { transform: rotate(-360deg); } }

        @keyframes sun-pulse {
          0%,100% {
            box-shadow:
              0 0  0  6px rgba(255,255,255,0.08),
              0 0  0 16px rgba(255,255,255,0.04),
              0 0 50px 8px  rgba(255,255,255,0.55),
              0 0 110px 22px rgba(255,255,255,0.22),
              0 0 200px 50px rgba(255,255,255,0.10);
          }
          50% {
            box-shadow:
              0 0  0 10px rgba(255,255,255,0.12),
              0 0  0 28px rgba(255,255,255,0.05),
              0 0 72px 14px rgba(255,255,255,0.70),
              0 0 150px 34px rgba(255,255,255,0.30),
              0 0 280px 80px rgba(255,255,255,0.14);
          }
        }
        @keyframes sun-spin { to { transform: rotate(360deg); } }
        @keyframes ring-spin {
          from { transform: translate(-50%,-50%) rotate(0deg);   }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes slide-up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes twinkle {
          0%,100% { opacity:.7; transform:scale(1);   }
          50%      { opacity:.1; transform:scale(.5);  }
        }
        .planet-arm    { position:absolute; top:50%; left:50%; width:0; height:0; }
        .planet-body   { position:absolute; }
        .no-scrollbar  { scrollbar-width:none; -ms-overflow-style:none; }
        .no-scrollbar::-webkit-scrollbar { display:none; }
      `}</style>

      {/* ── Starfield + nebula (matches hero) ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #ffffff, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #e5e7eb, transparent 70%)' }} />
        {/* Spinning orbit ring background (from hero) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[900px] h-[900px] orbit-ring opacity-30 animate-spin-slow"
          style={{ animationDuration: '120s' }} />
        {/* Stars */}
        {[...Array(40)].map((_, i) => {
          const seed = (i * 137.5) % 360
          return (
            <div key={i} className="absolute rounded-full bg-white"
              style={{
                width:  (i % 3 === 0 ? 2 : 1.5) + 'px',
                height: (i % 3 === 0 ? 2 : 1.5) + 'px',
                top:    `${(seed * 0.71)  % 100}%`,
                left:   `${(seed * 0.53) % 100}%`,
                animation: `twinkle ${2.5 + (i % 5) * 0.8}s ease-in-out infinite`,
                animationDelay: `${(i % 7) * 0.4}s`,
                opacity: 0.5,
              }} />
          )
        })}
      </div>

      {/* ── Section header ────────────────────────────────────────────────── */}
      <div className={`text-center mb-10 px-4 transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="inline-flex items-center gap-2 px-5 py-2
          bg-white/5 backdrop-blur-xl border border-white/10
          rounded-full text-sm font-medium mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-gray-300 font-mono tracking-widest text-xs">
            SOLAR SYSTEM · {PROJECTS.length} MISSIONS IN ORBIT
          </span>
        </span>

        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-3">
          My{' '}
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Solar System
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Click any orbiting planet to explore the mission.
          Click the sun to pause orbits.
        </p>
      </div>

      {/* ════════════════ SOLAR SYSTEM CANVAS ════════════════ */}
      <div
        className={`relative mx-auto transition-all duration-1000
          ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ width: SYSTEM_SIZE * scale, height: SYSTEM_SIZE * scale }}
      >
        {/* Inner 1×1 scaled div */}
        <div style={{
          width: SYSTEM_SIZE, height: SYSTEM_SIZE,
          transform: `scale(${scale})`, transformOrigin: 'top left',
          position: 'absolute', top: 0, left: 0,
        }}>

          {/* ── Orbit rings ─────────────────────────────────────────────── */}
          {ORBITS.map((r, i) => (
            <div key={i}
              className="absolute top-1/2 left-1/2 rounded-full pointer-events-none transition-all duration-500"
              style={{
                width: r * 2, height: r * 2,
                transform: 'translate(-50%,-50%)',
                border: selected === i
                  ? '1px solid rgba(255,255,255,0.22)'
                  : '1px dashed rgba(255,255,255,0.07)',
                boxShadow: selected === i
                  ? '0 0 14px rgba(255,255,255,0.10), inset 0 0 14px rgba(255,255,255,0.04)'
                  : 'none',
              }}
            />
          ))}

          {/* ── SUN ─────────────────────────────────────────────────────── */}
          <div className="absolute top-1/2 left-1/2"
            style={{ width: SUN_SIZE, height: SUN_SIZE, transform: 'translate(-50%,-50%)' }}>

            {/* Breathing corona */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ animation: 'sun-pulse 4s ease-in-out infinite' }} />

            {/* Sun body — white/silver matching portfolio, no colour */}
            <div
              className="w-full h-full rounded-full overflow-hidden relative cursor-pointer
                         hover:scale-105 transition-transform duration-300"
              style={{
                background: 'radial-gradient(circle at 35% 28%, #ffffff, #e2e8f0, #94a3b8, #1e293b)',
                boxShadow: '0 0 30px rgba(255,255,255,0.35)',
              }}
              onClick={() => setPaused(p => !p)}
              title={paused ? 'Resume orbits' : 'Pause orbits'}
            >
              {/* Slow-spin surface bands */}
              <div className="absolute inset-0 opacity-20 rounded-full"
                style={{ animation: 'sun-spin 22s linear infinite' }}>
                <div className="w-full h-full" style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg, rgba(255,255,255,0.9) 18deg, transparent 36deg,
                    transparent 72deg, rgba(255,255,255,0.6) 90deg, transparent 108deg,
                    transparent 160deg, rgba(255,255,255,0.8) 178deg, transparent 196deg,
                    transparent 238deg, rgba(255,255,255,0.5) 256deg, transparent 274deg
                  )`,
                }} />
              </div>

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <i className={`fas ${paused ? 'fa-pause' : 'fa-sun'} text-2xl text-black`}
                  style={{ opacity: 0.75 }} />
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap
                            font-mono text-[10px] tracking-widest text-gray-500">
              {paused ? '⏸ PAUSED' : '☀ ORIGIN'}
            </div>
          </div>

          {/* ── PLANETS ─────────────────────────────────────────────────── */}
          {PROJECTS.map((proj, i) => {
            const isSel = selected === i
            const isHov = hovered  === i
            const delay = -(START[i] / 360) * SPEEDS[i]

            return (
              <div key={i}
                /* Arm — rotates around solar system center */
                className="planet-arm"
                style={{
                  animation: `sol-cw ${SPEEDS[i]}s linear infinite`,
                  animationDelay: `${delay}s`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                {/* Body — offset + counter-rotates to stay upright */}
                <div
                  className="planet-body"
                  style={{
                    left: ORBITS[i] - HALF_P,
                    top:  -HALF_P,
                    animation: `sol-ccw ${SPEEDS[i]}s linear infinite`,
                    animationDelay: `${delay}s`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                >
                  <div
                    className="relative cursor-pointer select-none"
                    style={{ width: PLANET_SIZE, height: PLANET_SIZE }}
                    onClick={() => setSelected(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Selected spinning ring */}
                    {isSel && (
                      <div className="absolute rounded-full pointer-events-none"
                        style={{
                          width:  PLANET_SIZE + 20, height: PLANET_SIZE + 20,
                          top: -10, left: -10,
                          border: '1.5px solid rgba(255,255,255,0.40)',
                          animation: 'ring-spin 3s linear infinite',
                        }} />
                    )}

                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300"
                      style={{
                        boxShadow: isSel
                          ? `0 0 36px 8px ${proj.planet.glow}`
                          : isHov
                          ? `0 0 20px 4px ${proj.planet.glow.replace('0.55','0.35').replace('0.45','0.28').replace('0.40','0.25')}`
                          : 'none',
                      }} />

                    {/* Planet surface */}
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center
                                 transition-transform duration-300 overflow-hidden relative"
                      style={{
                        background: proj.planet.bg,
                        boxShadow: isSel
                          ? `inset -10px -10px 22px rgba(0,0,0,0.6), 0 0 40px ${proj.planet.glow}`
                          : proj.planet.shadow,
                        transform: isSel ? 'scale(1.30)' : isHov ? 'scale(1.14)' : 'scale(1)',
                      }}
                    >
                      {/* Surface sheen */}
                      <div className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.20) 100%)',
                        }} />
                      {/* Icon */}
                      <i className={`${proj.icon} relative z-10`}
                        style={{
                          fontSize: '22px',
                          color: '#ffffff',
                          opacity: isSel ? 1 : 0.75,
                          textShadow: '0 0 8px rgba(255,255,255,0.6)',
                        }} />
                    </div>

                    {/* Hover / selected tooltip */}
                    {(isHov || isSel) && (
                      <div className="absolute left-1/2 pointer-events-none font-mono
                                      bg-black/80 border border-white/15 text-white rounded-full"
                        style={{
                          top: PLANET_SIZE + 10,
                          transform: 'translateX(-50%)',
                          animation: 'slide-up 0.18s ease-out forwards',
                          whiteSpace: 'nowrap',
                          fontSize: '10px',
                          padding: '3px 10px',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {proj.mission}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

        </div>{/* /inner */}
      </div>{/* /canvas */}

      {/* ════════════════ INFO CARD ════════════════ */}
      {/* Slides in below the solar system — full-width, centered, max 680px */}
      <div className={`max-w-2xl mx-auto px-4 mt-10 transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        <div
          key={selected}  /* forces re-mount → re-triggers animation */
          className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10
                     overflow-hidden hover:border-white/20 transition-all duration-500"
          style={{ animation: 'slide-up 0.3s ease-out forwards' }}
        >
          {/* Card glow (matches Skills section pattern) */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${cur.gradient}
                          rounded-3xl blur-xl opacity-0 hover:opacity-20
                          transition-all duration-500 pointer-events-none`} />

          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="p-7">
            {/* Mission label + status */}
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[11px] tracking-widest text-gray-500">
                {cur.mission}
              </span>
              <span className={`px-3 py-1 text-[11px] font-mono rounded-full border ${
                cur.status === 'Live'
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-white/5 text-gray-400 border-white/10'
              }`}>
                {cur.status === 'Live' ? '● LIVE' : '✓ DONE'}
              </span>
            </div>

            {/* Planet preview + title */}
            <div className="flex items-center gap-5 mb-5">
              <div className="rounded-full flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                style={{
                  width: 64, height: 64,
                  background: cur.planet.bg,
                  boxShadow: `${cur.planet.shadow}, 0 0 30px ${cur.planet.glow}`,
                }}>
                <div className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)' }} />
                <i className={`${cur.icon} text-xl text-white relative z-10`}
                  style={{ textShadow: '0 0 8px rgba(255,255,255,0.6)', opacity: 0.9 }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-0.5">{cur.title}</h3>
                <p className="text-gray-500 text-xs font-mono tracking-wider">{cur.planet.name}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {cur.description}
            </p>

            {/* Tech tags — matching Skills section exactly */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cur.technologies.map((t, i) => (
                <span key={i}
                  className="px-3 py-1.5 text-xs font-medium rounded-xl
                             bg-white/5 text-gray-400 border border-white/5
                             hover:bg-white/10 hover:text-white hover:border-white/20
                             transition-all duration-300 cursor-default">
                  {t}
                </span>
              ))}
            </div>

            {/* Action row — matching Hero CTA style */}
            <div className="flex gap-3 pt-5 border-t border-white/10">
              {/* Primary — matches hero "Explore My Work" */}
              <button
                onClick={() => router.push(`/projects/${cur.slug}`)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-full flex-1 justify-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white" />
                <span className="relative flex items-center gap-2 text-black font-semibold text-sm">
                  <i className="fas fa-satellite-dish" />
                  View Mission
                </span>
              </button>

              {/* GitHub — matches hero "Get In Touch" */}
              <a href={cur.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/30
                           text-white font-semibold rounded-full hover:bg-white/10
                           hover:border-white/50 transition-all duration-300
                           backdrop-blur-sm text-sm">
                <i className="fab fa-github" />
                Source
              </a>

              {/* Demo */}
              {cur.demo && (
                <a href={cur.demo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/30
                             text-white font-semibold rounded-full hover:bg-white/10
                             hover:border-white/50 transition-all duration-300
                             backdrop-blur-sm text-sm">
                  <i className="fas fa-rocket" />
                  {cur.status === 'Live' ? 'Launch' : 'Demo'}
                </a>
              )}
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Planet dot picker */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {PROJECTS.map((p, i) => (
            <button key={i}
              id={`planet-dot-${i}`}
              onClick={() => setSelected(i)}
              aria-label={p.title}
              className="rounded-full transition-all duration-300"
              style={selected === i
                ? { width: 22, height: 6, background: '#ffffff', boxShadow: '0 0 10px rgba(255,255,255,0.6)' }
                : { width: 6, height: 6, background: 'rgba(255,255,255,0.25)' }
              }
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center font-mono text-[10px] text-gray-600 mt-3 tracking-widest">
          {cur.mission} / {String(PROJECTS.length).padStart(2,'0')}
          &nbsp;·&nbsp;
          CLICK SUN TO {paused ? 'RESUME' : 'PAUSE'}
        </p>
      </div>

    </section>
  )
}
