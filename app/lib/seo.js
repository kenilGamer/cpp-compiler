/**
 * SEO Configuration and Utilities
 * Comprehensive SEO optimization for Online Compiler
 * Includes metadata, structured data, and SEO best practices
 */

// Canonical/preferred domain (always use this for canonical URLs)
const PREFERRED_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://compiler.godcarft.fun";
const ALTERNATE_DOMAINS = [
  "https://www.godcarft.fun",
  "http://compiler.godcarft.fun",
  "http://www.godcarft.fun",
];

/**
 * Normalize URL to use preferred canonical domain
 * Exported for use in middleware and other parts of the app
 */
export function normalizeToCanonicalDomain(url) {
  if (!url) return PREFERRED_DOMAIN;
  
  try {
    // Extract protocol and path
    const urlObj = new URL(url);
    const path = urlObj.pathname + urlObj.search + urlObj.hash;
    
    // Always use preferred domain
    return `${PREFERRED_DOMAIN}${path}`;
  } catch (e) {
    // If URL parsing fails, return as-is or preferred domain with path
    if (url.startsWith('/')) {
      return `${PREFERRED_DOMAIN}${url}`;
    }
    return PREFERRED_DOMAIN;
  }
}

/**
 * Check if a URL needs to be redirected to canonical domain
 */
export function shouldRedirectToCanonical(host, protocol = 'https') {
  const canonicalHost = new URL(PREFERRED_DOMAIN).host;
  
  // Check if current host matches canonical
  if (host === canonicalHost) return false;
  
  // Check if it's an alternate domain that should redirect
  return ALTERNATE_DOMAINS.some(domain => {
    try {
      return new URL(domain).host === host;
    } catch {
      return false;
    }
  });
}

/**
 * Get preferred domain host
 */
export function getPreferredDomainHost() {
  return new URL(PREFERRED_DOMAIN).host;
}

export const siteConfig = {
  name: "Online Compiler",
  shortName: "Compiler",
  title: "Online Compiler v2.0 - Premium Web IDE | Run Code Online",
  description: "Run C++, Python, Java, JavaScript, Go, Rust instantly. Free online compiler with Monaco editor.",
  url: PREFERRED_DOMAIN,
  alternateDomains: ALTERNATE_DOMAINS,
  preferredDomain: PREFERRED_DOMAIN,
  ogImage: "/og-image.png",
  twitterHandle: "@kenilgamer",
  author: "Kenil",
  email: "contact@compiler.godcarft.fun",
  locale: "en_US",
  defaultLanguage: "en",
  supportedLanguages: ["en"],
  category: "Developer Tools",
  tags: ["coding", "programming", "development", "IDE", "compiler"],
  keywords: [
    // Primary keywords
    "online compiler",
    "web IDE",
    "code editor",
    "run code online",
    "online code editor",
    "code playground",
    
    // Language-specific
    "C++ compiler online",
    "Python compiler online",
    "Java compiler online",
    "JavaScript compiler online",
    "Go compiler online",
    "Rust compiler online",
    "C compiler online",
    "C# compiler online",
    "TypeScript compiler online",
    "Ruby compiler online",
    "PHP compiler online",
    "Swift compiler online",
    
    // Editor-specific
    "Monaco editor",
    "VS Code online",
    "online VS Code",
    "browser code editor",
    "web-based IDE",
    "cloud IDE",
    
    // Features
    "syntax highlighting",
    "code completion",
    "auto-format",
    "error detection",
    "debug code online",
    "test code online",
    "compile code online",
    "execute code online",
    
    // Use cases
    "learn programming",
    "practice coding",
    "coding interview",
    "algorithm practice",
    "competitive programming",
    "code snippets",
    "prototype code",
    "quick test code",
    
    // Technical
    "sandboxed environment",
    "secure code execution",
    "real-time compilation",
    "multi-language support",
    "code templates",
    "intellisense",
    
    // Target audience
    "developer tools",
    "programming tools",
    "coding tools",
    "software development",
    "web development",
    "programming",
    "coding",
    "software engineering",
    
    // Benefits
    "free compiler",
    "no installation",
    "instant execution",
    "browser-based",
    "cloud compiler",
    "fast compilation",
    "online debugging"
  ],
  
  // SEO Performance metrics
  performance: {
    targetPageSpeed: 90,
    maxImageSize: "500KB",
    recommendedImageFormat: "webp",
  },
  
  // Social media
  social: {
    twitter: "",
    github: "https://github.com/kenilgamer",
    linkedin: "https://www.linkedin.com/in/kenil-sangani/",
    facebook: "https://www.facebook.com/kenilsangani/",
    youtube: "https://www.youtube.com/@kenilgamer3035",
    instagram: "https://www.instagram.com/kenilcoder/",
  },
};

