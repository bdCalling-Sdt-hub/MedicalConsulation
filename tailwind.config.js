/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#FBF9F1",
        primary2: "#F6F2DD",
        primary3: "#EFE7C2",
        primary4: "#E7DCA6",
        primary5: "#E0D18B",
        primary6: "#D9C771",
        primary7: "#D0B958",
        primary10: "#625A33",
        primary9: "#7C7140",
        neutral8: "#595959",
        neutral10: "#262626",
        neutral4: "#F0F0F0",
        offBlack: "#00000073",
        offWhite: "#F0F2F5",
        gray50: "#00000040",
        secondaryBlack: "#000000D9",
        offBorder: "#0000000F",
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Abril: ["Abril Fatface", "serif"],
        Merri: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
