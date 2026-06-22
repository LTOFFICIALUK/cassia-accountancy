import type { Metadata } from "next";
import { CheckList } from "@/components/CheckList";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { buildPageStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Quote",
  description:
    "Request a personalised, fixed-fee quote for bookkeeping, tax returns and Making Tax Digital support tailored to your business.",
  path: "/pricing",
});

const QUOTE_INCLUDES = [
  "Clear, jargon-free communication",
  "Cloud accounting software support",
  "Proactive deadline reminders",
  "Dedicated point of contact",
  "Flexible meeting options",
  "No hidden fees",
] as const;

const PricingPage = () => {
  return (
    <>
      <JsonLd
        data={buildPageStructuredData([
          { name: "Home", path: "/" },
          { name: "Get a Quote", path: "/pricing" },
        ])}
      />
      <Hero
        headline="Request a Personalised Quote"
        subheading="Every business is different. Tell us what you need and we'll put together a fixed-fee quote with no surprises."
        ctaText="Request a Quote"
        ctaHref="#quote-form"
        imageSrc="/images/pricing-hero.jpg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                title="Fixed-Fee Support, Tailored to You"
                subtitle="Whether you're a sole trader, freelancer or limited company, we'll recommend the right level of support and send you a clear, no-obligation quote."
                centered={false}
              />

              <div className="mt-8 rounded-xl border border-sage/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-sage">
                  What&apos;s Included
                </h3>
                <div className="mt-4">
                  <CheckList items={QUOTE_INCLUDES} />
                </div>
              </div>

              <div className="mt-8 space-y-4 text-sm text-charcoal-light">
                <p>
                  Not sure exactly what you need? That&apos;s fine — tell us
                  about your business and we&apos;ll guide you through the
                  options.
                </p>
                <p>
                  Prefer to talk first? Email{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-sage transition-colors hover:text-gold"
                  >
                    {CONTACT_EMAIL}
                  </a>{" "}
                  or call{" "}
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="font-medium text-sage transition-colors hover:text-gold"
                  >
                    {CONTACT_PHONE}
                  </a>
                  .
                </p>
              </div>
            </div>

            <div id="quote-form">
              <h2 className="font-heading text-2xl font-semibold text-sage">
                Request Your Quote
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                Fill in the form below and we&apos;ll be in touch with a
                personalised quote, usually within one working day.
              </p>
              <div className="mt-6">
                <ContactForm variant="quote" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
