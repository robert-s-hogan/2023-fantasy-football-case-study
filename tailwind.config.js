/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    "text-green-600",
    "text-red-600",
    "text-gray-600",
    "font-semibold",
  ],
  plugins: [],
};
