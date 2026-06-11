import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Tax Returns & Compliance",
  description:
    "Reliable support for self-assessment, VAT returns and year-end compliance. Help for sole traders, landlords, freelancers and small businesses.",
  keywords: [
    "self assessment accountant",
    "VAT returns",
    "tax compliance",
    "year-end accounts",
  ],
};

const TAX_HELP_ITEMS = [
  "Meet HMRC deadlines with confidence",
  "Claim all allowable expenses and reliefs",
  "Stay compliant with changing tax rules",
  "Avoid penalties and unnecessary stress",
] as const;

const TaxReturnsCompliancePage = () => {
  return (
    <>
      <Hero
        headline="Tax Returns & Compliance"
        subheading="Reliable support for self-assessment, VAT and year-end obligations — so you stay compliant without the worry."
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
                title="Tax Doesn't Have to Be Stressful"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                Tax returns, VAT submissions and year-end compliance can feel
                overwhelming — especially when you&apos;re busy running a
                business. Getting it wrong can lead to penalties, missed
                reliefs and sleepless nights.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                We provide clear, reliable support for sole traders, landlords,
                freelancers and small business owners — handling the details so
                you meet every obligation on time.
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
            subtitle="From self-assessment to VAT and year-end accounts, we guide you through every step."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <CheckList items={TAX_HELP_ITEMS} />
          </div>
          <div className="mt-10 text-center">
            <Button
              href="/contact"
              variant="secondary"
              ariaLabel="Book a free discovery call for tax support"
            >
              Book a Free Discovery Call
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Tax & Compliance Services"
            subtitle="Comprehensive support tailored to your business structure and obligations."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Self Assessment",
                description:
                  "Complete tax return preparation for sole traders, landlords, freelancers and directors.",
              },
              {
                title: "VAT Returns",
                description:
                  "Accurate VAT calculations and timely submissions, whether you're newly registered or established.",
              },
              {
                title: "Year-End Accounts",
                description:
                  "Professional year-end accounts prepared to meet filing requirements and inform your decisions.",
              },
              {
                title: "Management Reporting",
                description:
                  "Regular financial insights to help you track performance and plan for the future.",
              },
              {
                title: "Compliance Advice",
                description:
                  "Proactive guidance on your tax obligations so you stay ahead of deadlines and rule changes.",
              },
              {
                title: "Business Support",
                description:
                  "Practical advice on structuring income, expenses and reliefs to keep your tax position efficient.",
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
        title="Need help with your tax obligations?"
        description="Book your free discovery call and we'll explain exactly how we can support you."
        buttonText="Book a Free Discovery Call"
      />
    </>
  );
};

export default TaxReturnsCompliancePage;
