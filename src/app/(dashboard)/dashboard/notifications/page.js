"use client";

import { Badge } from "antd";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import avg from "../../../../../public/images/Notifications/Avatar.png";

const Notifications = (props) => {
  const navigate = useRouter();
  const handleBack = () => {
    console.log("click,");
    navigate.push("/dashboard");
  };

  return (
    <div className="px-8">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <IoIosArrowBack />
        <h1> Back</h1>
      </div>
      <div className="flex justify-between py-6">
        <div className="flex">
          <h1 className="text-[24px] font-bold">Notifications</h1>
          <a href="#">
            <sup>
              <Badge count={2}>{/* <Avatar shape="none" size="" /> */}</Badge>
            </sup>
          </a>
        </div>
        <h1 className="text-[#5E7FD3]">See All</h1>
      </div>
      {/* all Notifications */}
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Image size={60} src={avg} />
          <h1>
            <span className="text-lg font-bold"> Leslie</span> Share a product
          </h1>
        </div>
        <h1>2 minutes ago</h1>
      </div>
    </div>
  );
};

export default Notifications;
