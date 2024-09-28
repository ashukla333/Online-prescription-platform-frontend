/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      BASE_URL: process.env.BASE_URL ,
    },
    images: {
      domains: ["localhost:3000", "localhost","prescription-platform-backend.vercel.app"],
      unoptimized: true,
    }
  };
  
  export default nextConfig;
