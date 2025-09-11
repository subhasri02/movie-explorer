
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // important for React
  ],
  darkMode: "class", // ✅ needed for manual toggling
  theme: {
    extend: {},
  },
  plugins: [],
};
