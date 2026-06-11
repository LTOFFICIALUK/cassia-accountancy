import Image from "next/image";
import { Button } from "@/components/Button";

type HeroProps = {
  headline: string;
  subheading: string;
  ctaText?: string | null;
  ctaHref?: string;
  imageSrc?: string;
  imagePosition?: string;
  compact?: boolean;
};

export const Hero = ({
  headline,
  subheading,
  ctaText = "Book a Free Discovery Call",
  ctaHref = "/contact",
  imageSrc = "/images/hero-default.jpg",
  imagePosition = "object-center",
  compact = false,
}: HeroProps) => {
  return (
    <section
      className={`relative overflow-hidden bg-sage ${compact ? "py-16" : "py-20 sm:py-28"}`}
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src={imageSrc}
          alt=""
          fill
          className={`object-cover ${imagePosition}`}
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-sage/95 via-sage/90 to-sage/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/85 sm:text-xl">
            {subheading}
          </p>
          {ctaText && (
            <div className="mt-8">
              <Button href={ctaHref} variant="primary" ariaLabel={ctaText}>
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
