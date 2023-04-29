// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-redwood-labs.premint.xyz",
        port: "",
        pathname: "/premint/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/profile_banners/**",
      },
      {
        protocol: "https",
        hostname: "superful-assets-prod.s3.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "hosting.photobucket.com",
        port: "",
        pathname: "/images/i/lucas71/**",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
        port: "",
        pathname: "/gcs/files/**",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
        port: "",
        pathname: "/gae/**",
      },
      {
        protocol: "https",
        hostname: "openseauserdata.com",
        port: "",
        pathname: "/files/**",
      },
    ],
  },
};
export default config;

//https://openseauserdata.com/files/62bfb40708648a12ca0097f29332c2f6.jpg
