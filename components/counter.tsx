"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value.toLocaleString("en-US");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const obj = { v: 0 };
        animate(obj, {
          v: value,
          duration: 2000,
          ease: "out(4)",
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-US");
          },
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span>
      <span ref={ref}>{value.toLocaleString("en-US")}</span>
      {suffix}
    </span>
  );
}
