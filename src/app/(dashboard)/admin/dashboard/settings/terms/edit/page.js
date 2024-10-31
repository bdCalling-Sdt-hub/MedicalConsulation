"use client";

import { useEffect, useState } from "react";
import {
  useAddTermsAndConditionMutation,
  useGetTermsAndConditionQuery,
} from "../../../../../../../../redux/apiSlices/tramsAndConditionsSlices";

import { Button } from "antd";
import dynamic from "next/dynamic"; // Import dynamic
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";

// Dynamic import for JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditTermsAndCondition = () => {
  const route = useRouter();
  const [content, setContent] = useState("");
  const { data: termsAndCondition, error } = useGetTermsAndConditionQuery();
  const [createTermsAndCondition] = useAddTermsAndConditionMutation();
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle update functionality
  const handleUpdate = async () => {
    const res = await createTermsAndCondition({ content });
    if (res?.data) {
      Swal.fire({
        title: "Good job!",
        text: "Terms and Conditions updated successfully!",
        icon: "success",
      }).then(() => {
        route.push("/admin/dashboard/settings/termsAndCondition");
      });
    }
  };

  const handleBackTermsAndCondition = () => {
    route.push("/admin/dashboard/settings/termsAndCondition");
  };

  // Effect to set content from query data
  useEffect(() => {
    if (termsAndCondition?.data) {
      setContent(termsAndCondition.data.content);
    }
  }, [termsAndCondition]);

  // Show loading message while waiting for content
  if (error) {
    return <div>Error loading terms and conditions.</div>;
  }

  // Render JoditEditor only on the client
  return (
    <div className="relative ml-[24px] bg-white p-6 rounded-lg shadow-lg">
      <div
        onClick={handleBackTermsAndCondition}
        className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2"
      >
        <MdOutlineKeyboardArrowLeft size={34} />
        <h1 className="text-[24px] font-semibold">Edit Terms & Condition</h1>
      </div>
      <div className="text-justify mt-[24px] relative">
        {isMounted ? ( // Only render editor on client
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="text-wrap bg-red-900"
          />
        ) : (
          <div>Loading....</div>
        )}
        <Button
          onClick={handleUpdate}
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            height: "56px",
          }}
          block
          className="mt-[30px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800 text-white py-3 rounded-lg w-full text-[18px] font-medium duration-200"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditTermsAndCondition;
