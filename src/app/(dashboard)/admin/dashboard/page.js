"use client";

import { useState } from "react";
import Status from "../../../../components/dashboard/dashHome/Status";
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
  return (
    <>
      <Status />
      <div className="flex gap-4">
        <div className=" h-[350px] w-full mt-8 justify-center bg-white rounded-2xl">
          <div className="flex justify-between w-full px-6">
            <div className="text-lg font-bold">Static</div>
            <div>
              <SelectBox
                placeholder="Last week"
                options={selectOptions}
                onChange={handleSelectChange}
                style={{ width: 150 }}
              />
            </div>
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
