"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line/70 bg-night/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-panel-2 text-frost"
                    : "text-mist hover:bg-panel hover:text-frost"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="ml-2">
            <ThemeToggle />
          </span>
          <Link
            href="/contact"
            className="btn-brand ml-2 rounded-full px-4 py-2 text-sm font-semibold"
          >
            Talk to us
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
            <span
              className={`h-px w-5 bg-frost transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-frost transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line/60 bg-night/95 px-5 py-4 backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-mist hover:bg-panel hover:text-frost"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-brand mt-2 rounded-lg px-3 py-2.5 text-center font-semibold"
            >
              Talk to us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
