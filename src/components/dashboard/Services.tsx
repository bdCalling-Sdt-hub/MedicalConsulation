import React, { useState } from "react";

function Services({ title, titleStyle, containerBg }) {
  const [selectedItem, setSelectedItem] = useState(null); // State to store only one selected item

  const services = [
    "10 Minutes Telephone Consultation",
    "15 Minutes Video Consultation",
    "20 Minutes Video Consultation",
    "Medication Reviews",
    "Peadiatric Reviews",
    "Geriatric Reviews",
    "20 point comprehensive medical assessment with detailed report",
  ];

  // Function to handle selecting an item
  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set the clicked item as the selected item
  };

  return (
    <section className={`${containerBg || "bg-primary3 py-20"}`}>
      <div className="container mx-auto">
        <h1
          className={`${
            titleStyle ||
            "text-primary10 text-[32px] leading-[22px] font-merri mb-6 font-bold"
          }`}
        >
          {title || "Services"}
        </h1>

        <div className="grid grid-cols-4 gap-4 items-center">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(service)}
              className={`cursor-pointer p-4 rounded-sm h-52 flex flex-col justify-between flex-1 
                ${
                  selectedItem === service
                    ? "bg-primary6 text-white"
                    : "bg-white border border-neutral4 text-black"
                }`} // Conditional styles for the selected item
            >
              <h1
                className={`text-lg font-roboto ${
                  selectedItem === service ? "text-white" : "text-black"
                }`} // Adjust text color based on selection
              >
                {service}
              </h1>
              <p
                className={`text-base font-roboto font-medium ${
                  selectedItem === service ? "text-white" : "text-black"
                }`} // Adjust price text color based on selection
              >
                $ 5.00
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

