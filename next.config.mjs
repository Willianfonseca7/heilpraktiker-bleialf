/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@mui/material",
    "@mui/system",
    "@mui/icons-material",
    "@mui/utils",
    "@mui/private-theming"
  ],
};

export default nextConfig;
