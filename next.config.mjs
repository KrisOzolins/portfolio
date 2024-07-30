import withMDX from '@next/mdx';
// import createNextIntlPlugin from 'next-intl/plugin';

import { fileURLToPath } from 'url';
import path, { resolve } from 'path';

// const withNextIntl = createNextIntlPlugin();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for pages router as well.
  // Next.js compiler configuration.
  compiler: {
    styledComponents: {
      ssr: true,
    },
    // removeConsole: {
    //   exclude: ['error', 'warn'],
    //   // production: true,
    // },
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'], // Add MDX extension.
  // Experimental features.
  experimental: {
    // mdxRs: true, // Enable Rust-based MDX compiler.
  },
  // Next.js image optimization configuration.
  images: {
    // Allow loading images from googleusercontent.com.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n configuration.
  i18n: {
    locales: ['en-US', 'lv'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },
  // Rewrites for custom routes.
  rewrites: async () => {
    return [
      {
        source: '/notes/:path*',
        destination: '/notes',
      },
    ];
  },
  // Webpack configuration.
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': resolve(__dirname, 'components'),
      '@styles': resolve(process.cwd(), 'styles'),
    };
    return config;
  },
};

// Currently only pages router is configured with i18n routing.
// For app router setup with i18n routing:
// export default withMDX()(withNextIntl(nextConfig));

export default withMDX()(nextConfig);
