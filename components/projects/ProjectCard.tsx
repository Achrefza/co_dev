'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAdaptiveMotion } from '@/hooks/useAdaptiveMotion';
import type { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
  visitLabel: string;
};

export function ProjectCard({ project, visitLabel }: ProjectCardProps) {
  const { allowHover, isMobile, shouldReduceMotion } = useAdaptiveMotion();
  const canAnimate = !shouldReduceMotion && !isMobile;

  return (
    <motion.article
      initial={canAnimate ? { opacity: 0, y: 20 } : false}
      whileInView={canAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: canAnimate ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
      whileHover={allowHover && canAnimate ? { y: -6 } : undefined}
      className="glass-card group relative flex h-full min-h-[29rem] flex-col overflow-hidden rounded-[24px] border border-white/12 md:min-h-[34rem] md:rounded-[32px]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-sky-200/0 opacity-0 transition-[opacity,border-color,box-shadow] duration-200 ease-out md:rounded-[32px] group-hover:border-sky-200/20 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(125,211,252,0.1),0_0_18px_rgba(56,189,248,0.08)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/5 via-transparent to-slate-950/70 opacity-100 md:opacity-0 md:transition-opacity md:duration-200 md:ease-out md:group-hover:opacity-100" />
      <div className="relative h-56 w-full overflow-hidden md:h-72">
        <motion.div
          className="absolute inset-0"
          whileHover={allowHover && canAnimate ? { scale: 1.03 } : undefined}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.image}
            alt={`${project.title} project preview for ${project.description}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.18)_34%,rgba(2,6,23,0.86)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/65 to-transparent md:h-28" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-5 md:left-5 md:right-5">
          <div>
            <p className="eyebrow mb-2 text-[11px] text-sky-100/90 md:mb-3 md:text-xs">Featured build</p>
            <h3 className="font-heading text-[1.55rem] font-semibold tracking-[-0.045em] text-white md:text-[1.85rem]">{project.title}</h3>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.14em] text-slate-100 backdrop-blur-sm md:px-3.5 md:text-[11px] md:tracking-[0.2em]">
            Premium UI
          </span>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col justify-between space-y-5 p-5 md:space-y-6 md:p-7">
        <div className="space-y-4 md:space-y-5">
          <p className="font-body text-[15px] leading-7 text-slate-300/82 md:leading-8">{project.description}</p>
          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-body text-xs font-medium tracking-[0.02em] text-sky-100 md:px-3.5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <a
          aria-label={`Visit ${project.title} project website`}
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="premium-button-secondary mt-1 w-full sm:w-fit md:mt-0"
        >
          {visitLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.article>
  );
}
