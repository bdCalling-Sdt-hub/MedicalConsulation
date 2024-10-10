import React from "react";
import IconVerifiedSuccess from "../../public/icons/IconVerifiedSuccess";
import Image from "next/image";
import patients from "../../public/images/patients.png";
import about from "../../public/images/about.png";
import Accordion from "@/components/Accordion";
import user from "../../public/images/user.jpg";
import placeholderImage from "../../public/images/placeholder.png";
import TipsCard from "@/components/TipsCard";
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
