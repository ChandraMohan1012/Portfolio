'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'

/* ── System geometry ─────────────────────────────────────────────────────── */
const SYSTEM_SIZE = 1000 
const SUN_SIZE    = 100

const CONFIG = [
  { size: 42, orbit: 120, speed: 10, start: 0,   name: 'M-01' },
  { size: 54, orbit: 180, speed: 14, start: 60,  name: 'M-02' },
  { size: 68, orbit: 250, speed: 18, start: 120, name: 'M-03' },
  { size: 48, orbit: 320, speed: 22, start: 220, name: 'M-04' },
  { size: 95, orbit: 420, speed: 28, start: 40,  name: 'M-05' },
  { size: 72, orbit: 520, speed: 34, start: 290, name: 'M-06' },
  { size: 58, orbit: 600, speed: 40, start: 160, name: 'M-07' },
]

const PROJECTS = [
  {
    title: 'Intelligent Trading System', shortName: 'Trading AI',
    slug: 'intelligent-trading-system', mission: 'MISSION-01',
    icon: 'fas fa-chart-line', status: 'Completed',
    pBg: 'radial-gradient(circle at 30% 30%, #e5e7eb, #9ca3af, #374151)',
    glow: 'rgba(209,213,219,0.5)', hasRing: false,
    description: 'Python-based AI trading analysis using ML models and sentiment insights.',
    technologies: ['Python', 'Machine Learning', 'AI Reporting'],
    github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System',
    demo: 'https://drive.google.com/file/d/1y5Auuq8v_Nz560W-cnyEG0VW8yWoAUX8/view?usp=drivesdk',
  },
  {
    title: 'SoilMate: Smart Crop System', shortName: 'SoilMate',
    slug: 'soilmate', mission: 'MISSION-02',
    icon: 'fas fa-seedling', status: 'Completed',
    pBg: 'radial-gradient(circle at 30% 30%, #fef3c7, #fbbf24, #b45309)',
    glow: 'rgba(251,191,36,0.6)', hasRing: false,
    description: 'AI-based system for crop, fertilizer, and health recommendations.',
    technologies: ['Python', 'ANN', 'Flask'],
    github: 'https://github.com/ChandraMohan1012/SoilMate.git',
    demo: 'https://drive.google.com/file/d/1i69eUD6ultUnJ_sHWS0Vw8MM66Jrr9Xc/view?usp=drivesdk',
  },
  {
    title: 'AgroConnect', shortName: 'AgroConnect',
    slug: 'agroconnect', mission: 'MISSION-03',
    icon: 'fas fa-users', status: 'Completed',
    pBg: 'radial-gradient(circle at 30% 30%, #bae6fd, #0ea5e9, #1e40af)',
    glow: 'rgba(14,165,233,0.6)', hasRing: false,
    description: 'Multi-role Flutter app connecting farmers and workers.',
    technologies: ['Flutter', 'Supabase', 'Hive'],
    github: 'https://github.com/ChandraMohan1012/Agro_connect',
    demo: 'https://drive.google.com/file/d/1jrKpNiruHplQyNjBdcW3CtztKFcdfPdp/view?usp=drivesdk',
  },
  {
    title: 'Bill-Urai', shortName: 'Bill-Urai',
    slug: 'bill-urai', mission: 'MISSION-04',
    icon: 'fas fa-shopping-cart', status: 'Completed',
    pBg: 'radial-gradient(circle at 30% 30%, #fca5a5, #ef4444, #7f1d1d)',
    glow: 'rgba(239,68,68,0.5)', hasRing: false,
    description: 'Flutter billing app with barcode scanning.',
    technologies: ['Flutter', 'Hive', 'Barcode Scanner'],
    github: 'https://github.com/ChandraMohan1012/Bill-Urai',
    demo: 'https://drive.google.com/file/d/1wfm9KKvzxlU9bVrnMkYxle1nJ_3EIksJ/view?usp=drivesdk',
  },
  {
    title: 'Virundhu', shortName: 'Virundhu',
    slug: 'virundhu', mission: 'MISSION-05',
    icon: 'fas fa-utensils', status: 'Completed',
    pBg: 'radial-gradient(circle at 30% 30%, #ffedd5, #f97316, #9a3412)',
    glow: 'rgba(249,115,22,0.6)', hasBands: true, hasRing: false,
    description: 'Premium restaurant experience with real-time order management.',
    technologies: ['Flutter', 'Supabase', 'Lottie'],
    github: 'https://github.com/ChandraMohan1012/Virundhu',
    demo: null,
  },
  {
    title: 'Exports Portfolio', shortName: 'Exports',
    slug: 'exports-portfolio', mission: 'MISSION-06',
    icon: 'fas fa-globe', status: 'Live',
    pBg: 'radial-gradient(circle at 30% 30%, #fef9c3, #eab308, #713f12)',
    glow: 'rgba(234,179,8,0.5)', hasRing: true,
    description: 'Professional business exports website with WhatsApp integration.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ChandraMohan1012/exports-portfolio',
    demo: 'https://exports-portfolio.vercel.app',
  },
  {
    title: 'Suzhi — CPI Tracker', shortName: 'Suzhi',
    slug: 'suzhi-cpi-tracker', mission: 'MISSION-07',
    icon: 'fas fa-chart-bar', status: 'Completed',
    pBg: 'radial-gradient(circle at 30% 30%, #e0f2fe, #38bdf8, #1e3a8a)',
    glow: 'rgba(56,189,248,0.5)', hasRing: false,
    description: 'Flutter app for tracking Consumer Price Index data.',
    technologies: ['Flutter', 'Dart', 'Supabase'],
    github: 'https://github.com/ChandraMohan1012/CPI',
    demo: null,
  },
]

