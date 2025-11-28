import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";
import Header from "@/app/components/Header";
import { 
  generateMetadata as genMeta, 
  generateStructuredData,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  generateJSONLDScript,
  siteConfig 
} from "./lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  ...genMeta({
    title: "Premium Web IDE | Run Code Online",
    description: "Write, compile, run C++, Python, Java, JavaScript, Go, Rust, C code instantly in your browser. Premium web IDE with Monaco editor & syntax highlighting. Free online code compiler with real-time execution.",
  }),
  // Additional metadata
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#142850" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
};

// Generate all homepage structured data
const websiteStructuredData = generateWebsiteStructuredData();
const organizationStructuredData = generateOrganizationStructuredData();
const webAppStructuredData = generateStructuredData({ type: "WebApplication" });

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.defaultLanguage} data-theme="dark" style={{ colorScheme: 'dark' }}>
      <head>
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJSONLDScript(websiteStructuredData) }}
        />
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJSONLDScript(organizationStructuredData) }}
        />
        {/* Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJSONLDScript(webAppStructuredData) }}
        />
      </head>
      <body cz-shortcut-listen="true"
        className={`${inter.variable} antialiased`}
        style={{ backgroundColor: '#142850', color: '#e5e5e5' }}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
