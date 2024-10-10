import React from "react";
import Banner from "@/components/Banner";
import AboutUs from "@/components/AboutUs";
import AboutUs2 from "@/components/AboutUs2";
import Services from "@/components/Services";
import BookAppointment from "@/components/BookAppointment";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import HealthyTips from "@/components/HealthyTips";

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
    </>
  );
}

export default Page;
