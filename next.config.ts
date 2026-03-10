import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vwqjquuexxgkowkdftfb.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'en.onepiece-cardgame.com',
      },
      {
        protocol: 'https',
        hostname: 'cards.scryfall.io',
      },
    ],
  },
};

export default nextConfig;
