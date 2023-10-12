/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-cms.tallyfy.com",
        pathname: "/wp-content/**"
      }
    ]
  }
};

module.exports = nextConfig;
