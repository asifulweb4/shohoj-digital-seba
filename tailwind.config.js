/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Forest Green — primary identity */
        forest: {
          950: '#022c22',
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
          600: '#059669',
          500: '#10b981',
          400: '#34d399',
          300: '#6ee7b7',
          200: '#a7f3d0',
          100: '#d1fae5',
          50:  '#ecfdf5',
        },
        /* Gold — CTA / highlights */
        gold: {
          900: '#78350f',
          800: '#92400e',
          700: '#b45309',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
          200: '#fde68a',
          100: '#fef3c7',
          50:  '#fffbeb',
        },
        /* Crimson — alerts / badges */
        crimson: {
          700: '#991b1b',
          600: '#dc2626',
          500: '#ef4444',
          100: '#fee2e2',
        },
        /* Teal — unique accent */
        teal: {
          700: '#0f766e',
          600: '#0d9488',
          500: '#14b8a6',
          400: '#2dd4bf',
          100: '#ccfbf1',
        },
      },
      fontFamily: {
        sans: ['Hind Siliguri', 'Noto Sans Bengali', 'Inter', 'sans-serif'],
      },
      animation: {
        float:         'float 5s ease-in-out infinite',
        'fade-up':     'fadeInUp 0.6s ease-out both',
        'gold-shimmer':'goldShimmer 3s linear infinite',
        'slide-down':  'slideDown 0.3s cubic-bezier(0.4,0,0.2,1)',
        'pulse-soft':  'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' },          '50%': { transform: 'translateY(-12px)' } },
        fadeInUp:    { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown:   { from: { opacity: '0', transform: 'translateY(-14px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        goldShimmer: { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        pulseSoft:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.55' } },
      },
      boxShadow: {
        'green-sm':  '0 2px 10px rgba(5,150,105,0.14)',
        'green-md':  '0 8px 32px rgba(5,150,105,0.24)',
        'green-lg':  '0 16px 50px rgba(5,150,105,0.34)',
        'gold-sm':   '0 2px 10px rgba(217,119,6,0.18)',
        'gold-md':   '0 8px 32px rgba(217,119,6,0.30)',
        'gold-lg':   '0 16px 50px rgba(217,119,6,0.40)',
        card:        '0 4px 20px rgba(2,44,34,0.07)',
        'card-hover':'0 14px 44px rgba(2,44,34,0.13)',
      },
      backgroundImage: {
        hero:         'linear-gradient(135deg,#022c22 0%,#064e3b 30%,#065f46 60%,#059669 85%,#0d9488 100%)',
        'hero-radial':'radial-gradient(ellipse at 60% 40%, #059669 0%, #064e3b 50%, #022c22 100%)',
        cta:          'linear-gradient(135deg,#064e3b,#059669,#0d9488)',
        gold:         'linear-gradient(135deg,#d97706,#f59e0b)',
        'green-card': 'linear-gradient(135deg,#ecfdf5,#d1fae5)',
      },
    },
  },
  plugins: [],
}
