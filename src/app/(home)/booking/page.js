"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useAddEmailForZoomLinkMutation,
  useBookCreateAppointmentMutation,
} from "../../../../redux/apiSlices/appointmentsSlices";
import {
  useGetServiceByIdQuery,
  useLazyGetServiceByIdQuery,
} from "../../../../redux/apiSlices/servicesSlices";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import IconRightArrow from "../../../../public/icons/IconRightArrow";
import Services from "../../../components/Services";
import NewStep from "../../../modal/components/NewStep";
import Step3 from "../../../modal/components/Step3";
import Step4 from "../../../modal/components/Step4";
import Step5 from "../../../modal/components/Step5";
import UserConsentAgreement from "../../../modal/components/UserConsentAgreement";

const Booking = (pops) => {
  console.log("pops?.searchParams", pops?.searchParams);
  console.log("pops?.searchParams _id", pops?.searchParams._id);
  const user = useSelector((state) => state.user.user);
  const [createAppointment] = useBookCreateAppointmentMutation({});
  const [addEmailForZoomLink] = useAddEmailForZoomLinkMutation({});
  // const { data: service } = useGetServiceByIdQuery(pops?.searchParams._id);
  const [getServiceById, { data: service }] = useLazyGetServiceByIdQuery();

  // const { serviceById } = useGetServiceByIdQuery();
  console.log("service", service);

  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [extraUserEmail, setExtraUserEmail] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  // State to store only one selected item
  const [dateTime, setDateTime] = useState({
    dateTime: null,
    dayOfWeek: null,
  });
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

  const handleNext = async () => {
    console.log("extraInfo", extraInfo);
    if (currentStep === 6) {
      handleAddEmailForZoomLink({
        email: extraUserEmail || user.email,
        appointmentId: createdAppointment?._id,
      }).then(() => {
        Swal.fire(
          "Congratulations!",
          "Your appointment created successfully!",
          "success"
        );
        router.push("/");
      });
    } else if (currentStep === 4) {
      console.log("extraInfo", extraInfo);
      const response = await handleCreateAppointment({
        ...dateTime,
        ...extraInfo,
        serviceId: selectedItem?._id,
        type: selectedItem?.consultationType,
        patientId: user._id,
      });
      console.log("response", response);
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleCreateAppointment = useCallback(
  //   async (UData) => {
  //     try {
  //       if (!UData?.nhsNumber) {
  //         UData.nhsNumber = user.nhsNumber;
  //       }
  //       const response = await createAppointment(UData);
  //       console.log("response handleCreateAppointment 92", response);
  //       console.log(
  //         "response?.data handleCreateAppointment 92",
  //         response?.data
  //       );
  //       if (response?.data) {
  //         setCreatedAppointment(response?.data?.data?.appointment);
  //         // setCurrentStep(4);
  //         setCurrentStep(5);
  //       }
  //       if (response?.error) {
  //         Swal.fire("Error", response?.error?.data?.message, "error");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [user, createAppointment]
  // );
  const handleCreateAppointment = useCallback(
    async (UData) => {
      try {
        const formData = new FormData();

        // Append non-file fields
        Object.keys(UData).forEach((key) => {
          if (key !== "pdfFiles") {
            formData.append(key, UData[key]);
          }
        });

        // Append files
        if (UData?.pdfFiles?.length) {
          UData.pdfFiles.forEach((file) => {
            formData.append("pdfFiles", file);
          });
        }

        console.log("formData", formData);
        console.log("UData.pdfFiles", UData.pdfFiles);

        // Call mutation
        const response = await createAppointment(formData).unwrap();

        if (response?.data) {
          setCreatedAppointment(response?.data?.appointment);
          setCurrentStep(5);
        }
      } catch (error) {
        console.error("Appointment creation failed", error);
      }
    },
    [createAppointment, setCreatedAppointment, setCurrentStep]
  );

  // console.log(createdAppointment);

  const handleAddEmailForZoomLink = useCallback(
    async (UData) => {
      try {
        const response = await addEmailForZoomLink(UData);
        console.log(response);
        if (response?.data) {
          Swal.fire("Good job!", "Your email has been added!", "success");
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

  // console.log(selectedItem);

  useEffect(() => {
    if (pops?.searchParams?._id) {
      // setSelectedItem(pops?.searchParams);

      getServiceById(pops?.searchParams?._id)
        .then((data) => {
          console.log("data", data);
          setSelectedItem(data?.data?.data);
        })
        .catch((err) => console.log(err));
      setCurrentStep(2);
      // const data = serviceById(pops?.searchParams._id);
      // console.log("data", data);
    }
  }, [pops?.searchParams, getServiceById]);

  console.log("currentStep", currentStep);

  return (
    <div className=" container mx-auto  my-10">
      <div className=" bg-primary1 rounded-md">
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
                  currentStep === 4 && !extraInfo
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
                // (currentStep === 4 && !createdAppointment) ||
                (currentStep === 4 && !extraInfo) ||
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
      </div>
    </div>
  );
};

export default Booking;
