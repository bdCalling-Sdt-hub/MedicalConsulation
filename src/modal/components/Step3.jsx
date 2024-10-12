import React, { useState } from "react";

const dates = [
  { date: "01 Jan", day: "Sunday" },
  { date: "02 Jan", day: "Monday" },
  { date: "03 Jan", day: "Tuesday" },
  { date: "04 Jan", day: "Wednesday" },
  { date: "05 Jan", day: "Thursday" },
  { date: "06 Jan", day: "Friday" },
  { date: "07 Jan", day: "Saturday" },
];

const times = [
  { label: "Morning", time: "11:00 am" },
  { label: "Afternoon", time: "02:00 pm" },
  { label: "Evening", time: "06:00 pm" },
  { label: "Night", time: "09:00 pm" },
];

function Step3() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div>
      <h1 className={`secondaryBlack text-[20px] font-merri font-normal mb-6`}>
        Schedule
      </h1>

      {/* Pick a Date */}
      <div className={`mb-6`}>
        <h1 className={`text-offBlack text-base font-merri font-normal mb-6`}>
          Pick a Date
        </h1>
        <div className="grid grid-cols-7 gap-3">
          {dates.map((item, index) => (
            <div
              key={index}
              className={`h-36 flex-col flex justify-center items-center gap-y-2 cursor-pointer ${
                selectedDate === index ? "bg-primary6" : "bg-white"
              }`}
              onClick={() => setSelectedDate(index)}
            >
              <h3 className={`text-sm text-offBlack font-merri font-normal`}>
                {item.date}
              </h3>
              <h1
                className={`text-[20px] text-secodaryBlack font-normal font-merri`}
              >
                {item.day}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Pick a Time */}
      <div>
        <h1 className={`text-offBlack text-base font-merri font-normal mb-6`}>
          Pick your Time
        </h1>
        <div className="grid grid-cols-7 gap-3">
          {times.map((item, index) => (
            <div
              key={index}
              className={`h-36 flex-col flex justify-center items-center gap-y-2 cursor-pointer ${
                selectedTime === index ? "bg-primary6" : "bg-white"
              }`}
              onClick={() => setSelectedTime(index)}
            >
              <h3 className={`text-sm text-offBlack font-merri font-normal`}>
                {item.label}
              </h3>
              <h1
                className={`text-[20px] text-secodaryBlack font-normal font-merri`}
              >
                {item.time}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step3;
