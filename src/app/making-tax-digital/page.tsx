import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Making Tax Digital",
  description:
    "Expert Making Tax Digital support for small businesses. MTD readiness reviews, software setup, training and quarterly submissions.",
  keywords: [
    "Making Tax Digital accountant",
    "MTD specialist",
    "MTD for Income Tax",
    "MTD software setup",
  ],
};

const MTD_HELP_ITEMS = [
  "Understand the requirements",
  "Choose suitable software",
  "Maintain digital records",
  "Meet submission deadlines",
] as const;

const MakingTaxDigitalPage = () => {
  return (
    <>
      <Hero
        headline="Making Tax Digital Explained"
        subheading="Expert support to help your business navigate digital tax reporting with confidence."
        ctaText="Book a Free MTD Consultation"
        ctaHref="/contact"
        imageSrc="/images/hmrc-letter.jpeg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="What is Making Tax Digital?"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                Making Tax Digital is changing the way many businesses report
                income and tax information. Instead of annual paper returns, HMRC
                now requires digital record-keeping and regular submissions for
                many business owners.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                Whether you&apos;re a sole trader, landlord or small limited
                company, understanding your MTD obligations is essential to
                staying compliant and avoiding penalties.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-lg">
              <Image
                src="/images/making-tax-digital.jpg"
                alt="Making Tax Digital official branding"
                fill
                className="object-contain p-6"
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
            subtitle="We guide you through every step of the MTD process — from understanding your obligations to meeting deadlines."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <CheckList items={MTD_HELP_ITEMS} />
          </div>
          <div className="mt-10 text-center">
            <Button
              href="/contact"
              variant="secondary"
              ariaLabel="Book a free MTD consultation"
            >
              Book a Free MTD Consultation
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our MTD Services"
            subtitle="Comprehensive support to get you MTD-ready and keep you compliant."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "MTD Readiness Review",
                description:
                  "We assess your current setup and identify what needs to change before your MTD deadline.",
              },
              {
                title: "Software Setup",
                description:
                  "Expert help choosing and configuring Xero, QuickBooks or other MTD-compatible software.",
              },
              {
                title: "Training & Support",
                description:
                  "Clear, jargon-free guidance so you understand how to maintain digital records confidently.",
              },
              {
                title: "Digital Record Keeping",
                description:
                  "Ongoing support to ensure your records meet HMRC's digital linking requirements.",
              },
              {
                title: "Quarterly Submissions",
                description:
                  "We handle your quarterly updates to HMRC, keeping you compliant and stress-free.",
              },
              {
                title: "Ongoing Advice",
                description:
                  "Proactive guidance as MTD rules evolve, so you're always prepared for what's next.",
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
        title="Ready for Making Tax Digital?"
        description="Book your free MTD consultation and find out exactly what you need to do next."
        buttonText="Book a Free MTD Consultation"
      />
    </>
  );
};

export default MakingTaxDigitalPage;
