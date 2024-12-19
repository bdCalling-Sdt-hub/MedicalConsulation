"use client";

import { useEffect, useState } from "react";
import {
  useGetPrescriptionTemplateQuery,
  useAddPrescriptionTemplateMutation,
} from "../../../../../../../../redux/apiSlices/prescriptionSlices";

import { Button } from "antd";
import dynamic from "next/dynamic"; // Import dynamic
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";

// Dynamic import for JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditAboutUs = () => {
  const route = useRouter();
  const [content, setContent] = useState("");
  const { data: prescriptionTemplate, error } =
    useGetPrescriptionTemplateQuery();
  const [createPrescriptionTemplate, { isLoading }] =
    useAddPrescriptionTemplateMutation();
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle update functionality
  const handleUpdate = async () => {
    const res = await createPrescriptionTemplate({ content });
    if (res?.data) {
      Swal.fire({
        title: "Good job!",
        text: "Prescription template updated successfully!",
        icon: "success",
      }).then(() => {
        route.push("/admin/dashboard/settings/prescription-template");
      });
    }
  };

  const handleBackPrescriptionTemplate = () => {
    route.push("/admin/dashboard/settings/prescription-template");
  };

  // Effect to set content from query data
  useEffect(() => {
    if (prescriptionTemplate?.data) {
      setContent(prescriptionTemplate.data.content);
    }
  }, [prescriptionTemplate]);

  // Show loading message while waiting for content
  if (error) {
    return <div>Error loading content.</div>;
  }

  // Render JoditEditor only on the client
  return (
    <div className="relative ml-[24px] bg-white p-6 rounded-lg shadow-lg">
      <div
        onClick={handleBackPrescriptionTemplate}
        className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2"
      >
        <MdOutlineKeyboardArrowLeft size={34} />
        <h1 className="text-[24px] font-semibold">
          Edit Prescription Template
        </h1>
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

export default EditAboutUs;
