'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
  visitLabel: string;
};

export function ProjectCard({ project, visitLabel }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className="glass-card group relative overflow-hidden rounded-[30px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-slate-950/40 opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-accent/90">Featured build</p>
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100 backdrop-blur-md">
            Premium UI
          </span>
        </div>
      </div>
      <div className="relative space-y-5 p-6">
        <p className="text-sm leading-6 text-slate-300 md:text-[15px]">{project.description}</p>
        <div className="flex flex-wrap gap-2.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-sky-100"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 hover:text-accent"
        >
          {visitLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.article>
  );
}
