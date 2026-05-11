import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import { StructuredData } from "@/components/structured-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://archmetrics.app"),
  title: { default: "ArchMetrics — Architecture Calculators for Technical Design", template: "%s | ArchMetrics" },
  description: "Premium architecture calculators with real-time validation, diagrams, NBR 9050 accessibility checks, and export-ready technical outputs.",
  keywords: ["architecture calculator", "stair calculator", "ramp calculator", "NBR 9050", "architectural scale converter"],
  openGraph: {
    title: "ArchMetrics — Premium Architecture Calculators",
    description: "Professional stair, ramp, scale, built-area, and parking calculators for modern design teams.",
    url: "https://archmetrics.app",
    siteName: "ArchMetrics",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "ArchMetrics", description: "Professional architecture calculations with live technical diagrams." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background bg-radial-grid [background-size:100%_100%,100%_100%,48px_48px,48px_48px]">
            <StructuredData />
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
