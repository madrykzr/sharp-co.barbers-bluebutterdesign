import { useState, ImgHTMLAttributes } from "react";

// Curated 4K Unsplash fallbacks for barbershop themes
const UN_FALLBACKS: Record<string, string> = {
  "/hero-bg.jpg": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1800&auto=format&fit=crop",
  "/barber-1.jpg": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
  "/barber-2.jpg": "https://images.unsplash.com/photo-1605497746444-ac9dbd538597?q=80&w=600&auto=format&fit=crop",
  "/barber-3.jpg": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop",
  "/products.jpg": "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=800&auto=format&fit=crop"
};

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWithFallback({ src, alt, className, ...props }: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);

  const handleError = () => {
    if (!hasTriedFallback && UN_FALLBACKS[src]) {
      setCurrentSrc(UN_FALLBACKS[src]);
      setHasTriedFallback(true);
    } else if (!hasTriedFallback) {
      // General fallback to a neat dark placeholder
      setCurrentSrc(`https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop`);
      setHasTriedFallback(true);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
