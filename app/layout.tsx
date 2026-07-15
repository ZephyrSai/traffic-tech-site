import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://traffic-tech.com"),
  title: {
    default: "Traffic Tech (Gulf) — Intelligent Traffic & Transportation Systems",
    template: "%s | Traffic Tech (Gulf)",
  },
  description:
    "Award-winning, ISO-certified total solutions provider for traffic management, ITS, AI traffic intelligence, digital twins, UTMS, parking, security and communications across the Arabian Gulf since 2000.",
  keywords: [
    "traffic management",
    "ITS",
    "UTMS",
    "digital twin",
    "AI traffic",
    "ANPR",
    "SCATS",
    "Qatar",
    "GCC",
  ],
  openGraph: {
    title: "Traffic Tech (Gulf) — Intelligent Traffic & Transportation Systems",
    description:
      "Unified traffic management, AI intelligence and digital twins for the roads of the Gulf.",
    url: "https://traffic-tech.com",
    siteName: "Traffic Tech (Gulf)",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Set theme class before paint: stored choice wins, else follow the OS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
