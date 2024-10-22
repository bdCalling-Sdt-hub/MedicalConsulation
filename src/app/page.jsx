"use client";

import AboutUs from "@/components/AboutUs";
import AboutUs2 from "@/components/AboutUs2";
import Banner from "@/components/Banner";
import BookAppointment from "@/modal/BookAppointment";
import FAQ from "@/components/FAQ";
import HealthyTips from "@/components/HealthyTips";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { ToastContainer } from "react-toastify";

function Page() {
  return (
    <>
      {/* banner section */}
      <Banner />

      {/*  about us section */}
      <AboutUs />

      {/* about us 2 section */}
      <AboutUs2 />

      {/* services section */}
      <Services />

      {/* book appointment section */}
      <BookAppointment />

      {/* FAQ section */}
      <FAQ />
      {/* testimonials section */}
      <Testimonials />

      {/* healthy section */}
      <HealthyTips />
      <ToastContainer />
    </>
  );
}

export default Page;
