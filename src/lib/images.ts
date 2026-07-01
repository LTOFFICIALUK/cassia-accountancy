import { SITE_NAME } from "@/lib/constants";

/**
 * Central registry for every image used on the site.
 * Do not change `src` paths unless explicitly updating site photography.
 */
export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const IMAGES = {
  hero: {
    home: {
      src: "/images/lion.jpeg",
      alt: "Royal Liver Building stone lions, Liverpool waterfront",
      width: 1920,
      height: 1013,
    },
    about: {
      src: "/images/about-hero.jpg",
      alt: "Professional workspace representing accountancy support for small businesses",
      width: 1200,
      height: 800,
    },
    services: {
      src: "/images/services-hero.jpg",
      alt: "Business professional reviewing financial documents",
      width: 1200,
      height: 800,
    },
    mtd: {
      src: "/images/hmrc-letter.jpeg",
      alt: "HM Revenue and Customs letter representing tax and compliance paperwork",
      width: 734,
      height: 412,
    },
    bookkeeping: {
      src: "/images/plants.jpeg",
      alt: "Calm, organised office environment for focused bookkeeping",
      width: 1200,
      height: 800,
    },
    selfAssessment: {
      src: "/images/hmrc-letter.jpeg",
      alt: "HM Revenue and Customs letter representing tax and compliance paperwork",
      width: 734,
      height: 412,
    },
    compliance: {
      src: "/images/hmrc-letter.jpeg",
      alt: "HM Revenue and Customs letter representing tax and compliance paperwork",
      width: 734,
      height: 412,
    },
    payroll: {
      src: "/images/sarah.jpeg",
      alt: "Cassia Accountancy founder supporting small business payroll",
      width: 1200,
      height: 800,
    },
    blog: {
      src: "/images/blog-hero.jpg",
      alt: "Open notebook and coffee representing business resources and insights",
      width: 1200,
      height: 800,
    },
    contact: {
      src: "/images/contact-hero.jpg",
      alt: "Welcoming office setting for a discovery call with Cassia Accountancy",
      width: 1200,
      height: 800,
    },
    pricing: {
      src: "/images/pricing-hero.jpg",
      alt: "Calculator and financial planning documents for a personalised quote",
      width: 1200,
      height: 800,
    },
  },
  content: {
    homeIntro: {
      src: "/images/hmrc-letter.jpeg",
      alt: "HM Revenue and Customs letter representing tax and compliance paperwork",
      width: 734,
      height: 412,
    },
    homeWhyUs: {
      src: "/images/liverpool-city-1.jpeg",
      alt: "Royal Liver Building, Liverpool — supporting businesses across the UK",
      width: 1200,
      height: 900,
    },
    founderPortrait: {
      src: "/images/sarah.jpeg",
      alt: "Sarah Cassia Davies, founder of Cassia Accountancy",
      width: 1200,
      height: 1599,
    },
    mtdBranding: {
      src: "/images/making-tax-digital.jpg",
      alt: "Making Tax Digital official HMRC branding",
      width: 1000,
      height: 1000,
    },
    bookkeepingGrowth: {
      src: "/images/dubai-view.jpeg",
      alt: "Modern city skyline representing business growth and financial clarity",
      width: 1600,
      height: 1200,
    },
    selfAssessmentDashboard: {
      src: "/images/mtd-content.jpg",
      alt: "Laptop displaying a digital tax management dashboard",
      width: 1200,
      height: 900,
    },
    payrollWorkplace: {
      src: "/images/plants.jpeg",
      alt: "Office plants representing a calm, organised workplace",
      width: 1200,
      height: 900,
    },
    complianceLocal: {
      src: "/images/liverpool-city.jpeg",
      alt: "Liverpool city skyline representing local business support",
      width: 1200,
      height: 900,
    },
  },
  blog: {
    makingTaxDigital: {
      src: "/images/making-tax-digital.jpg",
      alt: "Making Tax Digital requirements explained for UK small businesses",
      width: 1000,
      height: 1000,
    },
    bookkeeping: {
      src: "/images/plants.jpeg",
      alt: "Organised workspace representing effective small business bookkeeping",
      width: 1200,
      height: 900,
    },
    taxReturn: {
      src: "/images/mtd-content.jpg",
      alt: "Preparing documents for a self assessment tax return",
      width: 1200,
      height: 900,
    },
    vat: {
      src: "/images/home-intro.jpg",
      alt: "Business tax documents for VAT registration decisions",
      width: 1200,
      height: 900,
    },
    cloudAccounting: {
      src: "/images/mtd-content.jpg",
      alt: "Cloud accounting software on a laptop for small businesses",
      width: 1200,
      height: 900,
    },
  },
  og: {
    default: {
      src: "/images/og/default.jpg",
      alt: `${SITE_NAME} — small business accountant for bookkeeping, tax and Making Tax Digital`,
      width: 1200,
      height: 630,
    },
    about: {
      src: "/images/og/about.jpg",
      alt: `About ${SITE_NAME} — AAT-qualified accountant Sarah Cassia Davies`,
      width: 1200,
      height: 630,
    },
    services: {
      src: "/images/og/services.jpg",
      alt: `${SITE_NAME} accountancy services for small businesses`,
      width: 1200,
      height: 630,
    },
    mtd: {
      src: "/images/og/mtd.jpg",
      alt: `Making Tax Digital support from ${SITE_NAME}`,
      width: 1200,
      height: 630,
    },
    bookkeeping: {
      src: "/images/og/bookkeeping.jpg",
      alt: `Bookkeeping and accounts services from ${SITE_NAME}`,
      width: 1200,
      height: 630,
    },
    selfAssessment: {
      src: "/images/og/self-assessment.jpg",
      alt: `Self assessment tax return support from ${SITE_NAME}`,
      width: 1200,
      height: 630,
    },
    compliance: {
      src: "/images/og/compliance.jpg",
      alt: `Accounts and compliance support from ${SITE_NAME}`,
      width: 1200,
      height: 630,
    },
    payroll: {
      src: "/images/og/payroll.jpg",
      alt: `Payroll services for small businesses from ${SITE_NAME}`,
      width: 1200,
      height: 630,
    },
    blog: {
      src: "/images/og/blog.jpg",
      alt: `${SITE_NAME} resources and guides for small business owners`,
      width: 1200,
      height: 630,
    },
    contact: {
      src: "/images/og/contact.jpg",
      alt: `Contact ${SITE_NAME} for a free discovery call`,
      width: 1200,
      height: 630,
    },
    pricing: {
      src: "/images/og/pricing.jpg",
      alt: `Request a personalised quote from ${SITE_NAME}`,
      width: 1200,
      height: 630,
    },
  },
  logo: {
    default: {
      src: "/logo.png",
      alt: "",
      width: 400,
      height: 210,
    },
    light: {
      src: "/logo-light.png",
      alt: "",
      width: 400,
      height: 210,
    },
  },
} as const satisfies Record<string, Record<string, SiteImage>>;

