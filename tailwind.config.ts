import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      colors: {
        primary: '#38BDF8',
        secondary: '#0EA5E9',
        dark: '#0F172A',
        accent: '#7DD3FC'
      },
      backgroundImage: {
        hero:
          'radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.24), transparent 30%), radial-gradient(circle at 82% 14%, rgba(125, 211, 252, 0.18), transparent 26%), linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 47, 73, 0.95) 45%, rgba(15, 23, 42, 1) 100%)'
      },
      boxShadow: {
        glow: '0 18px 60px rgba(56, 189, 248, 0.28)',
        soft: '0 24px 80px rgba(15, 23, 42, 0.32)'
      },
      backgroundColor: {
        'white/6': 'rgba(255,255,255,0.06)'
      }
    }
  },
  plugins: []
};

export default config;
