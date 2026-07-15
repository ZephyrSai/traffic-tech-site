import Link from "next/link";
import type { Platform } from "@/lib/data";

const accents = {
  signal: {
    text: "text-signal",
    dot: "bg-signal",
    hover: "hover:border-signal/40",
  },
  mint: {
    text: "text-mint",
    dot: "bg-mint",
    hover: "hover:border-mint/40",
  },
  amberglow: {
    text: "text-amberglow",
    dot: "bg-amberglow",
    hover: "hover:border-amberglow/40",
  },
} as const;

export function PlatformCard({ platform }: { platform: Platform }) {
  const a = accents[platform.accent];
  return (
    <article
      data-reveal
      className={`card-glow group relative flex flex-col rounded-2xl border border-line/70 bg-panel p-7 transition-colors ${a.hover}`}
    >
      <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${a.text}`}>
        {platform.kicker}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-frost">{platform.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{platform.summary}</p>
      <ul className="mt-5 space-y-2">
        {platform.features.slice(0, 3).map((f) => (
          <li key={f.title} className="flex items-start gap-2.5 text-sm text-frost/90">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
            {f.title}
          </li>
        ))}
      </ul>
      <Link
        href={`/solutions#${platform.slug}`}
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${a.text}`}
      >
        Explore {platform.name}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}
