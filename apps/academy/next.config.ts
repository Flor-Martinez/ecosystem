import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/experiencia',
        destination: '/#planes-suscripcion',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
