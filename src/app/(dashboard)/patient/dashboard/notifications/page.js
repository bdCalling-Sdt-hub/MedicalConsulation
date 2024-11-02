"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetNotificationByUserIdQuery } from "../../../../../../redux/apiSlices/notificaitonsSlices";

const Notifications = (props) => {
  const navigate = useRouter();
  const user = useSelector((state) => state.user.user);

  // console.log(user);

  const { data: notifications } = useGetNotificationByUserIdQuery(user?._id);
  // console.log(notifications);
  const handleBack = () => {
    console.log("click,");
    navigate.push("/doctor/dashboard");
  };

  return (
    <div className="px-8 pb-5">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <IoIosArrowBack />
        <h1> Back</h1>
      </div>
      <div className="flex justify-between py-6">
        <div className="flex">
          <h1 className="text-[24px] font-bold">Notifications</h1>
          {/* <a href="#">
            <sup>
              <Badge count={2} />
            </sup>
          </a> */}
        </div>
        {/* <h1 className="text-[#5E7FD3]">See All</h1> */}
      </div>
      {/* all Notifications */}

      {notifications?.notifications?.map((item, index) => {
        return (
          <div
            key={index}
            className="flex justify-between p-4 border border-primary2 m-2 rounded-xl bg-primary1"
          >
            <div className="flex gap-2 items-center">
              <h1>
                {/* <span className="text-lg font-bold"> Leslie</span>{" "} */}
                {item.message}
              </h1>
            </div>
            <h1>{new Date(item?.createdAt).toDateString()}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
