/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "72px",
        22: "88px",
        100: "690px",
      },
      screens: {
        xs: "380px",
        // => @media (min-width: 380px) { ... }

        smx: "502px",
        // => @media (min-width: 502px) { ... }

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
        sidebarBg: "#151515",
        almostwhite: "#E2E2E2",
        subline: "#3A3A3A",
        accent: "#E2BABB",
        element: "#262626",
        premint: "#2CBBDB",
        alphabot: "#63FF1E",
        superful: "#6767AB",
        freenft: "#FFFFFF",
        pressedAccent: "#b98d8e",
        speedMint: "#FFC700",
        community: "#91DB6E",
        raffleBot: "#85DBE0",
        discord: "#7289da",
      },
      fontFamily: {
        benzin: ["var(--font-benzin)"],
        montserratBold: ["var(--font-montserratBold)"],
        abibas: ["var(--font-abibas)"],
        montserratRegular: ["var(--font-montserratRegular)"],
      },
      maxWidth: {
        xss: "240px",
      },
      minHeight: {
        16: "64px",
      },
      fontSize: {
        "10xl": "180px",
      },
      minWidth: {
        lg: "512px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = config;
