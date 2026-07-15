import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-16 text-center">
      <div className="flex gap-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-red-400/90" />
        <span className="h-3 w-3 rounded-full bg-amberglow" />
        <span className="h-3 w-3 rounded-full bg-line" />
      </div>
      <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight">Red light.</h1>
      <p className="mt-4 max-w-md text-mist">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 btn-brand rounded-full px-6 py-3 text-sm font-semibold"
      >
        Back to the home page
      </Link>
    </section>
  );
}
