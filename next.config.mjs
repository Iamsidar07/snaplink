/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
