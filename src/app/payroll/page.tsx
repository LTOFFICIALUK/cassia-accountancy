import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { buildPageStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Payroll",
  description:
    "Reliable payroll support for small businesses. Payroll processing, PAYE, RTI submissions, pension auto-enrolment and employee payslips.",
  path: "/payroll",
  keywords: [
    "small business payroll",
    "PAYE accountant",
    "payroll processing",
    "pension auto-enrolment",
  ],
});

const PAYROLL_HELP_ITEMS = [
  "Pay your team accurately and on time",
  "Meet PAYE and RTI submission deadlines",
  "Stay compliant with pension auto-enrolment",
  "Reduce admin so you can focus on your business",
] as const;

const PayrollPage = () => {
  return (
    <>
      <JsonLd
        data={buildPageStructuredData([
          { name: "Home", path: "/" },
          { name: "Payroll", path: "/payroll" },
        ])}
      />
      <Hero
        headline="Payroll Services"
        subheading="Reliable payroll support so your team gets paid accurately and on time."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="/images/sarah.jpeg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Payroll You Can Rely On"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                Running payroll means more than just paying wages. You need to
                calculate tax and National Insurance correctly, submit RTI
                returns to HMRC on time, and manage pension auto-enrolment —
                all while keeping your employees informed.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                We take the complexity off your plate with accurate, timely
                payroll processing that keeps your team paid and your business
                compliant.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/plants.jpeg"
                alt="Office plants representing a calm, organised workplace"
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
            title="How Cassia Accountancy Helps"
            subtitle="We handle the payroll admin so you can focus on running and growing your business."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <CheckList items={PAYROLL_HELP_ITEMS} />
          </div>
          <div className="mt-10 text-center">
            <Button
              href="/contact"
              variant="secondary"
              ariaLabel="Book a free discovery call for payroll support"
            >
              Book a Free Discovery Call
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Payroll Services"
            subtitle="Complete payroll support for small businesses with employees."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Payroll Processing",
                description:
                  "Accurate calculation of wages, tax, National Insurance and deductions every pay period.",
              },
              {
                title: "PAYE & RTI Submissions",
                description:
                  "Timely Real Time Information submissions to HMRC so you stay compliant with PAYE obligations.",
              },
              {
                title: "Pension Auto-Enrolment",
                description:
                  "Setup and ongoing management of workplace pension contributions for eligible employees.",
              },
              {
                title: "Employee Payslips",
                description:
                  "Clear, professional payslips delivered to your team each pay period.",
              },
              {
                title: "Starter & Leaver Processing",
                description:
                  "Smooth onboarding and offboarding with correct tax codes and final payments handled.",
              },
              {
                title: "Year-End Reporting",
                description:
                  "P60s, P11Ds and other year-end payroll reporting prepared and submitted on time.",
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
        title="Ready to simplify your payroll?"
        description="Book your free discovery call and find out how we can take the admin off your plate."
        buttonText="Book a Free Discovery Call"
      />
    </>
  );
};

export default PayrollPage;
