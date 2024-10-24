"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";

// Mock data for content (replace this with real data fetching logic)
const data = {
  data: {
    attributes: {
      content: "Initial terms and conditions content.",
    },
  },
};

const EditTermsAndCondition = () => {
  const route = useRouter();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(data?.data?.attributes?.content || "");
  }, []);

  const handleUpdate = async () => {
    console.log(content);
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      showConfirmButton: true,
    }).then(() => {
      route.push("/admin/dashboard/settings/termsAndCondition");
    });
  };

  const handleBackTermsAndCondition = () => {
    route.push("/admin/dashboard/settings/termsAndCondition");
  };

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
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          className="text-wrap bg-red-900"
        />
        <Button
          onClick={handleUpdate}
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            height: "56px",
          }}
          block
          className="mt-[30px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800
          text-white py-3 rounded-lg w-full text-[18px] font-medium duration-200"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditTermsAndCondition;
