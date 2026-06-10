import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cassia Accountancy. Book your free discovery call for bookkeeping, tax and Making Tax Digital support.",
};

const ContactPage = () => {
  return (
    <>
      <Hero
        headline="Let's Talk"
        subheading="Whether you're starting a business, struggling with bookkeeping or preparing for Making Tax Digital, we're here to help."
        ctaText=""
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=800&fit=crop"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Get in Touch"
                subtitle="Fill in the form and we'll get back to you to arrange your free discovery call."
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
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
