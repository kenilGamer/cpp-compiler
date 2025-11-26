# SEO Configuration Guide

This document outlines the SEO setup for the Online Code Compiler project.

## Overview

The project includes comprehensive SEO optimization with:
- Enhanced metadata (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration
- SEO utilities and components

## Configuration

### 1. Site Configuration

Edit `app/lib/seo.js` to configure your site details:

```javascript
export const siteConfig = {
  name: "Online Code Compiler",
  url: "https://your-domain.com", // Update this!
  ogImage: "/og-image.png",
  twitterHandle: "@yourhandle",
  // ...
};
```

### 2. Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Update robots.txt

Edit `public/robots.txt` and `app/robots.txt` to update the sitemap URL:

```
Sitemap: https://your-domain.com/sitemap.xml
```

## Features

### Metadata

The layout automatically generates comprehensive metadata including:
- Title and description
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs
- Keywords
- Author information

### Structured Data

JSON-LD structured data is included for:
- WebApplication schema
- Breadcrumb navigation
- FAQ pages (optional)

### Sitemap

Dynamic sitemap generation at `/sitemap.xml` includes:
- Main pages
- Documentation pages
- Editor pages
- Last modified dates
- Priority and change frequency

### Robots.txt

Configured to:
- Allow all search engines
- Disallow admin/API routes
- Point to sitemap location

## Usage

### Using SEO Metadata in Pages

```javascript
import { generateMetadata } from '@/app/lib/seo';

export const metadata = generateMetadata({
  title: "Page Title",
  description: "Page description",
  path: "/page-path",
});
```

### Adding Structured Data

```javascript
import { WebApplicationStructuredData } from '@/app/components/SEO/StructuredData';

export default function Page() {
  return (
    <>
      <WebApplicationStructuredData path="/page-path" />
      {/* Your page content */}
    </>
  );
}
```

### Breadcrumbs

```javascript
import { BreadcrumbStructuredData } from '@/app/components/SEO/StructuredData';

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Docs", url: "/docs" },
  { name: "Page", url: "/docs/page" },
];

<BreadcrumbStructuredData items={breadcrumbs} />
```

## SEO Checklist

- [ ] Update `siteConfig.url` in `app/lib/seo.js`
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Update sitemap URL in `robots.txt`
- [ ] Create and add `/public/og-image.png` (1200x630px)
- [ ] Create and add `/public/apple-touch-icon.png`
- [ ] Add Google Search Console verification code
- [ ] Add Google Analytics (if needed)
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Testing

### Validate Structured Data
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### Test Social Sharing
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Check SEO
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Best Practices

1. **Unique Titles**: Each page should have a unique, descriptive title
2. **Descriptive Descriptions**: Write compelling meta descriptions (150-160 characters)
3. **Optimize Images**: Use descriptive alt text and optimize image sizes
4. **Mobile-Friendly**: Ensure responsive design (already implemented)
5. **Fast Loading**: Optimize performance (Next.js handles this)
6. **HTTPS**: Use HTTPS (required for many features)
7. **Canonical URLs**: Prevent duplicate content issues
8. **Structured Data**: Help search engines understand your content

## Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

