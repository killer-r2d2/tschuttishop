import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto-flex)"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "0rem",
          sm: "2rem",
        },
      },
      backgroundImage: {
        "hero-shirt": "url('/hero-shirt.jpg')",
        "hero-player": "url('/shirt-player.jpg')",
        "hero-vintage": "url('/vintage-hero-wide.jpg')",
      },
      backgroundSize: {
        "120%": "120%",
      },
      scale: {
        "101": "101%",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#0f172a",
            },
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};
export default config;
