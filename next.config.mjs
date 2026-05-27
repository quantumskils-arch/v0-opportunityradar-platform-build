/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: 'https://api.opportunityradar.africa/:path*',
      },
    ]
  },
}

export default nextConfig
