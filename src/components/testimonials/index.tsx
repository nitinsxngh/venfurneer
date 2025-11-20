import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// eslint-disable-next-line react-hooks/rules-of-hooks
SwiperCore.use([Navigation, Pagination, Autoplay]);

type Testimonial = {
  id: number;
  client: string;
  image: string;
  sector: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    client: "Hotel White Sands, Puri",
    image: "/testimonial/1.jpeg",
    sector: "Luxury Hospitality",
  },
  {
    id: 2,
    client: "Sumit Jewellers, Raipur",
    image: "/testimonial/2.jpeg",
    sector: "Retail Experience",
  },
  {
    id: 3,
    client: "Mad Bakers",
    image: "/testimonial/3.jpeg",
    sector: "Boutique Café",
  },
  {
    id: 4,
    client: "Hotel GRS, Ambikapur",
    image: "/testimonial/4.jpeg",
    sector: "Premium Hospitality",
  },
  {
    id: 5,
    client: "ELEM Furniture",
    image: "/testimonial/5.jpeg",
    sector: "Design Studio",
  },
  {
    id: 6,
    client: "Swarn Bhumi Luxury Residential, Raipur",
    image: "/testimonial/6.jpeg",
    sector: "Luxury Residences",
  },
];

const Testimonials = () => {
  const [isClient, setIsClient] = useState(false);
  const sharedCopy = useMemo(
    () => "We have installed many diffusers and signature scents throughout these prestigious spaces, elevating every moment with bespoke fragrance experiences.",
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="testimonials">
      <div className="container testimonials__container">
        <div className="testimonials__header">
          <p className="testimonials__eyebrow">@Testimonial</p>
          <h2 className="testimonials__title">Trusted by Luxury Spaces</h2>
          <p className="testimonials__subtitle">
            Black and white precision, aligned aesthetics, and immersive scents for every iconic property.
          </p>
        </div>
      </div>

      <div className="testimonials__carousel-wrapper">
        {isClient && (
          <Swiper
            className="testimonials__carousel"
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            speed={800}
            loop
            watchSlidesProgress
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={`testimonial-${item.id}`}>
                <article className="testimonial-card">
                  <div className="testimonial-card__media">
                    <Image
                      src={item.image}
                      alt={`${item.client} diffuser installation`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={item.id === 1}
                    />
                  </div>
                  <div className="testimonial-card__body">
                    <p className="testimonial-card__quote">{sharedCopy}</p>
                    <div className="testimonial-card__meta">
                      <h3>{item.client}</h3>
                      <span>{item.sector}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

