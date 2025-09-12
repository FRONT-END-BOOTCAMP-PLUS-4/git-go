import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "/**",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ 빌드 중 ESLint 무시
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
