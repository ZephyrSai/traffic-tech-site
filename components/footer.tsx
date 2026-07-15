import Link from "next/link";
import { Logo } from "@/components/logo";
import { company, nav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-abyss">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            {company.description}
          </p>
          <p className="mt-4 text-xs text-mist/70">
            Approved PWA (Ashghal) &amp; QatarEnergy contractor · ISO certified
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-frost">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-mist transition hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-frost">
            Head Office
          </h3>
          <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-mist">
            <p>6th Floor, Buzwair Building 53</p>
            <p>Rawdat Al Khail Street 330</p>
            <p>P.O. Box 30704, Doha, Qatar</p>
            <p className="pt-2">
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-signal">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-signal">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-line/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-mist/70 sm:flex-row lg:px-8">
          <p>
            © 2000–2026 {company.legalName} All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
            Serving Qatar · UAE · Kuwait · Bahrain · KSA · Oman
          </p>
        </div>
      </div>
    </footer>
  );
}
