export const ASTRO_IMAGE_FALLBACK = "/images/astro-placeholder.svg";

export const getImageSource = (item, defaultSource = ASTRO_IMAGE_FALLBACK) =>
  item?.image ||
  item?.astro?.image ||
  item?.imageUrl ||
  item?.avatar ||
  defaultSource;

export const handleImageError = (event) => {
  if (!event.currentTarget.src.endsWith(ASTRO_IMAGE_FALLBACK)) {
    event.currentTarget.src = ASTRO_IMAGE_FALLBACK;
  }
};
