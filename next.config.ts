import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Cloudflare Pages 不支持 Next.js 内置 Image Optimization，改用 unoptimized
    // 图片仍走 next/image 的 lazy load + blur placeholder，只是不转 WebP/AVIF
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
