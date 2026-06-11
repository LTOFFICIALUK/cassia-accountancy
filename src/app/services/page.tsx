import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { CheckList } from "@/components/CheckList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bookkeeping, payroll, Making Tax Digital, self assessment, VAT and compliance services for small businesses across the UK.",
};

type ServiceSectionProps = {
  id: string;
  title: string;
  description: string;
  href: string;
  items: readonly string[];
  subtitle?: string;
};

const ServiceSection = ({
  id,
  title,
  description,
  href,
  items,
  subtitle,
}: ServiceSectionProps) => {
  return (
    <div id={id} className="scroll-mt-24">
      <Link
        href={href}
        className="group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        aria-label={`Learn more about ${title}`}
      >
        <h2 className="font-heading text-3xl font-semibold text-sage transition-colors group-hover:text-gold sm:text-4xl">
          {title}
        </h2>
      </Link>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-light sm:text-lg">
        {description}
      </p>
      {subtitle && (
        <p className="mt-2 text-sm font-medium text-gold">{subtitle}</p>
      )}
      <div className="mt-6">
        <CheckList items={items} />
      </div>
      <Link
        href={href}
        className="mt-6 inline-flex items-center text-sm font-semibold text-gold transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        aria-label={`Learn more about ${title}`}
      >
        Learn more &rarr;
      </Link>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <>
      <Hero
        headline="Accountancy Services for Small Businesses"
        subheading="Practical, straightforward support tailored to sole traders, freelancers and growing businesses."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="/images/services-hero.jpg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <ServiceSection
              id="mtd"
              title="Making Tax Digital"
              description="Preparing businesses for the future of digital tax reporting."
              href="/making-tax-digital"
              items={[
                "MTD readiness reviews",
                "Software setup",
                "Training and support",
                "Digital record keeping",
                "Quarterly submissions",
              ]}
            />

            <div className="border-t border-sage/10 pt-16">
              <ServiceSection
                id="bookkeeping"
                title="Bookkeeping"
                description="Stay organised with accurate and timely bookkeeping."
                href="/bookkeeping-accounts"
                items={[
                  "Transaction processing",
                  "Bank reconciliations",
                  "Monthly reports",
                  "Cloud software management",
                ]}
              />
            </div>

            <div className="border-t border-sage/10 pt-16">
              <ServiceSection
                id="self-assessment"
                title="Self Assessment"
                description="Take the stress out of tax returns."
                href="/self-assessment"
                subtitle="Suitable for:"
                items={[
                  "Sole traders",
                  "Landlords",
                  "Freelancers",
                  "Directors",
                ]}
              />
            </div>

            <div className="border-t border-sage/10 pt-16">
              <ServiceSection
                id="accounts-compliance"
                title="Accounts & Compliance"
                description="Year-end support and ongoing compliance to keep your business on track."
                href="/accounts-compliance"
                items={[
                  "Year-end accounts",
                  "VAT returns",
                  "Management reporting",
                  "Business support",
                ]}
              />
            </div>

            <div className="border-t border-sage/10 pt-16">
              <ServiceSection
                id="payroll"
                title="Payroll"
                description="Reliable payroll support so your team gets paid accurately and on time."
                href="/payroll"
                items={[
                  "Payroll processing",
                  "PAYE and RTI submissions",
                  "Pension auto-enrolment",
                  "Employee payslips",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which service you need?"
        description="Book a free discovery call and we'll help you find the right support for your business."
      />
    </>
  );
};

export default ServicesPage;
