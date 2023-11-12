/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
const nextConfig = {
  reactStrictMode: true,
  images: {
  domains: ['aidkzrgsgrfotjiouxto.supabase.co','firebasestorage.googleapis.com','media-1.api-sports.io','media-2.api-sports.io','media-3.api-sports.io','media.api-sports.io','media-4.api-sports.io','upload.wikimedia.org'],
},
swcMinify: true,     // Enable SWC minification for improved performance

}

module.exports = withPWA(nextConfig);
