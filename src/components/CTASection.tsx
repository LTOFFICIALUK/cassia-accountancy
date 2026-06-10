import { Button } from "@/components/Button";

type CTASectionProps = {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

export const CTASection = ({
  title,
  description,
  buttonText = "Book Your Free Discovery Call",
  buttonHref = "/contact",
}: CTASectionProps) => {
  return (
    <section className="border-b border-sage/10 bg-sage py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold text-cream sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-cream/80 sm:text-lg">
            {description}
          </p>
        )}
        <div className="mt-8">
          <Button href={buttonHref} variant="primary" ariaLabel={buttonText}>
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
