"use client";

import { Button, Modal, Rate } from "antd";
import { useCallback, useState } from "react";

import IconRightArrow from "../../../../../../public/icons/IconRightArrow";
import Image from "next/image";
import NewStep from "../../../../../modal/components/NewStep";
import Step3 from "../../../../../modal/components/Step3";
import Step5 from "../../../../../modal/components/Step5";
import img1 from "../../../../../../public/images/dashboard/consultant/consultant1.png";
import { jsPDF } from "jspdf";
import { useBookCreateAppointmentMutation } from "../../../../../../redux/apiSlices/appointmentsSlices";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// Consultants data
const consultants = [
  {
    id: 1,
    img: img1,
    name: "Dr. David Williams",
    division: "Cardiologist",
    dayAndTime: "11:00 am on 02 Jan, Sunday",
    rating: "Rated",
  },
  {
    id: 2,
    img: img1,
    name: "Dr. Jane Smith",
    division: "Cardiologist",
    dayAndTime: "12:00 pm on 03 Jan, Monday",
    rating: "Rated",
  },
];

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ConsultantHistory = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState("");
  const [value, setValue] = useState(3);
  const navigate = useRouter();

  // ReSchedule Button Handler
  const handleReSchedule = () => {
    navigate.push("/reschedule");
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to open the modal with specific content (Prescription or Note)
  const showInfoModal = (data) => {
    setInfoModalData(data);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  // Function to generate and download the PDF based on modal data
  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    if (infoModalData === "Prescription Details") {
      doc.text("Prescription Details", 10, 10);
      doc.text("Doctor's Name: Dr. David Williams", 10, 20);
      doc.text("Patient's Name: John Doe", 10, 30);
      doc.text("Prescription Date: 02 January 2024", 10, 40);
      doc.text("Medications:", 10, 50);
      doc.text("- Aspirin 75mg: Take once daily", 10, 60);
      doc.text("- Atorvastatin 10mg: Take one tablet before bed", 10, 70);
      doc.text("- Lisinopril 5mg: Take one tablet every morning", 10, 80);
      doc.text(
        "Instructions: Follow the dosage instructions strictly.",
        10,
        90
      );
      doc.text("Next Consultation: 15 January 2024", 10, 100);
    } else if (infoModalData === "Note Details") {
      doc.text("Consultation Notes", 10, 10);
      doc.text("Doctor's Name: Dr. David Williams", 10, 20);
      doc.text("Patient's Name: John Doe", 10, 30);
      doc.text("Consultation Date: 02 January 2024", 10, 40);
      doc.text("Notes:", 10, 50);
      doc.text("The patient reported mild chest pain and dizziness.", 10, 60);
      doc.text("Vitals were stable. Medications were prescribed.", 10, 70);
      doc.text("Recommendations:", 10, 80);
      doc.text("- Maintain a low-sodium diet", 10, 90);
      doc.text("- Engage in moderate exercise (30 minutes daily)", 10, 100);
      doc.text("Next Consultation: 15 January 2024", 10, 110);
    }

    doc.save(`${infoModalData}.pdf`); // Save the PDF file
  };

  const user = useSelector((state) => state.user.user);
  const [createAppointment] = useBookCreateAppointmentMutation({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null); // State to store only one selected item
  const [dateTime, setDateTime] = useState({
    dateTime: null,
    dayOfWeek: null,
  }); // State to store only one selected item
  const [extraInfo, setExtraInfo] = useState(null); // State to store only one selected item
  const [createdAppointment, setCreatedAppointment] = useState(null); // State to store only one selected item

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
    } else if (currentStep === 3) {
      handleCreateAppointment({
        ...dateTime,
        ...extraInfo,
        serviceId: selectedItem?._id,
        type: selectedItem?.consultationType,
        patientId: user._id,
      });
    } else if (currentStep < 5) {
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
          toast.error(response?.error?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  return (
    <div className="py-4">
      <h1 className="p-4 text-xl font-bold">Professional Consultants</h1>
      <div className="grid grid-cols-6 gap-4 px-4">
        {consultants.map((consultant) => (
          <div
            className="border border-gray-200 items-center justify-center mx-auto rounded-2xl"
            key={consultant.id}
          >
            <Image
              className="rounded-t-2xl"
              src={consultant.img}
              alt={consultant.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{consultant.name}</h2>
              <p className="text-gray-300">{consultant.division}</p>
              <div className="flex justify-between py-2">
                {/* Prescription Button */}
                <Button
                  className="border-none p-3 bg-gray-200 mt-2"
                  onClick={() => showInfoModal("Prescription Details")}
                >
                  Prescription
                </Button>

                {/* Note Button */}
                <Button
                  className="border-none mt-2 bg-gray-300"
                  onClick={() => showInfoModal("Note Details")}
                >
                  Note
                </Button>
              </div>
              <p>{consultant.dayAndTime}</p>
              <div className="flex gap-4 py-2 border-b border-gray-200">
                <Rate tooltips={desc} onChange={setValue} value={value} />
                <p>{consultant.rating}</p>
              </div>
              <Button
                onClick={showModal}
                className="mt-2 w-full bg-[#D9C771] text-white"
              >
                Re-Schedule
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Modal */}
      <Modal
        open={isInfoModalOpen}
        centered
        onCancel={closeInfoModal}
        footer={[
          <Button key="close" onClick={closeInfoModal}>
            Close
          </Button>,
          <Button key="download" onClick={handleDownloadPdf} type="primary">
            Download as PDF
          </Button>,
        ]}
      >
        <h2>{infoModalData}</h2>
        {infoModalData === "Prescription Details" && (
          <div className="bg-gray-800">
            <p>
              <strong>Doctor's Name:</strong> Dr. David Williams
            </p>
            <p>
              <strong>Patient's Name:</strong> John Doe
            </p>
            <p>
              <strong>Prescription Date:</strong> 02 January 2024
            </p>
            <p>
              <strong>Medications:</strong>
            </p>
            <ul>
              <li>Aspirin 75mg - Take once daily</li>
              <li>Atorvastatin 10mg - Take one tablet before bed</li>
              <li>Lisinopril 5mg - Take one tablet every morning</li>
            </ul>
            <p>
              <strong>Instructions:</strong> Follow dosage strictly.
            </p>
            <p>
              <strong>Next Consultation:</strong> 15 January 2024
            </p>
          </div>
        )}
        {infoModalData === "Note Details" && (
          <div className="bg-gray-800">
            <p>
              <strong>Doctor's Name:</strong> Dr. David Williams
            </p>
            <p>
              <strong>Patient's Name:</strong> John Doe
            </p>
            <p>
              <strong>Consultation Date:</strong> 02 January 2024
            </p>
            <p>
              <strong>Notes:</strong> Patient reported mild chest pain and
              dizziness.
            </p>
            <p>
              <strong>Recommendations:</strong>
            </p>
            <ul>
              <li>Maintain a low-sodium diet</li>
              <li>Engage in 30 minutes of moderate exercise daily</li>
            </ul>
            <p>
              <strong>Next Consultation:</strong> 15 January 2024
            </p>
          </div>
        )}
      </Modal>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        width={"70%"}
        centered
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="p-4">
          {/* Steps navigation */}
          <div className="flex flex-row items-center gap-4 mb-4">
            {/* Step indicators */}
            {[1, 2, 3].map((step) => (
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
              <Step3
                selectedItem={selectedItem}
                setDateTime={setDateTime}
                dateTime={dateTime}
              />
            )}
            {/* Now step 2 */}
            {currentStep === 2 && (
              <NewStep
                setExtraInfo={setExtraInfo}
                extraInfo={extraInfo}
                user={user}
              />
            )}{" "}
            {/* Now step 3 */}
            {currentStep === 3 && <Step5 />} {/* Now step 5 */}
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
    </div>
  );
};

export default ConsultantHistory;
