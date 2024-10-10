/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#FBF9F1",
        primary2: "#F6F2DD",
        primary3: "#EFE7C2",
        primary4: "#E7DCA6",
        primary6: "#D9C771",
        primary10: "#625A33",
        neutral8: "#595959",
        offBlack: "#00000073",
      },
      fontFamily: {
        roboto: ["'Roboto', 'sans-serif'"],
        abril: ["'Abril Fatface', 'serif'"],
        merri: ["'Merriweather', 'serif'"],
      },
    },
  },
  plugins: [],
};
