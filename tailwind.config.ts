import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#38BDF8',
        secondary: '#0EA5E9',
        dark: '#0F172A',
        accent: '#7DD3FC'
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.3), transparent 35%), radial-gradient(circle at 80% 10%, rgba(125, 211, 252, 0.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.25), transparent 35%)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
