"use client";

import { useEffect, useState } from "react";

/** Tracks the .dark class on <html> so WebGL scenes can re-tint live. */
export function useIsDark() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return dark;
}
