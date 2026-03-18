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
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -12, scale: 1.012 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="glass-card group relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[32px] border border-white/12"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-sky-200/0 opacity-0 transition-all duration-500 ease-in-out group-hover:border-sky-200/35 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(125,211,252,0.18),0_0_42px_rgba(56,189,248,0.18)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/10 via-transparent to-slate-950/70 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100" />
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.18)_34%,rgba(2,6,23,0.86)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/65 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3 text-xs text-sky-100/90">Featured build</p>
            <h3 className="font-heading text-[1.85rem] font-semibold tracking-[-0.045em] text-white">{project.title}</h3>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-body text-[11px] uppercase tracking-[0.2em] text-slate-100 backdrop-blur-md">
            Premium UI
          </span>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col justify-between space-y-6 p-7">
        <div className="space-y-5">
          <p className="font-body text-[15px] leading-8 text-slate-300/82">{project.description}</p>
          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-body text-xs font-medium tracking-[0.02em] text-sky-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-2.5 font-body text-sm font-semibold tracking-[0.01em] text-sky-100 transition-all duration-300 ease-in-out hover:gap-3.5 hover:border-primary/40 hover:bg-primary/15 hover:text-white hover:shadow-[0_0_28px_rgba(56,189,248,0.18)]"
        >
          {visitLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.article>
  );
}
