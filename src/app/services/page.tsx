import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bookkeeping, Making Tax Digital, self assessment, VAT and compliance services for small businesses across the UK.",
};

type ServiceSectionProps = {
  id: string;
  title: string;
  description: string;
  items: readonly string[];
  subtitle?: string;
};

const ServiceSection = ({
  id,
  title,
  description,
  items,
  subtitle,
}: ServiceSectionProps) => {
  return (
    <div id={id} className="scroll-mt-24">
      <SectionHeading title={title} subtitle={description} centered={false} />
      {subtitle && (
        <p className="mt-2 text-sm font-medium text-gold">{subtitle}</p>
      )}
      <div className="mt-6">
        <CheckList items={items} />
      </div>
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
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <ServiceSection
              id="mtd"
              title="Making Tax Digital"
              description="Preparing businesses for the future of digital tax reporting."
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
                id="tax"
                title="Accounts & Compliance"
                description="Year-end support and ongoing compliance to keep your business on track."
                items={[
                  "Year-end accounts",
                  "VAT returns",
                  "Management reporting",
                  "Business support",
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
