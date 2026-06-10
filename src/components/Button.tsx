import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold-light focus-visible:ring-gold",
  secondary:
    "bg-sage text-white hover:bg-sage-dark focus-visible:ring-sage",
  outline:
    "border-2 border-sage text-sage hover:bg-sage hover:text-white focus-visible:ring-sage",
};

export const Button = ({
  href,
  children,
  variant = "primary",
  className = "",
  ariaLabel,
}: ButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};
