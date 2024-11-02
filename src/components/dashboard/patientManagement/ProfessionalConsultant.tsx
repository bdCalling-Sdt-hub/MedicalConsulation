import { Button, Rate } from "antd";
import React, { useState } from "react";

import Image from "next/image";
import img1 from "/images/dashboard/consultant/consultant1.png";

// Define Props type
type Props = {
  id: number;
  img: any;
  name: string;
  division: string;
  dayAndTime: string;
  rating: string;
};

// Consultants data
const consultants: Props[] = [
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

// Correctly specify props
const ProfessionalConsultant: React.FC = () => {
  const [value, setValue] = useState<any>(3);

  return (
    <div className="py-4">
      <h1 className="p-4 text-xl font-bold ">Professional Consultants</h1>
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
              <Button className="border-none pl-0">
                Download Prescription
              </Button>
              <p>{consultant.dayAndTime}</p>
              <div className="flex gap-4 py-2">
                <Rate tooltips={desc} onChange={setValue} value={value} />
                <p>{consultant.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalConsultant;
