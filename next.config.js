/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const nextConfig = {
  //output: 'export',
  //distDir: 'build',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // pageExtensions: ['page.js', 'page.jsx', 'page.ts', 'page.tsx'],
  images: {
    domains: ["localhost", "docs.google.com", 'firebasestorage.googleapis.com', 'picsum.photos', 'encrypted-tbn0.gstatic.com'],
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "localhost",
    //     port: "3000",
    //   },
    // ],
  },
  
 
 


 

};

module.exports = withNextIntl(nextConfig);
