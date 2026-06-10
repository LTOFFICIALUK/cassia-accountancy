import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, fixed-fee accountancy packages for sole traders, growing businesses and limited companies.",
};

const PricingPage = () => {
  return (
    <>
      <Hero
        headline="Simple, Transparent Pricing"
        subheading="Fixed-fee packages designed for small businesses — no surprises, no jargon."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Choose Your Package"
            subtitle="All packages include friendly, jargon-free support. Contact us for a tailored quote based on your specific needs."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <PricingCard
              title="Sole Trader Essentials"
              price="From £XX/month"
              features={[
                "Bookkeeping",
                "Tax return",
                "Email support",
              ]}
            />
            <PricingCard
              title="Growth Package"
              price="From £XX/month"
              features={[
                "Bookkeeping",
                "MTD support",
                "Quarterly reviews",
                "Tax planning",
              ]}
              highlighted
            />
            <PricingCard
              title="Limited Company Package"
              price="From £XX/month"
              features={[
                "Accounts",
                "Corporation tax",
                "Director support",
                "Ongoing advice",
              ]}
            />
          </div>

          <p className="mt-10 text-center text-sm text-charcoal-light">
            Prices are indicative and depend on the complexity of your business.
            Book a free discovery call for a personalised quote.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading title="What's Included in Every Package" />
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            {[
              "Clear, jargon-free communication",
              "Cloud accounting software support",
              "Proactive deadline reminders",
              "Dedicated point of contact",
              "Flexible meeting options",
              "No hidden fees",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-sage/10 bg-cream px-4 py-3"
              >
                <span className="text-gold" aria-hidden="true">
                  ✓
                </span>
                <span className="text-sm text-charcoal">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get a personalised quote"
        description="Every business is different. Let's discuss your needs and find the right package for you."
      />
    </>
  );
};

export default PricingPage;
