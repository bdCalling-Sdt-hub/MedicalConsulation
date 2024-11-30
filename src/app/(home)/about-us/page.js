"use client";

import { Breadcrumb } from "antd";
import { useGetTermsAndConditionQuery } from "../../../../redux/apiSlices/tramsAndConditionsSlices";
import AboutUs2 from "../../../components/AboutUs2";

const AboutPage = () => {
  // console.log(pathName);
  const { data: termsAndCondition } = useGetTermsAndConditionQuery();
  // console.log(termsAndCondition);
  return (
    <div className=" my-12">
      <div className="container mx-auto justify-center items-center w-full ">
        <Breadcrumb className="flex justify-center items-center pb-10 text-lg">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>About Us</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/*  about us section */}
      {/* <AboutUs /> */}

      {/* about us 2 section */}
      <AboutUs2 />
      <div className="container mx-auto pt-12">
        <p className="text-primary9 font-semibold">About Up</p>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: termsAndCondition?.data?.content,
        }}
        className=" text-justify pb-12 container mx-auto"
      ></div>
    </div>
  );
};

export default AboutPage;
