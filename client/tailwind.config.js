/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17171F',
        paper: '#FBFAF7',
        slate: { line: '#E4E1D8' },
        brass: '#E8A33D',
        teal: '#0F5E5A',
        violet: '#5B4BCF',
        coral: '#E0553F',
        muted: '#6B6862',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { card: '6px' },
    },
  },
  plugins: [],
};
