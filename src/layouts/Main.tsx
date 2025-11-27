import Head from "next/head";
import { useRouter } from "next/router";

import Header from "@/components/header";
import HeaderStrip from "@/components/header-strip";

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
};

const MainLayout = ({
  children,
  title = "venfurneer - Premium Scent Diffusers & Oils for Home & Office",
}: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main">
      <Head>
        <title>{title}</title>
      </Head>

      <HeaderStrip />
      <Header />

      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default MainLayout;
