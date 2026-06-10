export const SITE_NAME = "Cassia Accountancy";
export const SITE_DESCRIPTION =
  "Cassia Accountancy helps small business owners with bookkeeping, tax returns, cloud accounting and Making Tax Digital support. Friendly, straightforward accountancy services across the UK.";
export const FOUNDER_NAME = "Sarah Cassia Davies MAAT";
export const CONTACT_EMAIL = "hello@cassiaaccountancy.co.uk";
export const CONTACT_PHONE = "01234 567890";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/making-tax-digital", label: "Making Tax Digital" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const WHY_CHOOSE_US = [
  "Friendly, approachable service",
  "Clear communication without jargon",
  "Making Tax Digital expertise",
  "Fixed-fee packages available",
  "Support tailored to small businesses",
] as const;

export const QUALIFICATIONS = [
  "AAT Qualified Accountant",
  "MAAT Member",
  "Finance Officer at a national charity",
  "Experienced in cloud accounting systems",
  "Making Tax Digital specialist",
] as const;

export const BLOG_POSTS = [
  {
    slug: "what-is-making-tax-digital",
    title: "What is Making Tax Digital?",
    excerpt:
      "A clear guide to MTD requirements and what they mean for your business.",
    date: "15 May 2026",
    category: "Making Tax Digital",
  },
  {
    slug: "bookkeeping-mistakes-small-businesses",
    title: "Bookkeeping Mistakes Small Businesses Make",
    excerpt:
      "Common pitfalls that cause stress at year-end — and how to avoid them.",
    date: "3 May 2026",
    category: "Bookkeeping",
  },
  {
    slug: "how-to-prepare-for-tax-return",
    title: "How to Prepare for Your Tax Return",
    excerpt:
      "Practical steps to gather everything you need before the deadline.",
    date: "20 April 2026",
    category: "Tax",
  },
  {
    slug: "when-should-you-register-for-vat",
    title: "When Should You Register for VAT?",
    excerpt:
      "Understanding the threshold, timing and what registration means for you.",
    date: "8 April 2026",
    category: "VAT",
  },
  {
    slug: "xero-vs-quickbooks",
    title: "Xero vs QuickBooks: Which is Best?",
    excerpt:
      "Comparing the two leading cloud accounting platforms for small businesses.",
    date: "25 March 2026",
    category: "Cloud Accounting",
  },
] as const;
