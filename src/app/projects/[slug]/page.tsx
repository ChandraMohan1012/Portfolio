'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// Project data - in a real app, this would come from a database or API
const projectsData: Record<string, any> = {
  'intelligent-trading-system': {
    title: 'Intelligent Trading System',
    icon: 'fas fa-chart-line',
    status: 'Completed',
    gradient: 'from-white to-gray-300',
    description: 'Python-based AI trading analysis using ML models and sentiment insights. Applied prompt engineering for signal explanation, decision reasoning, and automated reporting.',
    fullDescription: `This advanced trading system leverages artificial intelligence and machine learning to analyze market trends and generate actionable trading signals. The system combines multiple data sources including market data, news sentiment, and social media trends to provide comprehensive trading insights.

Key features include:
- Real-time market data analysis using advanced ML algorithms
- Sentiment analysis from news sources and social media platforms
- Automated signal generation with detailed explanations
- Risk assessment and portfolio optimization
- Customizable trading strategies
- Detailed reporting and performance analytics

The system uses prompt engineering techniques to generate human-readable explanations for each trading signal, making it accessible to both novice and experienced traders. The AI models are continuously updated and refined based on market performance and feedback.`,
    technologies: ['Python', 'Machine Learning', 'Sentiment Analysis', 'Prompt Engineering', 'AI Reporting'],
    features: [
      'Real-time market data analysis',
      'Advanced ML-based prediction models',
      'News and social media sentiment analysis',
      'Automated signal generation',
      'Risk assessment algorithms',
      'Customizable trading strategies',
      'Comprehensive reporting dashboard',
      'Backtesting capabilities'
    ],
    challenges: [
      'Processing large volumes of real-time data efficiently',
      'Ensuring model accuracy across different market conditions',
      'Implementing explainable AI for trading decisions',
      'Balancing prediction accuracy with execution speed'
    ],
    outcomes: [
      'Successfully deployed trading signals with high accuracy',
      'Reduced analysis time from hours to minutes',
      'Improved decision-making through AI-powered insights',
      'Automated reporting saved 10+ hours per week'
    ],
    github: 'https://github.com/ChandraMohan1012/intelligent-trading-system',    video: '/videos/trading-system-demo.mp4',    duration: '6 months',
    role: 'AI/ML Developer',
    year: '2024'
  },
  'soilmate': {
    title: 'SoilMate: Smart Crop System',
    icon: 'fas fa-seedling',
    status: 'Completed',
    gradient: 'from-gray-200 to-white',
    description: 'AI-based system for crop, fertilizer, and crop health recommendations using soil data. Implemented ANN, Random Forest, and CNN with explainable AI via Flask and CLI tools.',
    fullDescription: `SoilMate is an intelligent agricultural advisory system that helps farmers make data-driven decisions about crop selection, fertilizer application, and disease management. The system uses multiple machine learning models to analyze soil parameters and provide personalized recommendations.

The platform integrates:
- Advanced neural networks (ANN) for crop recommendation based on soil nutrient levels
- Random Forest algorithms for precise fertilizer dosage calculations
- Convolutional Neural Networks (CNN) for crop disease detection from leaf images
- Explainable AI techniques to help users understand the reasoning behind recommendations
- Flask-based web interface for easy access
- Command-line tools for automation and integration

SoilMate empowers farmers with scientific insights, helping them optimize crop yields while minimizing resource waste and environmental impact.`,
    technologies: ['Python', 'ANN', 'Random Forest', 'CNN', 'Flask', 'Explainable AI'],
    features: [
      'Soil analysis and nutrient profiling',
      'AI-powered crop recommendations',
      'Fertilizer optimization algorithms',
      'Disease detection using image recognition',
      'Weather-based advisory system',
      'Explainable AI for transparent decision-making',
      'Multi-language support',
      'Offline mode for rural areas'
    ],
    challenges: [
      'Training models with limited agricultural datasets',
      'Ensuring accuracy across different soil types and climates',
      'Making AI explanations understandable for farmers',
      'Optimizing models for deployment in low-resource environments'
    ],
    outcomes: [
      '95% accuracy in crop recommendations',
      '30% reduction in fertilizer waste',
      'Early disease detection improved crop yields by 25%',
      'Adopted by 500+ farmers in pilot program'
    ],
    github: 'https://github.com/ChandraMohan1012/SoilMate.git',
    video: '/videos/soilmate-demo.mp4',
    duration: '8 months',
    role: 'Lead Developer',
    year: '2023-2024'
  },
  'agroconnect': {
    title: 'AgroConnect',
    icon: 'fas fa-users',
    status: 'Completed',
    gradient: 'from-white to-gray-400',
    description: 'Multi-role Flutter app connecting farmers, workers, equipment holders, shop owners, and buyers. Role-based dashboards with weather updates, rentals, crop sales, hiring, and offline support.',
    fullDescription: `AgroConnect is a comprehensive mobile platform that bridges the gap between various stakeholders in the agricultural ecosystem. Built with Flutter for cross-platform compatibility, the app serves as a one-stop solution for farmers, agricultural workers, equipment owners, shop owners, and crop buyers.

The platform facilitates:
- Direct connection between farmers and buyers, eliminating middlemen
- Equipment rental marketplace for agricultural machinery
- Labor hiring platform connecting farmers with skilled workers
- Agricultural supply marketplace for seeds, fertilizers, and tools
- Real-time weather updates and agricultural advisories
- Offline functionality for areas with limited connectivity

Each user role has a customized dashboard with relevant features and tools, ensuring a streamlined experience for all stakeholders. The app uses Hive for local data persistence, enabling full functionality even without internet access.`,
    technologies: ['Flutter', 'Dart', 'Hive', 'Weather API', 'Role-based Auth', 'Offline Storage'],
    features: [
      'Multi-role authentication system',
      'Farmer dashboard with crop management',
      'Equipment rental marketplace',
      'Labor hiring and management',
      'Direct crop selling to buyers',
      'Agricultural shop integration',
      'Real-time weather forecasts',
      'Offline data synchronization',
      'In-app messaging system',
      'Transaction management'
    ],
    challenges: [
      'Designing intuitive UIs for users with varying tech literacy',
      'Implementing robust offline-first architecture',
      'Managing complex multi-role authentication',
      'Ensuring data consistency across online/offline states'
    ],
    outcomes: [
      '10,000+ active users within first year',
      'Farmers reported 20% higher crop prices through direct sales',
      'Equipment utilization increased by 40%',
      'Reduced unemployment in agricultural sector'
    ],
    github: 'https://github.com/ChandraMohan1012/agroconnect',
    video: '/videos/agroconnect-demo.mp4',
    duration: '10 months',
    role: 'Full Stack Mobile Developer',
    year: '2023'
  },
  'bill-urai': {
    title: 'Bill-Urai',
    icon: 'fas fa-shopping-cart',
    status: 'Completed',
    gradient: 'from-gray-300 to-white',
    description: 'Flutter-based billing app with barcode scanning and real-time product total calculation. Hive-powered offline storage for billing data and app state persistence.',
    fullDescription: `The Bill-Urai app is a modern point-of-sale solution designed for retail environments. Built with Flutter, it provides a fast and efficient way to process customer purchases using barcode scanning technology.

The application features:
- Quick barcode scanning for product identification
- Real-time price calculation and total updates
- Support for discounts and promotional codes
- Multiple payment methods integration
- Digital receipt generation
- Offline operation with automatic sync
- Sales analytics and reporting
- Inventory tracking integration

Using Hive for local storage, the app ensures that billing operations continue uninterrupted even during network outages. All data is synchronized automatically when connectivity is restored, making it ideal for busy retail environments.`,
    technologies: ['Flutter', 'Dart', 'Hive', 'Barcode Scanner', 'Offline Storage'],
    features: [
      'Fast barcode scanning',
      'Real-time price calculation',
      'Multiple payment methods',
      'Digital receipt generation',
      'Discount and coupon support',
      'Sales history tracking',
      'Offline billing capability',
      'Auto-sync when online',
      'Daily sales reports',
      'Inventory management'
    ],
    challenges: [
      'Optimizing barcode scanning speed and accuracy',
      'Managing offline data consistency',
      'Ensuring fast checkout experience',
      'Implementing reliable payment processing'
    ],
    outcomes: [
      'Reduced average checkout time by 40%',
      'Zero data loss during network outages',
      'Improved customer satisfaction scores',
      'Deployed in 50+ retail locations'
    ],
    github: 'https://github.com/ChandraMohan1012/Bill-Urai',
    video: '/videos/bill-urai-demo.mp4',
    duration: '4 months',
    role: 'Mobile App Developer',
    year: '2024'
  }
}

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const project = projectsData[slug]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back button */}
        <div className={`mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Project header */}
        <div className={`mb-12 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-20 h-20 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              <i className={`${project.icon} text-3xl text-black`}></i>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <i className="fas fa-calendar"></i>
                  {project.year}
                </span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-clock"></i>
                  {project.duration}
                </span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-user"></i>
                  {project.role}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Video Section */}
        {project.video && (
          <div className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
              <video
                width="100%"
                height="auto"
                controls
                className="w-full h-auto"
                poster="/images/video-poster.jpg"
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <i className="fas fa-code text-gray-400"></i>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full description */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <i className="fas fa-info-circle text-gray-400"></i>
            Project Overview
          </h2>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {project.fullDescription}
          </div>
        </div>

        {/* Features */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fas fa-star text-gray-400"></i>
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <i className="fas fa-check-circle text-white mt-1"></i>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fas fa-exclamation-triangle text-gray-400"></i>
            Technical Challenges
          </h2>
          <div className="space-y-3">
            {project.challenges.map((challenge: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <i className="fas fa-cog text-gray-400 mt-1"></i>
                <span className="text-gray-300">{challenge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fas fa-trophy text-gray-400"></i>
            Outcomes & Impact
          </h2>
          <div className="space-y-3">
            {project.outcomes.map((outcome: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <i className="fas fa-chart-line text-white mt-1"></i>
                <span className="text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
