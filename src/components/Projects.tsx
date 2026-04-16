'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'

/* ── System geometry ─────────────────────────────────────────────────────── */
const SYSTEM_SIZE = 1010  // canvas px before responsive scaling
const SUN_SIZE    = 96

/* Per-planet: [diameter, orbitRadius, orbitSpeedSec, startAngleDeg] */
const CONFIG = [
  { size: 40, orbit: 108, speed:  22, start:   0 },  // M-01 Mercury-like
  { size: 52, orbit: 158, speed:  30, start:  58 },  // M-02 Venus-like
  { size: 64, orbit: 212, speed:  40, start: 135 },  // M-03 Earth-like
  { size: 46, orbit: 268, speed:  52, start: 220 },  // M-04 Mars-like
  { size: 90, orbit: 340, speed:  65, start:  34 },  // M-05 Jupiter-like (★ biggest)
  { size: 68, orbit: 420, speed:  82, start: 280 },  // M-06 Saturn-like (+ring)
  { size: 56, orbit: 480, speed: 100, start: 155 },  // M-07 Neptune-like
]

/* ── Projects with realistic planet visuals ─────────────────────────────── */
const PROJECTS = [
  {
    title: 'Intelligent Trading System', shortName: 'Trading AI',
    slug: 'intelligent-trading-system', mission: 'M-01',
    icon: 'fas fa-chart-line', status: 'Completed',
    /* Mercury: small, rocky, gray */
    pBg:     'radial-gradient(circle at 32% 28%, #d6d6d6, #a3a3a3, #525252)',
    pShadow: 'inset -6px -6px 16px rgba(0,0,0,0.70)',
    glow:    'rgba(200,200,200,0.55)',
    hasBands: false, hasRing: false,
    description: 'Python-based AI trading analysis using ML models and sentiment insights. Applied prompt engineering for signal explanation, decision reasoning, and automated reporting.',
    technologies: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
    github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System',
    demo:   'https://drive.google.com/file/d/1y5Auuq8v_Nz560W-cnyEG0VW8yWoAUX8/view?usp=drivesdk',
  },
  {
    title: 'SoilMate: Smart Crop System', shortName: 'SoilMate',
    slug: 'soilmate', mission: 'M-02',
    icon: 'fas fa-seedling', status: 'Completed',
    /* Venus: thick yellow-orange atmosphere */
    pBg:     'radial-gradient(circle at 30% 28%, #fffde7, #ffd54f, #fb8c00, #e65100)',
    pShadow: 'inset -8px -8px 18px rgba(0,0,0,0.60)',
    glow:    'rgba(255,213,79,0.65)',
    hasBands: false, hasRing: false,
    description: 'AI-based system for crop, fertilizer, and health recommendations using soil data. Implemented ANN, Random Forest, and CNN with explainable AI via Flask and CLI tools.',
    technologies: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
    github: 'https://github.com/ChandraMohan1012/SoilMate.git',
    demo:   'https://drive.google.com/file/d/1i69eUD6ultUnJ_sHWS0Vw8MM66Jrr9Xc/view?usp=drivesdk',
  },
  {
    title: 'AgroConnect', shortName: 'AgroConnect',
    slug: 'agroconnect', mission: 'M-03',
    icon: 'fas fa-users', status: 'Completed',
    /* Earth: blue oceans + green landmass */
    pBg:     'radial-gradient(circle at 30% 30%, #b3e5fc, #0288d1, #2e7d32, #0d47a1)',
    pShadow: 'inset -9px -9px 20px rgba(0,0,0,0.60)',
    glow:    'rgba(100,200,255,0.60)',
    hasBands: false, hasRing: false,
    description: 'Multi-role Flutter app connecting farmers, workers, equipment holders, shop owners, and buyers. Role-based dashboards with weather, rentals, crop sales, and offline support.',
    technologies: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
    github: 'https://github.com/ChandraMohan1012/Agro_connect',
    demo:   'https://drive.google.com/file/d/1jrKpNiruHplQyNjBdcW3CtztKFcdfPdp/view?usp=drivesdk',
  },
  {
    title: 'Bill-Urai', shortName: 'Bill-Urai',
    slug: 'bill-urai', mission: 'M-04',
    icon: 'fas fa-shopping-cart', status: 'Completed',
    /* Mars: dusty red with polar highlights */
    pBg:     'radial-gradient(circle at 32% 28%, #ffccbc, #e53935, #b71c1c, #4a1212)',
    pShadow: 'inset -7px -7px 16px rgba(0,0,0,0.65)',
    glow:    'rgba(229,57,53,0.55)',
    hasBands: false, hasRing: false,
    description: 'Flutter billing app with barcode scanning and real-time total calculation. Hive-powered offline storage for billing data and persistent app state.',
    technologies: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
    github: 'https://github.com/ChandraMohan1012/Bill-Urai',
    demo:   'https://drive.google.com/file/d/1wfm9KKvzxlU9bVrnMkYxle1nJ_3EIksJ/view?usp=drivesdk',
  },
  {
    title: 'Virundhu', shortName: 'Virundhu',
    slug: 'virundhu', mission: 'M-05',
    icon: 'fas fa-utensils', status: 'Completed',
    /* Jupiter: giant, warm orange belts */
    pBg:     'radial-gradient(circle at 34% 42%, #ffe0b2, #ef6c00, #bf360c, #ff8f00)',
    pShadow: 'inset -14px -14px 28px rgba(0,0,0,0.55)',
    glow:    'rgba(239,108,0,0.65)',
    hasBands: true, hasRing: false,
    description: 'Flutter food ordering & social dining app with Lottie animations, Supabase backend, and image upload — built for a premium restaurant experience with real-time order management.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'Lottie', 'image_picker', 'Font Awesome'],
    github: 'https://github.com/ChandraMohan1012/Virundhu',
    demo:   null,
  },
  {
    title: 'Exports Portfolio', shortName: 'Exports',
    slug: 'exports-portfolio', mission: 'M-06',
    icon: 'fas fa-globe', status: 'Live',
    /* Saturn: warm tan with golden ring system */
    pBg:     'radial-gradient(circle at 32% 28%, #fff9c4, #ffe082, #ffa000, #6d4c41)',
    pShadow: 'inset -11px -11px 24px rgba(0,0,0,0.60)',
    glow:    'rgba(255,224,130,0.60)',
    hasBands: false, hasRing: true,
    description: 'Professional business exports website with product listings, IEC/GST details, WhatsApp inquiry integration, and multi-page navigation. Deployed live on Vercel.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'WhatsApp API'],
    github: 'https://github.com/ChandraMohan1012/exports-portfolio',
    demo:   'https://exports-portfolio.vercel.app',
  },
  {
    title: 'Suzhi — CPI Tracker', shortName: 'Suzhi',
    slug: 'suzhi-cpi-tracker', mission: 'M-07',
    icon: 'fas fa-chart-bar', status: 'Completed',
    /* Neptune: deep blue, distant, cold */
    pBg:     'radial-gradient(circle at 30% 28%, #80d8ff, #0288d1, #0d47a1, #1a237e)',
    pShadow: 'inset -9px -9px 20px rgba(0,0,0,0.65)',
    glow:    'rgba(128,216,255,0.60)',
    hasBands: false, hasRing: false,
    description: 'Flutter app for tracking Consumer Price Index data with Supabase backend. Features data sharing, native splash screen, and clean provider-based state management.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'Provider', 'share_plus', 'intl'],
    github: 'https://github.com/ChandraMohan1012/CPI',
    demo:   null,
  },
]

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [visible,  setVisible]  = useState(false)
  const [selected, setSelected] = useState(0)
  const [paused,   setPaused]   = useState(false)
  const [scale,    setScale]    = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router     = useRouter()

  /* Intersection observer */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => { if (sectionRef.current) io.unobserve(sectionRef.current) }
  }, [])

  /* Responsive scale */
  useEffect(() => {
    const update = () => {
      const avail = Math.min(window.innerWidth - 24, SYSTEM_SIZE)
      setScale(avail / SYSTEM_SIZE)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cur = PROJECTS[selected]
  const cfg = CONFIG[selected]

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={sectionRef}>

      {/* ── Keyframes + GPU-accelerated orbit classes ──────────────────────── */}
      <style>{`
        @keyframes sol-cw    { to { transform: rotate( 360deg); } }
        @keyframes sol-ccw   { to { transform: rotate(-360deg); } }
        @keyframes sun-fire  {
          0%,100% {
            box-shadow:
              0 0  0  8px rgba(255,200,40,0.18),
              0 0  0 22px rgba(255,120,0,0.10),
              0 0  60px 12px rgba(255,200,50,0.70),
              0 0 120px 28px rgba(255,130,0,0.45),
              0 0 220px 60px rgba(255,80,0,0.22);
          }
          50% {
            box-shadow:
              0 0  0 14px rgba(255,220,50,0.24),
              0 0  0 38px rgba(255,130,0,0.12),
              0 0  90px 18px rgba(255,220,60,0.85),
              0 0 170px 42px rgba(255,140,0,0.55),
              0 0 310px 90px rgba(255,90,0,0.28);
          }
        }
        @keyframes sun-spin  { to { transform: rotate(360deg); } }
        @keyframes ring-sel  {
          from { transform:translate(-50%,-50%) rotate(  0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes info-in   {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes twinkle   {
          0%,100% { opacity:.7; }
          50%      { opacity:.1; }
        }

        /* ── GPU compositor layers: eliminates jank on orbit animation ── */
        .sol-arm  {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .sol-body {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* ── Pure-CSS hover — no React re-render on mouse move ── */
        .p-area { cursor: pointer; }
        .p-sphere {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .p-area:hover .p-sphere {
          transform: scale(1.13) !important;
          box-shadow: 0 0 22px 6px var(--p-glow) !important;
        }
        .p-sphere.p-sel {
          transform: scale(1.28) !important;
          box-shadow: 0 0 38px 10px var(--p-glow) !important;
        }
        .p-glow-ring {
          position: absolute; inset: 0; border-radius: 50%;
          pointer-events: none;
          transition: box-shadow 0.25s ease;
        }
        .p-area:hover .p-glow-ring {
          box-shadow: 0 0 20px 4px var(--p-glow);
        }
        .p-glow-ring.p-sel {
          box-shadow: 0 0 40px 10px var(--p-glow);
        }
        .p-label {
          transition: color 0.25s, border-color 0.25s;
          color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .p-area:hover .p-label {
          color: rgba(255,255,255,0.95);
          border-color: rgba(255,255,255,0.30);
        }
        .p-label.p-sel {
          color: #ffffff;
          border-color: rgba(255,255,255,0.50);
        }

        .no-sb { scrollbar-width:none; -ms-overflow-style:none; }
        .no-sb::-webkit-scrollbar { display:none; }
      `}</style>

      {/* ── Background: deep space (memoised — never re-renders) ────────────── */}
      {useMemo(() => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 55% 50%, rgba(100,120,200,1), transparent)' }} />
          {CONFIG.map((_, i) => {
            const s  = (i * 137.5 + 17) % 360
            const s2 = (i * 97.3  + 43) % 360
            return (
              <div key={i} className="absolute rounded-full bg-white"
                style={{
                  width:  i % 4 === 0 ? '2px' : '1.5px',
                  height: i % 4 === 0 ? '2px' : '1.5px',
                  top:  `${(s  * 0.73) % 100}%`,
                  left: `${(s2 * 0.61) % 100}%`,
                  animation: `twinkle ${2.5 + (i % 6) * 0.6}s ease-in-out infinite`,
                  animationDelay: `${(i % 8) * 0.35}s`,
                }}
              />
            )
          })}
          {[...Array(28)].map((_, i) => (
            <div key={`s${i}`} className="absolute rounded-full bg-white"
              style={{
                width: '1px', height: '1px',
                top:  `${(i * 83.7) % 100}%`,
                left: `${(i * 61.3 + 13) % 100}%`,
                animation: `twinkle ${3 + (i % 5) * 0.7}s ease-in-out infinite`,
                animationDelay: `${(i % 9) * 0.3}s`,
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      ), [])}

      {/* ── Section header ──────────────────────────────────────────────────── */}
      <div className={`text-center mb-10 px-4 transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="inline-flex items-center gap-2 px-5 py-2
          bg-white/5 backdrop-blur-xl border border-white/10
          rounded-full text-sm font-medium mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
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
          Each project is a planet in orbit — click to explore · click the sun to pause
        </p>
      </div>

      {/* ════════════ SOLAR SYSTEM CANVAS ════════════ */}
      <div
        className={`relative mx-auto transition-all duration-1000
          ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ width: SYSTEM_SIZE * scale, height: SYSTEM_SIZE * scale }}
      >
        <div style={{
          width: SYSTEM_SIZE, height: SYSTEM_SIZE,
          transform: `scale(${scale})`, transformOrigin: 'top left',
          position: 'absolute', top: 0, left: 0,
        }}>

          {/* ── Orbit rings — clearly visible white ellipses like reference image ── */}
          {CONFIG.map((c, i) => (
            <div key={i}
              className="absolute top-1/2 left-1/2 rounded-full pointer-events-none
                         transition-all duration-500"
              style={{
                width:  c.orbit * 2,
                height: c.orbit * 2,
                transform: 'translate(-50%,-50%)',
                border: selected === i
                  ? '2px solid rgba(255,255,255,0.80)'
                  : '1.5px solid rgba(255,255,255,0.38)',
                boxShadow: selected === i
                  ? '0 0 22px rgba(255,255,255,0.22), inset 0 0 22px rgba(255,255,255,0.06)'
                  : '0 0 6px rgba(255,255,255,0.06)',
              }}
            />
          ))}

          {/* ── SUN ─────────────────────────────────────────────────────────── */}
          <div className="absolute top-1/2 left-1/2"
            style={{ width: SUN_SIZE, height: SUN_SIZE, transform: 'translate(-50%,-50%)', zIndex: 20 }}>

            {/* Breathing fire corona */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ animation: 'sun-fire 3.5s ease-in-out infinite' }} />

            {/* Sun body */}
            <div
              className="w-full h-full rounded-full overflow-hidden relative cursor-pointer
                         hover:scale-105 transition-transform duration-300"
              style={{
                background: 'radial-gradient(circle at 38% 30%, #fff9c4, #ffeb3b, #ff9800, #f44336, #b71c1c)',
                boxShadow: '0 0 40px rgba(255,200,0,0.6)',
              }}
              onClick={() => setPaused(p => !p)}
            >
              {/* Rotating fire surface */}
              <div className="absolute inset-0 opacity-30"
                style={{ animation: 'sun-spin 18s linear infinite' }}>
                <div className="w-full h-full" style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg,   rgba(255,255,100,0.9) 18deg, transparent 36deg,
                    transparent 70deg,  rgba(255,180,0,0.7)   88deg, transparent 106deg,
                    transparent 150deg, rgba(255,220,60,0.8) 170deg, transparent 188deg,
                    transparent 230deg, rgba(255,150,0,0.6)  250deg, transparent 268deg,
                    transparent 310deg, rgba(255,230,80,0.7) 330deg, transparent 348deg
                  )`,
                }} />
              </div>
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <i className={`fas ${paused ? 'fa-pause' : 'fa-sun'} text-yellow-100 text-2xl`}
                  style={{ opacity: 0.8, textShadow: '0 0 12px rgba(255,255,200,0.9)' }} />
              </div>
            </div>

            {/* Sun label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                            font-mono text-[10px] tracking-widest"
              style={{ color: 'rgba(255,200,50,0.65)' }}>
              {paused ? '⏸ PAUSED' : '☀ ORIGIN'}
            </div>
          </div>

          {/* ── PLANETS ─────────────────────────────────────────────────────── */}
          {PROJECTS.map((proj, i) => {
            const c     = CONFIG[i]
            const half  = c.size / 2
            const isSel = selected === i
            const delay = -(c.start / 360) * c.speed

            return (
              <div key={i}
                /* Arm: zero-size square at canvas center, rotates.
                   sol-arm class → will-change:transform + GPU layer */
                className="sol-arm"
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 0, height: 0,
                  animation: `sol-cw ${c.speed}s linear infinite`,
                  animationDelay: `${delay}s`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                {/* Body: offset by orbit, counter-rotates → stays upright.
                    sol-body class → will-change:transform + GPU layer */}
                <div
                  className="sol-body"
                  style={{
                    position: 'absolute',
                    left: c.orbit - half,
                    top: -half,
                    animation: `sol-ccw ${c.speed}s linear infinite`,
                    animationDelay: `${delay}s`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                >
                  {/* ── Clickable planet area — hover handled by CSS, no React state ── */}
                  <div
                    className="p-area relative select-none"
                    style={{
                      width: c.size, height: c.size,
                      /* CSS custom property for per-planet glow colour */
                      '--p-glow': proj.glow,
                    } as React.CSSProperties}
                    onClick={() => setSelected(i)}
                  >
                    {/* Saturn ring — BEHIND planet (z:0) */}
                    {proj.hasRing && (
                      <div style={{
                        position: 'absolute',
                        width: '215%', height: '34%',
                        left: '-57%', top: '33%',
                        border: '4px solid rgba(200,170,100,0.45)',
                        borderRadius: '50%',
                        zIndex: 0, pointerEvents: 'none',
                      }} />
                    )}

                    {/* Selected-planet spinning indicator ring */}
                    {isSel && (
                      <div style={{
                        position: 'absolute',
                        width: c.size + 22, height: c.size + 22,
                        top: -11, left: -11,
                        border: '1.5px solid rgba(255,255,255,0.50)',
                        borderRadius: '50%',
                        animation: 'ring-sel 3s linear infinite',
                        zIndex: 5, pointerEvents: 'none',
                      }} />
                    )}

                    {/* Glow ring — CSS class handles hover, inline handles selected */}
                    <div className={`p-glow-ring${isSel ? ' p-sel' : ''}`} />

                    {/* ── Planet body (z:1) — CSS class handles scale on hover ── */}
                    <div
                      className={`p-sphere absolute inset-0 rounded-full overflow-hidden
                                  flex items-center justify-center${isSel ? ' p-sel' : ''}`}
                      style={{
                        zIndex: 1,
                        background: proj.pBg,
                        boxShadow: `${proj.pShadow}, 0 0 18px var(--p-glow)`,
                      }}
                    >
                      {/* Specular sheen (light source top-left) */}
                      <div className="absolute inset-0 rounded-full" style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%, rgba(0,0,0,0.22) 100%)',
                        zIndex: 3,
                      }} />

                      {/* Jupiter horizontal bands */}
                      {proj.hasBands && (
                        <div className="absolute inset-0 rounded-full overflow-hidden" style={{ zIndex: 2 }}>
                          <div style={{ position:'absolute', top:'15%', insetInline:0, height:'9%',  background:'rgba(90,38,0,0.50)' }} />
                          <div style={{ position:'absolute', top:'30%', insetInline:0, height:'5%',  background:'rgba(130,55,0,0.38)' }} />
                          <div style={{ position:'absolute', top:'48%', insetInline:0, height:'12%', background:'rgba(80,32,0,0.55)' }} />
                          <div style={{ position:'absolute', top:'68%', insetInline:0, height:'7%',  background:'rgba(110,45,0,0.40)' }} />
                          <div style={{ position:'absolute', top:'82%', insetInline:0, height:'5%',  background:'rgba(70,28,0,0.35)' }} />
                          {/* Great Red Spot */}
                          <div style={{
                            position:'absolute', top:'44%', left:'54%',
                            width:'23%', height:'18%',
                            background:'rgba(190,45,20,0.70)',
                            borderRadius:'50%', transform:'translateY(-50%)',
                          }} />
                        </div>
                      )}

                      {/* Planet icon */}
                      <i className={`${proj.icon} relative`} style={{
                        zIndex: 4, fontSize: c.size * 0.32,
                        color: 'rgba(255,255,255,0.88)',
                        textShadow: '0 1px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6)',
                      }} />
                    </div>

                    {/* Saturn ring — IN FRONT of planet (z:2, top half only) */}
                    {proj.hasRing && (
                      <div style={{
                        position: 'absolute',
                        width: '215%', height: '34%',
                        left: '-57%', top: '33%',
                        border: `4px solid rgba(220,185,110,0.70)`,
                        borderRadius: '50%',
                        zIndex: 2,
                        pointerEvents: 'none',
                        /* Show only the top arc (front of planet) */
                        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                      }} />
                    )}

                    {/* ── Project name label — ALWAYS VISIBLE, CSS-only hover ── */}
                    <div
                      className={`p-label${isSel ? ' p-sel' : ''}`}
                      style={{
                        position: 'absolute',
                        top: c.size + 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 6,
                        pointerEvents: 'none',
                        background: 'rgba(0,0,0,0.60)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        fontSize: '11px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {proj.shortName}
                    </div>

                    {/* Mission number */}
                    <div style={{
                      position: 'absolute',
                      top: c.size + 34,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap',
                      zIndex: 6,
                      pointerEvents: 'none',
                      color: 'rgba(255,255,255,0.30)',
                      fontSize: '9px',
                      fontFamily: 'monospace',
                      letterSpacing: '0.12em',
                    }}>
                      {proj.mission}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>{/* /inner scaled div */}
      </div>{/* /canvas */}

      {/* ════════════ INFO CARD ════════════ */}
      <div className={`max-w-2xl mx-auto px-4 mt-8 transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Card: same glassmorphism as rest of portfolio */}
        <div key={selected}
          className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10
                     overflow-hidden hover:border-white/20 transition-all duration-500"
          style={{ animation: 'info-in 0.30s ease-out forwards' }}
        >
          {/* Card glow matching selected planet */}
          <div className="absolute -inset-1 rounded-3xl blur-xl opacity-0 hover:opacity-100
                          pointer-events-none transition-all duration-500"
            style={{ background: `radial-gradient(ellipse at center, ${cur.glow.replace('0.6','0.12').replace('0.65','0.12').replace('0.55','0.10').replace('0.60','0.11')}, transparent 70%)` }} />

          {/* Top accent line */}
          <div className="h-px" style={{
            background: `linear-gradient(to right, transparent, ${cur.glow.replace('0.6','0.7').replace('0.65','0.7').replace('0.55','0.6').replace('0.60','0.65')}, transparent)`,
          }} />

          <div className="p-7">
            {/* Mission + status */}
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[11px] tracking-widest text-gray-500">{cur.mission}</span>
              <span className={`px-3 py-1 text-[11px] font-mono rounded-full border ${
                cur.status === 'Live'
                  ? 'bg-white/10 text-white border-white/25'
                  : 'bg-white/5 text-gray-400 border-white/10'
              }`}>
                {cur.status === 'Live' ? '● LIVE' : '✓ DONE'}
              </span>
            </div>

            {/* Planet preview + title */}
            <div className="flex items-center gap-5 mb-5">
              {/* Mini planet replica */}
              <div className="relative flex-shrink-0" style={{ width: 64, height: 64 }}>
                {cur.hasRing && (
                  <div style={{
                    position:'absolute', width:'215%', height:'34%',
                    left:'-57%', top:'33%',
                    border:'3px solid rgba(200,170,100,0.45)',
                    borderRadius:'50%', zIndex:0,
                  }} />
                )}
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    zIndex: 1,
                    background: cur.pBg,
                    boxShadow: `${cur.pShadow}, 0 0 28px ${cur.glow}`,
                  }}>
                  {cur.hasBands && (
                    <div className="absolute inset-0 rounded-full overflow-hidden" style={{ zIndex:2 }}>
                      <div style={{ position:'absolute', top:'18%', insetInline:0, height:'9%',  background:'rgba(90,38,0,0.50)' }} />
                      <div style={{ position:'absolute', top:'48%', insetInline:0, height:'12%', background:'rgba(80,32,0,0.55)' }} />
                      <div style={{ position:'absolute', top:'68%', insetInline:0, height:'7%',  background:'rgba(110,45,0,0.40)' }} />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full" style={{
                    background:'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%)',
                    zIndex: 3,
                  }} />
                  <i className={`${cur.icon} text-xl text-white relative`}
                    style={{ zIndex:4, textShadow:'0 1px 8px rgba(0,0,0,0.8)' }} />
                </div>
                {cur.hasRing && (
                  <div style={{
                    position:'absolute', width:'215%', height:'34%',
                    left:'-57%', top:'33%',
                    border:'3px solid rgba(220,185,110,0.70)',
                    borderRadius:'50%', zIndex:2,
                    clipPath:'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                  }} />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">{cur.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{cur.description}</p>

            {/* Tech tags — matching Skills section */}
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

            {/* Actions — Hero-style CTAs */}
            <div className="flex flex-wrap gap-3 pt-5 border-t border-white/10">
              <button
                onClick={() => router.push(`/projects/${cur.slug}`)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white" />
                <span className="relative flex items-center gap-2 text-black font-semibold text-sm">
                  <i className="fas fa-satellite-dish" />
                  View Mission
                </span>
              </button>

              <a href={cur.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/30
                           text-white font-semibold rounded-full hover:bg-white/10
                           hover:border-white/50 transition-all duration-300 text-sm">
                <i className="fab fa-github" />Source
              </a>

              {cur.demo && (
                <a href={cur.demo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/30
                             text-white font-semibold rounded-full hover:bg-white/10
                             hover:border-white/50 transition-all duration-300 text-sm">
                  <i className="fas fa-rocket" />
                  {cur.status === 'Live' ? 'Launch' : 'Demo'}
                </a>
              )}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* Planet dot picker */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {PROJECTS.map((p, i) => (
            <button key={i}
              id={`planet-dot-${i}`}
              onClick={() => setSelected(i)}
              aria-label={p.shortName}
              className="rounded-full transition-all duration-300"
              style={selected === i
                ? { width: 22, height: 7, background: '#ffffff', boxShadow: '0 0 10px rgba(255,255,255,0.6)' }
                : { width: 7, height: 7, background: 'rgba(255,255,255,0.22)' }
              }
            />
          ))}
        </div>

        <p className="text-center font-mono text-[10px] text-gray-600 mt-3 tracking-widest">
          {cur.mission} / {String(PROJECTS.length).padStart(2, '0')}
          &nbsp;·&nbsp;CLICK SUN TO {paused ? 'RESUME' : 'PAUSE'} ORBITS
        </p>
      </div>

    </section>
  )
}
