import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

type LogoProps = {
  className?: string;
  linked?: boolean;
  variant?: "header" | "footer";
};

export const Logo = ({
  className = "",
  linked = true,
  variant = "header",
}: LogoProps) => {
  const sizeClass =
    className ||
    (variant === "header" ? "h-8 w-auto sm:h-9" : "h-10 w-auto sm:h-11");

  const image = (
    <Image
      src="/logo.png"
      alt={SITE_NAME}
      width={867}
      height={455}
      className={`object-contain ${sizeClass}`}
      priority
    />
  );

  const content =
    variant === "header" ? (
      <span className="inline-flex items-center rounded-md bg-sage px-3 py-1.5 sm:px-3.5 sm:py-2">
        {image}
      </span>
    ) : (
      image
    );

  if (!linked) {
    return <span className="inline-flex shrink-0 items-center">{content}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} home`}
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
    >
      {content}
    </Link>
  );
};
