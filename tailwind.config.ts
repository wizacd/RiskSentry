import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Status warna dipakai di seluruh modul (P2H, Telematika, Compliance Passport).
        // Person 1 (design system) silakan sesuaikan hex-nya persis dengan Figma.
        status: {
          aman: "#16a34a", // hijau
          waspada: "#eab308", // kuning
          bahaya: "#dc2626", // merah
        },
      },
    },
  },
  plugins: [],
};
export default config;
