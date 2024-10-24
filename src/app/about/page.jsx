import React from "react";
import Image from "next/image";
import about from "../../../public/images/about.png";
import Banner from "@/components/Banner";
import AboutUs2 from "@/components/AboutUs2";

const page = () => {
  return (
    <>
      {/* banner section */}
      <Banner />

      {/* about us 2 section */}
      <div className="bg-primary2 pt-10">
        <p
          className={`text-sm font-normal font-merri text-offBlack text-center`}
        >
          Home
          <span className={`text-secondaryBlack`}> / About Us</span>
        </p>
      </div>
      <AboutUs2 />
    </>
  );
};

export default page;
