import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CheckList } from "@/components/CheckList";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Bookkeeping & Accounts",
  description:
    "Accurate bookkeeping and financial reporting for sole traders, freelancers and small businesses. Transaction processing, reconciliations and cloud accounting support.",
  keywords: [
    "bookkeeping accountant",
    "small business bookkeeping",
    "cloud accounting support",
    "monthly accounts",
  ],
};

const BOOKKEEPING_HELP_ITEMS = [
  "Keep your records accurate and up to date",
  "Understand your cash flow and profitability",
  "Reduce stress at year-end",
  "Make better business decisions with clear reports",
] as const;

const BookkeepingAccountsPage = () => {
  return (
    <>
      <Hero
        headline="Bookkeeping & Accounts"
        subheading="Stay organised with accurate bookkeeping and financial reporting that keeps you in control."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="/images/plants.jpeg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Why Good Bookkeeping Matters"
                centered={false}
              />
              <p className="mt-6 text-base leading-relaxed text-charcoal-light">
                Accurate bookkeeping is the foundation of a healthy business. It
                gives you a clear picture of your income, expenses and cash
                flow — so you can make informed decisions with confidence.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light">
                Whether you&apos;re a sole trader, freelancer or growing small
                business, staying on top of your accounts saves time, reduces
                errors and makes tax deadlines far less stressful.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/sarah1.jpeg"
                alt="Accountant reviewing financial records"
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
            subtitle="We take the admin off your plate so you can focus on running and growing your business."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <CheckList items={BOOKKEEPING_HELP_ITEMS} />
          </div>
          <div className="mt-10 text-center">
            <Button
              href="/contact"
              variant="secondary"
              ariaLabel="Book a free discovery call for bookkeeping support"
            >
              Book a Free Discovery Call
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Bookkeeping Services"
            subtitle="Practical support to keep your finances organised and your reporting on track."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Transaction Processing",
                description:
                  "We categorise and record your income and expenses accurately, keeping your books up to date.",
              },
              {
                title: "Bank Reconciliations",
                description:
                  "Regular reconciliation ensures your records match your bank statements and nothing is missed.",
              },
              {
                title: "Monthly Reports",
                description:
                  "Clear, easy-to-understand reports so you always know where your business stands financially.",
              },
              {
                title: "Cloud Software Management",
                description:
                  "Expert setup and ongoing support for Xero, QuickBooks and other cloud accounting platforms.",
              },
              {
                title: "Expense Tracking",
                description:
                  "We help you capture and organise business expenses so you claim everything you're entitled to.",
              },
              {
                title: "Year-End Preparation",
                description:
                  "Well-maintained records throughout the year make year-end accounts and tax returns straightforward.",
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
        title="Ready to get your accounts in order?"
        description="Book your free discovery call and find out how we can simplify your bookkeeping."
        buttonText="Book a Free Discovery Call"
      />
    </>
  );
};

export default BookkeepingAccountsPage;
