"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * Wraps a section and staggers-in any descendant marked with `data-reveal`
 * when the section scrolls into view. CSS keeps `data-reveal` elements hidden
 * until then (and visible for reduced-motion users).
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          animate(targets, {
            opacity: [0, 1],
            translateY: [26, 0],
            duration: 850,
            ease: "out(3)",
            delay: stagger(90),
          });
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