export const BLOG_POST_IMAGES: Record<string, SiteImage> = {
  "what-is-making-tax-digital": IMAGES.blog.makingTaxDigital,
  "bookkeeping-mistakes-small-businesses": IMAGES.blog.bookkeeping,
  "how-to-prepare-for-tax-return": IMAGES.blog.taxReturn,
  "when-should-you-register-for-vat": IMAGES.blog.vat,
  "xero-vs-quickbooks": IMAGES.blog.cloudAccounting,
};

export const BLOG_POST_OG: Record<string, SiteImage> = {
  "what-is-making-tax-digital": {
    src: "/images/og/blog-what-is-making-tax-digital.jpg",
    alt: "What is Making Tax Digital? A guide for UK small businesses",
    width: 1200,
    height: 630,
  },
  "bookkeeping-mistakes-small-businesses": {
    src: "/images/og/blog-bookkeeping-mistakes.jpg",
    alt: "Common bookkeeping mistakes small businesses make",
    width: 1200,
    height: 630,
  },
  "how-to-prepare-for-tax-return": {
    src: "/images/og/blog-tax-return.jpg",
    alt: "How to prepare for your self assessment tax return",
    width: 1200,
    height: 630,
  },
  "when-should-you-register-for-vat": {
    src: "/images/og/blog-vat-registration.jpg",
    alt: "When should you register for VAT?",
    width: 1200,
    height: 630,
  },
  "xero-vs-quickbooks": {
    src: "/images/og/blog-cloud-accounting.jpg",
    alt: "Xero vs QuickBooks for small businesses",
    width: 1200,
    height: 630,
  },
};

export const getBlogPostImage = (slug: string): SiteImage =>
  BLOG_POST_IMAGES[slug] ?? IMAGES.blog.makingTaxDigital;

export const getBlogPostOgImage = (slug: string): SiteImage =>
  BLOG_POST_OG[slug] ?? IMAGES.og.blog;
