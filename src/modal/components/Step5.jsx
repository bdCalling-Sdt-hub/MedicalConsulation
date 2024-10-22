import React from "react";

function Step5() {
  return (
    <div className={`grid grid-cols-5 gap-4`}>
      <div className={`col-span-2`}>
        <h1
          className={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
        >
          Mail Submission
        </h1>
        <p className={`text-sm text-offBlack font-normal font-roboto`}>
          We’ll send you a zoom video consultation (15 min mx) link via e-mail
        </p>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Submit your E-mail
          </p>
          <input
            type="text"
            id="cardNumber"
            placeholder="Enter your E-mail"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
      </div>
    </div>
  );
}

export default Step5;
