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
  title: "Self Assessment",
  description:
    "Stress-free self assessment tax returns for sole traders, landlords, freelancers and directors. Accurate submissions and clear advice from Cassia Accountancy.",
  path: "/self-assessment",
  keywords: [
    "self assessment accountant",
    "tax return accountant",
    "sole trader tax return",
    "landlord tax return",
  ],
});

const SELF_ASSESSMENT_HELP_ITEMS = [
  "Meet the 31 January deadline with confidence",
  "Claim all allowable expenses and reliefs",
  "Understand your tax position before you submit",
  "Avoid penalties and last-minute stress",
] as const;

const SelfAssessmentPage = () => {
  return (
    <>
      <JsonLd
        data={buildPageStructuredData([
          { name: "Home", path: "/" },
          { name: "Self Assessment", path: "/self-assessment" },
        ])}
      />
      <Hero
        headline="Self Assessment Tax Returns"
        subheading="Take the stress out of tax returns with clear, reliable support tailored to your situation."
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
                title="Who Needs Self Assessment?"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                If you earn income that isn&apos;t taxed through PAYE, you
                likely need to complete a self assessment tax return each year.
                That includes many sole traders, landlords, freelancers and
                company directors.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                Getting it right matters — not just for meeting HMRC deadlines,
                but for making sure you claim everything you&apos;re entitled to
                and understand what you owe.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/mtd-content.jpg"
                alt="Laptop displaying a digital tax management dashboard"
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
            subtitle="We handle the details so your return is accurate, compliant and submitted on time."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <CheckList items={SELF_ASSESSMENT_HELP_ITEMS} />
          </div>
          <div className="mt-10 text-center">
            <Button
              href="/contact"
              variant="secondary"
              ariaLabel="Book a free discovery call for self assessment support"
            >
              Book a Free Discovery Call
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Self Assessment Support For"
            subtitle="Practical, straightforward help for a range of business owners and individuals."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Sole Traders",
                description:
                  "Complete tax return preparation with accurate income and expense reporting.",
              },
              {
                title: "Landlords",
                description:
                  "Property income, allowable expenses and mortgage interest relief handled correctly.",
              },
              {
                title: "Freelancers",
                description:
                  "Clear guidance on income from multiple clients and deductible business costs.",
              },
              {
                title: "Directors",
                description:
                  "Support with dividends, salary and other income sources on your personal return.",
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
        title="Need help with your tax return?"
        description="Book your free discovery call and we'll explain exactly how we can support you."
        buttonText="Book a Free Discovery Call"
      />
    </>
  );
};

export default SelfAssessmentPage;
