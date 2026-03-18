'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useAdaptiveMotion } from '@/hooks/useAdaptiveMotion';
import type { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
  visitLabel: string;
};

export function ProjectCard({ project, visitLabel }: ProjectCardProps) {
  const { allowHover, isMobile, shouldReduceMotion } = useAdaptiveMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const progress = useSpring(scrollYProgress, shouldReduceMotion ? { damping: 100, stiffness: 500 } : { damping: 24, stiffness: 130, mass: 0.32 });
  const travel = shouldReduceMotion ? 0 : isMobile ? 12 : 28;
  const imageTravel = shouldReduceMotion ? 0 : isMobile ? 10 : 36;

  return (
    <motion.article
      ref={ref}
      whileHover={allowHover && !shouldReduceMotion ? { y: -10, scale: 1.01 } : undefined}
      style={{
        opacity: useTransform(progress, [0, 0.18, 0.5, 0.85, 1], [0.38, 0.84, 1, 0.88, 0.5]),
        y: useTransform(progress, [0, 0.5, 1], [travel, 0, -travel]),
        scale: useTransform(progress, [0, 0.5, 1], [shouldReduceMotion ? 1 : 0.985, 1, shouldReduceMotion ? 1 : 0.992])
      }}
      className="glass-card group relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[26px] border border-white/12 md:min-h-[34rem] md:rounded-[32px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[26px] border border-sky-200/0 opacity-0 transition-all duration-500 ease-in-out md:rounded-[32px] group-hover:border-sky-200/35 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(125,211,252,0.18),0_0_42px_rgba(56,189,248,0.18)]"
        style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.15, 0.35, 0.18]) }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-sky-300/8 via-transparent to-slate-950/70 opacity-100 md:opacity-0 md:transition md:duration-500 md:ease-in-out md:group-hover:opacity-100"
        style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.55, 0.82, 0.62]) }}
      />
      <div className="relative h-60 w-full overflow-hidden md:h-72">
        <motion.div className="absolute inset-0" style={{ y: useTransform(progress, [0, 1], [imageTravel, -imageTravel]), scale: useTransform(progress, [0, 0.5, 1], [1.08, 1, 1.08]) }}>
          <Image
            src={project.image}
            alt={`${project.title} project preview for ${project.description}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 ease-out md:duration-700 md:group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.18)_34%,rgba(2,6,23,0.86)_100%)]" />
        <motion.div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/65 to-transparent md:h-28" style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.9, 0.66, 0.84]) }} />
        <motion.div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-5 md:left-5 md:right-5" style={{ y: useTransform(progress, [0, 1], ['10px', '-12px']) }}>
          <div>
            <p className="eyebrow mb-2 text-[11px] text-sky-100/90 md:mb-3 md:text-xs">Featured build</p>
            <h3 className="font-heading text-[1.55rem] font-semibold tracking-[-0.045em] text-white md:text-[1.85rem]">{project.title}</h3>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.16em] text-slate-100 backdrop-blur-sm md:px-3.5 md:text-[11px] md:tracking-[0.2em] md:backdrop-blur-md">
            Premium UI
          </span>
        </motion.div>
      </div>
      <motion.div className="relative flex flex-1 flex-col justify-between space-y-5 p-5 md:space-y-6 md:p-7" style={{ y: useTransform(progress, [0, 1], ['8px', '-10px']) }}>
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
          className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2.5 font-body text-sm font-semibold tracking-[0.01em] text-sky-100 transition-all duration-300 ease-in-out md:hover:gap-3.5 md:hover:border-primary/40 md:hover:bg-primary/15 md:hover:text-white md:hover:shadow-[0_0_28px_rgba(56,189,248,0.18)]"
        >
          {visitLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </motion.div>
    </motion.article>
  );
}
