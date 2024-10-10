import React from "react";

function Banner() {
  return (
    <section>
      <div
        style={{ backgroundImage: "url('/images/banner.png')" }}
        className="h-[70vh] w-full bg-cover bg-center"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1
            className={`text-primary1 text-[48px] font-merri font-black text-center leading-[61px]`}
          >
            Consult with Your Doctor Instantly <br />
            Anywhere via Phone or Video
          </h1>
          <h5
            className={`text-base font-merri font-normal text-center text-primary3 mt-3`}
          >
            At My Doctor Clinic, we provide 24/7 access to healthcare with
            convenient phone and video consultations. <br /> Connect with a
            qualified medical professional anytime, anywhere, and receive the
            expert guidance and <br />
            support you need from the comfort of your home.
          </h5>
          <button
            className={`text-secondaryBlack bg-primary6 font-merri text-sm py-2 px-6 rounded-sm font-normal mt-4`}
          >
            Book for Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;
