import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { services } from "@/lib/data";
import evMain from "@/public/images/photos/ev-charging.jpg";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Fourteen field-proven service lines: traffic signals & UTC, ITS, ANPR, parking, weigh stations, EV charging, security, communications, SCADA & IoT, data collection, signage, safety, lighting and E&M.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/50">
        <div className="grid-bg absolute inset-0" />
        <Reveal className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 lg:px-8">
          <SectionHeading
            kicker="Products & Services"
            title="Everything the road needs, under one roof"
            text="Traffic Tech represents a select group of world-class manufacturers and integrates their systems into customised, end-to-end solutions — from design and supply to commissioning, operation and after-sales care."
          />
        </Reveal>
      </section>

      <section className="py-20">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                data-reveal
                className="group scroll-mt-24 rounded-2xl border border-line/70 bg-panel p-6 transition hover:border-signal/40 hover:bg-panel-2"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-night text-signal transition group-hover:scale-105">
                  <ServiceIcon name={s.icon} className="h-5.5 w-5.5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-frost">
                  {s.name}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{s.short}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line/50 bg-abyss/40 py-20">
        <Reveal className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div data-reveal className="relative h-72 overflow-hidden rounded-2xl border border-line/70 lg:h-96">
            <Image
              src={evMain}
              alt="Lusail City electric-vehicle charging station delivered by Traffic Tech"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              kicker="Delivered, not promised"
              title="From drawings to the street"
              text="Every service line above is backed by live references — like the citywide EV-charging network we designed, supplied and installed across Lusail City for LREDC. One team carries the project from concept design through years of operation."
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
