import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faizan · ML Case Studies",
  description: "Deep dives into production machine learning systems — FastAPI, GCP, LLMs, and Python.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
