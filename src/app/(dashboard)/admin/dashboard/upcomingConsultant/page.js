"use client";

import { Rate } from "antd";
import Image from "next/image";
import { useState } from "react";
import img1 from "../../../../../../public/images/dashboard/consultant/consultant1.png";
import SelectBox from "../../../../../components/dashboard/share/SelectBox";

// Define Props type

// Consultants data
const consultants = [
  {
    id: 1,
    img: img1,
    name: "Dr. David Williams",
    division: "Cardiologist",
    dayAndTime: "11:00 am on 02 Jan, Sunday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
  // Add more consultants as needed
];

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const selectOptions = [
  { value: "1", label: "Last week" },
  { value: "2", label: "Last Month" },
  { value: "3", label: "Last Year" },
];
// Correctly specify props
const UpcomingConsultant = () => {
  const [value, setValue] = useState(3);
  const [selectedValue, setSelectedValue] = useState();
  const handleSelectChange = (value) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };

  return (
    <div className="py-4">
      <div className="flex justify-between">
        <h1 className="p-4 ">
          <span className="text-xl font-bold">Upcoming Appointments Today</span>{" "}
          (12 Consultant)
        </h1>
        <div>
          <SelectBox
            placeholder="Last week"
            options={selectOptions}
            onChange={handleSelectChange}
            style={{ width: 150 }}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 px-4">
        {consultants.map((consultant) => (
          <div
            className="border border-gray-200 items-center justify-center mx-auto rounded-2xl"
            key={consultant.id}
          >
            <Image
              className="rounded-t-2xl"
              src={consultant.img}
              alt={consultant.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{consultant.name}</h2>
              <p className="text-gray-300">{consultant.division}</p>

              <p>{consultant.dayAndTime}</p>
              <div className="flex gap-4 py-2">
                <Rate tooltips={desc} onChange={setValue} value={value} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingConsultant;
