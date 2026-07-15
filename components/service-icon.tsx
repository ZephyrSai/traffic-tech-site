const paths: Record<string, React.ReactNode> = {
  signals: (
    <>
      <rect x="9" y="3" width="6" height="14" rx="2" />
      <circle cx="12" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 17v4M8 21h8" />
    </>
  ),
  its: (
    <>
      <path d="M3 17c4-1 7-6 9-6s5 5 9 6" />
      <path d="M3 12h4M17 12h4M3 7c3 0 5 2 7 2" />
      <circle cx="12" cy="5" r="2" />
    </>
  ),
  anpr: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <path d="M7 12h.01M11 12h2M17 12h.01" />
      <path d="M5 4l2 2M19 4l-2 2" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
    </>
  ),
  wim: (
    <>
      <path d="M4 16h16M6 16v3M18 16v3" />
      <rect x="7" y="7" width="10" height="6" rx="1.5" />
      <path d="M9 13v3M15 13v3" />
    </>
  ),
  ev: (
    <>
      <rect x="5" y="4" width="10" height="16" rx="2" />
      <path d="M10 8l-2 4h3l-2 4" />
      <path d="M15 9h2a2 2 0 0 1 2 2v5" />
    </>
  ),
  security: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  comms: (
    <>
      <path d="M12 20v-6" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M8.5 8.5a5 5 0 0 1 7 0M6 6a8.5 8.5 0 0 1 12 0" />
    </>
  ),
  enforcement: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  scada: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M6 13l3-3 2.5 2.5L15 9l3 3" />
      <path d="M9 21h6" />
    </>
  ),
  data: (
    <>
      <path d="M4 19V9M9 19V5M14 19v-8M19 19V7" />
      <path d="M3 21h18" />
    </>
  ),
  signs: (
    <>
      <path d="M12 21V8" />
      <path d="M6 4h11l2 2.5L17 9H6z" />
      <path d="M9 21h6" />
    </>
  ),
  safety: (
    <>
      <path d="M12 4l7 15H5l7-15z" />
      <path d="M9.5 13h5M8.5 16.5h7" />
    </>
  ),
  lighting: (
    <>
      <path d="M8 21V5a2 2 0 0 1 2-2h6" />
      <path d="M16 3c2.5 0 4 1.5 4 4h-8c0-2.5 1.5-4 4-4z" />
      <path d="M16 7v2M6 21h4" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.its}
    </svg>
  );
}
