const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://perfume-ecom-4wlaaoy0m-nitins-projects-51fde495.vercel.app";
