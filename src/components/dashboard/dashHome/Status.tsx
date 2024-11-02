import "./Style_dashboard.css";

import React, { useState } from "react";
import {
  useAllDoctorQuery,
  useAllPatientsQuery,
} from "../../../../redux/apiSlices/authSlice";

import { FaArrowTrendUp } from "react-icons/fa6";
import { useGetAllAppointmentQuery } from "../../../../redux/apiSlices/appointmentsSlices";
import SelectBox from "../share/SelectBox";

// import { useGetAllStatusApiQuery } from "../redux/Features/getAllStatusApi";

// Define a type for the API response
interface StatusAttributes {
  totalEarnings: number;
  allUsers: number;
  paidUsers: number;
}

interface StatusData {
  data: {
    attributes: StatusAttributes;
  };
}

const Status: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  // Uncomment the next line when using the actual API
  // const { data, isSuccess, isError, isLoading } = useGetAllStatusApiQuery();

  // For mock data demonstration
  // Replace this with the actual API response when needed

  // Uncomment the following block if using the API response
  // if (isLoading) {
  //   return <Loading />;
  // }
  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex);
  };
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };

  const selectOptions = [
    { value: "1", label: "week" },
    { value: "2", label: "Month" },
    { value: "3", label: "Year" },
  ];

  const { data: allCancelled } = useGetAllAppointmentQuery({
    status: "cancelled",
  });
  const { data: AllCompleted } = useGetAllAppointmentQuery({
    status: "completed",
  });
  const { data: allUpcoming } = useGetAllAppointmentQuery({
    status: "upcoming",
  });
  const { data: allConsultants } = useGetAllAppointmentQuery({
    status: "",
  });
  const { data: doctor } = useAllDoctorQuery({});
  const { data: patient } = useAllPatientsQuery({
    page: 1,
    limit: 10,
    search: "",
  });

  const totalCancelled = allCancelled?.data?.total;
  const totalCompleted = AllCompleted?.data?.total;
  const totalUpcoming = allUpcoming?.data?.total;
  const totalConsultants = allConsultants?.data?.total;
  const totalUsers = doctor?.data?.total + patient?.data?.total;
  const totalPatient = patient?.data?.total;
  const totalDoctor = doctor?.data?.total;

  const cardData = [
    {
      id: 1,
      // icon: <HiMiniUsers size={20} />,
      value: totalUpcoming,
      title: "Upcoming Consultants",
      // description: '0.5k Increased than last 7 days',
    },
    {
      id: 2,
      // icon: <SiPaypal size={20} />,
      value: totalConsultants,
      title: "Total Consultant",
      // description: '39k Increased than last 7 days',
    },
    {
      id: 3,
      // icon: <FcComboChart size={20} />,
      value: totalCompleted,
      title: "Total Completed",
      // description: '1.5k Increased than last 7 days',
    },
    {
      id: 4,
      // icon: <FcComboChart size={20} />,
      value: totalCancelled,
      title: "Total Cancelled",
      // description: '1.5k Increased than last 7 days',
    },
    {
      id: 5,
      // icon: <FcComboChart size={20} />,
      value: totalUsers,
      title: "Total Users",
      // description: '1.5k Increased than last 7 days',
    },
    {
      id: 5,
      // icon: <FcComboChart size={20} />,
      value: totalDoctor,
      title: "Total Doctors",
      // description: '1.5k Increased than last 7 days',
    },
    {
      id: 5,
      // icon: <FcComboChart size={20} />,
      value: totalPatient,
      title: "Total Patients",
      // description: '1.5k Increased than last 7 days',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-xl">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-xl font-bold text-[#5D5D5D]">Overview</h1>
        </div>
        <div className="pr-8">
          <SelectBox
            options={selectOptions}
            placeholder="Week"
            onChange={handleSelectChange}
            style={{ width: 100 }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 w-[calc(100% -300px)] mt-[12px]">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className={`2xl:w-[350px] xl:w-[200px] lg:w-[150px] w-[450px] h-[210px] px-[20px] py-[32px] flex justify-between items-center rounded-2xl cursor-pointer ${
              selectedCard === index
                ? "bg-[#02B5AA] text-[#E8EBF0]"
                : "border border-[#E7E7E7]"
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div>
              {/* <div className={`bg-[#F6F6F6] w-[47px] h-[47px] rounded-2xl flex items-center justify-center ${
         selectedCard === index ? 'bg-white text-[#02B5AA]' : 'bg-[#E8EBF0]'
            }`}>
              {card.icon}
            </div>  */}
              <div className="flex items-center gap-2">
                <h1 className="text-secondary py-4 text-[34px] font-bold">
                  {card?.value}
                </h1>
                <FaArrowTrendUp
                  color={selectedCard === index ? "white" : "#28A745"}
                  size={20}
                />
              </div>
              <h1 className="text-[16px] font-bold">{card?.title}</h1>
              {/* <p>{card?.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
