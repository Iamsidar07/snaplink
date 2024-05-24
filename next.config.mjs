/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/*/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/favicon.ico",
      },
      {
        hostname: "api.producthunt.com",
      },
      {
        hostname: "opengraph.githubassets.com",
      },
      {
        hostname: "www.google.com",
      },
    ],
  },
};

export default nextConfig;
