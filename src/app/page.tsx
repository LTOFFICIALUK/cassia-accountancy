import type { Metadata } from "next";
import { CheckList } from "@/components/CheckList";
import { ContentImage } from "@/components/ContentImage";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { BookkeepingIcon, MTDIcon, TaxIcon } from "@/components/icons";
import { WHY_CHOOSE_US, SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { buildPageStructuredData, createPageMetadata } from "@/lib/seo";

const homeDescription =
  "Cassia Accountancy helps small business owners with bookkeeping, tax returns, cloud accounting and Making Tax Digital support. Friendly, straightforward accountancy services across the UK.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Small Business Accountant UK",
    description: homeDescription,
    path: "/",
    ogImage: IMAGES.og.default,
  }),
  title: {
    absolute: `${SITE_NAME} | Small Business Accountant UK`,
  },
};

const HomePage = () => {
  return (
    <>
      <JsonLd
        data={buildPageStructuredData([{ name: "Home", path: "/" }])}
      />
      <Hero
        headline="Clear Advice. Better Decisions. Stronger Businesses."
        subheading="Supporting Small Business Owners with Tax Planning, Financial Insight and Efficient Systems That Save Time and Money."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        image={IMAGES.hero.home}
        imagePosition="object-[80%_center]"
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Straightforward Support for Busy Business Owners"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                Running a business is demanding enough without worrying about tax
                deadlines, bookkeeping and changing regulations.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                At Cassia Accountancy, we provide practical support and
                straightforward advice so you can focus on growing your business
                with confidence.
              </p>
            </div>
            <ContentImage image={IMAGES.content.homeIntro} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Practical accountancy support designed for sole traders, freelancers and small businesses."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Making Tax Digital"
              description="Helping businesses prepare for and manage MTD requirements."
              href="/making-tax-digital"
              icon={<MTDIcon />}
            />
            <ServiceCard
              title="Bookkeeping & Accounts"
              description="Accurate bookkeeping and financial reporting to keep you in control."
              href="/bookkeeping-accounts"
              icon={<BookkeepingIcon />}
            />
            <ServiceCard
              title="Tax Returns & Compliance"
              description="Reliable support for self-assessment, VAT and year-end obligations."
              href="/accounts-compliance"
              icon={<TaxIcon />}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ContentImage image={IMAGES.content.homeWhyUs} />
            <div>
              <SectionHeading title="Why Work With Us" centered={false} />
              <div className="mt-6">
                <CheckList items={WHY_CHOOSE_US} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to make your accounts easier?"
        description="Book your free discovery call today and let's talk about how we can help."
      />
    </>
  );
};

export default HomePage;
