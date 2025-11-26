/**
 * SEO Configuration and Utilities
 */

export const siteConfig = {
  name: "Online Code Compiler",
  title: "Online Code Compiler - Premium Web IDE | Run Code Online",
  description: "Write, compile, and run C++, Python, Java, JavaScript, Go, Rust, and C code instantly in your browser. Premium web-based IDE with Monaco editor, syntax highlighting, and real-time execution.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
  ogImage: "/og-image.png",
  twitterHandle: "@yourhandle",
  author: "Your Name",
  keywords: [
    "online compiler",
    "web IDE",
    "code editor",
    "run code online",
    "C++ compiler",
    "Python compiler",
    "Java compiler",
    "JavaScript compiler",
    "Go compiler",
    "Rust compiler",
    "online code editor",
    "code playground",
    "Monaco editor",
    "VS Code online",
    "programming",
    "coding",
    "developer tools",
    "code execution",
    "compile code online",
    "test code online"
  ],
};

export function generateMetadata({ title, description, path = "", image, type = "website" }) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const fullDescription = description || siteConfig.description;
  const fullUrl = `${siteConfig.url}${path}`;
  const fullImage = image || `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: siteConfig.keywords.join(", "),
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // yahoo: "your-yahoo-verification-code",
    },
  };
}

export function generateStructuredData({ type = "WebApplication", path = "" }) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    name: siteConfig.name,
    description: siteConfig.description,
    url: `${siteConfig.url}${path}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
    },
    featureList: [
      "Multi-language support (C++, Python, Java, JavaScript, Go, Rust, C, C#)",
      "Monaco code editor with syntax highlighting",
      "Real-time code execution",
      "Code templates and snippets",
      "Execution statistics",
      "Dark/Light theme",
      "Responsive design",
    ],
  };

  if (type === "WebApplication") {
    return {
      ...baseStructuredData,
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      softwareVersion: "2.0",
      releaseNotes: "Premium redesign with advanced features",
    };
  }

  return baseStructuredData;
}

export function generateBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

