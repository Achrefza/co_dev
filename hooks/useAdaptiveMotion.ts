'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';
const HOVER_QUERY = '(hover: hover) and (pointer: fine)';

export function useAdaptiveMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    const mobileMedia = window.matchMedia(MOBILE_QUERY);
    const hoverMedia = window.matchMedia(HOVER_QUERY);

    const update = () => {
      setIsMobile(mobileMedia.matches);
      setAllowHover(hoverMedia.matches && !mobileMedia.matches);
    };

    update();
    mobileMedia.addEventListener('change', update);
    hoverMedia.addEventListener('change', update);

    return () => {
      mobileMedia.removeEventListener('change', update);
      hoverMedia.removeEventListener('change', update);
    };
  }, []);

  return {
    isMobile,
    allowHover,
    shouldReduceMotion: prefersReducedMotion || isMobile
  };
}
