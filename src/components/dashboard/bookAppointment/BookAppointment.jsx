import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify"; // Import Toastify

import Doctors from "./Step2";
import IconRightArrow from "/images/icons/IconRightArrow";
import { Modal } from "antd";
import Services from "../../component/Services";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { useState } from "react";

function BookAppointment({ isModalOpen, closeModal }) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Step state

  const handleCancel = () => {
    closeModal();

    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep === 5) {
      closeModal();

      toast.success("Congratulations! your appointment has completed!", {
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
            {currentStep === 2 && <Doctors />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 />}
            {currentStep === 5 && <Step5 />}
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
              // disabled={currentStep === 1 || currentStep === 2}
            >
              {currentStep === 5 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer position="top-center" />
    </>
  );
}

export default BookAppointment;

// import { Modal } from "antd";
// import React, { useState } from "react";
// import IconRightArrow from "/images/icons/IconRightArrow";
// import Step3 from "./Step3";
// import Doctors from "./Step2";
// import Step4 from "./Step4";
// import Step5 from "./Step5";
// import { ToastContainer, toast } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css";

// function BookAppointment({ isModalOpen, closeModal }) {
//   // Set the initial step to 3
//   const [currentStep, setCurrentStep] = useState(3);

//   const handleOk = () => {
//     closeModal();
//     setCurrentStep(3); // Reset to the third step when modal closes
//   };

//   const handleCancel = () => {
//     closeModal();
//     setCurrentStep(3);
//   };

//   const handleNext = () => {
//     if (currentStep === 5) {
//       closeModal();
//       toast.success("Congratulations! your appointment has completed!", {
//         autoClose: 2000,
//       });
//       handleCancel();
//     } else if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 3) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <>
//       <Modal
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         maskClosable={false}
//         width={"70%"}
//         closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
//       >
//         <div className="p-4">
//           {/* Steps navigation */}
//           <div className="flex flex-row items-center gap-4 mb-4">
//             {/* Step indicators */}
//             {[1, 2, 3, 4, 5].map((step) => (
//               <div
//                 key={step}
//                 className={`flex-row flex items-center gap-2 ${
//                   currentStep === step ? "border-b-[2px] border-b-primary6" : ""
//                 } pb-2`}
//               >
//                 <div
//                   className={`${
//                     step === 1 || step === 2
//                       ? "bg-gray300 border-gray300 cursor-not-allowed" // Disable style for steps 1 and 2
//                       : currentStep === step
//                       ? "bg-primary6 border-primary6"
//                       : "border-gray50"
//                   } border w-6 h-6 rounded-full flex items-center justify-center`}
//                 >
//                   <h2
//                     className={`font-normal text-base font-merri ${
//                       step === 1 || step === 2
//                         ? "text-gray400" // Disabled text color for steps 1 and 2
//                         : currentStep === step
//                         ? "text-white"
//                         : "text-gray50"
//                     }`}
//                   >
//                     {step}
//                   </h2>
//                 </div>
//                 <h3
//                   className={`text-base font-roboto font-normal ${
//                     step === 1 || step === 2 ? "text-gray400" : "text-offBlack"
//                   }`}
//                 >
//                   Step {step}
//                 </h3>
//                 {currentStep >= step && step !== currentStep && step > 2 && (
//                   <div className="ml-2">
//                     <IconRightArrow />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Body content */}
//           <div className="mt-4">
//             {currentStep === 3 && <Step3 />}
//             {currentStep === 2 && <Doctors />}
//             {currentStep === 4 && <Step4 />}
//             {currentStep === 5 && <Step5 />}
//           </div>
//         </div>

//         {/* Footer with navigation buttons */}
//         <div className="flex flex-row items-center justify-between p-4">
//           {currentStep === 3 ? (
//             <div />
//           ) : (
//             <button
//               className={`text-secondaryBlack py-2 px-4 rounded-sm text-base font-merri font-medium`}
//               onClick={handlePrevious}
//             >
//               Previous
//             </button>
//           )}

//           <div>
//             <button
//               className="bg-primary6 text-white py-2 px-4 rounded-sm"
//               onClick={handleNext}
//             >
//               {currentStep === 5 ? "Finish" : "Next"}
//             </button>
//           </div>
//         </div>
//       </Modal>

//       <ToastContainer position="top-center" />
//     </>
//   );
// }

// export default BookAppointment;
