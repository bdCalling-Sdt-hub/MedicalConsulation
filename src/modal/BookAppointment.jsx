"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import IconRightArrow from "../../public/icons/IconRightArrow";
import Services from "../components/Services";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import NewStep from "./components/NewStep";

function BookAppointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentStep(1); 
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep === 5) {
      setIsModalOpen(false);
      toast.success("Congratulations! Your appointment has been completed!", {
        autoClose: 2000,
      });
      handleCancel();
    } else if (currentStep < 5) {
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
            {/* Step indicators */}
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-row flex items-center gap-2 ${
                  currentStep === step ? "border-b-[2px] border-b-primary6" : ""
                } pb-2`}
              >
                <div
                  className={`${
                    currentStep === step
                      ? "bg-primary6 border-primary6"
                      : "border-gray50"
                  } border w-6 h-6 rounded-full flex items-center justify-center`}
                >
                  <h2
                    className={`font-normal text-base font-merri ${
                      currentStep === step ? "text-white" : "text-gray50"
                    }`}
                  >
                    {step}
                  </h2>
                </div>
                <h3 className="text-offBlack text-base font-roboto font-normal">
                  Step {step}
                </h3>
                {currentStep >= step && (
                  <div className="ml-2">
                    <IconRightArrow />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Body content */}
          <div className="mt-4">
            {currentStep === 1 && (
              <Services
                containerBg={`bg-transparent`}
                title="Choose Consultation Type"
                titleStyle={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
              />
            )}
            {currentStep === 2 && <Step3 />} {/* Now step 2 */}
            {currentStep === 3 && <Step4 />} {/* Now step 3 */}
            {currentStep === 4 && <NewStep />} {/* Now step 4 */}
            {currentStep === 5 && <Step5 />} {/* Now step 5 */}
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
              {currentStep === 5 ? "Finish" : currentStep === 4 ? "Skip & Next" : "Next"}
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer position="top-center" />
    </>
  );
}

export default BookAppointment;
