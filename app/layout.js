import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";
import Header from "@/app/components/Header";
import { generateMetadata as genMeta, generateStructuredData, siteConfig } from "./lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  ...genMeta({
    title: "Premium Web IDE | Run Code Online",
    description: "Write, compile, and run C++, Python, Java, JavaScript, Go, Rust, and C code instantly in your browser. Premium web-based IDE with Monaco editor, syntax highlighting, and real-time execution.",
  }),
  // Additional metadata
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#0a0a0a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const structuredData = generateStructuredData({ type: "WebApplication" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body cz-shortcut-listen="true"
        className={`${inter.variable} antialiased`}
        style={{ backgroundColor: '#0a0a0a', color: '#e5e5e5' }}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
