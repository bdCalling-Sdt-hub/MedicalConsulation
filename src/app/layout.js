import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
