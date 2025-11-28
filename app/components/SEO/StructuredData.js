"use client";

import {
  generateStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  generateArticleStructuredData,
  generateHowToStructuredData,
  generateItemListStructuredData,
  generateVideoStructuredData,
  generateCourseStructuredData,
  generateReviewStructuredData,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  generateJSONLDScript,
} from "@/app/lib/seo";

/**
 * Generic structured data component
 */
function StructuredDataScript({ data }) {
  if (!data) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateJSONLDScript(data) }}
    />
  );
}

/**
 * WebApplication structured data
 */
export function WebApplicationStructuredData({ path = "" }) {
  const structuredData = generateStructuredData({ type: "WebApplication", path });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Organization structured data
 */
export function OrganizationStructuredData() {
  const structuredData = generateOrganizationStructuredData();
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Website structured data
 */
export function WebsiteStructuredData() {
  const structuredData = generateWebsiteStructuredData();
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Breadcrumb structured data
 */
export function BreadcrumbStructuredData({ items }) {
  if (!items || items.length === 0) return null;
  const structuredData = generateBreadcrumbStructuredData(items);
  return <StructuredDataScript data={structuredData} />;
}

/**
 * FAQ structured data
 */
export function FAQStructuredData({ faqs }) {
  if (!faqs || faqs.length === 0) return null;
  const structuredData = generateFAQStructuredData(faqs);
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Article structured data
 */
export function ArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  path = "",
}) {
  const structuredData = generateArticleStructuredData({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    path,
  });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * HowTo structured data (for tutorials/guides)
 */
export function HowToStructuredData({
  name,
  description,
  image,
  steps,
  totalTime,
  estimatedCost,
  path = "",
}) {
  if (!steps || steps.length === 0) return null;
  const structuredData = generateHowToStructuredData({
    name,
    description,
    image,
    steps,
    totalTime,
    estimatedCost,
    path,
  });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * ItemList structured data (for features, lists, etc.)
 */
export function ItemListStructuredData({
  name,
  description,
  items,
  path = "",
}) {
  if (!items || items.length === 0) return null;
  const structuredData = generateItemListStructuredData({
    name,
    description,
    items,
    path,
  });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Video structured data
 */
export function VideoStructuredData({
  name,
  description,
  thumbnailUrl,
  videoUrl,
  uploadDate,
  duration,
  path = "",
}) {
  if (!videoUrl) return null;
  const structuredData = generateVideoStructuredData({
    name,
    description,
    thumbnailUrl,
    videoUrl,
    uploadDate,
    duration,
    path,
  });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Course structured data (for tutorials)
 */
export function CourseStructuredData({
  name,
  description,
  provider,
  image,
  courseCode,
  educationalLevel,
  teaches,
  path = "",
}) {
  const structuredData = generateCourseStructuredData({
    name,
    description,
    provider,
    image,
    courseCode,
    educationalLevel,
    teaches,
    path,
  });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Review structured data
 */
export function ReviewStructuredData({
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
  if (!ratingValue) return null;
  const structuredData = generateReviewStructuredData({
    itemName,
    itemType,
    ratingValue,
    ratingCount,
    bestRating,
    worstRating,
    author,
    reviewBody,
    datePublished,
  });
  return <StructuredDataScript data={structuredData} />;
}

/**
 * Multiple structured data components (useful for pages with multiple schemas)
 */
export function MultipleStructuredData({ schemas = [] }) {
  if (!schemas || schemas.length === 0) return null;
  
  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredDataScript key={index} data={schema} />
      ))}
    </>
  );
}

