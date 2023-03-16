/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        22: "88px",
        100: "690px",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1560px",
        // => @media (min-width: 1536px) { ... }

        "2xls": "1800px",
        // => @media (min-width: 1800px) { ... }
      },
      colors: {
        subtext: "#989898",
        bg: "#121212",
        sidebarBg: "#191919",
        almostwhite: "#E2E2E2",
        subline: "#3A3A3A",
        accent: "#E2BABB",
        element: "#262626",
        premint: "#2CBBDB",
        alphabot: "#63FF1E",
        superfull: "#6767AB",
        freenft: "#FFFFFF",
      },
      fontFamily: {
        benzin: ["var(--font-benzin)"],
        montserratBold: ["var(--font-montserratBold)"],
        abibas: ["var(--font-abibas)"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
