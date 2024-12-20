import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                pathname: '/photos/**', // You can add specific path patterns if needed
            },
        ],
    },
};
export default nextConfig;