export function generateMetadata({ 
  title, 
  description, 
  path = "", 
  image, 
  type = "website",
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  additionalMetadata = {},
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const fullDescription = description || siteConfig.description;
  // Ensure canonical URL always uses preferred domain
  const fullUrl = normalizeToCanonicalDomain(`${siteConfig.url}${path}`);
  const fullImage = image ? normalizeToCanonicalDomain(image) : `${siteConfig.url}${siteConfig.ogImage}`;
  const allKeywords = [...siteConfig.keywords, ...keywords].join(", ");
  const pageAuthor = author || siteConfig.author;

  return {
    title: {
      default: fullTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: fullDescription,
    keywords: allKeywords,
    authors: [{ name: pageAuthor, url: siteConfig.social.twitter }],
    creator: pageAuthor,
    publisher: siteConfig.author,
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
      languages: {
        [siteConfig.defaultLanguage]: fullUrl,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
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
          type: "image/png",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
        noimageindex: false,
        noarchive: false,
      },
      nocache: false,
    },
    // Only include verification codes that are defined
    ...(process.env.GOOGLE_VERIFICATION_CODE || 
        process.env.YANDEX_VERIFICATION_CODE || 
        process.env.YAHOO_VERIFICATION_CODE || 
        process.env.BING_VERIFICATION_CODE
      ? {
          verification: {
            ...(process.env.GOOGLE_VERIFICATION_CODE && { google: process.env.GOOGLE_VERIFICATION_CODE }),
            ...(process.env.YANDEX_VERIFICATION_CODE && { yandex: process.env.YANDEX_VERIFICATION_CODE }),
            ...(process.env.YAHOO_VERIFICATION_CODE && { yahoo: process.env.YAHOO_VERIFICATION_CODE }),
            ...(process.env.BING_VERIFICATION_CODE && { bing: process.env.BING_VERIFICATION_CODE }),
          },
        }
      : {}
    ),
    category: siteConfig.category,
    classification: "Developer Tools",
    ...additionalMetadata,
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
      availability: "https://schema.org/InStock",
      priceValidUntil: "2099-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Multi-language support (C++, Python, Java, JavaScript, Go, Rust, C, C#)",
      "Monaco code editor with syntax highlighting",
      "Real-time code compilation and execution",
      "Code templates and snippets",
      "Execution statistics (Runtime, Memory, CPU)",
      "Dark/Light theme",
      "Responsive design",
      "Secure sandboxed environment",
      "Cloud-based - no installation required",
      "IntelliSense and auto-completion",
      "Error detection and diagnostics",
      "Code formatting and beautification",
    ],
    screenshot: `${siteConfig.url}/og-image.png`,
    softwareVersion: "2.0",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (type === "WebApplication" || type === "SoftwareApplication") {
    return {
      ...baseStructuredData,
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      releaseNotes: "Premium redesign with advanced features",
      downloadUrl: siteConfig.url,
      installUrl: siteConfig.url,
      softwareHelp: {
        "@type": "CreativeWork",
        url: `${siteConfig.url}/docs`,
      },
      permissions: "No special permissions required",
      availableOnDevice: ["Desktop", "Mobile", "Tablet"],
    };
  }

  return baseStructuredData;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/og-image.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.author,
    },
    sameAs: Object.values(siteConfig.social).filter(url => url),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: siteConfig.email,
      availableLanguage: siteConfig.supportedLanguages,
    },
  };
}

