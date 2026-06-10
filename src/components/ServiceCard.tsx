import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href?: string;
  icon: React.ReactNode;
};

export const ServiceCard = ({
  title,
  description,
  href,
  icon,
}: ServiceCardProps) => {
  const content = (
    <div className="group flex h-full flex-col rounded-xl border border-sage/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md sm:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sage/10 text-sage transition-colors group-hover:bg-gold/10 group-hover:text-gold">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-semibold text-sage">{title}</h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-charcoal-light">
        {description}
      </p>
      {href && (
        <span className="mt-4 text-sm font-semibold text-gold transition-colors group-hover:text-gold-light">
          Learn more &rarr;
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full" aria-label={`Learn more about ${title}`}>
        {content}
      </Link>
    );
  }

  return content;
};
