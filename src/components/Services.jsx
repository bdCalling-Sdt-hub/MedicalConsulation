import React from "react";

function Services() {
  return (
    <section className={`py-20 bg-primary3`}>
      <div className="container mx-auto">
        <h1
          className={`text-primary10 text-[32px] leading-[22px] font-merri mb-6 font-bold`}
        >
          Services
        </h1>

        <div className="flex flex-row gap-4 items-center">
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              10 Minutes Telephone Consultation
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              15 Minutes Video Consultation
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              20 Minutes Video Consultation
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              Medication Reviews
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center mt-4">
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              Peadiatric Reviews
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              Geriatric
              <br /> Reviews
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
            <h1 className={`text-primary10 text-[24px] font-roboto font-bold`}>
              20 point comprehensive medical assessment with detailed report
            </h1>
            <p className={`text-base font-roboto font-medium text-primary9`}>
              $ 5.00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