export default function Projects() {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(2) // Default to Earth-like Project
  const [paused, setPaused] = useState(false)
  const [scale, setScale] = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / 1200, 1))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const stars = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    dur: Math.random() * 3 + 2,
    delay: Math.random() * 5
  })), [])

  const cur = PROJECTS[selected]

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black" ref={sectionRef}>
      
      <style>{`
        @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes sun-glow { 0%, 100% { filter: brightness(1) blur(20px); } 50% { filter: brightness(1.3) blur(40px); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 0.3; } 50% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(0.95); opacity: 0.3; } }
        
        .system-container {
          perspective: 2000px;
          transform-style: preserve-3d;
        }
        .orbit-plane {
          transform: rotateX(65deg);
          transform-style: preserve-3d;
          transition: transform 1s ease-out;
        }
        .planet-wrap {
          position: absolute;
          top: 50%; left: 50%;
          transform-style: preserve-3d;
        }
        .planet-upright {
          transform: rotateX(-65deg); /* Counteract the plane tilt */
          transform-style: preserve-3d;
        }
        .orbit-line {
          position: absolute;
          top: 50%; left: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .orbit-line.selected {
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 0 15px rgba(255,255,255,0.1);
        }
        .traveler {
          position: absolute;
          width: 4px; height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px white;
          offset-path: border-box; /* Not widely supported for div, we use rotation instead */
        }
        .p-sphere {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .p-sphere:hover { transform: scale(1.15) translateZ(20px); }
        .p-name {
          position: absolute;
          top: 100%; left: 50%;
          transform: translateX(-50%) translateY(10px);
          white-space: nowrap;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          background: rgba(0,0,0,0.6);
          padding: 2px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
          transition: all 0.3s;
        }
        .selected .p-name {
          color: white;
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
          transform: translateX(-50%) translateY(15px) scale(1.1);
          box-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
      `}</style>

      {/* Background stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((s, i) => (
          <div key={i} className="absolute bg-white rounded-full opacity-0 animate-pulse"
            style={{ 
              top: s.top, left: s.left, width: s.size, height: s.size,
              animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`
            }} />
        ))}
      </div>

      <div className={`text-center mb-16 relative z-10 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Project Galaxy</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Explore my missions orbiting the core knowledge center. Tilted in 3D perspective for full immersion.</p>
      </div>

      <div className="system-container relative flex items-center justify-center pointer-events-none" 
        style={{ height: SYSTEM_SIZE * 0.65 * scale, animation: visible ? 'float 6s ease-in-out infinite' : 'none' }}>
        <div className="orbit-plane relative pointer-events-auto" style={{ width: SYSTEM_SIZE, height: SYSTEM_SIZE, transform: `scale(${scale}) rotateX(65deg)` }}>
          
          {/* ORBIT LINES + REVOLVING PULSES */}
          {CONFIG.map((c, i) => (
            <div key={`line-${i}`} className={`orbit-line ${selected === i ? 'selected' : ''}`} 
              style={{ width: c.orbit * 2, height: c.orbit * 2 }}>
                {/* Traveling light pulse on the line */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: c.orbit * 2, height: c.orbit * 2,
                  marginTop: -c.orbit, marginLeft: -c.orbit,
                  animation: `orbit-cw ${c.speed * 2}s linear infinite`,
                  pointerEvents: 'none',
                }}>
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[2px] opacity-40 shadow-[0_0_10px_white]" />
                </div>
            </div>
          ))}

          {/* THE SUN */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 10 }}>
            <div className="planet-upright">
              <div 
                className="rounded-full shadow-2xl relative cursor-pointer"
                style={{ 
                  width: SUN_SIZE, height: SUN_SIZE, 
                  background: 'radial-gradient(circle at 30% 30%, #fff9c4, #fbbf24, #f59e0b, #b45309)',
                  boxShadow: '0 0 80px rgba(245, 158, 11, 0.6)',
                  animation: 'sun-glow 4s ease-in-out infinite'
                }}
                onClick={() => setPaused(!paused)}
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-sm" />
              </div>
            </div>
          </div>

          {/* THE PLANETS */}
          {PROJECTS.map((proj, i) => {
            const conf = CONFIG[i]
            const isSel = selected === i
            const animDur = conf.speed
            const animDelay = -(conf.start / 360) * animDur

            return (
              <div key={i} className="planet-wrap" 
                style={{ 
                  width: conf.orbit * 2, height: conf.orbit * 2,
                  marginTop: -conf.orbit, marginLeft: -conf.orbit,
                  animation: `orbit-cw ${animDur}s linear infinite`,
                  animationDelay: `${animDelay}s`,
                  animationPlayState: paused ? 'paused' : 'running'
                }}>
                
                <div className={`absolute top-1/2 -translate-y-1/2 ${isSel ? 'selected' : ''}`} 
                  style={{ left: -conf.size/2, transformStyle: 'preserve-3d' }}>
                  
                  <div className="planet-upright" 
                    style={{ 
                      animation: `orbit-ccw ${animDur}s linear infinite`,
                      animationDelay: `${animDelay}s`,
                      animationPlayState: paused ? 'paused' : 'running'
                    }}>
                    
                    <div className="relative p-area" onClick={(e) => { e.stopPropagation(); setSelected(i); }}>
                      
                      {/* Saturn Ring */}
                      {proj.hasRing && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ 
                            width: conf.size * 2.2, height: conf.size * 0.4, 
                            border: '4px solid rgba(217,119,6,0.4)', 
                            borderRadius: '50%', transform: 'rotate(-15deg)',
                            zIndex: 1
                          }} />
                      )}

                      {/* Planet Globe */}
                      <div className="p-sphere rounded-full relative z-10"
                        style={{ 
                          width: conf.size, height: conf.size, 
                          background: proj.pBg,
                          boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 30px ${proj.glow}`,
                          border: isSel ? '2px solid rgba(255,255,255,0.4)' : 'none'
                        }}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-60">
                          <i className={`${proj.icon} text-white`} style={{ fontSize: conf.size * 0.4 }} />
                        </div>
                        {proj.hasBands && (
                          <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none" 
                            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.3) 5px, rgba(0,0,0,0.3) 10px)' }} />
                        )}
                      </div>

                      {/* LABELS - Detailing */}
                      <div className="p-name">
                        <span className="block text-center">{proj.shortName}</span>
                        <span className="block text-center text-[8px] opacity-50 font-mono tracking-tighter">{conf.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* INFO CARD */}
      <div className={`max-w-3xl mx-auto px-6 mt-12 transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-white/20 tracking-widest">{cur.mission}</div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 rounded-full flex-shrink-0" style={{ background: cur.pBg, boxShadow: `0 0 40px ${cur.glow}` }} />
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">{cur.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{cur.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {cur.technologies.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300">{t}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={cur.github} target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">Source Code</a>
                {cur.demo && <a href={cur.demo} target="_blank" className="px-6 py-3 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all">Launch Mission</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
