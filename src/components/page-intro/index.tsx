import { useEffect, useRef, useState } from "react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const PageIntro = () => {
  const [isClient, setIsClient] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [videosReady, setVideosReady] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const slides = ["/poster.mp4", "/poster.mp4"];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setIsAudioEnabled(true);
  }, [isClient]);

  useEffect(() => {
    if (!videosReady) return;

    let audioWasDisabled = false;

    const ensurePlayback = async () => {
      await Promise.all(
        videoRefs.current.map(async (video) => {
          if (!video) return;

          video.muted = !isAudioEnabled;

          try {
            await video.play();
          } catch {
            if (isAudioEnabled) {
              video.muted = true;
              try {
                await video.play();
              } catch {
                /* ignore */
              }
              audioWasDisabled = true;
            }
          }
        })
      );

      if (audioWasDisabled) {
        setIsAudioEnabled(false);
      }
    };

    ensurePlayback();
  }, [isAudioEnabled, videosReady]);

  SwiperCore.use([EffectFade, Navigation]);

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  return (
    <section className="page-intro">
      {isClient && (
        <>
          <Swiper navigation effect="fade" className="swiper-wrapper">
            {slides.map((src, index) => (
              <SwiperSlide key={src + index}>
                <div className="page-intro__slide page-intro__slide--video">
                  <video
                    className="page-intro__video"
                    autoPlay
                    loop
                    muted={!isAudioEnabled}
                    playsInline
                    ref={(node) => {
                      if (node) {
                        videoRefs.current[index] = node;
                        if (
                          !videosReady &&
                          videoRefs.current.filter(Boolean).length === slides.length
                        ) {
                          setVideosReady(true);
                        }
                      }
                    }}
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="page-intro__audio-toggle"
            onClick={toggleAudio}
            aria-pressed={isAudioEnabled}
            aria-label={isAudioEnabled ? "Mute video" : "Enable audio"}
          >
            {isAudioEnabled ? (
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 9v6h4l5 5V4L9 9H5z"
                  fill="currentColor"
                />
                <path
                  d="M16 10l4 4m0-4l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 9v6h4l5 5V4L9 9H5z"
                  fill="currentColor"
                />
                <path
                  d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03M18.5 12c0 1.77-1.02 3.29-2.5 4.03M21 12c0-3.03-1.73-5.65-4.25-6.97M21 12c0 3.03-1.73 5.65-4.25 6.97"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </>
      )}
    </section>
  );
};

export default PageIntro;