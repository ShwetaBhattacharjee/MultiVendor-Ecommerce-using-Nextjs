import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignores ESLint warnings during Vercel deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TS errors during Vercel builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
