"use client";
import { Checkbox, Radio } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import doctorImage from "../../../public/images/doctorCover.png";

function Step4() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <h1
        className={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
      >
        Payment
      </h1>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 bg-white p-4 rounded">
          <h1 className={`text-black text-[20px] font-merri font-normal mb-6`}>
            Pay With
          </h1>
          <Radio.Group onChange={onChange} value={value}>
            <Radio
              value={1}
              className={`text-sm font-merri font-normal text-secondaryBlack`}
            >
              Card
            </Radio>
            <Radio
              value={2}
              className={`text-sm font-merri font-normal text-secondaryBlack`}
            >
              Bank
            </Radio>
          </Radio.Group>

          <form action="" className={`mt-6`}>
            <div className={`mb-4`}>
              <p
                className={`text-sm text-secondaryBlack font-merri font-normal`}
              >
                Card Number
              </p>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 1234 1234 1234"
                className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal`}
              />
            </div>

            <div className={`flex gap-4`}>
              <div>
                <p
                  className={`text-sm text-secondaryBlack font-merri font-normal`}
                >
                  Expiration Date
                </p>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="MM/YY"
                  className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal`}
                />
              </div>
              <div>
                <p
                  className={`text-sm text-secondaryBlack font-merri font-normal`}
                >
                  CVC
                </p>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="123"
                  className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal`}
                />
              </div>
            </div>
            <Checkbox checked={false} className={`mt-4`}>
              <p
                className={`text-sm text-secondaryBlack font-merri font-normal`}
              >
                Save my card
              </p>
            </Checkbox>
            <div>
              <button
                className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
              >
                Pay $20.00
              </button>
            </div>
            <p className={`text-sm text-gray50 font-roboto font-normal mt-4`}>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </form>
        </div>
        <div className="col-span-3 bg-transparent">
          <h1
            className={`text-black text-base font-roboto font-medium border-b border-b-offBorder pb-5`}
          >
            Consultation Summary
          </h1>
          <div className="mt-4 border-b border-b-offBorder pb-2">
            <Image src={doctorImage} alt="doctor" className={`w-40 h-40`} />
            <h1
              className={`text-[20px] font-merri font-normal text-secondaryBlack mt-3`}
            >
              Dr. John Michael
            </h1>
            <h2 className={`text-base font-merri font-normal text-offBlack`}>
              Medicine
            </h2>
          </div>

          <div
            className={`flex flex-row items-center justify-between py-2 border-t border-t-offBorder`}
          >
            <h1
              className={`text-sm text-secondaryBlack font-merri font-normal`}
            >
              Schedule:
            </h1>
            <h1
              className={`text-base text-secondaryBlack font-roboto font-semibold`}
            >
              Sunday, 02 Jan, 2024 at Morning, 11.00 am
            </h1>
          </div>

          <div
            className={`flex flex-row items-center justify-between py-2 border-t border-t-offBorder`}
          >
            <h1
              className={`text-sm text-secondaryBlack font-merri font-normal`}
            >
              Consultation Fee:
            </h1>
            <h1
              className={`text-base text-secondaryBlack font-roboto font-semibold`}
            >
              $20.00
            </h1>
          </div>

          <div
            className={`flex flex-row items-center justify-between py-2 border-t border-t-offBorder`}
          >
            <h1
              className={`text-sm text-secondaryBlack font-merri font-normal`}
            >
              Total:
            </h1>
            <h1
              className={`text-base text-secondaryBlack font-roboto font-semibold`}
            >
              $20.00
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4;
