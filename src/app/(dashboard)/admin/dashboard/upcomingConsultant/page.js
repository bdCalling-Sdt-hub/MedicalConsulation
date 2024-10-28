"use client";

import { Button, Empty, Modal, Table, Typography } from "antd";
import { NotebookPen, NotebookText } from "lucide-react";

import { useState } from "react";
import { useGetAllAppointmentQuery } from "../../../../../../redux/apiSlices/appointmentsSlices";
import SelectBox from "../../../../../components/dashboard/share/SelectBox";

// Define Props type

const { Text } = Typography;

const selectOptions = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "upcoming" },
  { value: "completed", label: "completed" },
  { value: "cancelled", label: "cancelled" },
];
// Correctly specify props
const UpcomingConsultant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [showSizeChange, onShowSizeChange] = useState(10);
  const [userData, setUserData] = useState(null);
  const [selectItem, setSelectedItem] = useState("");
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const [openNoteModal, setOpenNoteModal] = useState(false);

  // console.log(showSizeChange);

  const [value, setValue] = useState(3);
  const [selectedValue, setSelectedValue] = useState();
  const { data: AllAppointment } = useGetAllAppointmentQuery({
    page: currentPage,
    limit: showSizeChange,
    status: selectedValue === "all" || !selectedValue ? "" : selectedValue,
  });
  // console.log(AllAppointment);
  const handleSelectChange = (value) => {
    setSelectedValue(value);
    // console.log("Selected", value);
  };

  const columns = [
    {
      title: "Doctor Email",
      dataIndex: "doctorId",
      key: "doctorId",
      render: (_, record) => (
        <div code className="">
          {record?.doctorId?.email}
        </div>
      ),
    },
    {
      title: "Patient Email",
      dataIndex: "patientEmail",
      key: "patientEmail",
    },
    {
      title: "Date Of Week",
      dataIndex: "dayOfWeek",
      key: "dayOfWeek",
    },
    {
      title: "Date and Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (_, record) => (
        <Text code className="text-[#71717A]">
          {new Date(record?.dateTime).toLocaleDateString()}
        </Text>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => (
        <div
          className={`${
            record?.paymentStatus === "paid"
              ? "text-green-500"
              : record?.paymentStatus === "unpaid"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {record.paymentStatus}
        </div>
      ),
    },

    {
      title: "Consultation type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div
          className={`${
            record?.status === "upcoming"
              ? "text-yellow-500"
              : record?.status === "completed"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {record.status}
        </div>
      ),
    },
    {
      title: "Documents",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <div className="flex flex-col gap-2 items-start">
          <Button
            onClick={() => handleNoteClick(record)}
            type="default"
            variant="outlined"
            icon={<NotebookText size={20} />}
            size="small"
          >
            Note
          </Button>{" "}
          <Button
            icon={<NotebookPen size={20} />}
            onClick={() => handlePrescriptionClick(record)}
            type="default"
            variant="outlined"
            size="small"
          >
            Prescription
          </Button>
        </div>
      ),
    },
    // {
    //   title: "Ratings",
    //   dataIndex: "rating", // Use "rating" data field (numeric value)
    //   key: "rating",
    //   render: (rating) => <Rate className="custom-rate" disabled value={rating} />, // Display stars
    // }
  ];

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handlePrescriptionClick = (record) => {
    // console.log(record?.prescription);
    setSelectedItem(record?.prescription);
    setOpenPrescriptionModal(true);
  };
  const handleNoteClick = (record) => {
    // console.log(record?.notes);
    setSelectedItem(record?.notes);
    setOpenNoteModal(true);
  };

  // console.log(selectItem);

  return (
    <div className="py-4">
      <div className="flex justify-between">
        <h1 className="p-4 ">
          <span className="text-xl font-bold">All Appointments</span> (
          {AllAppointment?.data?.total ? AllAppointment?.data?.total : 0}{" "}
          Consultant)
        </h1>
        <div>
          <SelectBox
            placeholder="All"
            options={selectOptions}
            onChange={handleSelectChange}
            style={{ width: 150 }}
          />
        </div>
      </div>
      <div className="py-8">
        <Table
          dataSource={AllAppointment?.data?.result}
          columns={columns}
          pagination={{
            showSizeChange,
            total: AllAppointment?.data?.total,
            current: currentPage,
            onChange: handlePage,
            onShowSizeChange: (current, pageSize) => onShowSizeChange(pageSize),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
      </div>

      <Modal
        open={openPrescriptionModal}
        onClose={() => setOpenPrescriptionModal(false)}
        onCancel={() => setOpenPrescriptionModal(false)}
        title="Prescription"
        footer={[
          <Button key="cancel" onClick={() => setOpenPrescriptionModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <div className="p-2  ">
          {selectItem?.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            selectItem?.map((item, index) => {
              console.log(item);
              return (
                <div key={item?.id} className="p-2 flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg text-gray-900">
                      {" "}
                      {index + 1}.{" "}
                    </span>
                    <p className="text-lg font-semibold text-gray-900">
                      {item?.title}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 border border-dashed p-3 rounded-lg">
                    {item?.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Modal>
      <Modal
        onCancel={() => setOpenNoteModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpenNoteModal(false)}>
            Cancel
          </Button>,
        ]}
        open={openNoteModal}
        onClose={() => setOpenNoteModal(false)}
        title="Notes"
      >
        <div className="p-2  ">
          {selectItem?.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            selectItem?.map((item, index) => {
              console.log(item);
              return (
                <div key={item?.id} className="p-2 flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg text-gray-900">
                      {" "}
                      {index + 1}.{" "}
                    </span>
                    <p className="text-lg font-semibold text-gray-900">
                      {item?.title}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 border border-dashed p-3 rounded-lg">
                    {item?.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UpcomingConsultant;
