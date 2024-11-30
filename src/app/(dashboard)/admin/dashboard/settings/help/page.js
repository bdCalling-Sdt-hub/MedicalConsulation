"use client";

import { useEffect, useState } from "react";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useGetTermsAndConditionQuery } from "../../../../../../../redux/apiSlices/tramsAndConditionsSlices";

const SettingsTermsAndConditions = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const { data: termsAndCondition } = useGetTermsAndConditionQuery();
  // console.log(termsAndCondition);

  useEffect(() => {
    setIsClient(true); // Ensures we're in the browser
  }, []);

  if (!isClient) {
    return null; // Prevents the component from rendering on the server
  }

  // const handleBackSettings = () => {
  //   router.push("/admin/dashboard/settings/personalInformation");
  // };

  const handleEdit = () => {
    router.push("/admin/dashboard/settings/help/edit");
  };

  return (
    <div className="w-[79vw] ">
      <div>
        <div
          // onClick={handleBackSettings}
          className="border-none text-[#193664] flex items-center gap-2 cursor-pointer"
        >
          {/* <IoIosArrowBack /> */}
          Help
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: termsAndCondition?.data?.content,
        }}
        className="pl-10 text-justify py-12"
      ></div>
      <div className="flex justify-end">
        <Button
          onClick={handleEdit}
          // type="primary"
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            size: "18px",
            height: "56px",
          }}
          htmlType="submit"
          className=" w-[300px] 
                   h-[56px]  py-4 mt-2 text-white hover:border-none border-none rounded-lg"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SettingsTermsAndConditions;
