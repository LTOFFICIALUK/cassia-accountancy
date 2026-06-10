import { Button } from "@/components/Button";

type PricingCardProps = {
  title: string;
  price: string;
  features: readonly string[];
  highlighted?: boolean;
};

export const PricingCard = ({
  title,
  price,
  features,
  highlighted = false,
}: PricingCardProps) => {
  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-6 sm:p-8 ${
        highlighted
          ? "border-gold bg-white shadow-lg ring-2 ring-gold/20"
          : "border-sage/10 bg-white shadow-sm"
      }`}
    >
      {highlighted && (
        <span className="mb-4 inline-block self-start rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
          Most Popular
        </span>
      )}
      <h3 className="font-heading text-2xl font-semibold text-sage">{title}</h3>
      <p className="mt-2 font-heading text-3xl font-semibold text-gold">
        {price}
      </p>
      <ul className="mt-6 flex-grow space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-charcoal-light">
            <span className="mt-0.5 text-gold" aria-hidden="true">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button
          href="/contact"
          variant={highlighted ? "primary" : "outline"}
          className="w-full"
          ariaLabel={`Get started with ${title}`}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
