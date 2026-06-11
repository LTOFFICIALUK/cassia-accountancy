import Image from "next/image";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { BookkeepingIcon, MTDIcon, TaxIcon } from "@/components/icons";
import { WHY_CHOOSE_US } from "@/lib/constants";

const HomePage = () => {
  return (
    <>
      <Hero
        headline="Clear Advice. Better Decisions. Stronger Businesses."
        subheading="Supporting Small Business Owners with Tax Planning, Financial Insight and Efficient Systems That Save Time and Money."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/home-intro.jpg"
                alt="Small business team collaborating in a modern office"
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
              href="/services#bookkeeping"
              icon={<BookkeepingIcon />}
            />
            <ServiceCard
              title="Tax Returns & Compliance"
              description="Reliable support for self-assessment, VAT and year-end obligations."
              href="/services#tax"
              icon={<TaxIcon />}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/home-why-us.jpg"
                alt="Professional consultant providing friendly advice"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
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
