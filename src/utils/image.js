export const ASTRO_IMAGE_FALLBACK = "/images/astro-placeholder.svg";

export const getImageSource = (item, defaultSource = ASTRO_IMAGE_FALLBACK) =>
  item?.image ||
  item?.astro?.image ||
  item?.imageUrl ||
  item?.avatar ||
  defaultSource;

export const getImageFallbackSource = (item) =>
  item?.localImage || ASTRO_IMAGE_FALLBACK;

export const handleImageError = (event) => {
  const image = event.currentTarget;
  const fallback = image.dataset.fallbackSrc || ASTRO_IMAGE_FALLBACK;

  if (!image.src.endsWith(fallback)) {
    image.src = fallback;
    return;
  }

  if (fallback !== ASTRO_IMAGE_FALLBACK) {
    image.dataset.fallbackSrc = ASTRO_IMAGE_FALLBACK;
    image.src = ASTRO_IMAGE_FALLBACK;
  }
};
