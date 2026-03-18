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
    studio: 'Premium Web Agency',
    heroTitleLead: 'We design',
    heroTitleAccent: 'high-conversion digital experiences',
    tagline:
      'CO_DEV crafts elegant, fast and trustworthy websites for ambitious brands that need agency-level execution without compromise.',
    heroCardLabel: 'Live delivery stack',
    heroCardTitle: 'Luxury-grade product workflow',
    heroCardText:
      'Strategy, UI systems, development and launch support aligned in one seamless production pipeline.',
    heroMetricOne: 'Client-ready polish',
    heroMetricTwo: 'Fast, secure delivery',
    viewProjects: 'View Projects',
    contact: 'Book a Call',
    projectsTitle: 'Selected Work',
    projectsSubtitle:
      'Signature builds created to feel premium, perform flawlessly and reinforce trust at every touchpoint.',
    visitWebsite: 'Visit Website',
    stackTitle: 'Technology Expertise',
    stackSubtitle:
      'Modern tools, scalable architecture and thoughtful frontend systems built for serious business outcomes.',
    aboutTitle: 'Designed for brands that want more than a simple portfolio',
    aboutText:
      'CO_DEV combines modern frontend engineering, performance-first architecture and a refined visual approach to create websites that look elite and convert with confidence.',
    aboutHighlightOne: 'Premium UX direction',
    aboutHighlightTwo: 'Secure, scalable implementation',
    aboutHighlightThree: 'Multilingual and performance-ready',
    contactTitle: 'Ready to elevate your online presence?',
    contactText:
      'From luxury landing pages to full-scale business platforms, we build experiences that communicate credibility from the first second.',
    hireMe: 'Start Your Project'
  },
  fr: {
    navProjects: 'Projets',
    navAbout: 'À propos',
    navContact: 'Contact',
    studio: 'Agence web premium',
    heroTitleLead: 'Nous créons des',
    heroTitleAccent: 'expériences digitales haut de gamme',
    tagline:
      'CO_DEV conçoit des sites élégants, rapides et fiables pour les marques ambitieuses qui recherchent une exécution au niveau agence.',
    heroCardLabel: 'Pipeline de livraison',
    heroCardTitle: 'Workflow produit premium',
    heroCardText:
      'Stratégie, design UI, développement et lancement réunis dans un processus fluide et maîtrisé.',
    heroMetricOne: 'Finition premium',
    heroMetricTwo: 'Livraison rapide et sécurisée',
    viewProjects: 'Voir les projets',
    contact: 'Réserver un appel',
    projectsTitle: 'Réalisations sélectionnées',
    projectsSubtitle:
      'Des projets conçus pour paraître premium, performer parfaitement et inspirer confiance à chaque interaction.',
    visitWebsite: 'Visiter le site',
    stackTitle: 'Expertise technologique',
    stackSubtitle:
      'Des outils modernes, une architecture évolutive et des systèmes frontend pensés pour des résultats concrets.',
    aboutTitle: 'Pensé pour les marques qui veulent plus qu’un simple portfolio',
    aboutText:
      'CO_DEV associe ingénierie frontend moderne, architecture performante et direction visuelle raffinée pour créer des sites qui impressionnent et convertissent.',
    aboutHighlightOne: 'Direction UX premium',
    aboutHighlightTwo: 'Implémentation sécurisée et scalable',
    aboutHighlightThree: 'Multilingue et optimisé',
    contactTitle: 'Prêt à valoriser votre présence en ligne ?',
    contactText:
      'Des landing pages premium aux plateformes business complètes, nous créons des expériences qui inspirent immédiatement confiance.',
    hireMe: 'Lancer votre projet'
  },
  es: {
    navProjects: 'Proyectos',
    navAbout: 'Sobre mí',
    navContact: 'Contacto',
    studio: 'Agencia web premium',
    heroTitleLead: 'Diseñamos',
    heroTitleAccent: 'experiencias digitales de alto nivel',
    tagline:
      'CO_DEV crea sitios elegantes, rápidos y confiables para marcas ambiciosas que buscan ejecución al nivel de una gran agencia.',
    heroCardLabel: 'Pipeline de entrega',
    heroCardTitle: 'Flujo de producto premium',
    heroCardText:
      'Estrategia, diseño UI, desarrollo y lanzamiento conectados en un sistema de producción fluido.',
    heroMetricOne: 'Acabado premium',
    heroMetricTwo: 'Entrega rápida y segura',
    viewProjects: 'Ver proyectos',
    contact: 'Reservar una llamada',
    projectsTitle: 'Trabajos destacados',
    projectsSubtitle:
      'Proyectos pensados para verse premium, rendir al máximo y transmitir confianza en cada detalle.',
    visitWebsite: 'Visitar sitio',
    stackTitle: 'Experiencia tecnológica',
    stackSubtitle:
      'Herramientas modernas, arquitectura escalable y sistemas frontend diseñados para resultados reales.',
    aboutTitle: 'Hecho para marcas que quieren más que un portfolio básico',
    aboutText:
      'CO_DEV combina ingeniería frontend moderna, arquitectura orientada al rendimiento y una dirección visual refinada para crear sitios que impresionan y convierten.',
    aboutHighlightOne: 'Dirección UX premium',
    aboutHighlightTwo: 'Implementación segura y escalable',
    aboutHighlightThree: 'Multilingüe y listo para rendimiento',
    contactTitle: '¿Listo para elevar tu presencia online?',
    contactText:
      'Desde landing pages de lujo hasta plataformas empresariales completas, creamos experiencias que comunican credibilidad desde el primer segundo.',
    hireMe: 'Iniciar tu proyecto'
  },
  it: {
    navProjects: 'Progetti',
    navAbout: 'Chi sono',
    navContact: 'Contatto',
    studio: 'Agenzia web premium',
    heroTitleLead: 'Creiamo',
    heroTitleAccent: 'esperienze digitali di fascia alta',
    tagline:
      'CO_DEV realizza siti eleganti, veloci e affidabili per brand ambiziosi che desiderano una qualità da agenzia top-tier.',
    heroCardLabel: 'Pipeline di delivery',
    heroCardTitle: 'Workflow prodotto premium',
    heroCardText:
      'Strategia, design UI, sviluppo e lancio uniti in un processo di produzione fluido e curato.',
    heroMetricOne: 'Finitura premium',
    heroMetricTwo: 'Consegna rapida e sicura',
    viewProjects: 'Vedi progetti',
    contact: 'Prenota una call',
    projectsTitle: 'Progetti selezionati',
    projectsSubtitle:
      'Progetti progettati per apparire premium, performare al massimo e trasmettere fiducia in ogni interazione.',
    visitWebsite: 'Visita sito',
    stackTitle: 'Competenze tecnologiche',
    stackSubtitle:
      'Strumenti moderni, architettura scalabile e sistemi frontend pensati per obiettivi business concreti.',
    aboutTitle: 'Pensato per brand che vogliono più di un semplice portfolio',
    aboutText:
      'CO_DEV unisce ingegneria frontend moderna, architettura orientata alle performance e una direzione visiva raffinata per creare siti che impressionano e convertono.',
    aboutHighlightOne: 'Direzione UX premium',
    aboutHighlightTwo: 'Implementazione sicura e scalabile',
    aboutHighlightThree: 'Multilingua e pronto per le performance',
    contactTitle: 'Pronto a elevare la tua presenza online?',
    contactText:
      'Dalle landing page luxury alle piattaforme business complete, realizziamo esperienze che comunicano credibilità fin dal primo istante.',
    hireMe: 'Avvia il tuo progetto'
  }
} as const;

export type Translation = (typeof translations)[Locale];
