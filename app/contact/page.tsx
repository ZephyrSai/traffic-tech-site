import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { offices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Traffic Tech (Gulf) — corporate offices in Doha, Qatar and Riyadh, Saudi Arabia. Tel +974 4426 9000 · ttg@traffic-tech.com",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/50">
        <div className="grid-bg absolute inset-0" />
        <Reveal className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 lg:px-8">
          <SectionHeading
            kicker="Contact"
            title="Talk to our engineers"
            text="Submit a business enquiry online or visit one of our corporate offices. We respond within one business day."
          />
        </Reveal>
      </section>

      <section className="py-20">
        <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div data-reveal className="card-glow rounded-2xl border border-line/70 bg-panel p-7 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-frost">Send an enquiry</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            {offices.map((o) => (
              <div key={o.country} data-reveal className="rounded-2xl border border-line/70 bg-panel p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
                  {o.country}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-frost">{o.title}</h3>
                <address className="mt-3 space-y-0.5 text-sm not-italic leading-relaxed text-mist">
                  {o.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </address>
                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    <a
                      href={`tel:${o.phone.replace(/\s/g, "")}`}
                      className="text-frost transition hover:text-signal"
                    >
                      {o.phone}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${o.email}`}
                      className="text-frost transition hover:text-signal"
                    >
                      {o.email}
                    </a>
                  </p>
                  <p className="pt-1 text-xs text-mist/70">{o.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
