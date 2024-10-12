"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import IconRightArrow from "../../public/icons/IconRightArrow";
import Services from "../components/Services";
import Doctors from "./components/Step2";
import Step3 from "./components/Step3";

function BookAppointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Step state

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentStep(1); // Reset to the first step when modal closes
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentStep(1); // Reset to the first step when modal closes
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <section className="py-20 bg-primary10">
        <div className="container mx-auto">
          <div>
            <h1 className="text-primary2 text-[48px] font-normal font-merri text-center">
              Book an Appointment
            </h1>
            <p className="text-primary3 text-base leading-[30px] font-roboto font-normal text-center mt-2">
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
            <div className="text-center">
              <button
                className="text-secondaryBlack bg-primary2 text-center font-merri text-sm py-2 px-6 rounded-sm font-normal mt-7"
                onClick={showModal}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        width={"70%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="p-4">
          {/* Steps navigation */}
          <div className="flex flex-row items-center gap-4 mb-4">
            <div
              className={`flex-row flex items-center gap-2 ${
                currentStep === 1 ? "border-b-[2px] border-b-primary6" : ""
              } pb-2`}
            >
              <div
                className={`${
                  currentStep === 1
                    ? "bg-primary6 border-primary6"
                    : "border-gray50"
                } border w-6 h-6 rounded-full flex items-center justify-center`}
              >
                <h2
                  className={`font-normal text-base font-merri ${
                    currentStep === 1 ? "text-white" : "text-gray50"
                  }`}
                >
                  1
                </h2>
              </div>
              <h3 className="text-offBlack text-base font-roboto font-normal">
                Step 1
              </h3>
              {currentStep >= 1 && (
                <div className="ml-2">
                  <IconRightArrow />
                </div>
              )}
            </div>
            <div
              className={`flex-row flex items-center gap-2 ${
                currentStep === 2 ? "border-b-[2px] border-b-primary6" : ""
              } pb-2`}
            >
              <div
                className={`${
                  currentStep === 2
                    ? "bg-primary6 border-primary6"
                    : "border-gray50"
                } border w-6 h-6 rounded-full flex items-center justify-center`}
              >
                <h2
                  className={`font-normal text-base font-merri ${
                    currentStep === 2 ? "text-white" : "text-gray50"
                  }`}
                >
                  2
                </h2>
              </div>
              <h3 className="text-offBlack text-base font-roboto font-normal">
                Step 2
              </h3>
              {currentStep >= 2 && (
                <div className="ml-2">
                  <IconRightArrow />
                </div>
              )}
            </div>
            <div
              className={`flex-row flex items-center gap-2 ${
                currentStep === 3 ? "border-b-[2px] border-b-primary6" : ""
              } pb-2`}
            >
              <div
                className={`${
                  currentStep === 3
                    ? "bg-primary6 border-primary6"
                    : "border-gray50"
                } border w-6 h-6 rounded-full flex items-center justify-center`}
              >
                <h2
                  className={`font-normal text-base font-merri ${
                    currentStep === 3 ? "text-white" : "text-gray50"
                  }`}
                >
                  3
                </h2>
              </div>
              <h3 className="text-offBlack text-base font-roboto font-normal">
                Step 3
              </h3>
              {currentStep >= 3 && (
                <div className="ml-2">
                  <IconRightArrow />
                </div>
              )}
            </div>
            <div
              className={`flex-row flex items-center gap-2 ${
                currentStep === 4 ? "border-b-[2px] border-b-primary6" : ""
              } pb-2`}
            >
              <div
                className={`${
                  currentStep === 4
                    ? "bg-primary6 border-primary6"
                    : "border-gray50"
                } border w-6 h-6 rounded-full flex items-center justify-center`}
              >
                <h2
                  className={`font-normal text-base font-merri ${
                    currentStep === 4 ? "text-white" : "text-gray50"
                  }`}
                >
                  4
                </h2>
              </div>
              <h3 className="text-offBlack text-base font-roboto font-normal">
                Step 4
              </h3>
              {currentStep >= 4 && (
                <div className="ml-2">
                  <IconRightArrow />
                </div>
              )}
            </div>
            <div
              className={`flex-row flex items-center gap-2 ${
                currentStep === 5 ? "border-b-[2px] border-b-primary6" : ""
              } pb-2`}
            >
              <div
                className={`${
                  currentStep === 5
                    ? "bg-primary6 border-primary6"
                    : "border-gray50"
                } border w-6 h-6 rounded-full flex items-center justify-center`}
              >
                <h2
                  className={`font-normal text-base font-merri ${
                    currentStep === 5 ? "text-white" : "text-gray50"
                  }`}
                >
                  5
                </h2>
              </div>
              <h3 className="text-offBlack text-base font-roboto font-normal">
                Step 5
              </h3>
              {currentStep >= 5 && (
                <div className="ml-2">
                  <IconRightArrow />
                </div>
              )}
            </div>
            {/* Add similar blocks for other steps if needed */}
          </div>

          {/* Body content */}
          <div className="mt-4">
            {currentStep === 1 && (
              <Services
                containerBg={`bg-trasnparent`}
                title="Choose Consultation Type"
                titleStyle={`secondaryBlack text-[20px] font-merri font-normal mb-6`}
              />
            )}
            {currentStep === 2 && <Doctors />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <h1>Step 4 Content</h1>}
            {currentStep === 5 && <h1>Step 5 Content</h1>}
          </div>
        </div>

        {/* Footer with navigation buttons */}
        <div className="flex flex-row items-center justify-between p-4">
          {currentStep === 1 ? (
            <div />
          ) : (
            <button
              className={`text-secondaryBlack py-2 px-4 rounded-sm text-base font-merri font-medium`}
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}

          <div>
            <button
              className="bg-primary6 text-white py-2 px-4 rounded-sm"
              onClick={handleNext}
            >
              {currentStep === 5 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BookAppointment;
