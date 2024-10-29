"use client";

import { CheckCircleOutlined, StopFilled } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAppointmentDoctorByIdQuery } from "../../../../../../redux/apiSlices/appointmentsSlices";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import SelectBox from "../../../../../components/dashboard/share/SelectBox";
import { extractDateTimeParts } from "../../../../../utils/extractDateTimeParts";

const selectOptions = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];
const Appointment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState();
  const [role, setRole] = useState();
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const user = useSelector((state) => state.user.user);
  console.log(user?._id);
  const { data: doctorAppointments } = useGetAppointmentDoctorByIdQuery(
    user._id
  );
  console.log(doctorAppointments);

  const route = useRouter(); // Import useNavigate hook

  const pageSize = 10;

  const handleView = (recoded) => {
    console.log(recoded);
    route.push(`/doctor/dashboard/appointment-details/${recoded?._id}`);
  };

  const columns = [
    {
      title: "Slots",
      dataIndex: "dateTimes",
      key: "dateTimes",
      render: (_, record) => (
        <div className="flex-col flex w-40 gap-4">
          <Tag className="text-center" color="blue" type="secondary">
            <span className=" ">
              {extractDateTimeParts(record?.dateTime, true, true).time}{" "}
              {extractDateTimeParts(record?.dateTime, true, true).timeOfDay}
            </span>
          </Tag>
        </div>
      ),
    },
    {
      title: "Days Of Week",
      dataIndex: "daysOfWeek",
      key: "daysOfWeek",
      render: (_, record) => (
        <div className="flex gap-2 flex-wrap">
          <Tag type="secondary" color="success">
            {record?.dayOfWeek?.toUpperCase()}
          </Tag>
        </div>
      ),
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Public Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div className="w-24">
          <Button
            icon={
              record?.status !== "completed" ? (
                <StopFilled />
              ) : (
                <CheckCircleOutlined />
              )
            }
            variant="text"
            type="default"
            color={record?.status !== "completed" ? "danger" : "default"}
            className="text-green-500"
          >
            {record?.status}
          </Button>
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <div>
          <Button onClick={() => handleView(record)} type="default">
            View
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

  const handleUser = (record) => {
    // Use the navigate function to redirect to the appointment/patientProfile with the ID
    route.push(`/doctor/dashboard/patient-profile/${record?._id}`);
  };

  const handlePrescriptionClick = (record) => {
    setUserData(record.action);
    setOpenPrescriptionModal(true);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };
  return (
    <div>
      <div className="flex justify-between">
        <Input
          prefix={<Search />}
          className="w-1/2 rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search by email"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
        <div>
          <SelectBox
            placeholder="Last week"
            options={selectOptions}
            onChange={handleSelectChange}
            style={{ width: 150 }}
          />
        </div>
      </div>
      <div className="py-6">
        <Table
          dataSource={doctorAppointments?.data}
          columns={columns}
          pagination={{
            pageSize,
            total: 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />

        {/* Approve Modal */}
        <ModalComponent
          openModel={openModel}
          setOpenModel={setOpenModel}
          title="User role"
          subtitle="This is the current role of the selected user"
          cancelLabel="Cancel"
          role={role}
          setRole={setRole}
          showRoleSelect={true}
          confirmLabel="Save Changes"
          onConfirm={() => {}}
          value={userData}
        />

        {/* Delete Modal */}
        <ModalComponent
          openModel={openDeleteModal}
          setOpenModel={setOpenDeleteModal}
          title="Delete User"
          subtitle="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          value={userData}
          onConfirm={() => {}}
        />

        {/* Prescription Modal */}
        <ModalComponent
          openModel={openPrescriptionModal}
          setOpenModel={setOpenPrescriptionModal}
          title="Prescription Details"
          subtitle="Here are the details of the prescription"
          confirmLabel="Print"
          cancelLabel="Close"
          value={userData}
        />
      </div>
    </div>
  );
};

export default Appointment;
