import { useRouter } from "next/router";

import Header from "@/components/header";
import HeaderStrip from "@/components/header-strip";
import SEOHead from "@/components/seo/Head";

type LayoutType = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "product" | "article";
  noindex?: boolean;
  keywords?: string[];
  structuredData?: object;
  children?: React.ReactNode;
};

const MainLayout = ({
  children,
  title = "Premium Scent Diffusers & Essential Oils for Home & Office",
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  keywords = [],
  structuredData,
}: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main">
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        ogType={ogType}
        noindex={noindex}
        keywords={keywords}
        structuredData={structuredData}
      />

      <HeaderStrip />
      <Header />

      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default MainLayout;
