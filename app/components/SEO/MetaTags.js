"use client";

import Head from "next/head";

export default function MetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const fullTitle = title ? `${title} | Online Code Compiler` : "Online Code Compiler";
  const fullDescription = description || "Write, compile, and run code online in multiple languages";
  const fullImage = image || `${siteUrl}/og-image.png`;
  const fullUrl = url || siteUrl;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullImage} />
    </Head>
  );
}

