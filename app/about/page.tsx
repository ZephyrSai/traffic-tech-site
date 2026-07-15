import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { SectionHeading } from "@/components/section-heading";
import { awards } from "@/components/awards-marquee";
import { milestones, stats } from "@/lib/data";
import ceoPhoto from "@/public/images/photos/ceo.jpg";
import scatsPhoto from "@/public/images/photos/scats-training.jpg";
import gitexPhoto from "@/public/images/photos/gitex.jpg";
import evPhoto from "@/public/images/photos/ev-lusail-marina.jpg";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in Doha in 2000, Traffic Tech (Gulf) is an award-winning, ISO-certified total solutions provider for traffic management, ITS, parking, security and communications across the GCC.",
};

const values = [
  {
    title: "Integration is the product",
    text: "Our winning formula has always been the ability to make many systems behave as one — from field cabinet to control room.",
  },
  {
    title: "Safety before schedule",
    text: "Platinum winner at the QatarEnergy 7-Star Safety Awards. Our IMS policy governs quality, health, safety and environment in everything we deliver.",
  },
  {
    title: "Own the full lifecycle",
    text: "Design, supply, installation, commissioning, then years of operation and maintenance. We stay accountable long after handover.",
  },
  {
    title: "Engineer for the region",
    text: "GCC plates, Gulf summers, World-Cup-scale peaks — our systems are built and proven for the realities of this region.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/50">
        <div className="grid-bg absolute inset-0" />
        <Reveal className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 lg:px-8">
          <SectionHeading
            kicker="Who we are"
            title="Twenty-five years of keeping the Gulf moving"
            text="Traffic Tech (Gulf) W.L.L. is an award-winning, ISO-certified total solutions provider of integrated systems in traffic management, intelligent transportation, parking, security, communications and truck weigh stations."
          />
          <div data-reveal className="mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-line/70 bg-panel p-4">
                <p className="font-display text-2xl font-semibold text-frost">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-mist">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="py-20">
        <Reveal className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              kicker="Our story"
              title="From Doha, for the region"
              text=""
            />
            <div className="mt-6 space-y-4 leading-relaxed text-mist">
              <p data-reveal>
                Founded in 2000 in Doha, Traffic Tech grew from deep expertise in traffic
                engineering into a leading systems integrator serving Qatar, the UAE, Kuwait,
                Bahrain, Saudi Arabia and Oman. We are an approved Public Works Authority
                (Ashghal) and QatarEnergy contractor for traffic signals, general traffic works
                and traffic data collection.
              </p>
              <p data-reveal>
                Over two and a half decades we have developed core engineering, system
                integration, contracting and service capabilities — earning a leading role in the
                infrastructure that carried Qatar through its National Vision 2030 build-out and
                the FIFA World Cup.
              </p>
              <p data-reveal>
                Today, that field-proven foundation powers our next chapter: AI traffic
                intelligence, network digital twins and the UTMS platform — developed with
                partners like Qatar University, where we support advanced traffic-safety
                research.
              </p>
            </div>
          </div>

          <div data-reveal className="card-glow h-fit rounded-2xl border border-line/70 bg-panel p-8">
            <div className="flex items-center gap-4">
              <Image
                src={ceoPhoto}
                alt="Abdel Rahman Al Khateeb, CEO of Traffic Tech (Gulf)"
                className="h-16 w-16 rounded-full border border-line object-cover"
                sizes="64px"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
                Message from the CEO
              </p>
            </div>
            <blockquote className="mt-4 space-y-4 leading-relaxed text-frost/90">
              <p>
                &ldquo;The strength of Traffic Tech is in the integration of solutions — from top
                level to operations — to deliver timely, quality results to our clients.
              </p>
              <p>
                With vast experience across the Middle East, an expanding client portfolio and an
                expert pool of employees, we look forward to continuing to provide high-quality
                service in ITS, parking management, security systems, communications and traffic
                control.&rdquo;
              </p>
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-frost">Abdel Rahman Al Khateeb</p>
            <p className="text-xs text-mist">Chief Executive Officer</p>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line/50 bg-abyss/40 py-20">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading kicker="How we work" title="The principles behind 2,000 projects" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} data-reveal className="rounded-xl border border-line/70 bg-panel p-6">
                <h3 className="font-display text-base font-semibold text-frost">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{v.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="py-20">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            kicker="Awards & recognition"
            title="Recognised, year after year"
            text="From platinum safety awards to partner-of-the-year honours — recognition earned in the field."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((a) => (
              <figure
                key={`${a.title}-${a.year}`}
                data-reveal
                className="rounded-xl border border-line/70 bg-panel p-4"
              >
                <div className="relative h-36 overflow-hidden rounded-lg bg-abyss">
                  <Image
                    src={a.img}
                    alt={`${a.title} — ${a.issuer} (${a.year})`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-sm font-semibold leading-snug text-frost">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs text-mist">
                    {a.issuer} · <span className="text-signal">{a.year}</span>
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line/50 bg-abyss/40 py-20">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading kicker="In the field" title="Where the work happens" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                img: scatsPhoto,
                alt: "SCATS operator training course, Doha 2023",
                cap: "SCATS operator training — Doha, 2023",
              },
              {
                img: gitexPhoto,
                alt: "Traffic Tech at GITEX Global 2023",
                cap: "Showcasing SmartANPR at GITEX Global",
              },
              {
                img: evPhoto,
                alt: "EV charging station at Lusail Marina",
                cap: "EV charging rollout — Lusail Marina",
              },
            ].map((p) => (
              <figure key={p.cap} data-reveal className="overflow-hidden rounded-xl border border-line/70">
                <div className="relative h-56">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="bg-panel px-4 py-3 text-xs text-mist">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="py-20">
        <Reveal className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading kicker="Milestones" title="A timeline of trust" align="center" />
          <ol className="relative mt-12 space-y-10 border-l border-line/70 pl-8">
            {milestones.map((m) => (
              <li key={m.year} data-reveal className="relative">
                <span className="absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-signal/15" />
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-signal">
                  {m.year}
                </p>
                <p className="mt-1.5 leading-relaxed text-mist">{m.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
    </>
  );
}
