"use client";

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import { useGetFaqsQuery } from "../../../../redux/apiSlices/faqsSlices";
import Accordion from "../../../components/Accordion";

const FAQS = () => {
  const pathName = usePathname();
  console.log(pathName);
  const { data: faqs } = useGetFaqsQuery({});

  // console.log(termsAndCondition);
  return (
    <div className="container mx-auto my-12">
      <div className="justify-center items-center w-full ">
        <Breadcrumb className="flex justify-center items-center py-10 text-lg">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>FAQs</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="container mx-auto">
        <h1 className={`text-black text-2xl font-merri font-normal pb-6`}>
          Frequently Asked Questions
        </h1>
        <Accordion faqs={faqs?.data} />
      </div>
    </div>
  );
};

export default FAQS;
