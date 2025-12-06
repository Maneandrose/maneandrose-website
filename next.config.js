/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
      // Force Turbopack to treat THIS folder as the true project root.
      root: __dirname,
    },
  
    // Optional but stabilises CSS processing in Next 15/16
    experimental: {
      optimizeCss: true,
    },
  };
  
  module.exports = nextConfig;
  