"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "antd";
import JoditEditor from "jodit-react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import image from "../../../../../public/images/Notifications/Avatar.png";

const DoctorPatientProfile = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [type, setType] = useState("");
  const pageSize = 3;

  const [selectedValue, setSelectedValue] = useState();

  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(data?.data?.attributes?.content || "");
  }, []);

  // React chart section

  const data = [...Array(100).keys()].map((item, index) => ({
    sId: index + 1,
    image: <img src={image} className="w-9 h-9 rounded" alt="avatar" />,
    productName: "KTM 390Duke",
    level: "2",
    status: "Created",
    date: "05-08-2024",
    location: "Madrid",
    quantity: "Quantity",

    action: {
      sId: index + 1,
      image: <img src={image} className="w-9 h-9 rounded" alt="" />,
      productName: "KTM 390Duke",
      level: "2",
      location: "Madrid",
      date: "05-08-2024",
      productCategory: "Vehicle",
      price: "$6729.00",
      quantity: "quantity",
      status: "Approved",
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
    },
  }));

  const navigate = useRouter();
  const handleBack = () => {
    navigate.push("/dashboard/appointment");
  };

  const handleUpdate = async () => {
    console.log(content);
    Swal.fire({
      position: "top", // Use valid SweetAlertPosition
      icon: "success", // Use valid SweetAlertIcon
      showConfirmButton: false,
      timer: 1500,
    });
    // navigate("/settings/termsAndCondition");

    // try {
    //   const response = await setData({
    //     content: content,
    //   });

    //   if (response?.data?.statusCode === 201) {
    //     Swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: response?.data?.message,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate("/settings/terms-conditions");
    //   }
    // } catch (error: any) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Try Again...",
    //     text: error?.response?.data?.message || "An error occurred",
    //     footer: '<a href="#">Why do I have this issue?</a>',
    //   });
    // }
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <div onClick={handleBack} className="flex cursor-pointer">
          <ChevronLeft />
          <h1>Patient Profile</h1>
        </div>
        <div>
          <Button> Delete Patient</Button>
        </div>
      </div>
      <div className="flex gap-2 h-36 items-center justify-center mt-16">
        <div className="w-1/2 h-[250px] items-center justify-center py-8 bg-white rounded-2xl">
          <div className="mx-auto text-center items-center">
            <Image src={image} className="w-24 h-24 rounded mx-auto" alt="" />
            <h1 className="text-xl font-bold py-2">Hasan Mahmud</h1>
            <p className="">Location: Times square, USA</p>
            <p> hasanmahmud@gmail.com</p>
          </div>
        </div>

        <div className=" h-[250px] w-1/2 py-4 justify-center bg-white rounded-2xl">
          <div className=" px-6">
            <div className="text-lg font-bold text-center">
              Personal Information
            </div>
            <div className="flex gap-24 items-center justify-center py-6 h-60">
              <div>
                <h1 className="py-2">First Name</h1>
                <p className=" border-b border-gray-200 font-bold">Maria</p>
                <h1 className="mt-6">Phone Number</h1>
                <p className="mt-2 border-b border-gray-200 font-bold">
                  +12345875975678
                </p>
              </div>
              <div>
                <h1 className="py-2">Last Name</h1>
                <p className=" border-b border-gray-200 font-bold">Picio</p>
                <h1 className="mt-6">Email</h1>
                <p className="mt-2 border-b border-gray-200 font-bold">
                  mariapicio@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-28 bg-white "></div>
      <div className="text-justify mt-[24px] relative">
        <h1>Add Note</h1>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          className="text-wrap bg-red-900"
        />
        {/* <Button
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
        </Button> */}
      </div>
      <div className="text-justify mt-[24px] relative">
        <h1>Add Prescription</h1>
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

export default DoctorPatientProfile;
