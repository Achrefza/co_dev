import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import '@/styles/animations.css';

const headingFont = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'CO_DEV | Web Development Studio',
  description: 'Premium portfolio for CO_DEV showcasing modern, secure and scalable web projects.',
  keywords: ['CO_DEV', 'web development', 'portfolio', 'next.js', 'freelance developer'],
  openGraph: {
    title: 'CO_DEV | Web Development Studio',
    description: 'Creative digital business card of CO_DEV web studio.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
