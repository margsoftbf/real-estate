import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
        },
    ],
},
  reactStrictMode: true,
  turbo: {},
};

export default nextConfig;
