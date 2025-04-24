/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/(.*)', // Pattern to match static assets
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for 1 year (31536000 seconds)
          },
        ],
      },
    ];
  },

    env: {
        ZOOM_WEBHOOK_SECRET_TOKEN: process.env.ZOOM_WEBHOOK_SECRET,
      },
};

export default nextConfig;
