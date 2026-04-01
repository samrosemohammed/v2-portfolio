import type { Metadata } from "next";
import { Montserrat, Merriweather, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Navbar } from "@/components/nav-bar";

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mdsamrose.dev"),
  title: {
    default: "Mohammed Samrose | Full Stack Engineer",
    template: "%s | mdsamrose.dev",
  },
  description:
    "Portfolio of Mohammed Samrose, a full stack engineer focused on system design, clean architecture, and production-grade products.",
  keywords: [
    "Mohammed Samrose",
    "Samrose",
    "Full Stack Engineer",
    "Next.js",
    "TypeScript",
    "Software Engineer Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdsamrose.dev",
    siteName: "mdsamrose.dev",
    title: "Mohammed Samrose | Full Stack Engineer",
    description:
      "Portfolio of Mohammed Samrose, a full stack engineer focused on system design, clean architecture, and production-grade products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Samrose | Full Stack Engineer",
    description:
      "Portfolio of Mohammed Samrose, a full stack engineer focused on system design, clean architecture, and production-grade products.",
  },
  icons: {
    icon: "/assets/favicon.jpg",
    apple: "/assets/apple-touch-icon.jpg",
    shortcut: "/assets/favicon.jpg",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
