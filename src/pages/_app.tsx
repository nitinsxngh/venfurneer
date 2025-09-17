// global styles
import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

// types
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Router from "next/router";
import React, { Fragment } from "react";
import { SWRConfig } from "swr";

import { wrapper } from "../store";
import * as gtag from "../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--main-font",
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (url: string) => fetch(url).then((res) => res.json()),
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }}
  >
    <Fragment>
      <style jsx global>{`
        :root {
          --main-font: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Fragment>
  </SWRConfig>
);

export default wrapper.withRedux(MyApp);
