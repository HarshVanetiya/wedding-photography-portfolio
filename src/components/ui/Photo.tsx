import Image, { type ImageProps } from "next/image";
import { getPhoto, type PhotoSlug } from "@/lib/photos";

type PhotoProps = Omit<ImageProps, "src" | "alt" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  slug: PhotoSlug;
  /** Overrides the alt text from scripts/photos.mjs. Pass "" for decorative use. */
  alt?: string;
  /** Blur-up placeholder by default; "empty" lets a layer underneath show through. */
  placeholder?: "blur" | "empty";
};

/** next/image wired to the photo manifest: size, alt text and blur placeholder come for free. */
export function Photo({ slug, alt, fill, placeholder = "blur", ...props }: PhotoProps) {
  const photo = getPhoto(slug);
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      placeholder={placeholder}
      blurDataURL={placeholder === "blur" ? photo.blurDataURL : undefined}
      {...(fill ? { fill } : { width: photo.width, height: photo.height })}
      {...props}
    />
  );
}
