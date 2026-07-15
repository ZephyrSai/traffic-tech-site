import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { PlatformCard } from "@/components/platform-card";
import { AwardsMarquee } from "@/components/awards-marquee";
import { LazyScene } from "@/components/three/lazy-scene";
import { HeroCityScene, GlobeScene, TunnelScene } from "@/components/three/scenes";
import { clients, offices, platforms, projects, services, stats } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-signal/8 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pt-28 pb-10 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:pt-32 lg:pb-16">
          <Reveal>
            <p
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-1.5 text-xs text-mist"
            >
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-alert" />
              Live across Doha · Riyadh · the GCC — since 2000
            </p>
            <h1
              data-reveal
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl"
            >
              The intelligence layer for <span className="text-gradient">modern roads</span>
            </h1>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              Traffic Tech (Gulf) engineers the systems that keep cities moving — adaptive
              signals, ITS, AI traffic intelligence and live digital twins, unified in one
              traffic management platform.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/solutions"
                className="btn-brand rounded-full px-6 py-3 text-sm font-bold"
              >
                Explore our platforms
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-frost transition hover:border-signal/60 hover:text-signal"
              >
                Products &amp; services
              </Link>
            </div>
            <div data-reveal className="mt-10 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-frost">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-mist">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative">
            <div className="h-[420px] sm:h-[500px] lg:h-[580px]">
              <HeroCityScene />
            </div>
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-line/70 bg-night/70 px-4 py-1.5 text-[11px] tracking-wide text-mist backdrop-blur">
              drag to orbit · scroll to zoom · hover a building
            </p>
          </div>
        </div>
        <div className="hazard-stripe h-1.5 w-full opacity-70" />
      </section>

      {/* --------------------------- Trusted by --------------------------- */}
      <section className="border-b border-line/50 bg-abyss/60">
        <Reveal className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p
            data-reveal
            className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-mist/70"
          >
            Trusted by the region&apos;s builders
          </p>
          <div
            data-reveal
            className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {clients.map((c) => (
              <span key={c} className="font-display text-sm font-medium text-mist/80">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ------------------------- Platform trio -------------------------- */}
      <section className="relative py-24">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            kicker="New — Platform offerings"
            title="One network. One brain. One twin."
            text="Twenty-five years of field engineering, now unified into a software-defined mobility stack: UTMS to run the network, AI to make it smarter every day, and a digital twin to test tomorrow before it happens."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {platforms.map((p) => (
              <PlatformCard key={p.slug} platform={p} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* --------------------------- Live tunnel -------------------------- */}
      {/* Fixed dark backdrop: the tunnel is a night scene in both themes,
          and the overlay text must stay readable before the canvas loads. */}
      <section className="relative border-y border-line/50 bg-[#0a0d11]">
        <LazyScene className="relative h-[70vh] min-h-[480px]">
          <div className="absolute inset-0">
            <TunnelScene />
          </div>
        </LazyScene>
        {/* The tunnel scene is always dark, so this overlay keeps fixed
            light-on-dark colours in both themes. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0d11]/90 via-[#0a0d11]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-5 lg:px-8">
            <div className="max-w-md">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe718]">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#ff3543]" />
                Live network · 24/7
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#eef1f4] sm:text-4xl">
                Inside the network, around the clock
              </h2>
              <p className="mt-4 leading-relaxed text-[#c3cad2]">
                Tunnels, expressways and interchanges — monitored, ventilated, signed and kept
                flowing by our control rooms and O&amp;M crews. We operate the ITS backbone of
                Qatar&apos;s strategic highway network, every hour of every day.
              </p>
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="font-display text-2xl font-semibold text-[#ffe718]">
                    <Counter value={11} />
                  </p>
                  <p className="text-xs text-[#c3cad2]">weigh stations operated</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-[#ffe718]">24/7</p>
                  <p className="text-xs text-[#c3cad2]">control-room operations</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-[#ffe718]">
                    <Counter value={99} suffix="%" />
                  </p>
                  <p className="text-xs text-[#c3cad2]">asset availability targets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------- Services grid ------------------------- */}
      <section className="bg-abyss/40 py-24">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="What we do"
              title="Field-proven products & services"
              text="Design, supply, integration, commissioning, operation and after-sales — a total-solutions scope covering every system on and above the road."
            />
            <Link
              data-reveal
              href="/services"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-frost transition hover:border-signal/60 hover:text-signal"
            >
              All 14 service lines →
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s) => (
              <Link
                key={s.slug}
                data-reveal
                href={`/services#${s.slug}`}
                className="group rounded-xl border border-line/70 bg-panel p-5 transition hover:border-signal/50 hover:bg-panel-2"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-night text-signal">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug text-frost">
                  {s.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-mist">{s.short}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ----------------------------- Globe ------------------------------ */}
      <section className="relative overflow-hidden border-y border-line/50">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <Reveal className="py-16 lg:py-24">
            <SectionHeading
              kicker="Where we operate"
              title="Rooted in Doha. Wired across the Gulf."
              text="An approved PWA (Ashghal) and QatarEnergy contractor, serving Qatar, the UAE, Kuwait, Bahrain, Saudi Arabia and Oman — with corporate offices in Doha and Riyadh."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {offices.map((o) => (
                <div key={o.country} data-reveal className="rounded-xl border border-line/70 bg-panel p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal">
                    {o.country}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-frost">{o.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{o.lines[0]}</p>
                  <p className="mt-2 text-xs text-mist">{o.phone}</p>
                </div>
              ))}
            </div>
            <p data-reveal className="mt-6 text-xs text-mist/70">
              drag to spin · scroll to zoom
            </p>
          </Reveal>
          <LazyScene className="h-[420px] sm:h-[520px] lg:h-[640px]">
            <GlobeScene />
          </LazyScene>
        </div>
      </section>

      {/* ------------------------ Featured projects ----------------------- */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="Track record"
              title="Built into the Gulf's landmark infrastructure"
              text="From the Lusail Expressway to citywide adaptive signals, our systems run some of the region's most demanding corridors."
            />
            <Link
              data-reveal
              href="/projects"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-frost transition hover:border-signal/60 hover:text-signal"
            >
              View all projects →
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((p) => (
              <article
                key={p.name}
                data-reveal
                className="rounded-xl border border-line/70 bg-panel p-6 transition hover:border-signal/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-line bg-night px-3 py-1 text-[11px] font-medium text-signal">
                    {p.category}
                  </span>
                  <span className="text-xs text-mist/70">{p.year}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-frost">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.scope}</p>
                <p className="mt-4 text-xs text-mist/70">Client · {p.client}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ------------------------------ Awards ----------------------------- */}
      <section className="border-t border-line/50 bg-abyss/40 py-20">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            kicker="Awards & recognition"
            title="A shelf that keeps getting heavier"
            text="Platinum safety awards from QatarEnergy, partner-of-the-year honours, and innovation awards stretching back a decade."
            align="center"
          />
        </Reveal>
        <div className="mt-12">
          <AwardsMarquee />
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------- */}
      <section className="relative overflow-hidden border-t border-line/50 py-24">
        <div className="absolute inset-0 grid-bg" />
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2
            data-reveal
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Let&apos;s move your city <span className="text-gradient">forward</span>
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-xl leading-relaxed text-mist">
            Whether it&apos;s a single intersection or a national UTMS rollout, our engineers are
            ready to scope it with you.
          </p>
          <div data-reveal className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="btn-brand rounded-full px-7 py-3 text-sm font-bold"
            >
              Start a conversation
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-frost transition hover:border-signal/60 hover:text-signal"
            >
              About Traffic Tech
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
