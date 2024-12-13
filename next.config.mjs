/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com', 'placehold.co'],
  },
  experimental: {
    middlewarePrefetch: 'flexible', // Memastikan middleware selalu dijalankan pada setiap request
  },
  async headers() {
    return [
      {
        // Pastikan header berlaku untuk API atau path tertentu sesuai kebutuhan
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Disesuaikan dengan kebutuhan CORS
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,POST" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
