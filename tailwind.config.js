/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        heading: ["var(--font-ibm-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
