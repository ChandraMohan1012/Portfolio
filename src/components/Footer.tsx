const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 py-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-gray-300/5 rounded-full blur-[60px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-xl flex items-center justify-center font-display font-bold text-black">
              CM
            </div>
            <span className="font-display font-semibold text-white">Chandra Mohan</span>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Chandra Mohan. Crafted with <i className="fas fa-heart text-white mx-1"></i> and passion.
            </p>
          </div>

          {/* Back to top */}
          <a 
            href="#home"
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-gray-400 text-sm hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <span>Back to top</span>
            <i className="fas fa-arrow-up text-white group-hover:-translate-y-1 transition-transform duration-300"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
