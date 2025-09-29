// import Swiper core and required components
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import type { ProductType } from "@/types";

import ProductItem from "../../product-item";

type ProductsCarouselType = {
  products?: ProductType[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [isClient, setIsClient] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1.3);
  const [centeredSlides, setCenteredSlides] = useState(true);
  const [spaceBetween, setSpaceBetween] = useState(30);

  useEffect(() => {
    setIsClient(true);

    if (window.innerWidth > 768) {
      setSlidesPerView(3);
      setSpaceBetween(35);
      setCenteredSlides(false);
    }
    if (window.innerWidth > 1024) {
      setSlidesPerView(4);
      setSpaceBetween(65);
      setCenteredSlides(false);
    }
  }, []);

  if (!products || !Array.isArray(products) || products.length === 0) return <div>Loading</div>;

  if (!isClient) return <div>Loading...</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop
        centeredSlides={centeredSlides}
        watchOverflow
        slidesPerView={slidesPerView}
        className="swiper-wrapper"
      >
        {products && Array.isArray(products) && products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              discount={item.discount}
              currentPrice={item.currentPrice}
              images={item.images || []}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
