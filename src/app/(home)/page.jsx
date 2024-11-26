"use client";

import AboutUs from "../../components/AboutUs";
import AboutUs2 from "../../components/AboutUs2";
import Banner from "../../components/Banner";
import FAQ from "../../components/FAQ";
import GiveUsReview from "../../components/GiveUsReview";
import HealthyTips from "../../components/HealthyTips";
// import Services from "../../components/Services";
import Servicesv2 from "../../components/Servicesv2";
import Testimonials from "../../components/Testimonials";
import BookAppointment from "../../modal/BookAppointment";
import VideoPlayer from "../../components/VideoPlayer";
import TutorialAndBooking from "../../components/TutorialAndBooking";

function Page() {
  return (
    <>
      {/* banner section */}
      <Banner />

      {/*  about us section */}
      {/* <AboutUs /> */}

      {/* about us 2 section */}
      {/* <AboutUs2 /> */}

      {/* services section */}
      <Servicesv2 title={`What can we help with?`} />

      {/* Tutorial section */}
      {/* <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay={true}
      /> */}
      <TutorialAndBooking />

      {/* book appointment section */}
      {/* <BookAppointment /> */}

      {/* FAQ section */}
      {/* <FAQ /> */}
      {/* testimonials section */}
      <Testimonials />

      {/* healthy section */}
      <HealthyTips />
      <GiveUsReview />
    </>
  );
}

export default Page;
