import Link from "next/link";
import { useEffect, useState } from "react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const PageIntro = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  SwiperCore.use([EffectFade, Navigation]);

  return (
    <section className="page-intro">
      {isClient && (
        <Swiper navigation effect="fade" className="swiper-wrapper">
          <SwiperSlide>
            <div className="page-intro__slide page-intro__slide--video">
              <video
                className="page-intro__video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/poster.mp4" type="video/mp4" />
              </video>
              <div className="container">
                <div className="page-intro__slide__content">
                  <div className="hero-content">
                    <div className="hero-text">
                      <h2>Luxury Fragrances That Transform Your Space</h2>
                      <Link href="/products" className="btn-shop">
                        <i className="icon-right" />
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="page-intro__slide page-intro__slide--video">
              <video
                className="page-intro__video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/poster.mp4" type="video/mp4" />
              </video>
              <div className="container">
                <div className="page-intro__slide__content">
                  <div className="hero-content">
                    <div className="hero-text">
                      <h2>Make your house into a home</h2>
                      <Link href="/products" className="btn-shop">
                        <i className="icon-right" />
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      )}
    </section>
  );
};

export default PageIntro;