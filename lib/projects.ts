export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  url: string;
};

export const projects: Project[] = [
{
  title: 'MADMOB Platform',
  description: 'Creative digital platform for a music and culture brand, featuring immersive design, smooth UX, and strong visual identity.',
  tech: ['Next.js', 'TailwindCSS', 'Framer Motion'],
  image: '/madmob.webp',
  url: 'https://madmob-dev.vercel.app/'
},
  {
    title: 'Medical Booking Platform',
    description: 'Appointment platform with role-based access and API integrations.',
    tech: ['React', 'Python', 'Docker'],
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com'
  },
  {
    title: 'Corporate Landing Suite',
    description: 'High-conversion multilingual website for B2B lead generation.',
    tech: ['Next.js', 'TailwindCSS', 'Linux'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com'
  }
];
