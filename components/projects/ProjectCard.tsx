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
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      className="glass-card group overflow-hidden rounded-3xl"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="text-sm text-slate-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-accent"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-dark transition hover:bg-accent"
        >
          {visitLabel}
        </a>
      </div>
    </motion.article>
  );
}
