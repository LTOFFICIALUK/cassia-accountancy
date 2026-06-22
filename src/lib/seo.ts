import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOUNDER_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";

export const OG_IMAGE = "/images/lion.jpeg";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export const buildAbsoluteUrl = (path: string): string => {
  if (path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path}`;
};

export const parseDisplayDateToIso = (date: string): string => {
  return new Date(date).toISOString();
};

export const createPageMetadata = ({
  title,
  description,
  path,
  keywords,
  ogImage = OG_IMAGE,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
}: CreatePageMetadataOptions): Metadata => {
  const url = buildAbsoluteUrl(path);
  const openGraphTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        "en-GB": url,
      },
    },
    openGraph: {
      title: openGraphTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: openGraphType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      ...(openGraphType === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [FOUNDER_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [ogImage],
    },
  };
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: buildAbsoluteUrl(item.path),
  })),
});

export const buildGlobalStructuredData = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: buildAbsoluteUrl("/logo.png"),
      image: buildAbsoluteUrl(OG_IMAGE),
      description: SITE_DESCRIPTION,
      founder: {
        "@type": "Person",
        name: FOUNDER_NAME,
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      serviceType: [
        "Bookkeeping",
        "Self Assessment",
        "Making Tax Digital",
        "Payroll",
        "VAT Returns",
        "Accounts Compliance",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT_PHONE.replace(/\s/g, ""),
          email: CONTACT_EMAIL,
          contactType: "customer service",
          areaServed: "GB",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-GB",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ],
});

type ArticleStructuredDataOptions = {
  title: string;
  description: string;
  path: string;
  category: string;
  publishedTime: string;
  modifiedTime?: string;
};

export const buildArticleStructuredData = ({
  title,
  description,
  path,
  category,
  publishedTime,
  modifiedTime,
}: ArticleStructuredDataOptions) => ({
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/blog" },
      { name: title, path },
    ]),
    {
      "@type": "Article",
      headline: title,
      description,
      datePublished: publishedTime,
      dateModified: modifiedTime ?? publishedTime,
      author: {
        "@type": "Person",
        name: FOUNDER_NAME,
      },
      publisher: {
        "@id": ORGANIZATION_ID,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": buildAbsoluteUrl(path),
      },
      articleSection: category,
      inLanguage: "en-GB",
    },
  ],
});

export const buildPageStructuredData = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  ...buildBreadcrumbJsonLd(items),
});
