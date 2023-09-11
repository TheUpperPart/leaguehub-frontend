/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'k.kakaocdn.net', 'league-hub-s3.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
