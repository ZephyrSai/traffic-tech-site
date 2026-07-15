import Image, { type StaticImageData } from "next/image";
import platinum2021 from "@/public/images/awards/platinum-2021.png";
import platinum2020 from "@/public/images/awards/platinum-2020.jpg";
import bestContract from "@/public/images/awards/best-new-contract-2022.png";
import axis from "@/public/images/awards/axis-best-project-2021.png";
import huawei from "@/public/images/awards/huawei-partner-2023.png";
import subcontractor from "@/public/images/awards/subcontractor-2014.jpg";
import innovativeIts from "@/public/images/awards/innovative-its-2014.jpg";
import quResearch from "@/public/images/awards/qu-research-2023.png";

export type Award = {
  img: StaticImageData;
  title: string;
  issuer: string;
  year: string;
};

export const awards: Award[] = [
  {
    img: platinum2021,
    title: "7-Star Safety Platinum Award",
    issuer: "QatarEnergy (MIC)",
    year: "2021",
  },
  {
    img: platinum2020,
    title: "7-Star Safety Platinum Award",
    issuer: "Qatar Petroleum (RLIC)",
    year: "2020",
  },
  {
    img: bestContract,
    title: "Best New Contract Award",
    issuer: "QatarEnergy 7-Star",
    year: "2022",
  },
  {
    img: axis,
    title: "Best Project — Intrusion Protection",
    issuer: "Axis Communications",
    year: "2021",
  },
  {
    img: huawei,
    title: "Gulf North Partner of the Year",
    issuer: "Huawei Enterprise",
    year: "2023",
  },
  {
    img: subcontractor,
    title: "GCC Sub-contractor of the Year",
    issuer: "Construction Week",
    year: "2014",
  },
  {
    img: innovativeIts,
    title: "Most Innovative ITS Implementation",
    issuer: "Gulf Traffic Awards",
    year: "2014",
  },
  {
    img: quResearch,
    title: "Traffic-Safety Research Cooperation",
    issuer: "Qatar University",
    year: "2026",
  },
];

function AwardCard({ a }: { a: Award }) {
  return (
    <figure className="w-[26rem] shrink-0 rounded-2xl border border-line/70 bg-panel p-5 transition hover:border-signal/40">
      <div className="relative h-60 overflow-hidden rounded-xl bg-abyss">
        <Image
          src={a.img}
          alt={`${a.title} — ${a.issuer} (${a.year})`}
          fill
          sizes="416px"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-4">
        <p className="font-display text-base font-semibold leading-snug text-frost">{a.title}</p>
        <p className="mt-1 text-sm text-mist">
          {a.issuer} · <span className="text-signal">{a.year}</span>
        </p>
      </figcaption>
    </figure>
  );
}

export function AwardsMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent" />
      <div className="marquee-track flex w-max gap-6">
        {[...awards, ...awards].map((a, i) => (
          <AwardCard key={i} a={a} />
        ))}
      </div>
    </div>
  );
}
