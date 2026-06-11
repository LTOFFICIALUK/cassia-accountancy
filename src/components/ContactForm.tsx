"use client";

import { useState } from "react";
import { BrandedSelect } from "@/components/BrandedSelect";
import { PreferredDateTimeField } from "@/components/PreferredDateTimeField";

const SERVICE_OPTIONS = [
  "Making Tax Digital",
  "Bookkeeping & Accounts",
  "Tax Returns & Compliance",
  "Payroll",
  "Self Assessment",
  "VAT",
  "General Enquiry",
] as const;

const BUSINESS_TYPE_OPTIONS = [
  "Sole Trader",
  "Freelancer",
  "Landlord",
  "Limited Company",
  "Start-up",
  "Other",
] as const;

const INPUT_CLASSNAME =
  "mt-1.5 w-full rounded-md border border-sage/20 bg-cream px-4 py-2.5 text-sm text-charcoal transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

const SERVICE_SELECT_OPTIONS = SERVICE_OPTIONS.map((option) => ({
  value: option,
  label: option,
}));

const BUSINESS_TYPE_SELECT_OPTIONS = BUSINESS_TYPE_OPTIONS.map((option) => ({
  value: option,
  label: option,
}));

type ContactFormProps = {
  variant?: "contact" | "quote";
};

export const ContactForm = ({ variant = "contact" }: ContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isQuote = variant === "quote";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variant,
          name: formData.get("name"),
          businessName: formData.get("businessName"),
          businessType: formData.get("businessType"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          services: formData.get("services"),
          preferredDateTime: formData.get("preferredDateTime"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your enquiry right now.");
      }

      setIsSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your enquiry right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="rounded-xl border border-sage/10 bg-white p-8 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/10 text-2xl text-sage">
          ✓
        </div>
        <h3 className="font-heading text-2xl font-semibold text-sage">
          Thank You
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
          {isQuote
            ? "Your quote request has been received. We'll review your details and be in touch with a personalised quote shortly."
            : "Your message has been received. We'll be in touch shortly to arrange your free discovery call."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-sage/10 bg-white p-6 shadow-sm sm:p-8"
      aria-label={isQuote ? "Quote request form" : "Contact form"}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal">
            Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className={INPUT_CLASSNAME}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-charcoal"
          >
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            disabled={isSubmitting}
            className={INPUT_CLASSNAME}
            placeholder="Your business name"
          />
        </div>

        {isQuote && (
          <div className="sm:col-span-2">
            <label
              htmlFor="businessType"
              className="block text-sm font-medium text-charcoal"
            >
              Business Type <span className="text-gold">*</span>
            </label>
            <BrandedSelect
              id="businessType"
              name="businessType"
              options={BUSINESS_TYPE_SELECT_OPTIONS}
              placeholder="Select your business type"
              required
              disabled={isSubmitting}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal">
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className={INPUT_CLASSNAME}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            disabled={isSubmitting}
            className={INPUT_CLASSNAME}
            placeholder="Your phone number"
          />
        </div>

        {isQuote && (
          <div className="sm:col-span-2">
            <label
              htmlFor="preferredDay"
              className="block text-sm font-medium text-charcoal"
            >
              Preferred Contact Date &amp; Time <span className="text-gold">*</span>
            </label>
            <PreferredDateTimeField disabled={isSubmitting} />
          </div>
        )}

        <div className="sm:col-span-2">
          <label
            htmlFor="services"
            className="block text-sm font-medium text-charcoal"
          >
            {isQuote ? "Services Interested In" : "Services Needed"}{" "}
            <span className="text-gold">*</span>
          </label>
          <BrandedSelect
            id="services"
            name="services"
            options={SERVICE_SELECT_OPTIONS}
            placeholder="Select a service"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-charcoal"
          >
            {isQuote ? "Tell Us About Your Needs" : "Message"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            disabled={isSubmitting}
            className={`${INPUT_CLASSNAME} resize-y`}
            placeholder={
              isQuote
                ? "Tell us about your business, the support you need, and anything else that will help us prepare your quote..."
                : "Tell us a little about your business and what you need help with..."
            }
          />
        </div>
      </div>

      {error && (
        <p
          className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting
          ? "Sending..."
          : isQuote
            ? "Request a Quote"
            : "Book Your Free Discovery Call"}
      </button>
    </form>
  );
};
