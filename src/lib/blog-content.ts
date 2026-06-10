export type BlogPostContent = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string[];
};

export const BLOG_CONTENT: Record<string, BlogPostContent> = {
  "what-is-making-tax-digital": {
    slug: "what-is-making-tax-digital",
    title: "What is Making Tax Digital?",
    excerpt:
      "A clear guide to MTD requirements and what they mean for your business.",
    date: "15 May 2026",
    category: "Making Tax Digital",
    content: [
      "Making Tax Digital (MTD) is HMRC's initiative to modernise the UK tax system. It requires businesses and individuals to keep digital records and submit tax information using compatible software.",
      "For many sole traders and landlords, MTD for Income Tax Self Assessment (MTD ITSA) means keeping digital records throughout the year and submitting quarterly updates to HMRC, followed by a final declaration.",
      "The key requirements include maintaining digital records of all income and expenses, using MTD-compatible software, and ensuring your records are digitally linked — meaning data flows between your records and your tax submission without manual re-keying.",
      "If you're unsure whether MTD applies to you or what steps you need to take, a readiness review can help you understand your obligations and get prepared well ahead of any deadlines.",
    ],
  },
  "bookkeeping-mistakes-small-businesses": {
    slug: "bookkeeping-mistakes-small-businesses",
    title: "Bookkeeping Mistakes Small Businesses Make",
    excerpt:
      "Common pitfalls that cause stress at year-end — and how to avoid them.",
    date: "3 May 2026",
    category: "Bookkeeping",
    content: [
      "Good bookkeeping doesn't have to be complicated, but a few common mistakes can create significant stress when tax deadlines approach.",
      "Mixing personal and business expenses is one of the most frequent issues. Keeping a separate business bank account makes it far easier to track income and claim legitimate expenses.",
      "Another common mistake is leaving bookkeeping until the last minute. Processing transactions monthly — or even weekly — keeps your records accurate and gives you a clearer picture of how your business is performing.",
      "Failing to keep receipts and records for expenses is also problematic. Digital tools make this easier than ever — photograph receipts as you go and store them in your cloud accounting software.",
      "If bookkeeping feels overwhelming, you don't have to do it alone. Many small business owners find that outsourcing even basic bookkeeping saves time and reduces errors.",
    ],
  },
  "how-to-prepare-for-tax-return": {
    slug: "how-to-prepare-for-tax-return",
    title: "How to Prepare for Your Tax Return",
    excerpt:
      "Practical steps to gather everything you need before the deadline.",
    date: "20 April 2026",
    category: "Tax",
    content: [
      "Preparing for your self-assessment tax return doesn't have to be stressful if you approach it systematically.",
      "Start by gathering your income records — invoices, payment summaries, and any P60s or other employment income documents if applicable. For sole traders, this means a full record of all business income for the tax year.",
      "Next, compile your expense records. This includes receipts, bank statements, and mileage logs. Remember that only legitimate business expenses can be claimed, and they must be supported by evidence.",
      "If you use cloud accounting software like Xero or QuickBooks, much of this information will already be organised. If not, consider whether now is the time to make the switch — it can save significant effort next year.",
      "Finally, don't leave it to the last minute. The self-assessment deadline is 31 January, but starting your preparation in the autumn gives you time to address any gaps or questions before the rush.",
    ],
  },
  "when-should-you-register-for-vat": {
    slug: "when-should-you-register-for-vat",
    title: "When Should You Register for VAT?",
    excerpt:
      "Understanding the threshold, timing and what registration means for you.",
    date: "8 April 2026",
    category: "VAT",
    content: [
      "VAT registration is mandatory once your taxable turnover exceeds £90,000 in any rolling 12-month period. You must also register if you expect to exceed this threshold in the next 30 days alone.",
      "However, some businesses choose to register voluntarily before reaching the threshold. This can be beneficial if you primarily sell to other VAT-registered businesses, as you can reclaim VAT on your purchases.",
      "On the other hand, if your customers are mainly individuals or small businesses that cannot reclaim VAT, voluntary registration means you'll need to charge VAT on your prices — which could make you less competitive.",
      "Once registered, you'll need to submit VAT returns — usually quarterly — and keep detailed records of all VAT charged and paid. MTD for VAT already requires digital record-keeping and submission for all VAT-registered businesses.",
      "If you're approaching the threshold or considering voluntary registration, it's worth discussing the implications with an accountant who can help you make the right decision for your business.",
    ],
  },
  "xero-vs-quickbooks": {
    slug: "xero-vs-quickbooks",
    title: "Xero vs QuickBooks: Which is Best?",
    excerpt:
      "Comparing the two leading cloud accounting platforms for small businesses.",
    date: "25 March 2026",
    category: "Cloud Accounting",
    content: [
      "Xero and QuickBooks are the two most popular cloud accounting platforms for UK small businesses. Both are MTD-compatible and offer excellent features, but they suit different needs.",
      "Xero is known for its clean, intuitive interface and strong bank reconciliation features. It's particularly popular with service-based businesses and those who want a straightforward, easy-to-use platform.",
      "QuickBooks offers robust reporting and a wide range of integrations. It's often favoured by businesses that need more detailed financial analysis or have specific industry requirements.",
      "Both platforms offer automatic bank feeds, invoicing, expense tracking, and payroll add-ons. They also both integrate with a wide range of third-party apps for things like payment processing and time tracking.",
      "The best choice depends on your specific business needs, your level of accounting knowledge, and which platform your accountant prefers to work with. We can help you evaluate both options and set up the right software for your business.",
    ],
  },
};
