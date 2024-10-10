import FAQ from "@/components/FAQ";
import React from "react";

function page() {
  return (
    <>
      <div className="bg-primary2 py-10">
        <p
          className={`text-sm font-normal font-merri text-offBlack text-center`}
        >
          Home
          <span className={`text-secondaryBlack`}> / FAQ</span>
        </p>
      </div>

      <FAQ />
      <div className="bg-primary2 py-10"></div>
    </>
  );
}

export default page;
