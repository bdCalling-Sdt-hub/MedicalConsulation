import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking3: React.FC = ({onNext}) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const dateData = [
    { id: 1, day: "Monday", month: "Jan" },
    { id: 2, day: "Tuesday", month: "Jan" },
    { id: 3, day: "Wednesday", month: "Jan" },
    { id: 4, day: "Thursday", month: "Jan" },

    { id: 5, day: "Friday", month: "Jan" },
    { id: 6, day: "Saturday", month: "Jan" },
    { id: 7, day: "Sunday", month: "Jan" },
  ];

  const timeData = [
    "11:00am",
    "12:00pm",
    "05:00pm",
    "06:00pm",
    "08:00pm",
    "09:00pm",
  ];

  const handleSelectData = (item: string) => {
    setSelectedData((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((i) => i !== item);
      }
      return [...prevSelected, item];
    });
  };
const navigate = useNavigate()
  const handlePostData = async () => {
    navigate('/booking4')
    console.log("post data");

    try {
      const response = await fetch("https://example.com/post-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedData }),
      });
      const result = await response.json();
      console.log("Posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      {/* date data */}
      <div>
        <h2>Select Date:</h2>
        <div className="grid grid-cols-8 items-center justify-center">
          {dateData.map((item, index) => (
            <div
              className="w-32 h-32 rounded-2xl flex items-center justify-center"
              key={index}
              onClick={() => handleSelectData(item.id)}
              style={{
                cursor: "pointer",
                padding: "30px",
                // border: "1px solid black",
                margin: "5px",
                backgroundColor: selectedData.includes(item.id)
                  ? "#d3d3d3"
                  : "#fff",
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <h1> {item.month}</h1>
                <h1 className="text-lg font-b"> {item.day}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* time data */}
      <div className="py-8">
        <h2>Select Time:</h2>
        <div className="grid grid-cols-8 items-center justify-center">
          {timeData.map((item, index) => (
            <div
              className="w-32 h-32 rounded-2xl flex items-center justify-center"
              key={index}
              onClick={() => handleSelectData(item)}
              style={{
                cursor: "pointer",
                padding: "30px",
                // border: "1px solid black",
                margin: "5px",
                backgroundColor: selectedData.includes(item)
                  ? "#d3d3d3"
                  : "#fff",
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <h1> {item}</h1>
             
              </div>
            </div>
          ))}
        </div>
      </div>

     <div className="flex justify-between">
     <button className="btn bg-white rounded-xl p-2" onClick={handlePostData} style={{ marginTop: "20px" }}>
    Previous

      </button>
     <button className="btn bg-white rounded-xl p-2" onClick={onNext}>
     Next

      </button>
     </div>
    </div>
  );
};

export default Booking3;
