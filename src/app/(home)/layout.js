import "../globals.css";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const metadata = {
  title: "Medical Consultation",
  description: "medical consultation app for patients and doctors ",
};

export default function HomeLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
