import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOUNDER_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { IMAGES, type SiteImage } from "@/lib/images";

export const DEFAULT_OG_IMAGE = IMAGES.og.default;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: SiteImage;
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
  ogImage = DEFAULT_OG_IMAGE,
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
          url: ogImage.src,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
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
      images: [ogImage.src],
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
      logo: buildAbsoluteUrl(IMAGES.logo.default.src),
      image: buildAbsoluteUrl(DEFAULT_OG_IMAGE.src),
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
  image: SiteImage;
};

export const buildArticleStructuredData = ({
  title,
  description,
  path,
  category,
  publishedTime,
  modifiedTime,
  image,
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
      image: buildAbsoluteUrl(image.src),
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

type ServiceStructuredDataOptions = {
  name: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
};

export const buildServiceStructuredData = ({
  name,
  description,
  path,
  breadcrumbs,
}: ServiceStructuredDataOptions) => ({
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd(breadcrumbs),
    {
      "@type": "Service",
      name,
      description,
      url: buildAbsoluteUrl(path),
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
    },
  ],
});

export const buildAboutStructuredData = (breadcrumbs: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd(breadcrumbs),
    {
      "@type": "Person",
      name: FOUNDER_NAME,
      jobTitle: "AAT-qualified Accountant",
      worksFor: {
        "@id": ORGANIZATION_ID,
      },
      url: buildAbsoluteUrl("/about"),
    },
  ],
});
