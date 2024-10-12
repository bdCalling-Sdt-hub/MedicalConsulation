"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Rate } from "antd";
import doctors from "../../utils/json/doctors.json";
import doctorImage from "../../../public/images/doctor.png";

function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <h1 className={`secondaryBlack text-[20px] font-merri font-normal mb-6`}>
        Choose your Doctor
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`bg-white pb-4 rounded cursor-pointer border ${
              selectedDoctor?.id === doctor.id
                ? "border-red-500"
                : "border-transparent"
            } `}
            onClick={() => handleSelectDoctor(doctor)}
          >
            <Image src={doctorImage} alt="doctor" />
            <div className={`px-4`}>
              <h1>{doctor?.name}</h1>
              <h2>{doctor?.serviceName}</h2>
              <div className="flex items-center gap-4">
                <Rate allowHalf defaultValue={doctor?.ratings} />{" "}
                <h3>{doctor?.totalRatings}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
