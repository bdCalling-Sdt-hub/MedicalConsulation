"use client";

import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useGetUserProfileQuery } from "../../../../../redux/apiSlices/authSlice";
import SellerActivityChart from "../../../../components/dashboard/patientManagement/SellerActivityChart";
import SelectBox from "../../../../components/dashboard/share/SelectBox";

const selectOptions = [
  { value: "1", label: "Last week" },
  { value: "2", label: "Last Month" },
  { value: "3", label: "Last Year" },
];
const Home = (props) => {
  const [selectedValue, setSelectedValue] = useState();
  const handleSelectChange = (value) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };
  const [selectedCard, setSelectedCard] = useState(null);

  // Uncomment the next line when using the actual API
  // const { data, isSuccess, isError, isLoading } = useGetAllStatusApiQuery();

  // For mock data demonstration
  // Replace this with the actual API response when needed

  // Uncomment the following block if using the API response
  // if (isLoading) {
  //   return <Loading />;
  // }
  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  const selectOptions = [
    { value: "1", label: "week" },
    { value: "2", label: "Month" },
    { value: "3", label: "Year" },
  ];

  const { data: doctor } = useGetUserProfileQuery({});
  console.log(doctor);
  const cardData = [
    {
      id: 1,
      // icon: <HiMiniUsers size={20} />,
      value: doctor?.data?.consultationUpcoming?.length,
      title: "Upcoming Consultants",
      // description: '0.5k Increased than last 7 days',
    },
    {
      id: 2,
      // icon: <SiPaypal size={20} />,
      value: doctor?.data?.consultationHistory?.length,
      title: "Consultation Completed",
      // description: '39k Increased than last 7 days',
    },
    // {
    //   id: 3,
    //   // icon: <FcComboChart size={20} />,
    //   value: 45,
    //   title: "Total Completed",
    //   // description: '1.5k Increased than last 7 days',
    // },
  ];

  return (
    <>
      <div className="bg-[#FFFFFF] p-6 rounded-xl">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-xl font-bold text-[#5D5D5D]">Overview</h1>
          </div>
          {/* <div className="pr-8">
            <SelectBox
              options={selectOptions}
              placeholder="Week"
              onChange={handleSelectChange}
              style={{ width: 100 }}
            />
          </div> */}
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
                    {card.value}
                  </h1>
                  <FaArrowTrendUp
                    color={selectedCard === index ? "white" : "#28A745"}
                    size={20}
                  />
                </div>
                <h1 className="text-[16px] font-bold">{card.title}</h1>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-[350px] w-full mt-8 justify-center bg-white rounded-2xl">
          <div className="flex justify-center w-full px-6">
            <div className="text-lg font-bold">Statistics</div>
            {/* <div>
              <SelectBox
                placeholder="Last week"
                options={selectOptions}
                onChange={handleSelectChange}
                style={{ width: 150 }}
              />
            </div> */}
          </div>
          <SellerActivityChart />
        </div>
        {/* <div className=" h-[350px] w-1/2 mt-8 justify-center bg-white rounded-2xl">
          <div className="flex justify-between w-full px-6">
            <div className="text-lg font-bold">Clubs</div>
            <div>
              <SelectBox
                placeholder="Last week"
                options={selectOptions}
                onChange={handleSelectChange}
                style={{ width: 150 }}
              />
            </div>
          </div>
          
        </div> */}
      </div>
    </>
  );
};

export default Home;
