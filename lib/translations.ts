export type Locale = 'en' | 'fr' | 'es' | 'it';

export const locales: Locale[] = ['en', 'fr', 'es', 'it'];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
  it: 'IT'
};

export const translations = {
  en: {
    navProjects: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    studio: 'Web Development Studio',
    tagline: 'We build modern, secure and scalable websites.',
    viewProjects: 'View Projects',
    contact: 'Contact',
    projectsTitle: 'Selected Projects',
    projectsSubtitle: 'A snapshot of custom web platforms built for performance and trust.',
    visitWebsite: 'Visit Website',
    stackTitle: 'Tech Stack',
    aboutTitle: 'About',
    aboutText:
      'Achref Ouerchfeni – Cybersecurity student and web developer specialized in building modern, fast and secure websites.',
    contactTitle: 'Let\'s Build Your Next Website',
    hireMe: 'Hire me'
  },
  fr: {
    navProjects: 'Projets',
    navAbout: 'À propos',
    navContact: 'Contact',
    studio: 'Studio de développement web',
    tagline: 'Nous créons des sites modernes, sécurisés et évolutifs.',
    viewProjects: 'Voir les projets',
    contact: 'Contact',
    projectsTitle: 'Projets Sélectionnés',
    projectsSubtitle: 'Un aperçu de plateformes web sur mesure, performantes et fiables.',
    visitWebsite: 'Visiter le site',
    stackTitle: 'Technologies',
    aboutTitle: 'À propos',
    aboutText:
      'Achref Ouerchfeni – Étudiant en cybersécurité et développeur web spécialisé dans les sites modernes, rapides et sécurisés.',
    contactTitle: 'Construisons votre prochain site web',
    hireMe: 'Engagez-moi'
  },
  es: {
    navProjects: 'Proyectos',
    navAbout: 'Sobre mí',
    navContact: 'Contacto',
    studio: 'Estudio de desarrollo web',
    tagline: 'Construimos sitios web modernos, seguros y escalables.',
    viewProjects: 'Ver proyectos',
    contact: 'Contacto',
    projectsTitle: 'Proyectos Destacados',
    projectsSubtitle: 'Una muestra de plataformas web personalizadas, rápidas y confiables.',
    visitWebsite: 'Visitar sitio',
    stackTitle: 'Tecnologías',
    aboutTitle: 'Sobre mí',
    aboutText:
      'Achref Ouerchfeni – Estudiante de ciberseguridad y desarrollador web especializado en sitios modernos, rápidos y seguros.',
    contactTitle: 'Construyamos tu próximo sitio web',
    hireMe: 'Contrátame'
  },
  it: {
    navProjects: 'Progetti',
    navAbout: 'Chi sono',
    navContact: 'Contatto',
    studio: 'Studio di sviluppo web',
    tagline: 'Realizziamo siti web moderni, sicuri e scalabili.',
    viewProjects: 'Vedi progetti',
    contact: 'Contatto',
    projectsTitle: 'Progetti Selezionati',
    projectsSubtitle: 'Una selezione di piattaforme web personalizzate, veloci e affidabili.',
    visitWebsite: 'Visita sito',
    stackTitle: 'Tecnologie',
    aboutTitle: 'Chi sono',
    aboutText:
      'Achref Ouerchfeni – Studente di cybersecurity e sviluppatore web specializzato in siti moderni, veloci e sicuri.',
    contactTitle: 'Costruiamo il tuo prossimo sito web',
    hireMe: 'Assumimi'
  }
} as const;

export type Translation = (typeof translations)[Locale];
