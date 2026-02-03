/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        dark: {
          100: '#0a0a0a',
          200: '#050505',
          300: '#a1a1aa',
          400: '#71717a',
        },
        accent: '#ffffff',
        matrix: {
          green: '#ffffff',
          lime: '#e5e7eb',
          emerald: '#9ca3af',
          dark: '#1f2937',
        },
        space: {
          dark: '#000000',
          deep: '#0a0a0a',
          void: '#050505',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float-slow 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'matrix-gradient': 'linear-gradient(135deg, #00ff41 0%, #00d26a 50%, #39ff14 100%)',
      },
    },
  },
  plugins: [],
}
