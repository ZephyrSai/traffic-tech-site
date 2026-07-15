"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Defers mounting an expensive WebGL canvas until the section approaches the
 * viewport, then keeps it mounted. Children render nothing until visible.
 */
export function LazyScene({
  children,
  className,
  placeholder,
}: {
  children: React.ReactNode;
  className?: string;
  placeholder?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  );
}
