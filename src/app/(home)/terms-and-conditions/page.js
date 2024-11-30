"use client";

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import { useGetTermsAndConditionQuery } from "../../../../redux/apiSlices/tramsAndConditionsSlices";

const TermsAndCondition = () => {
  const pathName = usePathname();
  console.log(pathName);
  const { data: termsAndCondition } = useGetTermsAndConditionQuery();
  // console.log(termsAndCondition);
  return (
    <div className="container mx-auto my-12">
      <div className="justify-center items-center w-full ">
        <Breadcrumb className="flex justify-center items-center  text-lg">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Terms & Condition</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="container mx-auto pt-12">
        <p className="text-primary9 font-semibold">Terms & Condition</p>
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

export default TermsAndCondition;