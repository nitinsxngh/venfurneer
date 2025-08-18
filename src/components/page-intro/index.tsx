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
                muted
                loop
                playsInline
                poster="/images/slide-1.png"
              >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>Sale of the summer collection</h2>
                  <Link href="/products" className="btn-shop">
                    <i className="icon-right" />
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="page-intro__slide page-intro__slide--video">
              <video
                className="page-intro__video"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/slide-2.png"
              >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>Make your house into a home</h2>
                  <Link href="/products" className="btn-shop">
                    <i className="icon-right" />
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      )}

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over ₹5,000</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients&apos; opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash" />
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
