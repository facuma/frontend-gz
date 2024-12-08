// next.config.mjs
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibb.co',
        pathname: '/**', // Permitir todas las rutas de iBB
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // El dominio donde están alojadas las imágenes reales
        pathname: '/**',
      },
    ], // Agrega el dominio de tu backend para cargar imágenes.
  },
  
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

module.exports = nextConfig;