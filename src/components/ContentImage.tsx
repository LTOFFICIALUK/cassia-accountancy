import Image from "next/image";
import type { SiteImage } from "@/lib/images";

type ContentImageProps = {
  image: SiteImage;
  aspectRatio?: "4/3" | "3/4" | "16/10" | "square";
  objectFit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
  padded?: boolean;
};

const aspectClasses = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  square: "aspect-square",
} as const;

export const ContentImage = ({
  image,
  aspectRatio = "4/3",
  objectFit = "cover",
  priority = false,
  className = "",
  padded = false,
}: ContentImageProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg ${aspectClasses[aspectRatio]} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`${objectFit === "contain" ? "object-contain" : "object-cover"} ${padded ? "p-6" : ""}`}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
};
