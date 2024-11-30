"use client";

import "react-toastify/dist/ReactToastify.css";

import { useCallback, useState } from "react";
import {
  useAddEmailForZoomLinkMutation,
  useBookCreateAppointmentMutation,
} from "../../redux/apiSlices/appointmentsSlices";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import IconRightArrow from "../../public/icons/IconRightArrow";
import Services from "../components/Services";

import NewStep from "./components/NewStep";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";

import UserConsentAgreement from "./components/UserConsentAgreement";


function BookNow() {
  const user = useSelector((state) => state.user.user);
  const [createAppointment] = useBookCreateAppointmentMutation({});
  const [addEmailForZoomLink] = useAddEmailForZoomLinkMutation({});
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [extraUserEmail, setExtraUserEmail] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  // State to store only one selected item
  const [dateTime, setDateTime] = useState({
    dateTime: null,
    dayOfWeek: null,
  }); // State to store only one selected item
  const [extraInfo, setExtraInfo] = useState(null); // State to store only one selected item
  const [createdAppointment, setCreatedAppointment] = useState(null); // State to store only one selected item
  //
  const [consentStatus, setConsentStatus] = useState({
    termsAndConditions: false,
    dataSharing: false,
  });

  const handleConsentChange = (updatedConsents) => {
    setConsentStatus(updatedConsents);
  };
  //
  const showModal = () => {
    if (!user?.email) {
      route.push("/auth/login");
      return;
    }
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
    if (currentStep === 6) {
      handleAddEmailForZoomLink({
        email: extraUserEmail || user.email,
        appointmentId: createdAppointment?._id,
      });
      setIsModalOpen(false);

      Swal.fire(
        "Congratulations!",
        "Your appointment created successfully!",
        "success"
      );

      handleCancel();
    } else if (currentStep === 3) {
      handleCreateAppointment({
        ...dateTime,
        ...extraInfo,
        serviceId: selectedItem?._id,
        type: selectedItem?.consultationType,
        patientId: user._id,
      });
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateAppointment = useCallback(
    async (UData) => {
      try {
        if (!UData?.nhsNumber) {
          UData.nhsNumber = user.nhsNumber;
        }
        const response = await createAppointment(UData);
        // console.log(response);
        if (response?.data) {
          setCreatedAppointment(response?.data?.data?.appointment);
          setCurrentStep(4);
        }
        if (response?.error) {

          Swal.fire("Error", response?.error?.data?.message, "error");

        }
      } catch (error) {
        console.log(error);
      }
    },
    [user, createAppointment]
  );

  // console.log(createdAppointment);

  const handleAddEmailForZoomLink = useCallback(
    async (UData) => {
      try {
        const response = await addEmailForZoomLink(UData);
        console.log(response);
        if (response?.data) {

          Swal.fire("Success", response?.data?.message, "success");
        }
        if (response?.error) {
          Swal.fire("Error", response?.error?.data?.message, "error");

        }
      } catch (error) {
        console.log(error);
      }
    },
    [addEmailForZoomLink]
  );

  return (
    <>
      <section id="book" className="py-20 bg-[#fffcee] h-full">
        <div className="container mx-auto">
          <div>
            <h1 className="text-[#000] text-[48px] font-normal font-merri text-center">
              Book an Appointment
            </h1>
            {/* <p className="text-primary3 text-base leading-[30px] font-roboto font-normal text-center mt-2">
              Connect with qualified, GMC-registered medical professionals from
              the <br />
              comfort of your home. For your convenience, we currently offer
              telephone <br />
              and video consultations tailored to your needs. Enjoy secure,
              personalized <br />
              care, and seamless integration with NHS services. Book your
              appointment <br />
              today and discover the unparalleled benefits of MyDoctorClinic.
            </p> */}
            <div className="text-center">
              <button
                className="text-secondaryBlack bg-primary6 text-center font-merri text-2xl py-3 px-7 rounded-md font-bold mt-7"

                onClick={() => {
                  // showModal();
                  route.push("/booking");
                }}

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
        centered
        width={"70%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="p-4">
          {/* Steps navigation */}
          <div className="flex flex-row items-center gap-4 mb-4">
            {/* Step indicators */}
            {[1, 2, 3, 4, 5, 6].map((step) => (
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
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                containerBg={`bg-transparent`}
                title="Choose Consultation Type"
                titleStyle={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
              />
            )}
            {currentStep === 2 && (
              <Step3
                selectedItem={selectedItem}
                setDateTime={setDateTime}
                dateTime={dateTime}
              />
            )}
            {/* Now step 2 */}
            {currentStep === 3 && (
              // <NewStep
              //   setExtraInfo={setExtraInfo}
              //   extraInfo={extraInfo}
              //   user={user}
              // />
              <UserConsentAgreement onConsentChange={handleConsentChange} />
            )}{" "}
            {currentStep === 4 && (
              <NewStep
                setExtraInfo={setExtraInfo}
                extraInfo={extraInfo}
                user={user}
              />
            )}{" "}
            {/* Now step 5 */}
            {currentStep === 5 && createdAppointment && (
              <Step4
                setCurrentStep={setCurrentStep}
                createdAppointment={createdAppointment}
                setIsPaid={setIsPaid}
              />
            )}{" "}
            {/* Now step 6 */}
            {currentStep === 6 && (
              <Step5
                setExtraUserEmail={setExtraUserEmail}
                email={user?.email}
              />
            )}{" "}
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
              disabled={
                currentStep === 1 && !selectedItem
                  ? true
                  : currentStep === 2 && !dateTime?.dateTime
                  ? true
                  : currentStep === 3 &&
                    (!consentStatus.termsAndConditions ||
                      !consentStatus.dataSharing)
                  ? true
                  : // : currentStep === 3 && !extraInfo
                  // ? true
                  currentStep === 4 && !createdAppointment
                  ? true
                  : currentStep === 5 && !isPaid
                  ? true
                  : false
              }
              // className="bg-primary6 text-white py-2 px-4 rounded-sm"
              className={`py-2 px-4 rounded-sm ${
                (currentStep === 1 && !selectedItem) ||
                (currentStep === 2 && !dateTime?.dateTime) ||
                (currentStep === 3 &&
                  (!consentStatus.termsAndConditions ||
                    !consentStatus.dataSharing)) ||
                (currentStep === 4 && !createdAppointment) ||
                (currentStep === 5 && !isPaid)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary6 text-white"
              }`}
              onClick={handleNext}
            >
              {currentStep === 6 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BookNow;
