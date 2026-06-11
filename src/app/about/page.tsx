import type { Metadata } from "next";
import Image from "next/image";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { FOUNDER_NAME, QUALIFICATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Sarah Cassia Davies MAAT — an AAT-qualified accountant passionate about helping small business owners feel confident about their finances.",
};

const AboutPage = () => {
  return (
    <>
      <Hero
        headline={`Meet ${FOUNDER_NAME}`}
        subheading="An AAT-qualified accountant with a passion for helping small business owners feel more confident about their finances."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="/images/about-hero.jpg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="relative aspect-[3/4] max-w-md overflow-hidden rounded-xl shadow-lg lg:mx-auto">
              <Image
                src="/images/sarah.jpeg"
                alt="Sarah Cassia Davies, founder of Cassia Accountancy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <div>
              <SectionHeading title="Your Partner in Financial Clarity" centered={false} />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-light">
                <p>
                  I&apos;m an AAT-qualified accountant with a passion for helping
                  small business owners feel more confident about their finances.
                </p>
                <p>
                  I understand that many business owners didn&apos;t start their
                  business to become experts in bookkeeping, tax and compliance.
                </p>
                <p>
                  My goal is to simplify the numbers, remove unnecessary stress and
                  help you build a stronger, more profitable business.
                </p>
              </div>

              <div className="mt-10 rounded-xl border border-sage/10 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-semibold text-sage">
                  Qualifications
                </h3>
                <div className="mt-4">
                  <CheckList items={QUALIFICATIONS} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Who We Help"
            subtitle="We work with small business owners across the UK who want clear, practical accountancy support."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Sole Traders",
              "Freelancers",
              "Landlords",
              "Small Limited Companies",
              "Start-ups",
              "Self-employed Professionals",
              "Service-based Businesses",
              "Tradespeople",
            ].map((audience) => (
              <div
                key={audience}
                className="rounded-lg border border-sage/10 bg-cream px-4 py-3 text-center text-sm font-medium text-sage"
              >
                {audience}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's talk about your business"
        description="Whether you're just starting out or looking for a more supportive accountant, we'd love to hear from you."
      />
    </>
  );
};

export default AboutPage;
