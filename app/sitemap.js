import { siteConfig, generateSitemapEntry } from './lib/seo';

export default function sitemap() {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const routes = [
    // High priority pages
    generateSitemapEntry({
      path: '',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    }),
    
    // Main feature pages
    generateSitemapEntry({
      path: '/editor',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    }),
    
    generateSitemapEntry({
      path: '/sql',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    
    // Documentation
    generateSitemapEntry({
      path: '/docs',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    
    // User pages (lower priority, but still indexable)
    generateSitemapEntry({
      path: '/login',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
    
    generateSitemapEntry({
      path: '/signup',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
  ];

  return routes;
}

