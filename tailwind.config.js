/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "autumn", "lemonade", "winter", "dark", "halloween", "forest", "coffee", "dracula", "aqua", "nord",
      "sunset", "valentine", "dim"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}