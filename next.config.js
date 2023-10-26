/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      //TODO:USE env file for url
      "localhost",
    ],
  },
};

module.exports = nextConfig;
