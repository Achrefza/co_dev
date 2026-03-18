import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import '@/styles/animations.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
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
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
