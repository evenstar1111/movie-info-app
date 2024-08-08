/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   compress: false,
   compiler: {
      emotion: {
         sourceMap: false,
      },
   },
   experimental: {
      optimizePackageImports: ['@mui/material', '@mui/icons-material', 'recharts'],
   },
};

module.exports = nextConfig;
