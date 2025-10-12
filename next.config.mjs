/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fortunate-light-40d1a8cc82.media.strapiapp.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
