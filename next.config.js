const disableImageOptimization = Number(process.env.OPTIMIZE_IMAGES) === 0;

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
   images: {
      unoptimized: disableImageOptimization,
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            pathname: '/**',
         },
      ],
   },
};

module.exports = nextConfig;
