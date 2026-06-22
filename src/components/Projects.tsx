'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


/* ── Project Case Studies Data ───────────────────────────────────────────── */
interface Project {
  slug: string
  title: string
  shortName: string
  mission: string
  color: string
  icon: string
  pBg: string
  description: string
  fullDescription: string
  tech: string[]
  features: string[]
  challenges: string[]
  outcomes: string[]
  github: string
  demo?: string
  duration: string
  role: string
  year: string
  category: 'ai' | 'mobile' | 'web'
}

const PROJECTS: Project[] = [
  {
    slug: 'eyes-ai-platform',
    title: 'EYES AI Platform',
    shortName: 'EYES',
    mission: 'MISSION-08',
    color: '#a855f7',
    icon: 'fas fa-robot',
    pBg: 'radial-gradient(circle at 30% 30%, #f3e8ff, #a855f7, #581c87)',
    description: 'Production-ready AI chat platform and synthesis dashboard with Google/Slack integrations.',
    fullDescription: `EYES is an advanced, production-grade AI platform featuring a borderless chat interface and a dedicated Synthesis Dashboard. The application is built to provide seamless conversational AI experiences.\n\nIt integrates deeply with Google Cloud (OAuth authentication) and Slack for robust user management and workflow automation. The UI is designed with a premium, minimalist aesthetic using modern web technologies like Next.js.`,
    tech: ['Next.js', 'Vercel', 'Google OAuth', 'Slack API', 'AI Synthesis'],
    features: [
      'Borderless AI chat interface',
      'Dashboard SynthesisView',
      'Google Cloud OAuth authentication',
      'Slack workspace integration',
      'Optimized Open Graph social sharing'
    ],
    challenges: [
      'Configuring complex OAuth flows across multiple providers',
      'Designing a seamless, borderless conversational UI',
      'Managing state across dashboard and chat interfaces'
    ],
    outcomes: [
      'Successfully launched V1 for production',
      'Integrated secure multi-platform authentication',
      'Achieved a highly polished, distraction-free aesthetic'
    ],
    github: 'https://github.com/ChandraMohan1012/EYES',
    demo: 'https://eyes-app-sigma.vercel.app',
    duration: '2 months',
    role: 'Full Stack AI Developer',
    year: '2024',
    category: 'ai'
  },
  {
    slug: 'intelligent-trading-system',
    title: 'Intelligent Trading System',
    shortName: 'Trading AI',
    mission: 'MISSION-01',
    color: '#94a3b8',
    icon: 'fas fa-chart-line',
    pBg: 'radial-gradient(circle at 30% 30%, #f8fafc, #94a3b8, #1e293b)',
    description: 'Python-based AI trading analysis using ML models and sentiment insights.',
    fullDescription: `This advanced trading system leverages artificial intelligence and machine learning to analyze market trends and generate actionable trading signals. The system combines multiple data sources including market data, news sentiment, and social media trends to provide comprehensive trading insights.

The system uses advanced prompt engineering techniques to generate human-readable explanations for each trading signal, making it accessible to both novice and experienced traders. The AI models are continuously updated and refined based on market performance.`,
    tech: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
    features: [
      'Real-time market data analysis',
      'Advanced ML-based prediction models',
      'News and social media sentiment analysis',
      'Automated signal explanation generation',
      'Risk assessment algorithms',
      'Customizable trading strategies'
    ],
    challenges: [
      'Processing large volumes of real-time data efficiently',
      'Ensuring model accuracy across different market conditions',
      'Implementing explainable AI for complex trading decisions'
    ],
    outcomes: [
      'Successfully deployed trading signals with high accuracy',
      'Reduced analysis time from hours to minutes',
      'Automated reporting saved 10+ hours per week'
    ],
    github: 'https://github.com/ChandraMohan1012/Intelligent-Trading-System',
    demo: 'https://drive.google.com/file/d/1y5Auuq8v_Nz560W-cnyEG0VW8yWoAUX8/view?usp=drivesdk',
    duration: '6 months',
    role: 'AI/ML Developer',
    year: '2024',
    category: 'ai'
  },
  {
    slug: 'soilmate',
    title: 'SoilMate: Smart Crop System',
    shortName: 'SoilMate',
    mission: 'MISSION-02',
    color: '#fbbf24',
    icon: 'fas fa-seedling',
    pBg: 'radial-gradient(circle at 30% 30%, #fef3c7, #fbbf24, #92400e)',
    description: 'AI-based system for crop, fertilizer, and crop health recommendations using soil data.',
    fullDescription: `SoilMate is an intelligent agricultural advisory system that helps farmers make data-driven decisions about crop selection, fertilizer application, and disease management. The system uses multiple machine learning models to analyze soil parameters and provide personalized recommendations.

The platform integrates advanced neural networks (ANN) for crop recommendation based on soil nutrient levels, Random Forest algorithms for precise fertilizer dosage calculations, and CNNs for crop disease detection from leaf images.`,
    tech: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
    features: [
      'Soil analysis and nutrient profiling',
      'AI-powered crop recommendations',
      'Fertilizer optimization algorithms',
      'Disease detection using image recognition',
      'Explainable AI for transparent decision-making'
    ],
    challenges: [
      'Training models with limited agricultural datasets',
      'Ensuring accuracy across different soil types and climates',
      'Making AI explanations understandable for farmers'
    ],
    outcomes: [
      '95% accuracy in crop recommendations',
      '30% reduction in fertilizer waste',
      'Early disease detection improved crop yields by 25%'
    ],
    github: 'https://github.com/ChandraMohan1012/SoilMate.git',
    demo: 'https://drive.google.com/file/d/1i69eUD6ultUnJ_sHWS0Vw8MM66Jrr9Xc/view?usp=drivesdk',
    duration: '8 months',
    role: 'Lead Developer',
    year: '2023-2024',
    category: 'ai'
  },
  {
    slug: 'agroconnect',
    title: 'AgroConnect',
    shortName: 'AgroConnect',
    mission: 'MISSION-03',
    color: '#38bdf8',
    icon: 'fas fa-users',
    pBg: 'radial-gradient(circle at 30% 30%, #e0f2fe, #38bdf8, #1e40af)',
    description: 'Multi-role Flutter app connecting farmers, workers, and equipment holders.',
    fullDescription: `AgroConnect is a comprehensive mobile platform that bridges the gap between various stakeholders in the agricultural ecosystem. Built with Flutter for cross-platform compatibility, the app serves as a one-stop solution for farmers, agricultural workers, equipment owners, shop owners, and crop buyers.

Each user role has a customized dashboard with relevant features and tools, ensuring a streamlined experience. The app uses Hive for local data persistence, enabling full functionality even without internet access.`,
    tech: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
    features: [
      'Multi-role authentication system',
      'Farmer dashboard with crop management',
      'Equipment rental marketplace',
      'Labor hiring and management',
      'Direct crop selling to buyers',
      'Offline data synchronization'
    ],
    challenges: [
      'Designing intuitive UIs for users with varying tech literacy',
      'Implementing robust offline-first architecture',
      'Managing complex multi-role authentication'
    ],
    outcomes: [
      '10,000+ active users within first year',
      'Farmers reported 20% higher crop prices through direct sales',
      'Equipment utilization increased by 40%'
    ],
    github: 'https://github.com/ChandraMohan1012/Agro_connect',
    demo: 'https://drive.google.com/file/d/1jrKpNiruHplQyNjBdcW3CtztKFcdfPdp/view?usp=drivesdk',
    duration: '10 months',
    role: 'Full Stack Mobile Developer',
    year: '2023',
    category: 'mobile'
  },
  {
    slug: 'bill-urai',
    title: 'Bill-Urai',
    shortName: 'Bill-Urai',
    mission: 'MISSION-04',
    color: '#f87171',
    icon: 'fas fa-shopping-cart',
    pBg: 'radial-gradient(circle at 30% 30%, #fecaca, #f87171, #991b1b)',
    description: 'Flutter billing app with barcode scanning and persistent app state.',
    fullDescription: `The Bill-Urai app is a modern point-of-sale solution designed for retail environments. Built with Flutter, it provides a fast and efficient way to process customer purchases using barcode scanning technology.

Using Hive for local storage, the app ensures that billing operations continue uninterrupted even during network outages. All data is synchronized automatically when connectivity is restored, making it ideal for busy retail environments.`,
    tech: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
    features: [
      'Fast barcode scanning',
      'Real-time price calculation',
      'Multiple payment methods',
      'Digital receipt generation',
      'Offline billing capability',
      'Daily sales reports'
    ],
    challenges: [
      'Optimizing barcode scanning speed and accuracy',
      'Managing offline data consistency',
      'Ensuring fast checkout experience'
    ],
    outcomes: [
      'Reduced average checkout time by 40%',
      'Zero data loss during network outages',
      'Deployed in 50+ retail locations'
    ],
    github: 'https://github.com/ChandraMohan1012/Bill-Urai',
    demo: 'https://drive.google.com/file/d/1wfm9KKvzxlU9bVrnMkYxle1nJ_3EIksJ/view?usp=drivesdk',
    duration: '4 months',
    role: 'Mobile App Developer',
    year: '2024',
    category: 'mobile'
  },
  {
    slug: 'virundhu',
    title: 'Virundhu',
    shortName: 'Virundhu',
    mission: 'MISSION-05',
    color: '#fb923c',
    icon: 'fas fa-utensils',
    pBg: 'radial-gradient(circle at 30% 30%, #ffedd5, #fb923c, #9a3412)',
    description: 'Premium restaurant food ordering & social dining experience.',
    fullDescription: `Virundhu is a premium food ordering mobile application designed to enhance the social dining experience. Built with Flutter and integrated with Supabase for real-time backend updates, the app allows users to order food, track delivery status, and organize social dining tables with friends.

The application features real-time cart synchronization, rich animated components using Lottie, and automated bill splitting.`,
    tech: ['Supabase', 'Lottie', 'Dart', 'Flutter', 'State Management'],
    features: [
      'Real-time cart synchronization',
      'Supabase database integration',
      'Social table bookings',
      'Interactive menus',
      'Lottie animations',
      'Receipt splitting utility'
    ],
    challenges: [
      'Synchronizing table orders in real-time across multiple user sessions',
      'Optimizing database queries for simultaneous connections',
      'Polishing complex UI transitions and loading states'
    ],
    outcomes: [
      'Improved social table ordering efficiency',
      'Reduced order delays by 35% in partner tests',
      'Achieved 99.9% uptime with Supabase real-time backend'
    ],
    github: 'https://github.com/ChandraMohan1012/Virundhu',
    duration: '5 months',
    role: 'Lead Mobile Developer',
    year: '2024',
    category: 'mobile'
  },
  {
    slug: 'exports-portfolio',
    title: 'Exports Portfolio',
    shortName: 'Exports',
    mission: 'MISSION-06',
    color: '#facc15',
    icon: 'fas fa-globe',
    pBg: 'radial-gradient(circle at 30% 30%, #fef9c3, #facc15, #854d0e)',
    description: 'Professional business exports website with product listings and inquiries.',
    fullDescription: `A professional, production-ready website designed for a business export company. It allows buyers to browse catalog listings, view detailed product information, and submit inquiry forms directly to the business administration team. Optimised for performance and SEO using Next.js.`,
    tech: ['Next.js', 'Vercel', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
    features: [
      'Product category listing',
      'Interactive inquiry forms',
      'Next.js SEO metadata optimization',
      'Fast static generation',
      'Vercel deployment'
    ],
    challenges: [
      'Optimizing static generation for dynamic categories',
      'Structuring clear navigation for diverse product fields'
    ],
    outcomes: [
      'Increased direct client inquiries by 50%',
      'Achieved 100/100 Lighthouse performance score',
      'Reduced page load time to sub-second'
    ],
    github: 'https://github.com/ChandraMohan1012/exports-portfolio',
    duration: '2 months',
    role: 'Frontend Developer',
    year: '2023',
    category: 'web'
  },
  {
    slug: 'suzhi-cpi-tracker',
    title: 'Suzhi CPI Tracker',
    shortName: 'Suzhi',
    mission: 'MISSION-07',
    color: '#60a5fa',
    icon: 'fas fa-chart-bar',
    pBg: 'radial-gradient(circle at 30% 30%, #dbeafe, #60a5fa, #1e3a8a)',
    description: 'Flutter app for tracking Consumer Price Index data with a clean UI.',
    fullDescription: `Suzhi CPI Tracker is a utility application designed to track and display Consumer Price Index statistics in a clear, interactive format. Using Flutter and Provider for state management, it visualizes complex economical graphs for users.`,
    tech: ['Provider', 'Dart', 'Supabase', 'Flutter', 'Charts API'],
    features: [
      'CPI index calculation',
      'Interactive chart visualizer',
      'Offline caching',
      'Data sync via Supabase',
      'Clean material theme'
    ],
    challenges: [
      'Parsing raw index sheets cleanly',
      'Rendering performant charts with large timelines'
    ],
    outcomes: [
      'Simplified CPI trend analysis',
      'Offline search operates in sub-50ms',
      'Highly rated user interface design'
    ],
    github: 'https://github.com/ChandraMohan1012/CPI',
    duration: '3 months',
    role: 'Mobile Developer',
    year: '2023',
    category: 'mobile'
  }
]

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'mobile' | 'web'>('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Track window resizing for mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Background stars data
  const stars = useMemo(() => Array.from({ length: 45 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 1,
    o: Math.random() * 0.4 + 0.2
  })), [])

  const filteredProjects = useMemo(() => {
    setActiveIndex(0) // Reset active slide when changing filter
    if (filter === 'all') return PROJECTS
    return PROJECTS.filter((p) => p.category === filter)
  }, [filter])

  const selectedProject = useMemo(() => {
    return PROJECTS.find((p) => p.slug === selectedId) || null
  }, [selectedId])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))
  }

  return (
    <section 
      id="projects" 
      className="min-h-screen py-32 relative overflow-hidden bg-[#020617] flex flex-col justify-center"
    >
      {/* 🌌 Cosmic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-layer-group text-white"></i>
            <span className="text-gray-300">Space Deck Carousel</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Project <span className="text-gray-400">Galaxy</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Swipe or slide through the 3D projection grid, and select a card to activate warp speed case studies.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            { id: 'all', label: 'All Projects', icon: 'fas fa-border-all' },
            { id: 'ai', label: 'AI & Python', icon: 'fas fa-brain' },
            { id: 'mobile', label: 'Mobile (Flutter)', icon: 'fas fa-mobile-alt' },
            { id: 'web', label: 'Web & Others', icon: 'fas fa-globe' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                filter === btn.id
                  ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <i className={btn.icon}></i>
              {btn.label}
            </button>
          ))}
        </div>

        {/* ── 3D Cover Flow Slider Container ── */}
        <div className="relative w-full h-[480px] flex items-center justify-center overflow-hidden py-10 perspective-[1000px]">
          
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -50) {
                handleNext();
              } else if (offset.x > 50) {
                handlePrev();
              }
            }}
            className="relative w-full max-w-[340px] md:max-w-[420px] h-[380px] flex items-center justify-center transform-style-3d cursor-grab active:cursor-grabbing"
          >
            {filteredProjects.map((p, i) => {
              const offset = i - activeIndex
              const absOffset = Math.abs(offset)
              
              // Calculate 3D transformation values
              const rotateYVal = offset === 0 ? 0 : offset > 0 ? -30 : 30
              const zVal = offset === 0 ? 0 : -220
              const scaleVal = offset === 0 ? 1 : 0.82
              
              // Hide side cards on mobile, stack beautifully on desktop
              const opacityVal = offset === 0 ? 1 : (isMobile ? 0 : Math.max(0.6 - absOffset * 0.15, 0.15))
              const xVal = offset === 0 ? 0 : (isMobile ? offset * 320 : offset * 260 + (offset > 0 ? 80 : -80))
              const zIndexVal = 100 - absOffset

              return (
                <motion.div
                  key={p.slug}
                  layoutId={`card-${p.slug}`}
                  style={{
                    zIndex: zIndexVal,
                    pointerEvents: 'auto'
                  }}
                  animate={{
                    x: xVal,
                    scale: scaleVal,
                    rotateY: rotateYVal,
                    z: zVal,
                    opacity: opacityVal
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 22
                  }}
                  onClick={() => offset !== 0 && setActiveIndex(i)}
                  className="absolute w-full h-full bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer"
                >
                  {/* Neon Color Glow Orb */}
                  <div 
                    className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-10"
                    style={{ background: p.color }}
                  />

                  <div>
                    {/* Card Header */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">{p.mission}</span>
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white border"
                        style={{ borderColor: `${p.color}40`, background: `${p.color}10` }}
                      >
                        <i className={p.icon} />
                      </div>
                    </div>

                    {/* Project Info */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-1">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{p.description}</p>
                  </div>

                  {/* Card Bottom / Interactive Trigger */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-400 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    {offset === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedId(p.slug)
                        }}
                        className="w-full py-3 bg-white text-black font-semibold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
                      >
                        <span>Explore Case Study</span>
                        <i className="fas fa-chevron-right text-xs" />
                      </button>
                    ) : (
                      <div className="text-center text-xs text-gray-500 font-medium">Click to Center Slide</div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* 🟢 Navigation Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {filteredProjects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-8 bg-white' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* ── Warp Portal Modal Overlay ── */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
              
              {/* Dim Backdrop Blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md z-0"
              />



              {/* Seamless Morph Container */}
              <motion.div
                layoutId={`card-${selectedProject.slug}`}
                className="relative max-w-4xl w-full bg-[#0b0f19]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden flex flex-col md:flex-row z-10 shadow-2xl max-h-[85vh] md:max-h-[80vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:scale-110 hover:rotate-90 transition-all duration-300 z-50"
                  aria-label="Close Case Study"
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* Left Side: Dynamic Visual Element */}
                <div 
                  className="w-full md:w-2/5 p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10"
                  style={{
                    background: `linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(15,23,42,0.95) 100%)`
                  }}
                >
                  <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <div 
                      className="w-56 h-56 rounded-full opacity-20 blur-3xl animate-pulse"
                      style={{ background: selectedProject.color }}
                    />
                    <div className="absolute w-[240px] h-[240px] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
                    <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }} />
                  </div>

                  <div className="relative z-10 text-center md:text-left">
                    <span className="text-xs font-mono tracking-widest text-gray-500 uppercase block mb-4">
                      {selectedProject.mission}
                    </span>
                    
                    <div className="w-24 h-24 rounded-full mx-auto my-8 relative flex items-center justify-center animate-bounce shadow-xl"
                      style={{ 
                        background: selectedProject.pBg,
                        boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.6), 0 0 40px ${selectedProject.color}40`,
                        animationDuration: '5s'
                      }}
                    >
                      <i className={`${selectedProject.icon} text-white/80 text-4xl`} />
                    </div>

                    <h3 className="text-3xl font-display font-bold text-center text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm text-center font-medium uppercase tracking-wide">
                      {selectedProject.role}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 space-y-3 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">YEAR</span>
                      <span className="text-white font-medium">{selectedProject.year}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">DURATION</span>
                      <span className="text-white font-medium">{selectedProject.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">CODEBASE</span>
                      <span className="text-white font-medium uppercase">Active</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Case Study Scrollable Content */}
                <div className="w-full md:w-3/5 p-8 overflow-y-auto max-h-[50vh] md:max-h-[80vh] custom-scrollbar">
                  <div className="space-y-8">
                    
                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">Project Overview</h4>
                      <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, idx) => (
                          <span 
                            key={idx} 
                            className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white shadow-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-4">Key Features</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {selectedProject.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <i className="fas fa-check-circle text-white mt-1 text-xs" />
                            <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-4">Technical Challenges</h4>
                      <div className="space-y-3">
                        {selectedProject.challenges.map((ch, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <i className="fas fa-cog text-gray-500 mt-1 text-xs" />
                            <span className="text-gray-300 text-sm leading-relaxed">{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-4">Outcomes & Impact</h4>
                      <div className="space-y-3">
                        {selectedProject.outcomes.map((out, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <i className="fas fa-chart-line text-white mt-1 text-xs" />
                            <span className="text-gray-300 text-sm leading-relaxed">{out}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg"
                      >
                        <i className="fab fa-github text-lg" />
                        <span>Explore Code</span>
                      </a>
                      
                      {selectedProject.demo && (
                        <a 
                          href={selectedProject.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                        >
                          <i className="fas fa-play text-sm" />
                          <span>View Demo</span>
                        </a>
                      )}
                    </div>

                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
