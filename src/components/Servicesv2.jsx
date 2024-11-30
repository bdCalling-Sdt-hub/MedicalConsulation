"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetAllServicesQuery } from "../../redux/apiSlices/servicesSlices";
import serviceIcon from "/public/images/serviceIcon.png";

// import ServiceIcon from "../../public/images/icons/ServiceIcon";

function Services({
  title,
  titleStyle,
  containerBg,
  selectedItem,
  setSelectedItem,
}) {
  const { data, isError, error } = useGetAllServicesQuery({});

  // console.log(data);

  // Function to handle selecting an item
  const handleSelectItem = (item) => {
    console.log(item);
    setSelectedItem && setSelectedItem(item); // Set the clicked item as the selected item
  };

  return (
    <section id="services" className={`${containerBg || "bg-[#FFFFFF] py-20"}`}>
      <div className="container mx-auto">
        <h1
          className={`${
            titleStyle ||
            "text-[#625A33] text-[32px] leading-[22px] font-merri mb-6 font-normal"
          } `}
        >
          {title || "Services"}
        </h1>

        <div className="grid grid-cols-4 gap-4 items-center">
          {data?.data?.result?.slice(0, 8)?.map((service, index) => (
            <Link
              href={{
                pathname: "/booking",
                query: service,
              }}
              key={index}
              onClick={() => handleSelectItem(service)}
              className={`cursor-pointer p-4 rounded-sm h-52 flex flex-col justify-between flex-1 
                ${
                  selectedItem === service
                    ? "bg-primary6 text-white"
                    : "bg-white border border-neutral4 text-black"
                }`} // Conditional styles for the selected item
            >
              <Image
                src={serviceIcon}
                alt="Service Icon"
                width={50}
                height={50}
              />
              <h1
                className={`text-lg font-roboto ${
                  selectedItem === service ? "text-white" : "text-black"
                }`} // Adjust text color based on selection
              >
                {service?.title}
              </h1>
              <p
                className={`text-base font-roboto font-medium ${
                  selectedItem === service ? "text-white" : "text-black"
                }`} // Adjust price text color based on selection
              >
                &#163; {service?.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
