import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { buildPageStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Accounts & Compliance",
  description:
    "Year-end accounts, VAT returns, management reporting and ongoing compliance support for small businesses across the UK.",
  path: "/accounts-compliance",
  keywords: [
    "year-end accounts",
    "VAT returns accountant",
    "management reporting",
    "business compliance",
  ],
});

const COMPLIANCE_HELP_ITEMS = [
  "Meet filing deadlines with confidence",
  "Keep your accounts accurate and up to date",
  "Understand your financial position clearly",
  "Stay compliant as regulations change",
] as const;

const AccountsCompliancePage = () => {
  return (
    <>
      <JsonLd
        data={buildPageStructuredData([
          { name: "Home", path: "/" },
          { name: "Accounts & Compliance", path: "/accounts-compliance" },
        ])}
      />
      <Hero
        headline="Accounts & Compliance"
        subheading="Year-end support and ongoing compliance to keep your business on track."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="/images/hmrc-letter.jpeg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Stay Compliant, Stay in Control"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                Year-end accounts, VAT returns and ongoing reporting obligations
                can feel overwhelming when you&apos;re focused on running your
                business. Missing deadlines or filing inaccurate returns can lead
                to penalties and unnecessary stress.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                We provide reliable, practical support so your accounts are
                prepared correctly, your filings are submitted on time, and you
                have the financial insight you need to make good decisions.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/liverpool-city.jpeg"
                alt="Liverpool city skyline representing local business support"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How Cassia Accountancy Helps"
            subtitle="From year-end accounts to VAT and management reporting, we keep your compliance on track."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <CheckList items={COMPLIANCE_HELP_ITEMS} />
          </div>
          <div className="mt-10 text-center">
            <Button
              href="/contact"
              variant="secondary"
              ariaLabel="Book a free discovery call for accounts and compliance support"
            >
              Book a Free Discovery Call
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Accounts & Compliance Services"
            subtitle="Comprehensive support tailored to your business structure and obligations."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Year-End Accounts",
                description:
                  "Professional year-end accounts prepared to meet filing requirements and inform your decisions.",
              },
              {
                title: "VAT Returns",
                description:
                  "Accurate VAT calculations and timely submissions, whether you're newly registered or established.",
              },
              {
                title: "Management Reporting",
                description:
                  "Regular financial insights to help you track performance and plan for the future.",
              },
              {
                title: "Business Support",
                description:
                  "Practical advice on structuring income, expenses and reliefs to keep your tax position efficient.",
              },
              {
                title: "Compliance Advice",
                description:
                  "Proactive guidance on your obligations so you stay ahead of deadlines and rule changes.",
              },
              {
                title: "Filing Support",
                description:
                  "We handle submissions to HMRC and Companies House so nothing is missed or late.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-sage/10 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-lg font-semibold text-sage">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need help staying compliant?"
        description="Book your free discovery call and we'll explain exactly how we can support you."
        buttonText="Book a Free Discovery Call"
      />
    </>
  );
};

export default AccountsCompliancePage;