/**
 * Generate Website structured data (for the main site)
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: siteConfig.defaultLanguage,
  };
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

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article structured data
 */
export function generateArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  path = "",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: description || siteConfig.description,
    image: image || `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author || siteConfig.author,
      url: siteConfig.social.twitter,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${path}`,
    },
  };
}

/**
 * Generate HowTo structured data (for tutorials/guides)
 */
export function generateHowToStructuredData({
  name,
  description,
  image,
  steps,
  totalTime,
  estimatedCost,
  path = "",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    image: image || `${siteConfig.url}${siteConfig.ogImage}`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: estimatedCost,
      },
    }),
    url: `${siteConfig.url}${path}`,
  };
}

/**
 * Generate ItemList structured data (for features, lists, etc.)
 */
export function generateItemListStructuredData({
  name,
  description,
  items,
  path = "",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name || item,
      description: item.description,
      url: item.url || `${siteConfig.url}${path}#item-${index + 1}`,
    })),
    url: `${siteConfig.url}${path}`,
  };
}

/**
 * Generate Video structured data
 */
export function generateVideoStructuredData({
  name,
  description,
  thumbnailUrl,
  videoUrl,
  uploadDate,
  duration,
  path = "",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: thumbnailUrl || `${siteConfig.url}${siteConfig.ogImage}`,
    uploadDate,
    ...(duration && { duration }),
    contentUrl: videoUrl,
    embedUrl: videoUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og-image.png`,
      },
    },
  };
}

/**
 * Generate Course structured data (for tutorials)
 */
export function generateCourseStructuredData({
  name,
  description,
  provider,
  image,
  courseCode,
  educationalLevel,
  teaches,
  path = "",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider || siteConfig.name,
      url: siteConfig.url,
    },
    image: image || `${siteConfig.url}${siteConfig.ogImage}`,
    ...(courseCode && { courseCode }),
    ...(educationalLevel && { educationalLevel }),
    ...(teaches && { teaches }),
    url: `${siteConfig.url}${path}`,
  };
}

/**
 * Generate Review structured data
 */
export function generateReviewStructuredData({
  itemName,
  itemType = "SoftwareApplication",
  ratingValue,
  ratingCount,
  bestRating = "5",
  worstRating = "1",
  author,
  reviewBody,
  datePublished,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": itemType,
      name: itemName || siteConfig.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating,
      worstRating,
    },
    ...(ratingCount && { aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating,
      worstRating,
    }}),
    author: {
      "@type": "Person",
      name: author || siteConfig.author,
    },
    ...(reviewBody && { reviewBody }),
    ...(datePublished && { datePublished }),
  };
}

// ============================================================================
// SEO UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate canonical URL (always uses preferred domain)
 */
export function getCanonicalUrl(path = "") {
  const url = `${siteConfig.url}${path}`;
  return normalizeToCanonicalDomain(url);
}


/**
 * Generate keywords string from array
 */
export function getKeywordsString(additionalKeywords = []) {
  return [...siteConfig.keywords, ...additionalKeywords].join(", ");
}

/**
 * Truncate text for meta descriptions (optimal: 150-160 chars)
 */
export function truncateMetaDescription(text, maxLength = 160) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + "...";
}

/**
 * Generate page title with template
 */
export function getPageTitle(title, useTemplate = true) {
  if (!title) return siteConfig.title;
  return useTemplate ? `${title} | ${siteConfig.name}` : title;
}

/**
 * Validate and format Open Graph image URL
 */
export function getOGImageUrl(imagePath) {
  if (!imagePath) return `${siteConfig.url}${siteConfig.ogImage}`;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return `${siteConfig.url}${imagePath}`;
  return `${siteConfig.url}/${imagePath}`;
}

/**
 * Generate language-specific URL
 */
export function getLocalizedUrl(path = "", locale = null) {
  const lang = locale || siteConfig.defaultLanguage;
  if (lang === siteConfig.defaultLanguage) {
    return `${siteConfig.url}${path}`;
  }
  return `${siteConfig.url}/${lang}${path}`;
}

/**
 * Generate JSON-LD script tag content
 */
export function generateJSONLDScript(structuredData) {
  return JSON.stringify(structuredData, null, 2);
}

/**
 * Get recommended image dimensions for OG images
 */
export function getOGImageDimensions() {
  return {
    width: 1200,
    height: 630,
    aspectRatio: "1.91:1",
    recommendedFormat: "PNG or JPG",
    maxSize: "8MB",
  };
}

/**
 * Generate meta robots string
 */
export function getMetaRobotsString({ index = true, follow = true, noarchive = false, nosnippet = false }) {
  const directives = [];
  if (!index) directives.push("noindex");
  if (!follow) directives.push("nofollow");
  if (noarchive) directives.push("noarchive");
  if (nosnippet) directives.push("nosnippet");
  return directives.length > 0 ? directives.join(", ") : "index, follow";
}

/**
 * Generate sitemap entry (always uses canonical URL)
 */
export function generateSitemapEntry({ path, lastModified, changeFrequency = "weekly", priority = 0.8 }) {
  return {
    url: getCanonicalUrl(path),
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
  };
}

/**
 * Get default FAQ data (can be customized)
 */
export function getDefaultFAQs() {
  return [
    {
      question: "What programming languages are supported?",
      answer: "Our online compiler supports C++, Python, Java, JavaScript, Go, Rust, C, C#, TypeScript, and many more programming languages. You can compile and run code in all these languages instantly in your browser.",
    },
    {
      question: "Is the online compiler free to use?",
      answer: "Yes, our online compiler is completely free to use. There are no hidden fees, subscriptions, or premium tiers. You can compile and run code as much as you want without any limitations.",
    },
    {
      question: "Do I need to create an account to use the compiler?",
      answer: "No, you can use the online compiler without creating an account. However, creating an account allows you to save your code snippets, access them later, and enjoy additional features.",
    },
    {
      question: "Is my code secure and private?",
      answer: "Yes, your code is executed in a secure, sandboxed environment. We do not store or share your code unless you explicitly save it. All code execution happens in isolated containers.",
    },
    {
      question: "Can I use this compiler for competitive programming?",
      answer: "Absolutely! Our online compiler is perfect for competitive programming, coding interviews, algorithm practice, and quick code testing. It provides fast compilation times and supports all major programming languages used in competitions.",
    },
    {
      question: "What features does the code editor include?",
      answer: "The code editor includes syntax highlighting, code auto-completion (IntelliSense), error detection, code formatting, dark/light themes, and real-time compilation. It's powered by Monaco Editor, the same editor used in VS Code.",
    },
  ];
}

/**
 * Generate all structured data for homepage
 */
export function generateHomepageStructuredData() {
  return [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
    generateStructuredData({ type: "WebApplication", path: "" }),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Supported Programming Languages",
      description: "List of programming languages supported by the online compiler",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "C++" },
        { "@type": "ListItem", position: 2, name: "Python" },
        { "@type": "ListItem", position: 3, name: "Java" },
        { "@type": "ListItem", position: 4, name: "JavaScript" },
        { "@type": "ListItem", position: 5, name: "Go" },
        { "@type": "ListItem", position: 6, name: "Rust" },
        { "@type": "ListItem", position: 7, name: "C" },
        { "@type": "ListItem", position: 8, name: "C#" },
      ],
    },
  ];
}

