type GalleryProductType = {
  images?: string[];
};

const Gallery = ({ images = [] }: GalleryProductType) => {
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

  const featImage = images[0];

  return (
    <section className="product-gallery">
      {images.length > 1 && (
        <div className="product-gallery__thumbs">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="product-gallery__thumb">
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      )}

      <div className="product-gallery__image">
        <img src={featImage} alt="" />
      </div>
    </section>
  );
};

export default Gallery;
