import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { buildPageStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Cassia Accountancy. Book your free discovery call for bookkeeping, tax and Making Tax Digital support.",
  path: "/contact",
  ogImage: IMAGES.og.contact,
});

const ContactPage = () => {
  return (
    <>
      <JsonLd
        data={buildPageStructuredData([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Hero
        headline="Let's Talk"
        subheading="Whether you're starting a business, struggling with bookkeeping or preparing for Making Tax Digital, we're here to help."
        ctaText=""
        image={IMAGES.hero.contact}
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Get in Touch"
                subtitle="Fill in the form and we'll be in touch with a personalised quote, usually within one working day."
                centered={false}
              />

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block text-base text-charcoal transition-colors hover:text-gold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                    Phone
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="mt-1 block text-base text-charcoal transition-colors hover:text-gold"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                    Response Time
                  </p>
                  <p className="mt-1 text-base text-charcoal-light">
                    We aim to respond within one working day.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm variant="quote" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
