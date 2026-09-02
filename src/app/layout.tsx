import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qais Yousuf — Software Engineer",
  description:
    "Software engineer building SaaS platforms, digital products and business systems for Nordic and European companies.",
  applicationName: "Qais Yousuf Portfolio",
  authors: [{ name: "Qais Yousuf" }],
  creator: "Qais Yousuf",
  keywords: ["software engineer", "SaaS", "Next.js", ".NET", "Nordic", "Denmark"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${dmMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
