import { useCallback, useEffect, useState } from "react";

type GalleryProductType = {
  images?: string[];
};

const Gallery = ({ images = [] }: GalleryProductType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasMultipleImages = images.length > 1;

  const showNextImage = useCallback(() => {
    if (!images.length) {
      return;
    }
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const showPreviousImage = useCallback(() => {
    if (!images.length) {
      return;
    }
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Reset gallery when images change
  useEffect(() => {
    setActiveIndex(0);
    setIsLightboxOpen(false);
  }, [images]);

  // Close lightbox on escape and support arrow navigation
  useEffect(() => {
    if (!isLightboxOpen || !hasMultipleImages) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, hasMultipleImages, images.length, showNextImage, showPreviousImage]);

  // Prevent background scroll while lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen]);

  // Handle case when images is undefined or empty
  if (!images || images.length === 0) {
    return (
      <section className="product-gallery">
        <div className="product-gallery__image">
          <div className="product-gallery__placeholder">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21,15 16,10 5,21"></polyline>
            </svg>
            <p>No image available</p>
          </div>
        </div>
      </section>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <section className="product-gallery">
      {hasMultipleImages && (
        <div className="product-gallery__thumbs" aria-label="Product thumbnails">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`product-gallery__thumb ${activeIndex === index ? "product-gallery__thumb--active" : ""
                }`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              aria-label={`View product image ${index + 1}`}
              aria-current={activeIndex === index}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      <div className="product-gallery__image">
        <button
          type="button"
          className="product-gallery__image-trigger"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Expand product image"
        >
          <img src={activeImage} alt={`Product image ${activeIndex + 1}`} />
          <span className="product-gallery__zoom-hint">
            Click to view full screen
          </span>
        </button>
      </div>

      {isLightboxOpen && (
        <div
          className="product-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded product image"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="product-gallery__lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="product-gallery__lightbox-close"
              aria-label="Close image preview"
              onClick={() => setIsLightboxOpen(false)}
            >
              ×
            </button>
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  className="product-gallery__lightbox-nav product-gallery__lightbox-nav--prev"
                  aria-label="View previous image"
                  onClick={showPreviousImage}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="product-gallery__lightbox-nav product-gallery__lightbox-nav--next"
                  aria-label="View next image"
                  onClick={showNextImage}
                >
                  ›
                </button>
              </>
            )}
            <img
              src={activeImage}
              alt={`Enlarged product image ${activeIndex + 1}`}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
