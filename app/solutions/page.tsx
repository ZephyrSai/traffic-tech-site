import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { platforms } from "@/lib/data";
import smartTrafficImg from "@/public/images/photos/smarttraffic.jpg";
import smartAnprImg from "@/public/images/photos/smartanpr.png";

export const metadata: Metadata = {
  title: "Solutions — UTMS, AI Traffic Intelligence & Digital Twin",
  description:
    "Traffic Tech's software-defined mobility stack: the Unified Traffic Management System (UTMS), AI traffic intelligence, digital twins, SmartANPR and SmartTraffic.",
};

const accents = {
  signal: { text: "text-signal", border: "border-signal/30", chip: "bg-signal/10" },
  mint: { text: "text-mint", border: "border-mint/30", chip: "bg-mint/10" },
  amberglow: { text: "text-amberglow", border: "border-amberglow/30", chip: "bg-amberglow/10" },
} as const;

const smartProducts = [
  {
    name: "SmartANPR",
    img: smartAnprImg,
    alt: "SmartANPR licence-plate recognition in action",
    text: "Our in-house automatic number-plate recognition platform — highly accurate reading of all GCC licence plates, powering tolling, enforcement, access control and the journey-time analytics inside UTMS.",
  },
  {
    name: "SmartTraffic",
    img: smartTrafficImg,
    alt: "SmartTraffic intersection intelligence visualisation",
    text: "Traffic Tech's integrated traffic monitoring suite: live network status, incident logging and control-room workflows, now evolving into the operator experience of the UTMS platform.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/50">
        <div className="grid-bg absolute inset-0" />
        <Reveal className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 lg:px-8">
          <SectionHeading
            kicker="Solutions"
            title="A software-defined mobility stack"
            text="Three platform offerings — engineered on a quarter-century of field delivery in the Gulf — that turn road infrastructure into a managed, learning, simulated system."
          />
        </Reveal>
      </section>

      {platforms.map((p, idx) => {
        const a = accents[p.accent];
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={`scroll-mt-24 py-20 ${idx % 2 === 1 ? "bg-abyss/40" : ""}`}
          >
            <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                <div>
                  <p
                    data-reveal
                    className={`text-xs font-semibold uppercase tracking-[0.22em] ${a.text}`}
                  >
                    {p.kicker}
                  </p>
                  <h2
                    data-reveal
                    className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {p.name}
                  </h2>
                  <p data-reveal className="mt-5 leading-relaxed text-mist">
                    {p.summary}
                  </p>
                  <div data-reveal className="mt-7">
                    <Link
                      href="/contact"
                      className={`inline-flex rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:brightness-125 ${a.border} ${a.text}`}
                    >
                      Request a briefing →
                    </Link>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <div
                      key={f.title}
                      data-reveal
                      className="rounded-xl border border-line/70 bg-panel p-5"
                    >
                      <span
                        className={`inline-block rounded-md px-2 py-1 text-[11px] font-semibold ${a.chip} ${a.text}`}
                      >
                        {f.title}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-mist">{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        );
      })}

      <section className="border-t border-line/50 py-20">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            kicker="In-house products"
            title="The Smart family"
            text="Purpose-built products developed and supported by our own engineers in Doha."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {smartProducts.map((sp) => (
              <div
                key={sp.name}
                data-reveal
                className="card-glow overflow-hidden rounded-2xl border border-line/70 bg-panel"
              >
                <div className="relative h-56">
                  <Image
                    src={sp.img}
                    alt={sp.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
                </div>
                <div className="p-7 pt-4">
                  <h3 className="font-display text-xl font-semibold text-frost">{sp.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{sp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
