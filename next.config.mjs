/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'], // Domain gambar profil Google
  },
  async rewrites() {
    return [
      {
        source: '/form/:path*',
        destination: '/not-app/form/:path*',
      },
    ];
  },
};

export default nextConfig;

