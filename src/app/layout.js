import "./globals.css";

import Providers from "../../redux/provider";

export const metadata = {
  title: "Medical Consultation",
  description: "medical consultation app for patients and doctors ",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
