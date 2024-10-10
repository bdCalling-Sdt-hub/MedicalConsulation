import React from "react";
import IconVerifiedSuccess from "../../public/icons/IconVerifiedSuccess";
import Image from "next/image";
import patients from "../../public/images/patients.png";
import about from "../../public/images/about.png";
import Accordion from "@/components/Accordion";
import user from "../../public/images/user.jpg";

function Page() {
  return (
    <>
      {/* banner section */}
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

      {/*  about us section */}
      <section className={`py-20 bg-primary1`}>
        <div className="container mx-auto">
          <h3 className={`text-offBlack text-[20px] font-merri font-normal`}>
            About Us
          </h3>
          <h1
            className={`text-2xl text-secondaryBlack font-merri font-bold leading-[32px]`}
          >
            We Provide Best Online Doctor Consultation
            <br /> For You
          </h1>

          <p className={`text-offBlack text-base font-roboto font-normal mt-3`}>
            Experience the future of healthcare with our expert consultations.
            Connect with qualified, GMC-registered medical professionals
            anytime, anywhere. From the comfort of your home, you can get a
            detailed consultation and advice on managing your health. Our secure
            platform allows you to book online appointments with medical experts
            more efficiently than ever before. Whether you need help managing a
            chronic condition or have questions about your general well-being,
            our team is ready to support your journey to better health.
          </p>

          <div className={`mt-4`}>
            <p className={`text-neutral8 text-base font-roboto font-semibold`}>
              Key benefits of consultations:
            </p>
            <ul
              className={`text-offBlack text-base font-roboto font-normal text-2xl list-disc list-inside`}
            >
              <li>
                Accessibility: Consult with a doctor on your schedule, without
                the hassle of traveling.
              </li>
              <li>
                Comprehensive Care: Receive personalized advice and treatment
                plans on a wide range of health conditions, from common ailments
                to complex medical issues.
              </li>
              <li>
                Confidentiality: Rest assured that all your information remains
                confidential and secure.
              </li>
              <li>
                Expertise: Our highly trained professionals specialize in
                providing expert healthcare solutions tailored to your needs.
              </li>
              <li>
                Remote Prescriptions: Get prescriptions for medications through
                our online platform, delivered directly to your preferred
                pharmacy.
              </li>
            </ul>
            <p
              className={`text-offBlack text-base font-roboto font-normal text-2xl mt-4`}
            >
              We strive to offer high-quality consultations that empower you to
              take control of your health. Our experienced medical team is
              dedicated to helping you lead a healthier life with timely, expert
              medical advice.
            </p>
          </div>

          <div className="bg-white w-60 p-4 gap-4 mt-5 border border-neutral4">
            <div className={`flex flex-row items-center gap-2`}>
              <IconVerifiedSuccess />
              <h4 className={`text-black text-base font-roboto font-semibold`}>
                Get an E-Prescription
              </h4>
            </div>

            <p
              className={`text-offBlack font-regular font-merri text-sm leading-[22px] mt-3`}
            >
              We’ll provide you an E-prescription soft copy after consultation
              with Doctor
            </p>
          </div>

          <div className="bg-primary4 py-3 px-6 rounded flex-row flex items-center gap-4 mt-6">
            <Image src={patients} alt="patients" />
            <div>
              <h1 className={`text-primary10 font-bold text-base font-merri`}>
                Over 1,000+
              </h1>
              <h1 className={`text-offBlack font-normal text-xs font-merri`}>
                Satisfied Patients
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* about us 2 section */}
      <section className={`py-20 bg-primary2`}>
        <div className="container mx-auto flex flex-row gap-4">
          <div className="w-4/12">
            <h1 className={`text-primary10 text-[48px] font-abril font-bold`}>
              15 Minutes
              <br />
              Consultation
              <br />
              with Specialist
              <br />
              Doctor
            </h1>
            <p className={`text-black font-normal text-lg `}>
              Every hour, every day
            </p>
            <button
              className={`text-white bg-primary10 font-merri text-sm py-2 px-6 rounded-sm font-normal mt-7`}
            >
              Book Now
            </button>
          </div>
          <div className="">
            <Image src={about} alt="about" />
          </div>
        </div>
      </section>

      {/* services section */}
      <section className={`py-20 bg-primary3`}>
        <div className="container mx-auto">
          <h1
            className={`text-primary10 text-[32px] leading-[22px] font-merri mb-6 font-bold`}
          >
            Services
          </h1>

          <div className="flex flex-row gap-4 items-center">
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                10 Minutes Telephone Consultation
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                15 Minutes Video Consultation
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                20 Minutes Video Consultation
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                Medication Reviews
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center mt-4">
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                Peadiatric Reviews
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                Geriatric
                <br /> Reviews
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm h-44 flex flex-col justify-between flex-1">
              <h1
                className={`text-primary10 text-[24px] font-roboto font-bold`}
              >
                20 point comprehensive medical assessment with detailed report
              </h1>
              <p className={`text-base font-roboto font-medium text-primary9`}>
                $ 5.00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* book appointment section */}
      <section className={`py-20 bg-primary10`}>
        <div className="container mx-auto">
          <div>
            <h1
              className={`text-primary2 text-[48px] font-normal font-merri text-center`}
            >
              Book an Appointment
            </h1>
            <p
              className={`text-primary3 text-base leading-[30px] font-roboto font-normal text-center mt-2`}
            >
              Connect with qualified, GMC-registered medical professionals from
              the <br />
              comfort of your home. For your convenience, we currently offer
              telephone <br />
              and video consultations tailored to your needs. Enjoy secure,
              personalized <br />
              care, and seamless integration with NHS services. Book your
              appointment <br />
              today and discover the unparalleled benefits of MyDoctorClinic.
            </p>
            <div className={`text-center`}>
              <button
                className={`text-secondaryBlack bg-primary2 text-center font-merri text-sm py-2 px-6 rounded-sm font-normal mt-7`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className={`bg-white py-20`}>
        <div className="container mx-auto">
          <h1 className={`text-black text-2xl font-merri font-normal pb-6`}>
            Frequently Asked Questions
          </h1>
          <Accordion />
        </div>
      </section>

      {/* testimonials section */}
      <section className={`py-20 bg-primary1`}>
        <div className="container mx-auto">
          <h1
            className={`text-primary10 text-[32px] leading-[22px] font-merri mb-6`}
          >
            What our Client Say
          </h1>

          <div className="flex flex-row gap-4 items-center">
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center mt-4">
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
            <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
              <div className={`flex flex-row items-center gap-2 `}>
                <Image
                  src={user}
                  alt="user"
                  className={`w-12 h-12 rounded-full`}
                />
                <h1
                  className={`text-secondaryBlack font-roboto font-bold text-sm`}
                >
                  Amena Akhter
                </h1>
              </div>
              <p
                className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
              >
                Dr. John Michael was attentive and thorough during my
                consultation. He took the time to explain everything clearly and
                made me feel comfortable throughout the process. I highly
                recommend him for anyone seeking professional and compassionate
                care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
