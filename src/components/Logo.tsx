import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
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
  const imageMeta = variant === "footer" ? IMAGES.logo.light : IMAGES.logo.default;

  const sizeClass =
    className ||
    (variant === "header" ? "h-10 w-auto sm:h-11" : "h-11 w-auto sm:h-12");

  const image = (
    <Image
      src={imageMeta.src}
      alt={imageMeta.alt}
      width={imageMeta.width}
      height={imageMeta.height}
      className={`object-contain ${sizeClass}`}
      priority
    />
  );

  if (!linked) {
    return <span className="inline-flex shrink-0 items-center">{image}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} home`}
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
    >
      {image}
    </Link>
  );
};
