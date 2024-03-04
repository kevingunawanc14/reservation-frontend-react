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
    themes: ["forest", "lemonade", "valentine", "synthwave", "lofi", "emerald", "acid"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}