export function SectionHeading({
  kicker,
  title,
  text,
  align = "left",
}: {
  kicker: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        data-reveal
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-signal"
        style={align === "center" ? { justifyContent: "center" } : undefined}
      >
        <span className="inline-block h-px w-6 bg-signal/60" />
        {kicker}
      </p>
      <h2
        data-reveal
        className="mt-4 font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl"
      >
        {title}
      </h2>
      {text && (
        <p data-reveal className="mt-4 leading-relaxed text-mist">
          {text}
        </p>
      )}
    </div>
  );
}
