import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faizan - ML Case Studies",
  description: "Deep dives into production machine learning systems - FastAPI, GCP, LLMs, and Python.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oharauniversity.com"),
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
      <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    </html>
  );
}
