import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
}

export function useElementReveal(
  ref: React.RefObject<HTMLElement>,
  options: RevealOptions = {}
) {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    triggerStart = 'top 80%',
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-reveal]');
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref, duration, delay, stagger, triggerStart]);
}
