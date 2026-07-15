import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Major traffic, ITS, security, parking and EV-charging projects delivered by Traffic Tech across Qatar and the Gulf — for Ashghal, LREDC, HMC and more.",
};

export default function ProjectsPage() {
  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/50">
        <div className="grid-bg absolute inset-0" />
        <Reveal className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 lg:px-8">
          <SectionHeading
            kicker="Projects"
            title="Delivered where it matters most"
            text="An approved PWA (Ashghal) and QatarEnergy contractor, Traffic Tech has executed 2,000+ projects — expressways, smart districts, hospitals and citywide programmes."
          />
        </Reveal>
      </section>

      {categories.map((cat) => (
        <section key={cat} className="border-b border-line/30 py-14 last:border-b-0">
          <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2
              data-reveal
              className="flex items-center gap-3 font-display text-xl font-semibold text-frost"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              {cat}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {projects
                .filter((p) => p.category === cat)
                .map((p) => (
                  <article
                    key={p.name}
                    data-reveal
                    className="rounded-xl border border-line/70 bg-panel p-6 transition hover:border-signal/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-base font-semibold leading-snug text-frost">
                        {p.name}
                      </h3>
                      <span className="shrink-0 rounded-full border border-line bg-night px-2.5 py-0.5 text-xs text-mist">
                        {p.year}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">{p.scope}</p>
                    <div className="mt-4 space-y-1 text-xs text-mist/70">
                      <p>Client · {p.client}</p>
                      {p.contractor && <p>Contractor · {p.contractor}</p>}
                    </div>
                  </article>
                ))}
            </div>
          </Reveal>
        </section>
      ))}
    </>
  );
}
