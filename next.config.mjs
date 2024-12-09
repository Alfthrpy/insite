/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'], // Domain gambar profil Google
        domains: ['res.cloudinary.com'],
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

