"use client";

import dynamic from "next/dynamic";

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-signal" />
    </div>
  );
}

export const HeroCityScene = dynamic(
  () => import("./hero-city").then((m) => m.HeroCity),
  { ssr: false, loading: Loading },
);

export const GlobeScene = dynamic(() => import("./globe").then((m) => m.Globe), {
  ssr: false,
  loading: Loading,
});

export const TunnelScene = dynamic(() => import("./tunnel").then((m) => m.Tunnel), {
  ssr: false,
  loading: Loading,
});
