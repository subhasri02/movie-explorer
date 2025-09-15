
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // important for React
//   ],
//   darkMode: "class", // ✅ needed for manual toggling
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // important for React
  ],
  darkMode: "class", // ✅ needed for manual toggling
  theme: {
    extend: {
      keyframes: {
        // Animation for modal pop-up
        "scale-up": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // Animation for checkmark on booking success
        "checkmark": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "scale-up": "scale-up 0.3s ease-out forwards",
        "checkmark": "checkmark 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
