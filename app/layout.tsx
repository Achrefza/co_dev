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
  description: 'CO_DEV is a professional web development studio building modern, high-performance and scalable websites.',
  keywords: ['CO_DEV', 'web development studio', 'web agency', 'next.js', 'scalable websites'],
  openGraph: {
    title: 'CO_DEV | Web Development Studio',
    description: 'Professional web development studio for modern, high-performance and scalable websites.',
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
