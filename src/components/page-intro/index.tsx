import Link from "next/link";
import { useEffect, useState } from "react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BookAppointment from "../book-appointment";

const PageIntro = () => {
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  SwiperCore.use([EffectFade, Navigation]);

  return (
    <section className="page-intro">
      {isClient && (
        <Swiper navigation effect="fade" className="swiper-wrapper">
          <SwiperSlide>
            <div className={`page-intro__slide page-intro__slide--video ${videoLoaded ? 'video-loaded' : 'video-loading'}`}>
              <video
                className="page-intro__video"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoad}
              >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="container">
                <div className="page-intro__slide__content">
                  <div className="hero-content">
                    <div className="hero-text">
                      <h2>Sale of the summer collection</h2>
                      <Link href="/products" className="btn-shop">
                        <i className="icon-right" />
                        Shop now
                      </Link>
                    </div>
                    <div className="hero-form">
                      <BookAppointment />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={`page-intro__slide page-intro__slide--video ${videoLoaded ? 'video-loaded' : 'video-loading'}`}>
              <video
                className="page-intro__video"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoad}
              >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
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
                    <div className="hero-form">
                      <BookAppointment />
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
