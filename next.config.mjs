/** @type {import('next').NextConfig} */
const nextConfig = {
  // the ported design mounts GSAP/Lenis/preloader effects once, like the original Vite app (no StrictMode double-mount)
  reactStrictMode: false,
  images: { unoptimized: true },
};

export default nextConfig;
