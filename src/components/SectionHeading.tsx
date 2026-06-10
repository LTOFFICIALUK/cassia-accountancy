type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
};

export const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) => {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2
        className={`font-heading text-3xl font-semibold sm:text-4xl ${
          light ? "text-cream" : "text-sage"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
            centered ? "mx-auto" : ""
          } ${light ? "text-cream/80" : "text-charcoal-light"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
