import Services from "@/components/Services";
import React from "react";

function page() {
  return (
    <>
      <div className="bg-primary2 py-10">
        <p
          className={`text-sm font-normal font-merri text-offBlack text-center`}
        >
          Home
          <span className={`text-secondaryBlack`}> / Services</span>
        </p>
      </div>

      <Services />
      <div className="bg-primary2 py-10"></div>
    </>
  );
}

export default page;
