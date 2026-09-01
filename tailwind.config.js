/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        marine: {
          950: '#070A0E', // deepest oceanic background
          900: '#0B0F14', // deep charcoal / canvas
          850: '#10161E', // workspace canvas
          800: '#151D27', // primary surface / cards
          750: '#1B2633', // secondary surface / hovers
          700: '#223040', // elevated surface / panels
          600: '#2F4257', // subtle border / grid lines
          500: '#48637F', // muted elements / tertiary
          400: '#738BA1', // secondary text
          300: '#A4B8C9', // light muted text
          200: '#CAD8E4', // bright text
          100: '#E4ECF2', // high-contrast text
          50:  '#F4F8FA', // pure off-white
        },
        teal: {
          brand: '#14B8A6',
          muted: '#0D9488',
          subtle: 'rgba(20, 184, 166, 0.12)',
          glow: 'rgba(20, 184, 166, 0.24)',
          deep: '#0F4A50',
          hover: '#2DD4BF',
        },
        status: {
          ready: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#38BDF8',
          inactive: '#64748B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'console': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'console-elevated': '0 4px 12px 0 rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
        'panel-border': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
