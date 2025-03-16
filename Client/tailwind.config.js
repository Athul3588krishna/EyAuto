/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        skeleton: {
          "0%, 100%": { backgroundColor: "rgba(209, 213, 219, 1)" }, // Lighter gray
          "50%": { backgroundColor: "rgba(229, 231, 235, 1)" }, // Darker gray
          typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
    },
  },
  plugins: [],
});
