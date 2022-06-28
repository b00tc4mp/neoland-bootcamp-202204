/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com'],
  },
  env: {
    userName: process.env.userName,
    REACT_APP_API_URL: 'http://localhost:8080/api'
  },
}

module.exports = nextConfig
