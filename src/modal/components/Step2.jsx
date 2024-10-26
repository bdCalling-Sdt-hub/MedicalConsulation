"use client";

import Image from "next/image";
import { Rate } from "antd";
import doctorImage from "../../../public/images/doctor.png";
import doctors from "../../utils/json/doctors.json";
import { useState } from "react";

function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <h1
        className={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
      >
        Choose your Doctor
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`bg-white pb-4 rounded cursor-pointer border ${
              selectedDoctor?.id === doctor.id
                ? "border-primary7"
                : "border-transparent"
            } `}
            onClick={() => handleSelectDoctor(doctor)}
          >
            <Image src={doctorImage} alt="doctor" />
            <div className={`px-4`}>
              <h1
                className={`text-base font-merri font-normal text-secondaryBlack my-2`}
              >
                {doctor?.name}
              </h1>
              <h2 className={`text-sm font-merri font-normal text-offBlack`}>
                {doctor?.serviceName}
              </h2>
            </div>
            <div className="flex items-center gap-4 border-t border-t-neutral4 pt-4 mt-2 px-4">
              <Rate
                allowHalf
                defaultValue={doctor?.ratings}
                count={3}
                style={{ fontSize: 16 }}
              />
              <h3
                className={`text-sm text-secondaryBlack font-roboto font-normal`}
              >
                {doctor?.totalRatings} Ratings
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
